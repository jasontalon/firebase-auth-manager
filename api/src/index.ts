require("dotenv").config();

import Api from "./api";
import firebase from "./firebase";

export default function() {
  const serviceAccount = firebase.getServiceAccount(process.env);

  const api = Api(serviceAccount);

  return api;
}
