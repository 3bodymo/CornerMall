import { getSession } from "next-auth/react";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).send("Method Not Allowed");
  }
  const session = getSession({ req });
  if (!session) {
    return res.status(401).send("login is required");
  }
  await db.connect();
  const order = await Order.findById(req.query.id);
  // if (session.user._id !== order.user.toString()) {
  //   return res.status(401).send("Unauthorized");
  // }
  if (order) {
    if (order.isPaid) {
      return res
        .status(400)
        .send({ message: "Error: The order is already paid!" });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: "Order is paid successfully", order: paidOrder });
  } else {
    await db.disconnect();
    return res.status(404).send({ message: "Error: Order not found" });
  }
}
