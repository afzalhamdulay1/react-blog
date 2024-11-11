import { Client, Users } from 'node-appwrite';
import conf from "../conf/conf.js";

const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Your API Endpoint
    .setProject(conf.appwriteProjectId) // Your project ID
    .setKey(conf.appwriteAPIKey); // Your secret API key

const users = new Users(client);

const fetchUserDetails = async (userId) => {
    const userDetails = await users.get(userId);
    return userDetails;
};

export default fetchUserDetails;
