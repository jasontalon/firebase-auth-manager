require("dotenv").config();

import app from "../src/firebase";
import admin = require("firebase-admin");
import mock from "./mock";

describe("auth", () => {
  beforeAll(() => {
    const serviceAccount = app.getServiceAccount(process.env);
    app.initialize(serviceAccount);
  });
  describe("get all users", () => {
    it("should list users", async () => {
      const { users } = await admin.auth().listUsers();
      expect(users.length).toBeGreaterThan(0);
    });

    it("should return pageToken for paged list", async () => {
      const { users, pageToken } = await admin.auth().listUsers(1);

      expect(users.length > 0 && !!pageToken).toEqual(true);
    });
  });
  describe("create user", () => {
    it("should create new user", async () => {
      const userMock = mock.user();

      const { uid } = await admin.auth().createUser(userMock);

      expect(uid).toEqual(expect.anything());
    });
  });

  describe("update user", () => {
    it("should update user", async () => {
      const userMock = mock.user();

      const { uid } = await admin.auth().createUser(userMock);

      const updatedDisplayName = userMock.displayName + " updated";
      const updatedDetails: admin.auth.UpdateRequest = {
        displayName: updatedDisplayName
      };
      const updatedUser = await admin.auth().updateUser(uid, updatedDetails);

      expect(updatedUser.displayName === updatedDisplayName).toEqual(true);
    });
  });

  describe("delete user", () => {
    it("should delete user", async () => {
      const userMock = mock.user();

      const { uid } = await admin.auth().createUser(userMock);

      await admin.auth().deleteUser(uid);

      try {
        await admin.auth().getUser(uid);
      } catch ({ code }) {
        expect(code).toEqual("auth/user-not-found");
      }
    });
  });

  describe("assign claim", () => {
    it.each([["admin"]])("should assign [%s] claim", async role => {
      const userMock = mock.user();
      const auth = admin.auth();
      const { uid } = await auth.createUser(userMock);

      await auth.setCustomUserClaims(uid, null); //remove all claims

      await auth.setCustomUserClaims(uid, { [role]: true });

      const user = await auth.getUser(uid);

      const claim: string =
        Object.keys(user.customClaims as any).find(
          (claim: string) => claim === role
        ) ?? "";

      expect(claim).toEqual(role);
      expect((user.customClaims as any)[claim]).toBeTruthy();
    });
  });
});
