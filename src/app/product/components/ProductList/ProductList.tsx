import React, { useState } from "react";
import "./ProductList.css";
import { useCallback, useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "@/contexts /TelegramProvider";

export interface IProducts {
  id: string;
  title: string;
  price: number;
  description: string;
}
const products: IProducts[] = [
  {
    id: "1",
    title: "Джинсы",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: "2",
    title: "Куртка",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "3",
    title: "Джинсы 2",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: "4",
    title: "Куртка 8",
    price: 122,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "5",
    title: "Джинсы 3",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: "6",
    title: "Куртка 7",
    price: 600,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "7",
    title: "Джинсы 4",
    price: 5500,
    description: "Синего цвета, прямые",
  },
  {
    id: "8",
    title: "Куртка 5",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },
];

const getTotalPrice = (items: IProducts[]) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = useState<IProducts[]>([]);
  const { webApp, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    // fetch("http://85.119.146.179:8000/web-data", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    console.log(JSON.stringify(data));
  }, [addedItems, queryId]);

  useEffect(() => {
    webApp?.onEvent("mainButtonClicked", onSendData);
    return () => {
      webApp?.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, webApp]);

  const onAdd = (product: IProducts) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      webApp?.MainButton.hide();
    } else {
      webApp?.MainButton.show();
      webApp?.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div className={"list"}>
      {products.map((item) => (
        <ProductItem
          product={item}
          onAdd={onAdd}
          className={"item"}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default ProductList;
