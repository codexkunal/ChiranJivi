// const { MongoClient } = require('mongodb');
import {MongoClient } from 'mongodb'
// Replace <username>, <password>, and <cluster-url> with your MongoDB Cloud credentials
const uri = "mongodb+srv://MAHI:Sumitra1@cluster0.mbvk6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// function getRandomElement(arr) {
//     return arr[Math.floor(Math.random() * arr.length)];
// }

// const symptomsList = ['Fever', 'Cough', 'Headache', 'Fatigue', 'Sore throat', 'Shortness of breath', 'Nausea'];
// const pincodeList = [110001, 560001, 400001, 700001, 600001, 500001, 302001, 122001];

// // Generate 50 random patient records
// const patients = Array.from({ length: 50 }, () => ({
//     name: `Patient_${Math.floor(Math.random() * 1000)}`,
//     age: Math.floor(Math.random() * 60) + 18, // Random age between 18 and 77
//     gender: getRandomElement(['Male', 'Female', 'Other']),
//     pincode: getRandomElement(pincodeList),
//     symptoms: getRandomElement(symptomsList), // Select a single symptom
//     visitDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Random date within the last 30 days
// }));

// // Insert the generated data into the collection
// async function insertPatients(collection) {
//     try {
//         const result = await collection.insertMany(patients);
//         console.log(`${result.insertedCount} patient records inserted.`);
//     } catch (err) {
//         console.error("Error inserting patients:", err);
//     }
// }

// // Main function to connect to MongoDB and execute the script
// async function main() {
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         console.log("Connected to MongoDB Cloud!");

//         const db = client.db("myDatabase"); // Replace with your database name
//         const collection = db.collection("patients"); // Replace with your collection name

//         // Call the function to insert patients
//         await insertPatients(collection);

//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//     } finally {
//         await client.close();
//         console.log("Connection closed.");
//     }
// }

// main();


async function fetchDataForGraph(collection, pincode) {
    const pipeline = [
        {
            $match: { pincode: pincode } // Filter for the specific pincode
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

    // Convert to a graph-friendly format
    const graphData = {};
    result.forEach(item => {
        const symptom = item._id.symptom;
        const date = item._id.date;
        const count = item.count;

        if (!graphData[symptom]) {
            graphData[symptom] = [];
        }
        graphData[symptom].push({ date, count });
    });

    return graphData;
}

async function main() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB Cloud!");

        const db = client.db("myDatabase"); // Replace with your database name
        const collection = db.collection("patients"); // Replace with your collection name

        const pincode = 110001; // Replace with the pincode you want to analyze
        const graphData = await fetchDataForGraph(collection, pincode);

        console.log("Graph Data:", JSON.stringify(graphData, null, 2));
        // Pass graphData to your frontend or graphing library
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
}

main();

