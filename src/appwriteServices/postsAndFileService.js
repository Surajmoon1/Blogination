import config from "../config/config";
import { Client, ID, Storage, Databases, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featureImg, userId, status }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImg,
          userId,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: createPost :: error :- ", error);
    }
  }

  async updatePost(slug, { title, content, featureImg, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImg,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: updatePost :: error :- ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deletePost :: error :- ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: getPost :: error :- ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Service :: getPosts :: error :- ", error);
      return false;
    }
  }

  // file handeling services

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error :- ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: error :- ", error);
    }
  }

  async getFilePreview(fileId) {
    return this.storage.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;

