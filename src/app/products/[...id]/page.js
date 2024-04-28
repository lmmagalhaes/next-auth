'use client'

import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductForm from '@/components/ProductForm'

export default function EditProductPage({ params }) {
  const [productInfo, setProductInfo] = useState(null)
  const { id } = params
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/api/products?id=' + id[1]).then((res) => {
      setProductInfo(res.data)
    })
  }, [id])
  return (
    <Layout>
      <h1>Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  )
}
