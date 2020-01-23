import admin from "firebase-admin";

const uuid = require("uuid/v1");
export default {
  user(): admin.auth.CreateRequest {
    const email: string = `${uuid().split("-")[0]}@testing.com`;
    const user: admin.auth.CreateRequest = {
      displayName: uuid(),
      disabled: false,
      email,
      password: "password123",
      emailVerified: true
    };

    return user;
  }
};
