import React from 'react'
import Footer from '../../../components/user/footer/Footer'
import Partner from '../../../components/user/custom/Partner'
import Collection from '../../../components/user/custom/Collection'
import LatestNews from '../../../components/user/custom/LatestNews'
import Banner from '../../../components/user/Banner/Banner'
import OverView from '../../../components/user/Banner/OverView'
import Support from '../../../components/user/custom/Support'
import BestSellers from '../../../components/user/custom/BestSellers'
import SpecialOffer from '../../../components/user/custom/SpecialOffer'

export default function Home() {
  return (
    <>
      <Banner/>
      <OverView/>
      <Support/>
      <SpecialOffer/>
      <Collection/>
      <BestSellers/>
      <LatestNews/>
      <Partner/>
      <Footer/>
    </>
  )
}
