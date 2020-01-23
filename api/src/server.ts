require("dotenv").config();

import Api from "./api";
import firebase from "./firebase";

const serviceAccount = firebase.getServiceAccount(process.env);

const api = Api(serviceAccount),
  { PORT = 8080 } = process.env;

api.listen(PORT, () => {
  console.log(`listens to port ${PORT}`);
});
