const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000; 
 

// Middleware
app.use(cors());
app.use(express.json());

//! Connecting HTML
const path = require("path");
let viewsPath = path.join(__dirname, "views");

/*******************************************MONGO DB****************************************************************/ 


const uri = `mongodb+srv://himuchowdhury01:gqgDrG9r0tt7rVub@coffee-cluster.twmemmn.mongodb.net/?retryWrites=true&w=majority&appName=coffee-cluster`;

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

    const coffeeCollection = client.db('coffeeDb').collection('coffee');

    app.get('/coffee', async (req, res) => {
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.post('/coffee', async (req, res) => {
      const newCoffee = req.body;
      console.log(newCoffee);
      const result = await coffeeCollection.insertOne(newCoffee);
      res.send(result);
    })

    app.delete('/coffee/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await coffeeCollection.deleteOne(query);
      res.send(result);
    })

    app.get('/coffee/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await coffeeCollection.findOne(query);
      res.send(result)
    })

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