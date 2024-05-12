'use client'

import Layout from '../../../../components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductForm from '@/components/ProductForm'
import { useRouter } from 'next/navigation'

export default function DeleteProductPage({ params }) {
  const [productInfo, setProductInfo] = useState(null)
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get(`/api/products?id=${id}`).then((res) => {
      setProductInfo(res.data)
    })
  }, [id])

  function goBack() {
    router.back()
  }

  async function deleteProduct() {
    await axios.delete(`/api/products?id=${id}`)
    router.back()
  }

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete &nbsp; "{productInfo?.title}" ?{' '}
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
      {/* {productInfo && <ProductForm {...productInfo} />} */}
    </Layout>
  )
}
