//const MongoClient = require('mongodb').MongoClient;
//this function is intended to handle an HTTP GET request when the GET endpoint is called
//It creates a JSON response with the data {"a": 34}.
//use the request parameter to access information about the incoming HTTP request
// Inside the function, you would process the request, interact with databases or other services, and then send an appropriate response back to the client
export async function POST(request) {
    let { action, ticker, initialQuantity } = await request.json()
    const uri = 'mongodb+srv://kashafmujeeb22:Inqueering2020.@cluster1.nwcgymk.mongodb.net/';
    const client = new MongoClient(uri);
    try {
      const database = client.db('stocks');
      const inventory = database.collection('ManageStocks');
      const filter = { ticker: ticker };
  
      let newQuantity = action == "plus" ? (parseInt(initialQuantity) + 1) : (parseInt(initialQuantity) - 1)
      const updateDoc = {
        $set: {
          quantity: newQuantity
        },
      };
      const result = await inventory.updateOne(filter, updateDoc, {});
  
      return NextResponse.json({ success: true, message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)` })
    }
    catch {
      return NextResponse.json({ success: false, message: `Some error occurred` })
    }
    finally {
      await client.close();
    }
  }
