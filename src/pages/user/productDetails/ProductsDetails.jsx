import React from 'react'
import PageTitle from '../../../components/user/custom/PageTitle'
import Support from '../../../components/user/custom/Support'
import Footer from '../../../components/user/footer/Footer'
import { useParams } from 'react-router-dom'
import ProductsDetailsArea from '../../../components/user/cart/ProductsDetailsArea'

export default function ProductsDetails() {

    const {id} = useParams();
  return (
    <>
    <PageTitle title={"Product Details"}/>
    <ProductsDetailsArea id={id}/>
    <Support/>
    <Footer/>
      
    </>
  )
}
