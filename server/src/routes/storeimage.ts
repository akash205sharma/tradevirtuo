import express, { json } from "express";
import { connectDb } from "../config/db";
const fs = require('fs');

import { MongoClient, Binary } from "mongodb";
const router = express.Router();

const uri = process.env.MONGODB_URL || ""; // Change to your MongoDB connection string
const dbName = "images";
const collectionName = "bindata";

const imagePath = "src/ShopEasy.mp4"; // Replace with the correct path to your image


export async function storeImage(inputPath: string) {

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Read image file as a binary buffer
        const imageBuffer = fs.readFileSync(`src/${inputPath}`);

        // Convert binary buffer to Base64
        const base64String = imageBuffer.toString('base64'); // Convert to Base64

        // console.log(Buffer.byteLength(base64String, 'utf-16le')); // Get size in bytes
        // console.log(base64String.length)
        // Save the Base64 string to a text file
        // fs.writeFileSync('image_base64.txt', base64String);

        // console.log('Image converted to Base64 and saved as image_base64.txt');




        // // Convert back from Base64 to binary
        // const restoredBuffer = Buffer.from(base64String, "base64");
        // // Write the restored image back to a file
        // fs.writeFileSync("output.jpg", restoredBuffer);



        // Create BinData object
        const binData = new Binary(Buffer.from(base64String, "base64"), 0); // 0 is the default subtype

        console.log("going to add image")
        // Insert into MongoDB
        // const result = await collection.insertOne({ filename: "ram.jpg" });
        const result = await collection.insertOne({ filename: inputPath, data: binData });
        // console.log("Image stored with ID:", result.insertedId);

    } catch (error) {
        console.error("Error storing image:", error);
    } finally {
        await client.close();
    }
}

export async function retrieveImage(inputPath: string, outputPath: string) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Retrieve the stored image
        const imageDoc = await collection.findOne({ filename: inputPath });

        if (imageDoc) {
            // Convert BinData back to a Buffer
            const imageBuffer = Buffer.from(imageDoc.data.buffer);

            // Save the image file
            fs.writeFileSync(outputPath, imageBuffer);
            console.log("Image retrieved and saved as:", outputPath);
        } else {
            console.log("Image not found in database.");
        }
    } catch (error) {
        console.error("Error retrieving image:", error);
    } finally {
        await client.close();
    }
}

// Run functions
// storeImage().then(() => {
//     setTimeout(() => retrieveImage("output.jpg"), 2000); // Retrieve after storing
// });
