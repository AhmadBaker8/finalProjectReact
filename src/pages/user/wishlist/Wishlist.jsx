import React from 'react'
import Footer from '../../../components/user/footer/Footer'
import WishlistArea from '../../../components/user/wishlist/WishlistArea'
import PageTitle from '../../../components/user/custom/PageTitle'

export default function Wishlist() {
  return (
    <div>
      <PageTitle title='Wishlist'/>
      <WishlistArea/>
      <Footer/>

    </div>
  )
}
