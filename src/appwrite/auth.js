import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";
import { Users, Client as node_client } from 'node-appwrite';

export class AuthService {
    client = new Client();
    node_client = new node_client(); // Initialize Node Appwrite client
    account;
    users;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
        this.node_client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        .setKey(conf.appwriteAPIKey); // Initialize Node Appwrite client with API key
        this.users = new Users(this.node_client); // Initialize Users for fetching user details
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
                return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    // New method to fetch user details
    async fetchUserDetails(userId) {
        try {
            const userDetails = await this.users.get(userId);
            return userDetails;
        } catch (error) {
            console.log("Appwrite service :: fetchUserDetails :: error", error);
        }
        return null;
    }
}

const authService = new AuthService();

export default authService;




