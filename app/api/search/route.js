import {MongoClient} from "mongodb";
import { NextResponse } from 'next/server';

//const MongoClient = require('mongodb').MongoClient;
//this function is intended to handle an HTTP GET request when the GET endpoint is called
//It creates a JSON response with the data {"a": 34}.
//use the request parameter to access information about the incoming HTTP request
// Inside the function, you would process the request, interact with databases or other services, and then send an appropriate response back to the client
export async function GET(request){
const query = request.nextUrl.searchParams.get("query");
// Connection URL
const url = 'mongodb+srv://kashafmujeeb22:Inqueering2020.@cluster1.nwcgymk.mongodb.net/';
// Create a new MongoClient
const client = new MongoClient(url);
    try{
        await client.connect();
        const database = client.db("stocks");
        const inventory = database.collection("ManageStocks");
        const products = await inventory.aggregate([
            {
              $match: {
                $or: [
                  { ticker: { $regex: query, $options: 'i' } }, // Case-insensitive match
                ]
              }
            }
          ]).toArray();
          return NextResponse.json({ success: true, products})
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        } 
      
      }