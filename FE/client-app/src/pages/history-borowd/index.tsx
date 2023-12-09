import React from "react";
import { Card } from "antd";
import LayoutDefault from "components/layouts/LayoutDefault";
import HistoryOrderBook from "modules/HistoryOrderBook";

const { Meta } = Card;

const Product: React.FC = () => {
  return (
    <LayoutDefault>
      <HistoryOrderBook/>
    </LayoutDefault>
  );
};

export default Product;
