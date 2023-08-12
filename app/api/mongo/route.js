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
async function run(){
    try{
        const database = client.db("stocks");
        const movies = database.collection("ManageStocks");
        const query = {};
        const movie = await movies.findOne(query);
        console.log(movie);
        return NextResponse.json({"a" : 34, movie})
    }
    finally {
        await client.close();
    }
}
}
