import admin from "firebase-admin";

export default {
  initialize(serviceAccountKey: ServiceAccount, databaseURL?: string): void {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey as any),
      databaseURL
    });
  },

  isInitialized() {
    return admin.apps?.length > 0 ?? false;
  },

  getServiceAccount(envVariables: NodeJS.ProcessEnv): IServiceAccount {
    const prefix: string = "FIREBASE_SERVICE_ACCOUNT_",
      withPrefix = (prop: string) => prop.startsWith(prefix),
      removePrefix = (prop: string) => prop.replace(prefix, "").toLowerCase(),
      serviceAccountEnvProps: string[] = Object.keys(envVariables).filter(
        withPrefix
      ),
      toServiceAccount = (accumulator: ServiceAccount, property: string) => {
        const envProp: string =
          serviceAccountEnvProps.find((prop: string) =>
            prop.toLowerCase().endsWith(property)
          ) ?? "";

        const envValue: string = envVariables[envProp] ?? "";

        (accumulator as any)[property] = envValue;

        return accumulator;
      },
      serviceAccount = serviceAccountEnvProps
        .map(removePrefix)
        .reduce(toServiceAccount, new ServiceAccount());

    return serviceAccount;
  }
};

export interface IServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export class ServiceAccount implements IServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;

  constructor() {
    this.auth_provider_x509_cert_url = this.auth_uri = this.client_email = this.client_id = this.client_x509_cert_url = this.private_key = this.private_key_id = this.project_id = this.token_uri = this.type =
      "";
  }
}
