import * as Yup from 'yup';
import { Op } from 'sequelize';

import File from '../models/File';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class ScheduleConstroller {
  async index(request, response) {
    const schema = await Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(request.params)))
      return response.status(400).json({ error: 'Validation fails' });

    const { id } = request.params;
    const { delivered = 'true', page = 1 } = request.query;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman)
      return response.status(400).json({ error: 'Deliveryman not found' });

    const orders = await Order.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date:
          delivered === 'true'
            ? {
                [Op.ne]: null,
              }
            : null,
      },
      limit: 10,
      offset: (page - 1) * 20,
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
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
      ],
    });

    return response.json(orders);
  }
}

export default new ScheduleConstroller();
