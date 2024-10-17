const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 6001;

const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const jwt = require("jsonwebtoken");

// middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi-client-cluster.2heqqpx.mongodb.net/foodi-client?retryWrites=true&w=majority`
  )
  .then(console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// jwt authentication

// jwt related api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  // console.log(user)
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

// import routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartsRoutes = require("./api/routes/cartRoutes");
const usersRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
const adminStats = require("./api/routes/adminStats");
const orderStats = require("./api/routes/orderStats");
app.use("/menu", menuRoutes);
app.use("/carts", cartsRoutes);
app.use("/users", usersRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin-stats", adminStats);
app.use("/order-stats", orderStats);

// payment methods routes
const verifyToken = require("./api/middlewares/verifyToken");

app.post("/create-payment-intent", verifyToken, async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;
  // console.log(amount);

  // Create a PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => {
  res.send("Foodi Server is Running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//   old method:-

// const express = require("express");
// const app = express();
// // const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const port = process.env.PORT || 5000;

// // username - adityasinghbisht1000001
// // pass - q1ZTgxlSBLete46Z

// // middleware
// app.use(cors());
// app.use(express.json());

// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi-client-cluster.2heqqpx.mongodb.net/?appName=Foodi-client-cluster`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();
//     const menuCollections = client.db("foodi-client").collection("menus");
//     const cartCollections = client.db("foodi-client").collection("cartItems");

//     app.get("/menu", async (req, res) => {
//       const result = await menuCollections.find().toArray();
//       res.send(result);
//     });

//     app.post("/carts", async (req, res) => {
//       const cartItem = req.body;

//       const result = await cartCollections.insertOne(cartItem);
//       res.send(result);
//     });

//     app.get("/carts", async (req, res) => {
//       const email = req.query.email;
//       const filter = { email: email };
//       const result = await cartCollections.find(filter).toArray();
//       res.send(result);
//     });

//     app.delete("/carts/:id", async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const result = await cartCollections.deleteOne(filter);
//       res.send(result);
//     });

//     app.get("/carts/:id", async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const result = await cartCollections.findOne(filter);
//       res.send(result);
//     });
//     app.put("/carts/:id", async (req, res) => {
//       const id = req.params.id;
//       const { quantity } = req.body;
//       const filter = { _id: new ObjectId(id) };

//       const options = { upsert: true };
//       const updateDoc = {
//         $set: {
//           quantity: parseInt(quantity, 10),
//         },
//       };

//       const result = await cartCollections.updateOne(
//         filter,
//         updateDoc,
//         options
//       );
//       res.send(result);
//     });

//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("Foodi Server is Running!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
