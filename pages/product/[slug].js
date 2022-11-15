import { useRouter } from "next/router"
import ErrorPage from "next/error"
import React, { useContext } from "react"
import Layout from "../../components/Layout"
import data from "../../utils/data"
import Link from "next/link"
import Image from "next/image"
import { Store } from "../../utils/Store"

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store)

  const { query } = useRouter()
  const { slug } = query
  const product = data.products.find((x) => x.slug === slug)
  if (!product) {
    return <ErrorPage statusCode={404} />
  }

  function addToCartHandler() {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product.countInStock < quantity) {
      alert("Sorry, the product is out of stock!")
      return
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: quantity },
    })
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/product">
          <button
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {"❮ Back to products"}
          </button>
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
            className="my-2 card"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg mt-2">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product.countInStock > 0 ? "In stock" : "Out of stock"}
              </div>
            </div>
            {product.countInStock > 0 ? (
              <button
                onClick={addToCartHandler}
                className="mt-4 w-full bg-blue-500 hover:bg-white hover:text-blue-700 font-semibold text-white py-2 px-4 border hover:border-blue-700 border-transparent rounded"
                type="button"
              >
                Add to cart
              </button>
            ) : (
              <button
                className="mt-4 w-full bg-red-700 text-white py-2 px-4 border border-transparent rounded"
                type="button"
                disabled
              >
                Out of stock
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
