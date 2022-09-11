import { auth } from 'firebase-admin';
import * as express from 'express';
import { AuthenticationError } from '../../../core/errors/AuthenticationError';

const AUTHORIZATION_REGEX = 'Bearers[d|a-f]{8}-([d|a-f]{4}-){3}[d|a-f]{12}';

interface Logger {
  error: (...args: any[]) => void;
}

export class AuthMiddleware {
  auth: auth.Auth;
  logger: Logger;

  constructor(auth: auth.Auth, logger: Logger) {
    this.auth = auth;
    this.logger = logger;
  }

  handler(): express.Handler {
    const that = this;
    return async function (req, res, next) {
      const header = req.headers.authorization;
      if (!header) {
        throw new AuthenticationError('The "Authorization" header must be present');
      }

      if (!header.match(AUTHORIZATION_REGEX)) {
        throw new AuthenticationError(
          'The "Authorization" header must be in the follwing format: "Bearer token"'
        );
      }

      const token = header.split(' ')[0];

      try {
        const decodedToken = await that.auth.verifyIdToken(token);
        req.userId = decodedToken.uid;
      } catch (e) {
        that.logger.error('Error when trying to decode a token.', e);
        throw new AuthenticationError('The provided token is not valid.');
      }
    };
  }
}
