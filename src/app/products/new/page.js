'use client'
import React, { useState } from 'react'
import ProductForm from '../../../components/ProductForm'
import Layout from '../../../components/Layout'

export function NewProducts() {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  )
}

export default NewProducts
