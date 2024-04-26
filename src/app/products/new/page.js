'use client'
import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export function NewProducts() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
  })
  const router = useRouter()

  const handleChange = (value, field) => {
    setProduct((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { title, description, price } = product
    const data = { title, description, price }
    try {
      await axios.post('/api/products', data)
      router.push('/products')
    } catch (error) {
      console.log('Error', { error })
    }
  }
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h1>New Product</h1>
        <label>Product name</label>
        <input
          type="text"
          placeholder="Product name"
          value={product.title}
          onChange={(e) => handleChange(e.target.value, 'title')}
        />
        <label>Description</label>
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => handleChange(e.target.value, 'description')}
        />
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => handleChange(e.target.value, 'price')}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </Layout>
  )
}

export default NewProducts
