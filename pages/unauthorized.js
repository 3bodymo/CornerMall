import { useRouter } from "next/router"
import React from "react"
import Layout from "../components/Layout"

export default function Unauthorized() {
  const router = useRouter()
  const { message } = router.query

  return (
    <Layout title="Unauthorized">
      <h1 className="text-4xl text-center pt-8 font-mono">Access Denied</h1>
      {message && (
        <div className="pt-2 text-red-500 text-center">{message}</div>
      )}
    </Layout>
  )
}
