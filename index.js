const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000; 
 

// Middleware
app.use(cors());
app.use(express.json());

//! Connecting HTML
const path = require("path");
let viewsPath = path.join(__dirname, "views");

/*******************************************MONGO DB****************************************************************/ 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@coffee-cluster.twmemmn.mongodb.net/?retryWrites=true&w=majority&appName=coffee-cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    //! Rest APIs Goes Here




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



/***********************************************ENDs*****************************************************************/ 
app.get('/', (req, res) =>{
    res.sendFile(`${viewsPath}/index.html`);
});

app.listen(port, () => {
    console.log(`Coffee Server Running on port ${port}`);
})