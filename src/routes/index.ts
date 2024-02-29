import express from 'express';
import userRoute from './userRoute';
import categoryRoute from './categoryRoute';

const routes = express.Router();

routes.use('/api/users', userRoute);
routes.use('/api/users', categoryRoute);

export default routes;