import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { proxyConfig } from './config/proxy-config';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));


app.get('/ping', (req, res) => {
  res.json({ status: 'ok', message: 'API Gateway OK 😊' });
});

Object.entries(proxyConfig).forEach(([path, config]) => {
  app.use(path, createProxyMiddleware(config));
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke in the gateway!' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
}); 
