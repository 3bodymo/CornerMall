import bcryptjs from "bcryptjs"
import User from "../../../models/User"
import db from "../../../utils/db"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed")
  }
  const { name, email, password } = req.body
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 8
  ) {
    res.status(422).json({
      message: "Validation error",
    })
    return
  }

  await db.connect()
  const existingUser = await User.findOne({ email: email })
  if (existingUser) {
    res.status(422).json({ message: "User already exist!" })
    await db.disconnect()
    return
  }

  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  })
  const user = await newUser.save()
  await db.disconnect()
  res.status(201).send({
    message: "User is created successfully",
    // _id: user._id,
    name: user.name,
    email: user.email,
    // isAdmin: user.isAdmin,
  })
}
