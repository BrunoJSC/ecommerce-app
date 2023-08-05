import React from "react";
import ProductsCard from "./ProductsCard";
import "./ProductsList.css";

const ProductsList = ({ data }) => {
  return (
    <>
      {data?.map((item) => (
        <ProductsCard item={item} key={item.id} />
      ))}
    </>
  );
};

export default ProductsList;
