import express, { Request, Response } from "express";
import { retrieveImage, storeImage } from "../controller/store";
const router = express.Router();
router.post("/store",async(req,res)=>{
    try {
		// await storeImage("SampleJPGImage_20mbmb.jpg");
		await retrieveImage("SampleJPGImage_20mbmb.jpg","output.jpg");
		
		console.log("came back image stored ")
		res.json("image stored successfully")

	} catch (error) {
		console.log("came back error ",error)

		res.json("Not able to add")

	}
})