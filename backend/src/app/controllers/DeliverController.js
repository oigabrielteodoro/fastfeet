import * as Yup from 'yup';

import File from '../models/File';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

class DeliverController {
  async update(request, response) {
    const schema = Yup.object().shape({
      end_date: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { id, order_id } = request.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return response.status(400).json({ error: 'Deliveryman not found' });
    }

    const order = await Order.findByPk(order_id);

    if (!order) {
      return response.status(400).json({ error: 'Order not found' });
    }

    if (!request.file) {
      return response
        .status(400)
        .json({ error: 'The signature needs to be sent' });
    }

    if (Number(id) !== order.deliveryman_id) {
      return response.status(401).json({ error: "You don't have permission." });
    }

    if (!order.start_date) {
      return response
        .status(400)
        .json({ error: 'This order has not yet been start date' });
    }

    if (order.canceled_at || order.end_date) {
      return response.status(400).json({ error: 'Order closed' });
    }

    const { end_date } = request.body;

    const { originalname: name, filename: path } = request.file;

    const file = await File.create({
      name,
      path,
    });

    await order.update({
      end_date,
      signature_id: file.id,
    });

    await order.reload({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
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
          attributes: ['id', 'url', 'name', 'path'],
        },
      ],
    });

    return response.json(order);
  }
}

export default new DeliverController();
