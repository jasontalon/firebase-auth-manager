require("dotenv").config();

import app, { ServiceAccount, IServiceAccount } from "../src/firebase";
const serviceAccount = app.getServiceAccount(process.env);

describe("app", () => {
  beforeAll(() => {
    app.initialize(serviceAccount);
  });
  it("should parse service account from environment variables", () => {
    const serviceAccount: IServiceAccount = app.getServiceAccount(process.env),
      serviceAccountArr: string[] = Object.keys(new ServiceAccount()).reduce(
        (acc, property) => {
          const value = (serviceAccount as any)[property];
          if (!!value) acc.push(value);
          return acc;
        },
        <string[]>[]
      );

    expect(serviceAccountArr.length).toEqual(10);
  });
  it("should initialize firebase admin", () => {
    if (!app.isInitialized()) app.initialize(serviceAccount);

    expect(app.isInitialized()).toEqual(true);
  });

  it("should throw error if initialized more than once", () => {
    try {
      for (let counter = 1; 2 >= counter; counter++) {
        app.initialize(serviceAccount);
      }
    } catch ({ code }) {
      expect(code).toEqual("app/duplicate-app");
    }
  });
});
