import Product from "../../../models/Products"
import db from "../../../utils/db"

async function handler(req, res) {
  await db.connect()
  const product = await Product.findById(req.query.id)
  await db.disconnect()
  res.send(product)
}

export default handler
