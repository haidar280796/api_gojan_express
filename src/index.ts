import dotenv from 'dotenv';
import express, { Request, Response } from "express";
import createError from "http-errors"
// routes
import routes from './routes';
import bodyParser from 'body-parser';
// import multer from 'multer';
// env config
dotenv.config();
// define prima client & apps
const app = express();

// add middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.json());

// define routes
app.use('/', routes);

// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
    next(createError(404))
})

// listen port app
app.listen(process.env.PORT, () =>
    console.log(`⚡️[server]: Server is running at https://localhost:${process.env.PORT}`)
)