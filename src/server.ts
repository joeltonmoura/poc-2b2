import express from 'express';
import 'express-async-errors';
import { router } from './routes/routes';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(router);
const port = process.env.PORT_API;

app.listen(port, () => console.log(`Servidor iniciado na porta: ${port}`));
