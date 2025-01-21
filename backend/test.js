// import {MongoClient } from 'mongodb'

// // Replace <username>, <password>, and <cluster-url> with your MongoDB Cloud credentials
// const uri = "mongodb+srv://MAHI:Sumitra1@cluster0.mbvk6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// async function fetchDataForAllPincodes(collection) {
//     const pipeline = [
//         {
//             $group: {
//                 _id: {
//                     pincode: "$pincode",
//                     symptom: "$symptoms",
//                     date: { $dateToString: { format: "%Y-%m-%d", date: "$visitDate" } }
//                 },
//                 count: { $sum: 1 } // Count the number of cases for each group
//             }
//         },
//         {
//             $sort: { "_id.pincode": 1, "_id.date": 1 } // Sort by pincode and date
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();

//     // Convert to a graph-friendly format
//     const graphData = {};
//     result.forEach(item => {
//         const pincode = item._id.pincode;
//         const symptom = item._id.symptom;
//         const date = item._id.date;
//         const count = item.count;

//         if (!graphData[pincode]) {
//             graphData[pincode] = {};
//         }

//         if (!graphData[pincode][symptom]) {
//             graphData[pincode][symptom] = [];
//         }

//         graphData[pincode][symptom].push({ date, count });
//     });

//     return graphData;
// }

// async function main() {
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         console.log("Connected to MongoDB Cloud!");

//         const db = client.db("myDatabase"); // Replace with your database name
//         const collection = db.collection("patients"); // Replace with your collection name

//         const graphData = await fetchDataForAllPincodes(collection);

//         console.log("Graph Data for All Pincodes:", JSON.stringify(graphData, null, 2));
//         // Pass `graphData` to your frontend or graphing library
//     } catch (err) {
//         console.error("Error:", err);
//     } finally {
//         await client.close();
//         console.log("Connection closed.");
//     }
// }

// main();



// const { MongoClient } = require('mongodb');
import {MongoClient } from 'mongodb'
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Generate a dataset for pincode 110001
async function generateDataForPincode(collection, pincode) {
    const symptomsList = ['Fever', 'Cough', 'Headache', 'Fatigue', 'Sore throat', 'Shortness of breath', 'Nausea'];
    const numberOfDays = 10; // Number of days to span data
    const patientsPerDay = 5; // Number of patients per day per symptom

    const patients = [];
    const startDate = new Date(); // Today
    startDate.setDate(startDate.getDate() - numberOfDays); // Start date 10 days ago

    for (let i = 0; i < numberOfDays; i++) {
        const visitDate = new Date(startDate);
        visitDate.setDate(startDate.getDate() + i);

        symptomsList.forEach(symptom => {
            for (let j = 0; j < patientsPerDay; j++) {
                patients.push({
                    name: `Patient_${symptom}_${i}_${j}`,
                    age: Math.floor(Math.random() * 60) + 18, // Random age between 18 and 77
                    gender: getRandomElement(['Male', 'Female', 'Other']),
                    pincode: pincode,
                    symptoms: symptom,
                    visitDate: visitDate
                });
            }
        });
    }

    // Insert the generated data into the collection
    try {
        const result = await collection.insertMany(patients);
        console.log(`${result.insertedCount} patient records inserted for pincode ${pincode}.`);
    } catch (err) {
        console.error("Error inserting patients:", err);
    }
}

async function main() {
    const uri = "mongodb+srv://MAHI:Sumitra1@cluster0.mbvk6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB Cloud!");

        const db = client.db("myDatabase"); // Replace with your database name
        const collection = db.collection("patients"); // Replace with your collection name

        const pincode = 110001; // Target pincode
        await generateDataForPincode(collection, pincode);

        console.log("Dataset generation complete.");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
}

main();