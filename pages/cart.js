import Image from "next/image"
import Link from "next/link"
import React, { useContext } from "react"
import { XCircleIcon } from "@heroicons/react/outline"
import Layout from "../components/Layout"
import { Store } from "../utils/Store"
import dynamic from "next/dynamic"

function CartScreen() {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  function removeItemHandler(item) {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item })
  }

  function updateCartHandler(item, qty) {
    const quantity = Number(qty)
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } })
  }

  return (
    <Layout title="Cart">
      {/* <h1 className="mb-4 text-xl font-bold">Shopping Cart</h1> */}
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. {""}
          <Link className="font-medium" href="/product">
            Go for shopping?
          </Link>
        </div>
      ) : (
        <>
          <Link href="/product">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {"❮ Back to products"}
            </button>
          </Link>
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.slug} className="border-b">
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
                          &nbsp;&nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-7 text-right">
                        <select
                          value={item.quantity}
                          onChange={(x) =>
                            updateCartHandler(item, x.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-6 text-right">${item.price}</td>
                      <td className="p-7 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <XCircleIcon className="h-5 w-5"></XCircleIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <ul>
                {/* <div className="pb-3 text-lg">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                    ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </div> */}
                <div className="card p-7">
                  <div className="mb-2 flex justify-between">
                    <div className="font-mono">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                      ):
                    </div>
                    <div className="font-mono">
                      ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </div>
                  </div>

                  <Link href="/login?redirect=/shipping">
                    <button className="w-full relative inline-flex items-center justify-center p-0.5 mt-3 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                      <span className="font-mono relative px-6 py-2 text-xl font-bold transition-all ease-in duration-75 from-cyan-500 to-blue-500 rounded-md group-hover:bg-opacity-0">
                        Check out
                      </span>
                    </button>
                  </Link>
                </div>

                <li>
                  {/* <Link href="/shipping">
                    <button className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                      <span className="relative px-6 py-2 text-lg font-bold transition-all ease-in duration-75 from-cyan-500 to-blue-500 rounded-md group-hover:bg-opacity-0">
                        Check out
                      </span>
                    </button>
                  </Link> */}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })
