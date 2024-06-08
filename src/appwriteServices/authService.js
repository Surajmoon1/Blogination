import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //calling login function when account created
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Apprite service :: createAccount :: error :- ", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite services :: login :: error :- ", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite services :: getCurrenUser :: error :- ", error);
    }
    // return;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Services :: logout :: error :- ", error);
    }
  }
}

const authService = new AuthServices();

export default authService;
