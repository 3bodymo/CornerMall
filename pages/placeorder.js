import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/Layout"
import CheckoutWizard from "../components/CheckoutWizard"
import Link from "next/link"
import { Store } from "../utils/Store"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import { getError } from "../utils/error"

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { cartItems, shippingAddress, paymentMethod } = cart

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  )
  const shippingPrice = itemsPrice > 500 ? 0 : 20
  const taxPrice = round2(itemsPrice * 0.14)
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

  const router = useRouter()
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment")
    }
  }, [paymentMethod, router])

  const [loading, setLoading] = useState(false)

  async function placeOrderHandler() {
    try {
      setLoading(true)
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
      setLoading(false)
      dispatch({ type: "CART_CLEAR_ITEMS" })
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      )
      router.push(`/order/${data._id}`)
    } catch (err) {
      setLoading(false)
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="Place Order">
      {cartItems.length === 0 ? (
        <div className="text-xl p-4 font-mono">
          Cart is empty. {""}
          <Link className="font-bold" href="/product">
            Go for shopping?
          </Link>
        </div>
      ) : (
        <>
          <CheckoutWizard activeStep={3} />
          <h1 className="px-4 mb-4 mt-8 text-2xl font-serif font-bold">
            Place Order
          </h1>
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <div className="card p-5">
                <h2 className="pb-4 text-base font-serif font-semibold">
                  Shipping Address
                </h2>
                <div className="font-mono">
                  {shippingAddress.fullName}, {shippingAddress.address},{" "}
                  {shippingAddress.country}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}
                  <div className="py-2">{shippingAddress.mobileNumber}</div>
                </div>
                <div>
                  <Link
                    href="/shipping"
                    className="font-medium font-sans text-blue-800 hover:text-blue-500 underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <div className="card p-5">
                <h2 className="pb-2 text-base font-serif font-semibold">
                  Payment Method
                </h2>
                <div className="py-2 font-mono">{paymentMethod}</div>
                <div className="py-2">
                  <Link
                    href="/payment"
                    className="font-medium font-sans text-blue-800 hover:text-blue-500 underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <div className="card overflow-x-auto p-5">
                <h2 className="pb-2 text-base font-serif font-semibold">
                  Order Items{"  "}
                  <Link
                    href="/cart"
                    className="font-medium font-sans text-blue-800 hover:text-blue-500 underline"
                  >
                    Edit
                  </Link>
                </h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-2 text-left font-mono">Item</th>
                      <th className="p-5 text-right font-mono">Quantity</th>
                      <th className="p-5 text-right font-mono">Price</th>
                      <th className="p-5 text-right font-mono">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td>
                          <Link
                            href={`/product/${item.slug}`}
                            className="flex items-center"
                          >
                            <Image
                              className="rounded-lg"
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>{" "}
                            &nbsp;
                            <span className="text-sm md:text-base">
                              {item.name}
                            </span>
                          </Link>
                        </td>
                        <td className="p-5 text-right">{item.quantity}</td>
                        <td className="p-5 text-right">${item.price}</td>
                        <td className="p-5 text-right">
                          ${item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-4 text-lg font-serif font-semibold">
                Order Summary
              </h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between font-mono">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between font-mono">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between font-mono">
                    <div>Shipping</div>
                    <div>
                      {shippingPrice === 0 ? "Free" : `$${shippingPrice}`}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between font-mono font-semibold">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="w-full relative inline-flex items-center justify-center p-0.5 mt-3 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  >
                    <span className="font-mono relative px-6 py-2 text-xl font-bold transition-all ease-in duration-75 from-cyan-500 to-blue-500 rounded-md group-hover:bg-opacity-0">
                      {loading ? "Loading..." : "Place Order"}
                    </span>
                  </button>
                  {/* <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="primary-button w-full"
                >
                  {loading ? "Loading..." : "Place Order"}
                </button> */}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

PlaceOrderScreen.auth = true
