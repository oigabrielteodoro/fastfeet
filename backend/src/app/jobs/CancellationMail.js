import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMain';
  }

  async handle({ data }) {
    const { problem } = data;

    await Mail.sendMail({
      to: `${problem.order.deliveryman.name} <${problem.order.deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancellation',
      context: {
        deliveryman: problem.order.deliveryman.name,
        recipient: problem.order.recipient.name,
        product: problem.order.product,
        description: problem.description,
      },
    });
  }
}

export default new CancellationMail();
