import jwt from "jsonwebtoken";
import express, { json } from "express";
import { signupInput } from "../middleware/validate";
import { User } from "../models/schema";
import { connectDb } from "../config/db";
const SECRET = process.env.JWT_SECRET
const router = express.Router();


router.post("/signup", async (req, res) => {

	let parsedInput = signupInput.safeParse(req.body)
	if (!parsedInput.success) {
		return res.status(403).json({
			message: "zod is not allowing"
		});
	}
	const user = parsedInput.data


	try {
		await connectDb()

		const prevUser = await User.findOne({
			$or: [
				{ 'username': user.username },
				{ 'email': user.email }
			]
		})

		if (prevUser) return res.status(403).json({ message: "user exist Already " });

		const newUser = new User(user);
		await newUser.save();
		// await User.create(user);

		const token = jwt.sign({ id: newUser._id }, SECRET!, { expiresIn: '1h' });

		res.cookie("token", token, {
			httpOnly: true,        // 🔒 Prevents JavaScript access (XSS protection)
			secure: true,          // 🔒 Only send over HTTPS (Set to false in dev)
			sameSite: "strict",    // 🛑 Prevent CSRF attacks
		});

		const userData: { status:string; email: string; name: string; username: string } = {
			status:"logged",
			email: newUser.email,
			name: newUser.name!,
			username: newUser.username,
		};
		res.status(200).json({ message: "user created successfully", userData });

	} catch (error) {
		console.log(error)
		res.status(404).json({ message: "not able to create account" });
	}
})


router.post("/login", async (req, res) => {

	try {
		const { username, password } = req.body;
		await connectDb()

		const prevUser = await User.findOne({ username, password });

		if (!prevUser) return res.status(403).json({ message: "User does not exist " });


		const token = jwt.sign({ id: prevUser._id }, SECRET!, { expiresIn: '1h' });

		res.cookie("token", token, {
			httpOnly: true,        // 🔒 Prevents JavaScript access (XSS protection)
			secure: true,          // 🔒 Only send over HTTPS (Set to false in dev)
			sameSite: "strict",    // 🛑 Prevent CSRF attacks
		});

		const userData: { status:string, email: string; name: string; username: string } = {
			status:"logged",
			email: prevUser.email,
			name: prevUser.name!,
			username: prevUser.username,
		};

		res.json({ message: "User Logged in successfully", userData });

	} catch (error) {
		console.log(error)
		res.status(404).json({ message: "not able to login" });
	}
})

export default router;

