import { Router } from 'express';
import multer from 'multer';

import SessionController from './app/controllers/SessionController';
import DeliverController from './app/controllers/DeliverController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import ScheduleController from './app/controllers/ScheduleController';
import WithdrawController from './app/controllers/WithdrawController';
import ProblemController from './app/controllers/ProblemController';
import OrderController from './app/controllers/OrderController';
import FileController from './app/controllers/FileController';

import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliverymen/:id/orders', ScheduleController.index);

routes.put(
  '/delivery/:id/deliver/:order_id',
  upload.single('file'),
  DeliverController.update
);

routes.put('/delivery/:id/withdraw/:order_id', WithdrawController.update);

routes.post('/delivery/:order_id/problems', ProblemController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverymen', DeliverymanController.index);
routes.get('/deliverymen/:id', DeliverymanController.show);

routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);

routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.get('/orders', OrderController.index);

routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);

routes.delete('/orders/:id', OrderController.delete);

routes.get('/problems', ProblemController.index);
routes.get('/problems/:id', ProblemController.show);

routes.delete('/problems/:id/cancel-delivery', ProblemController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
