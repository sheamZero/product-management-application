import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ServerApiVersion } from 'mongodb';


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yigerrh.mongodb.net/productManagementAppWeero?appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


export const connectDatabase = async () => {
    try {
        // await client.connect();
        // console.log("Connected to MongoDB successfully!");
        return client.db("productManagementAppWeero");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};