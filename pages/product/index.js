import Link from "next/link"
import Layout from "../../components/Layout"
import ProductItem from "../../components/ProductItem"
import SliderComponent from "../../components/SliderComponent"
import Carousel from "../../components/Carousel"
import db from "../../utils/db"
import Product from "../../models/Products"

export default function Home({ products }) {
  return (
    <Layout title="Home Page">
      <div>
        {/* <SliderComponent /> */}
        <Carousel />
      </div>

      <div className="pb-5 mb-8 shadow-md">
        <h1
          id="clothes"
          className="text-center pt-8 font-bold text-3xl text-black font-mono"
        >
          <Link href="/product#clothes">Clothes</Link>
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) =>
          product.category === "clothes" ? (
            <ProductItem product={product} key={product.slug} />
          ) : null
        )}
      </div>

      <div className="pb-5 mb-8 shadow-md">
        <h1
          id="laptops"
          className="text-center pt-8 font-bold text-3xl text-black font-mono"
        >
          <Link href="/product#laptops">Laptops</Link>
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) =>
          product.category === "laptops" ? (
            <ProductItem product={product} key={product.slug} />
          ) : null
        )}
      </div>

      <div className="pb-5 mb-8 shadow-md">
        <h1
          id="mobiles"
          className="text-center pt-8 font-bold text-3xl text-black font-mono"
        >
          <Link href="/product#mobiles">Mobiles</Link>
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) =>
          product.category === "mobiles" ? (
            <ProductItem product={product} key={product.slug} />
          ) : null
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find().lean()
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  }
}
