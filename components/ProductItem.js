/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import React, { useContext } from "react"
import { Store } from "../utils/Store"

export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store)

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
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow w-fit h-fit"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="mb-2 font-medium">${product.price}</p>
        {product.countInStock > 0 ? (
          <button
            onClick={addToCartHandler}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            type="button"
          >
            Add to cart
          </button>
        ) : (
          <button
            className="bg-transparent text-red-700 font-semibold py-2 px-4 border border-red-700 rounded"
            type="button"
            disabled
          >
            Out of stock
          </button>
        )}
      </div>
    </div>
  )
}
