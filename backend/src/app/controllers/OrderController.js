import * as Yup from 'yup';
import { parseISO, getHours, isBefore } from 'date-fns';
import { Op } from 'sequelize';

import File from '../models/File';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class OrderController {
  async index(request, response) {
    const { page = 1, name = '' } = request.query;

    const orders = await Order.findAll({
      where: {
        product: {
          [Op.iLike]: `%${name}`,
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      order: ['id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'city',
            'uf',
            'zipcode',
            'complement',
            'number',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return response.json(orders);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .positive()
        .required(),
      deliveryman_id: Yup.number()
        .positive()
        .required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = request.body;

    if (
      await Order.findOne({ where: { recipient_id, deliveryman_id, product } })
    ) {
      return response.status(400).json({ error: 'Order already exists' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return response.status(400).json({ error: 'Deliveryman not found' });
    }

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return response.status(400).json({ error: 'Recipient not found' });
    }

    const order = await Order.create(request.body);

    await order.reload({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'city',
            'uf',
            'zipcode',
            'complement',
            'number',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    await Queue.add(RegistrationMail.key, {
      order,
    });

    return response.json(order);
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().positive(),
      deliveryman_id: Yup.number().positive(),
      signature_id: Yup.number().positive(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const order = await Order.findByPk(request.params.id);

    if (!order) {
      return response.status(400).json({ error: 'Order not found' });
    }

    const {
      recipient_id,
      deliveryman_id,
      signature_id,
      start_date,
      end_date,
    } = request.body;

    if (recipient_id) {
      const recipient = await Recipient.findByPk(recipient_id);

      if (!recipient) {
        return response.status(400).json({ error: 'Recipient not found' });
      }
    }

    if (deliveryman_id) {
      const deliveryman = await Deliveryman.findByPk(deliveryman_id);

      if (!deliveryman) {
        return response.status(400).json({ error: 'Deliveryman not found' });
      }
    }

    if (signature_id) {
      const file = await File.findByPk(signature_id);

      if (!file) {
        return response.status(400).json({ error: 'File not found' });
      }
    }

    const parsedStart = parseISO(start_date);
    const parsedEnd = parseISO(end_date);

    if (start_date) {
      const hour = getHours(parsedStart);

      if (hour <= 8 || hour >= 18)
        return response
          .status(400)
          .json({ error: 'The start date must be between 08:00 and 18:00' });
    }

    if (end_date && !start_date) {
      if (!order.start_date)
        return response.status(400).json({
          error:
            'The delivery must have a pick-up time to be marked as delivered',
        });
    }

    if (start_date && end_date) {
      if (isBefore(parsedEnd, parsedStart)) {
        return response
          .status(400)
          .json({ error: 'The end date is after the start date' });
      }
    }

    const updated = await order.update(request.body);

    return response.json(updated);
  }

  async delete(request, response) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(request.params))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const order = await Order.findByPk(request.params.id);

    if (!order) {
      return response.status(400).json({ error: 'Order not found' });
    }

    await order.destroy();

    return response.send();
  }
}

export default new OrderController();
