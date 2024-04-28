'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
axios.defaults
export default function ProductForm({
  _id,
  title: prevTitle,
  description: prevDescription,
  price: prevPrice,
}) {
  const [product, setProduct] = useState({
    title: prevTitle || '',
    description: prevDescription || '',
    price: prevPrice || 0,
  })
  const router = useRouter()

  const handleChange = (value, field) => {
    setProduct((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { title, description, price } = product
    const data = { title, description, price }
    if (_id) {
      // update product
      try {
        await axios.put('/api/products', { ...data, _id })
        router.push('/products')
      } catch (error) {
        console.log('Error', { error })
      }
    } else {
      // create product
      try {
        await axios.post('/api/products', data)
        router.push('/products')
      } catch (error) {
        console.log('Error', { error })
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
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
  )
}
