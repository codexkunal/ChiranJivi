import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI


export const fetchGraphData = async (req, res) => {
    const pincode = 110001;

    if (!pincode) {
        return res.status(400).json({ error: "Missing pincode in query parameters." });
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB Cloud!");

        const db = client.db("myDatabase"); // Replace with your database name
        const collection = db.collection("patients"); // Replace with your collection name

        const pipeline = [
            {
                $match: { pincode: parseInt(pincode, 10) } // Filter for the specific pincode
            },
            {
                $group: {
                    _id: {
                        symptom: "$symptoms",
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$visitDate" } }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.date": 1 }
            }
        ];

        const result = await collection.aggregate(pipeline).toArray();

        // Transform data into the required format
        const graphData = result.reduce((acc, item) => {
            const symptom = item._id.symptom;
            const date = item._id.date;
            const count = item.count;

            if (!acc[symptom]) {
                acc[symptom] = [];
            }

            acc[symptom].push({ date, count });
            return acc;
        }, {});

        // Return the complete graphData object
        res.status(200).json(graphData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal server error." });
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
};


