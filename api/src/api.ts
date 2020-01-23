import express, { Express } from "express";
import admin, { ServiceAccount } from "./firebase";
import bodyParser from "body-parser";
import Middleware from "./middleware";
import firebase from "firebase-admin";
import Routes from "./routes";

export default function(serviceAccountKey: ServiceAccount): Express {
  if (!admin.isInitialized()) admin.initialize(serviceAccountKey);
  const app = express();
  const auth = firebase.auth();

  app.set("json spaces", 2);
  app.use([bodyParser.urlencoded({ extended: false }), bodyParser.json()]);
  const middleware = new Middleware(auth);

  app.use([
    middleware.authentication(),
    new Routes(auth).build(),
    middleware.errorHandler()
  ]);

  return app;
}
