import Cookies from "js-cookie"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import CheckoutWizard from "../components/CheckoutWizard"
import Layout from "../components/Layout"
import { Store } from "../utils/Store"

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")

  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { shippingAddress, paymentMethod } = cart

  const router = useRouter()
  const submitHandler = (e) => {
    e.preventDefault()
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required")
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod })
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    )

    // router.push("/placeorder")
  }
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping")
    }
    setSelectedPaymentMethod(paymentMethod || "")
  }, [paymentMethod, router, shippingAddress.address])

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-6 mt-8 text-xl font-serif font-bold">
          Payment Method
        </h1>
        {["PayPal", "Stripe", "Cash On Delivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 h-3 w-3 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2 font-mono" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="pt-4 inline-flex">
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-l"
            onClick={() => router.push("/shipping")}
          >
            ❮ Prev
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-r"
            onClick={() => router.push("/placeorder")}
          >
            Next ❯
          </button>
        </div>
      </form>
    </Layout>
  )
}

PaymentScreen.auth = true
