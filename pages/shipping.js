import React, { useContext, useEffect } from "react"
import Layout from "../components/Layout"
import CheckoutWizard from "../components/CheckoutWizard"
import { useForm } from "react-hook-form"
import { Store } from "../utils/Store"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm()

  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { shippingAddress } = cart
  const router = useRouter()

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName)
    setValue("address", shippingAddress.address)
    setValue("country", shippingAddress.country)
    setValue("city", shippingAddress.city)
    setValue("postalCode", shippingAddress.postalCode)
    setValue("mobileNumber", shippingAddress.mobileNumber)
  }, [setValue, shippingAddress])

  function submitHandler({
    fullName,
    address,
    country,
    city,
    postalCode,
    mobileNumber,
  }) {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, country, city, postalCode, mobileNumber },
    })
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          country,
          city,
          postalCode,
          mobileNumber,
        },
      })
    )
    router.push("/payment")
    //TODO: fix the logic of this part
    // console.log(document.referrer)
    // if (document.referrer.includes("placeorder")) {
    //   router.push("/placeorder")
    // } else {
    //   router.push("/payment")
    // }
  }
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-6 mt-8 text-xl font-serif font-bold">
          Shipping Address
        </h1>
        <div className="mb-4">
          <label htmlFor="fullName" className="font-mono">
            Full Name
          </label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register("fullName", {
              required: "Please enter your full name",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="font-mono">
            Address
          </label>
          <input
            className="w-full"
            id="address"
            {...register("address", {
              required: "Please enter your address",
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="font-mono">
            Country
          </label>
          <input
            className="w-full"
            id="country"
            {...register("country", {
              required: "Please enter your country",
            })}
          />
          {errors.country && (
            <div className="text-red-500 ">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="font-mono">
            City
          </label>
          <input
            className="w-full"
            id="city"
            {...register("city", {
              required: "Please enter your city",
            })}
          />
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode" className="font-mono">
            Postal Code
          </label>
          <input
            className="w-full"
            id="postalCode"
            {...register("postalCode", {
              required: "Please enter your postal code",
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500 ">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="mobileNumber" className="font-mono">
            Mobile Number
          </label>
          <input
            className="w-full"
            id="mobileNumber"
            {...register("mobileNumber", {
              required: "Please enter your mobile number",
            })}
          />
          {errors.mobileNumber && (
            <div className="text-red-500 ">{errors.mobileNumber.message}</div>
          )}
        </div>

        <button className="relative inline-flex items-center justify-center p-0.5 mb-8 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="font-bold font-serif relative px-7 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Submit
          </span>
        </button>
      </form>
    </Layout>
  )
}

ShippingScreen.auth = true
