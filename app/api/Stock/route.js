import {MongoClient} from "mongodb";
import { NextResponse } from 'next/server';

//const MongoClient = require('mongodb').MongoClient;
//this function is intended to handle an HTTP GET request when the GET endpoint is called
//It creates a JSON response with the data {"a": 34}.
//use the request parameter to access information about the incoming HTTP request
// Inside the function, you would process the request, interact with databases or other services, and then send an appropriate response back to the client
export async function GET(request){

// Connection URL
const url = 'mongodb+srv://kashafmujeeb22:Inqueering2020.@cluster1.nwcgymk.mongodb.net/';
// Create a new MongoClient
const client = new MongoClient(url);
    try{
        await client.connect();
        const database = client.db("stocks");
        const inventory = database.collection("ManageStocks");
        const query = {   };
        const stock = await inventory.find(query).toArray();
        return new Response(JSON.stringify({ success: true, stock }), {
          headers: {
              'Content-Type': 'application/json'
          }
      });
  } finally {
      await client.close();
  }
}
    export async function POST(request) {
        // Replace the uri string with your connection string.
        let body = await request.json()
        console.log('Request JSON:', JSON.stringify(body, null, 2));
        const uri = 'mongodb+srv://kashafmujeeb22:Inqueering2020.@cluster1.nwcgymk.mongodb.net/';
        const client = new MongoClient(uri);
        try {
          const database = client.db('stocks');
          const inventory = database.collection('ManageStocks');
          const product = await inventory.insertOne(body)
          return NextResponse.json({ product, ok: true })
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      }


