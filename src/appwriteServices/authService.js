import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // API Endpoint
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
      // return userAccount;
    } catch (error) {
      console.log("Apprite service :: createAccount :: error :- ", error);
      throw error;
    }
  }

  async createVerification() {
    try {
      await this.account.createVerification(
        "https://blogination.netlify.app/verify"
      );
    } catch (error) {
      console.log("Apprite service :: verification :: error :- ", error);
      throw error;
    }
  }

  async updateVerification(userId, secret) {
    try {
      await this.account.updateVerification(userId, secret);
    } catch (error) {
      console.log("Apprite service :: updateVerification :: error :- ", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite services :: login :: error :- ", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite services :: getCurrenUser :: error :- ", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Services :: logout :: error :- ", error);
    }
  }

  async createPasswordRecovery({ email }) {
    try {
      await this.account.createRecovery(
        email,
        "https://blogination.netlify.app/reset-password"
      );
    } catch (error) {
      console.log(
        "Appwrite Services :: createPasswordRecovery :: error :- ",
        error
      );
      throw error;
    }
  }

  async resetPassword(userId, secret, password, confirmPassword) {
    try {
      await this.account.updateRecovery(
        userId,
        secret,
        password,
        confirmPassword
      );
    } catch (error) {
      console.log("Appwrite Services :: resetPassword :: error :- ", error);
      throw error;
    }
  }
}

const authService = new AuthServices();

export default authService;
