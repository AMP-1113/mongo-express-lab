import express from 'express';
import { getClient } from '../db';
import { ObjectId } from 'mongodb';
import CartItem from '../model/CartItem';

const route = express.Router();


route.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client.db().collection<CartItem>('cartItems').find().toArray();
    res.json(results); // send JSON results
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({message: "Internal Server Error"});
  }
});

export default route;