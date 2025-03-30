const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

async function addCategoryField() {
    if (!uri) {
        console.error("MongoDB URI not provided");
        return;
    }
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const result = await client.db("blogging").collection("notifications").deleteMany(
            { active: false }
        );

        const cursor = client.db("blogging").collection("notifications").find();
        const results = await cursor.toArray();
        console.log(results);

        console.log(`${result.modifiedCount} documents updated`);
    } catch (error) {
        console.error("Error updating documents:", error);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB");
    }
}

addCategoryField().catch(console.error);