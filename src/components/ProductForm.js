'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { BounceLoader } from 'react-spinners'
import { ReactSortable } from 'react-sortablejs'
axios.defaults
export default function ProductForm({
  _id,
  title: prevTitle,
  description: prevDescription,
  price: prevPrice,
  images: existingImages,
}) {
  const [product, setProduct] = useState({
    title: prevTitle || '',
    description: prevDescription || '',
    price: prevPrice || 0,
  })
  const [images, setImages] = useState(existingImages || [])
  const [isUploading, setIsUploaing] = useState(false)
  const router = useRouter()

  const handleChange = (value, field) => {
    setProduct((prev) => ({ ...prev, [field]: value }))
  }

  const uploadImages = async (e) => {
    const files = e.target.files
    if (files?.length > 0) {
      setIsUploaing(true)
      const data = new FormData()
      for (const file of files) {
        data.append('file', file)
      }
      const res = await axios.post('/api/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setImages((oldImages) => {
        return [...oldImages, ...res.data]
      })
      setIsUploaing(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { title, description, price } = product
    const data = { title, description, price, images }
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

  function updateImagesOrder(images) {
    setImages(images)
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
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-3">
        <label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center gap-1 text-sm text-gray-500 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-3"
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="h-24">
                <img src={link} alt="photos" className="rounded-md" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 p-1 flex items-center">
            <BounceLoader color="#36d7b7" speedMultiplier={2} />
          </div>
        )}
      </div>
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
