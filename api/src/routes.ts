import admin = require("firebase-admin");
import express, { Router, NextFunction, Request, Response } from "express";

export default class Routes {
  constructor(private auth: admin.auth.Auth) {}

  build(): Router {
    const router: Router = express.Router();

    router.get("/users", async (request, response, next) => {
      try {
        const results: admin.auth.ListUsersResult = await this.auth.listUsers();

        response.jsonp(results);
      } catch (error) {
        next({ error, status: 400 });
      }
    });

    router.post("/user", async (request, response, next) => {
      try {
        const user = <admin.auth.CreateRequest>request.body;

        const { uid } = await this.auth.createUser(user);

        response.jsonp({ uid });
      } catch (error) {
        next({ error, status: 400 });
      }
    });

    router.get("/user/:uid", async (request, response, next) => {
      try {
        const { uid } = request.params;
        const user = await this.auth.getUser(uid);
        response.jsonp(user);
      } catch (error) {
        next({ error, status: 404 });
      }
    });

    router.delete("/user/:uid", async (request, response, next) => {
      try {
        const { uid = "" } = request.params;

        const uidArr = uid.split(",");

        for (
          let currentIndex = 0;
          uidArr.length > currentIndex;
          currentIndex++
        ) {
          await this.auth.deleteUser(uidArr[currentIndex]);
        }

        response.sendStatus(200);
      } catch (error) {
        next({ error, status: 400 });
      }
    });

    router.put("/user/:uid", async (request, response, next) => {
      try {
        const user = <admin.auth.UpdateRequest>request.body,
          { uid = "" } = request.params || request.body;

        await this.auth.updateUser(uid, user);

        response.jsonp({ uid });
      } catch (error) {
        next({ error, status: 400 });
      }
    });

    const assignRole = async (
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      try {
        const { uid, role } = request.params;

        await this.auth.setCustomUserClaims(uid, null); //reset the claims

        await this.auth.setCustomUserClaims(uid, { [role]: true });
        response.sendStatus(200);
      } catch (error) {
        next({ error, status: 400 });
      }
    };

    router
      .route("/user/:uid/role/:role")
      .post(assignRole)
      .put(assignRole);
    return router;
  }
}
