import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connectDatabase } from './config/db.js';
const port = process.env.PORT || 9000;
// import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();


app.use(cors());
app.use(express.json());





// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.yigerrh.mongodb.net/?appName=Cluster0";
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yigerrh.mongodb.net/productManagementAppWeero?appName=Cluster0`;

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

async function run() {
    try {
        // await client.connect();
        // const database = client.db("productManagementAppWeero");
        const database = await connectDatabase();
        const productsCollection = database.collection("products");

        app.post("/add-product", async (req, res) => {
            const product = req.body;
            console.log(product)
            const result = await productsCollection.insertOne(product);
            res.send(result);
        });

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);





app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});