import React from "react";
import "./ProductItem.css";
import { IProducts } from "../ProductList/ProductList";
import Button from "@/app/shared/Button/Button";

const ProductItem = ({
  product,
  className,
  onAdd,
}: {
  product: IProducts;
  className: string;
  onAdd: (product: IProducts) => void;
}) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  return (
    <div className={"product " + className}>
      <div className={"img"} />
      <div className={"title"}>{product.title}</div>
      <div className={"description"}>{product.description}</div>
      <div className={"price"}>
        <span>
          Стоимость: <b>{product.price}</b>
        </span>
      </div>
      <Button className={"add-btn"} onClick={onAddHandler}>
        Добавить в корзину
      </Button>
    </div>
  );
};

export default ProductItem;
