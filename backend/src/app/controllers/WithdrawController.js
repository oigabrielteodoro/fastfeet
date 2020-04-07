import * as Yup from 'yup';
import { parseISO, getHours, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

class WithdrawController {
  async update(request, response) {
    const schema = Yup.object().shape({
      start_date: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { id, order_id } = request.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman)
      return response.status(400).json({ error: 'Deliveryman not found' });

    const order = await Order.findByPk(order_id);

    if (!order) {
      return response.status(400).json({ error: 'Order not found' });
    }

    const { start_date } = request.body;

    if (order.canceled_at || order.end_date || order.start_date) {
      return response.status(400).json({ error: 'Order closed' });
    }

    const parsedStart = parseISO(start_date);

    const hour = getHours(parsedStart);

    if (hour <= 8 || hour >= 18)
      return response
        .status(400)
        .json({ error: 'The start date must be between 08:00 and 18:00' });

    const orders = await Order.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(parsedStart), endOfDay(parsedStart)],
        },
        end_date: null,
      },
    });

    if (orders.length >= 5) {
      return response
        .status(400)
        .json({ error: 'Deliveryman already has 5 orders on the day.' });
    }

    const updated = await order.update(request.body);

    return response.json(updated);
  }
}

export default new WithdrawController();
