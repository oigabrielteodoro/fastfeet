import * as Yup from 'yup';
import { Op } from 'sequelize';

import File from '../models/File';
import Order from '../models/Order';
import Problem from '../models/Problem';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class ProblemController {
  async index(request, response) {
    const { product = '' } = request.query;

    const problems = await Problem.findAll({
      order: ['created_at', 'updated_at'],
      attributes: ['id', 'description'],
      include: [
        {
          where: {
            product: {
              [Op.like]: `%${product}`,
            },
          },
          model: Order,
          as: 'order',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
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
        },
      ],
    });

    return response.json(problems);
  }

  async show(request, response) {
    const { id } = request.params;

    const problems = await Problem.findAll({
      where: {
        order_id: id,
      },
      order: ['created_at', 'updated_at'],
      attributes: ['id', 'description'],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
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
        },
      ],
    });

    return response.json(problems);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body)))
      return response.status(400).json({ error: 'Validation fails' });

    const { order_id } = request.params;
    const { description } = request.body;

    const order = await Order.findByPk(order_id, {
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

    if (!order) {
      return response.status(400).json({ error: 'Order not found' });
    }

    const { id } = await Problem.create({ order_id, description });

    return response.json({
      problem: {
        id,
        order,
        description,
      },
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const problem = await Problem.findByPk(id, {
      attributes: ['id', 'description'],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
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
        },
      ],
    });

    if (!problem) {
      return response.status(400).json({ error: 'Problem not found' });
    }

    const { order } = problem;

    if (!order) {
      return response.status(400).json({ error: 'Order not found' });
    }

    if (!order.start_date) {
      return response
        .status(400)
        .json({ error: 'This order has not yet been start date' });
    }

    if (order.canceled_at || order.end_date) {
      return response.status(400).json({ error: 'Order closed' });
    }

    order.canceled_at = new Date();

    await order.save();

    await Queue.add(CancellationMail.key, {
      problem,
    });

    return response.json(order);
  }
}

export default new ProblemController();
