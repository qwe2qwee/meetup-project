import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://meetup12:5P5DaMVGcRoPwVMb@cluster0.i2yoyez.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollecction = db.collection("meetups");

    const result = await meetupsCollecction.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({message:"Meetup isnerted!"})
  }

};

export default handler;
