import React from "react";
import PageTitle from "../../../components/user/custom/PageTitle";
import Partner from "../../../components/user/custom/Partner";
import Footer from "../../../components/user/footer/Footer";
import ShopArea from "../../../components/user/shop/ShopArea";
import Loader from "../../../components/user/custom/Loader";
export default function Shop() {

  return (
    <>
      <PageTitle title={"Shop"} />
      <ShopArea />
      <Partner />
      <Footer />
    </>
  );
}
