import config from "../config/config";
import { Client, ID, Storage, Databases, Query } from "appwrite";

export class appwriteServices {
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

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    userId,
    status,
    author,
    updatedAt,
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          userId,
          status,
          author,
          updatedAt,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: createPost :: error :- ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
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

  async getPosts(queries) {
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

  // getFilePreview(fileId) {
  //   return this.storage.getFilePreview(config.appwriteBucketId, fileId).href;
  // }

  getFileView = (fileId) => {
    return this.storage.getFileView(config.appwriteBucketId, fileId);
  };
}

const appwriteService = new appwriteServices();
export default appwriteService;
