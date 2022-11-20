import Product from "../../models/Products"
import User from "../../models/User"
import data from "../../utils/data"
import db from "../../utils/db"

async function handler(req, res) {
  await db.connect()
  await User.deleteMany()
  await User.insertMany(data.users)
  await Product.deleteMany()
  await Product.insertMany(data.products)
  await db.disconnect()
  res.send({ message: "Seeded Successfully!" })
}

export default handler
