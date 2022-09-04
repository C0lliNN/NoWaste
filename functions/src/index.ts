import * as functions from 'firebase-functions';
import app from './infra/http/express';

export const api = functions.https.onRequest(app);
