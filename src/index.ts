import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { json } from 'express';
import v1Handler from './app/v1/v1';
import corsConfig from './config/cors';
import connect from './config/initializers/database';
import { redisConnect } from './utils/redis/client';
dotenv.config();
redisConnect()

export const app = express();

app.use(json());
app.use(cors(corsConfig));
export const connection = connect();


app.use('/api/v1',v1Handler)
app.listen(4002, () => {
  console.log('Listening on 4002');
});
