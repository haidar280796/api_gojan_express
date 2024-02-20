import express from 'express';
import userRoute from './userRoute';

const routes = express.Router();

routes.use('/api/users', userRoute);

export default routes;