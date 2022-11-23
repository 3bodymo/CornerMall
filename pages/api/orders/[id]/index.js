import { getSession } from "next-auth/react"
import Order from "../../../../models/Order"
import db from "../../../../utils/db"

export default async function handler(req, res) {
  const session = await getSession({ req })
  await db.connect()
  const order = await Order.findById(req.query.id)
  await db.disconnect()
  if (!session || session.user._id !== order.user.toString()) {
    return res.status(401).send("Unauthorized")
  }
  res.send(order)
}
