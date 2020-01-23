import admin from "firebase-admin";
import express, { NextFunction } from "express";
export default class Middleware {
  constructor(private auth: admin.auth.Auth) {}
  authentication() {
    const middleware = async (
      request: express.Request,
      response: express.Response,
      next: NextFunction
    ) => {
      const { authorization = null } = request.headers;
      try {
        if (!authorization) {
          response.sendStatus(401);
          return;
        }

        const idToken = authorization.replace(/bearer/gim, "").trim();
        const { admin = null } = await this.auth.verifyIdToken(idToken, true);

        if (!admin) response.sendStatus(401);
        else next();
      } catch (error) {
        const { code = "" } = error;

        if (code.includes("id-token-expired")) response.sendStatus(401);
        else next({ error });
      }
    };

    return middleware;
  }
  errorHandler() {
    const middleware = function(
      { error, status = 500 }: any,
      request: express.Request,
      response: express.Response,
      next: NextFunction
    ) {
      if (!error) {
        next();
      } else {
        const parsedError = JSON.parse(
          JSON.stringify(error, Object.getOwnPropertyNames(error))
        );

        response.status(status).jsonp(parsedError);
      }
    };

    return middleware;
  }
}
