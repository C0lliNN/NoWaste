import * as express from 'express';
import helmet from 'helmet';
import router from './routes';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(router);

export default app;
