/* eslint-disable no-unused-vars */
import Head from "next/head"
import Link from "next/link"
import { useContext } from "react"
import { Store } from "../utils/Store"
import Footer from "./Footer"

export default function Layout(props) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  return (
    <>
      <Head>
        <title>{props.title ? props.title : "CornerMall"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-20 items-center px-4 py-8 justify-between shadow-md">
            <div className="flex items-center">
              <div className="">
                <Link href="/">
                  <img src="/favicon.ico" className="pr-4" />
                </Link>
              </div>
              <div>
                <Link
                  href="/"
                  className="text-xl font-bold text-blue-700 hover:text-blue-500"
                >
                  CornerMall
                </Link>
              </div>
            </div>
            <div>
              {/* <Link href="/cart" className="p-2 text-lg">
                Cart
                {cart.cartItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Link> */}
              <Link href="/cart" className="p-4">
                <div className="font-sans inline-block lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                  <div role="button" className="relative flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>

                    <span className="absolute left-4 bottom-4 rounded-full bg-blue-600 w-4 h-4 text-white text-xs leading-tight text-center">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/login"
                className="p-2 text-lg font-bold hover:text-gray-600"
              >
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{props.children}</main>
        <footer className="flex h-16 justify-center items-center shadow-inner">
          Copyright © 2022 CornerMall
        </footer>
        {/* <Footer /> */}
      </div>
    </>
  )
}
