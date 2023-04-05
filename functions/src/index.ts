import * as functions from 'firebase-functions';
import { Container } from './infra/di/Container';

const container = new Container();
const server = container.NewServer();

export const api = functions.https.onRequest(server.handler());
