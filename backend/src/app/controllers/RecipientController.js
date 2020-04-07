import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(request, response) {
    const { name = '' } = request.query;

    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.like]: `%${name}`,
        },
      },
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
    });

    return response.json(recipients);
  }

  async show(request, response) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(request.params))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(request.params.id, {
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
    });

    if (!recipient) {
      return response.status(400).json({ error: 'Recipient not found' });
    }

    return response.json(recipient);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      city: Yup.string().required(),
      uf: Yup.string()
        .length(2)
        .required(),
      zipcode: Yup.string()
        .length(8)
        .required(),
      complement: Yup.string().required(),
      number: Yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const {
      name,
      street,
      city,
      uf,
      zipcode,
      complement,
      number,
    } = request.body;

    const recipient = await Recipient.findOne({
      where: {
        name,
        zipcode,
      },
    });

    if (recipient) {
      return response.status(400).json({ error: 'Recipient already exists' });
    }

    const { id } = await Recipient.create({
      name,
      street,
      city,
      uf,
      zipcode,
      complement,
      number,
    });

    return response.json({
      recipient: {
        id,
        name,
        street,
        city,
        uf,
        zipcode,
        complement,
        number,
      },
    });
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      city: Yup.string(),
      uf: Yup.string().length(2),
      zipcode: Yup.string().length(8),
      complement: Yup.string(),
      number: Yup.number(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { id } = request.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return response.status(400).json({ error: 'Recipient not found' });
    }

    const {
      name,
      street,
      city,
      uf,
      zipcode,
      complement,
      number,
    } = await recipient.update(request.body);

    return response.json({
      id,
      name,
      street,
      city,
      uf,
      zipcode,
      complement,
      number,
    });
  }

  async delete(request, response) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(request.params))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(request.params.id);

    if (!recipient) {
      return response.status(400).json({ error: 'Recipient not found' });
    }

    await recipient.destroy();

    return response.send();
  }
}

export default new RecipientController();
