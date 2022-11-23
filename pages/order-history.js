import axios from "axios"
import Link from "next/link"
import React, { useEffect, useReducer } from "react"
import Layout from "../components/Layout"
import { getError } from "../utils/error"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  })

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/orders/history`)
        dispatch({ type: "FETCH_SUCCESS", payload: data })
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) })
      }
    }
    fetchOrders()
  }, [])
  return (
    <Layout title="Order History">
      <h1 className="px-4 my-4 text-2xl font-mono font-semibold">
        Order History
      </h1>
      {loading ? (
        <div className="px-4 font-mono">Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left font-mono">ID</th>
                <th className="p-5 text-left font-mono">DATE</th>
                <th className="p-5 text-left font-mono">TOTAL</th>
                <th className="p-5 text-left font-mono">PAID</th>
                <th className="p-5 text-left font-mono">DELIVERED</th>
                <th className="p-5 text-left font-mono">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-5">{order._id.substring(20, 24)}</td>
                  <td className="p-5">{order.createdAt.substring(0, 10)}</td>
                  <td className="p-5">${order.totalPrice}</td>
                  <td className="p-5">
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : "Not paid"}
                  </td>
                  <td className=" p-5 ">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : "Not delivered"}
                  </td>
                  <td className="p-5">
                    <Link
                      className="font-sans text-blue-800 hover:text-blue-500 underline"
                      href={`/order/${order._id}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}

OrderHistoryScreen.auth = true
