import Link from "next/link"
import React, { useEffect } from "react"
import Layout from "../components/Layout"
import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react"
import { getError } from "../utils/error"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import axios from "axios"

export default function LoginScreen() {
  const { data: session } = useSession()

  const router = useRouter()
  const { redirect } = router.query
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/product")
    }
  }, [router, session, redirect])

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm()

  async function submitHandler({ name, email, password }) {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      })
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="Register">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-6 mt-8 text-xl font-serif font-bold">
          Create Account
        </h1>
        <div className="mb-4">
          <label htmlFor="name" className="font-mono">
            Name
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Please enter your name",
            })}
            className="w-full"
            id="name"
            autoFocus
          ></input>
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="font-mono">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-p-.]+$/i,
                message: "Please enter a valid email",
              },
            })}
            className="w-full"
            id="email"
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="font-mono">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters",
              },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="font-mono">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === getValues("password"),
            })}
            className="w-full"
            id="confirmPassword"
            autoFocus
          ></input>
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 ">Password does not match</div>
            )}
        </div>

        <div className="mb-4">
          {/* <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="font-serif relative text-base font-medium px-7 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Register
            </span>
          </button> */}
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Register
          </button>
        </div>
      </form>
    </Layout>
  )
}
