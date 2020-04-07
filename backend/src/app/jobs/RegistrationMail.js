import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMain';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Uma nova encomenda!',
      template: 'registration',
      context: {
        deliveryman: order.deliveryman.name,
        recipient: order.recipient.name,
        product: order.product,
      },
    });
  }
}

export default new RegistrationMail();
