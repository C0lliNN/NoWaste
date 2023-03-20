import * as functions from 'firebase-functions';
import { Container } from './infra/di/Container';

const container = new Container();
const server = container.NewServer();

export const api = functions.runWith({ minInstances: 1 }).https.onRequest(server.handler());
