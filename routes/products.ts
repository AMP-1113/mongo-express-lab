import express from 'express';
import { getClient } from '../db';
import { ObjectId } from 'mongodb';
import CartItem from '../model/CartItem';

const route = express.Router();

// EXTENDED CHALLENGES
// Highest priced item
route.get("/products/highest-price", async (req, res) => {
    try {
      const client = await getClient();
      const results = await client.db().collection<CartItem>('cartItems').find().sort({price: -1}).limit(1).toArray();
      res.json(results); // send JSON results
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    }
  });

  // 5 best selling
  route.get("/products/best-selling", async (req, res) => {
    try {
      const client = await getClient();
      const results = await client.db().collection<CartItem>('cartItems').find().sort({quantity: -1}).limit(5).toArray();
      res.json(results); // send JSON results
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    }
  });

  // best revenue
  route.get("/products/best-revenue", async (req, res) => {
    try {
      const client = await getClient();
      const results = await client.db().collection<CartItem>('cartItems').aggregate([
        {$group: {
          _id: "$product",
          Total_Revenue: { $sum: { $multiply: [ "$price", "$quantity" ] } }
        }},
        {$sort: {Total_Revenue: -1}},
      ]).toArray();
      res.json(results); // send JSON results
    } catch (err) {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    }
  });

  export default route;