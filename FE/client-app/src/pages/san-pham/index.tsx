import React, { useState, useEffect } from "react";
import { Card } from "antd";
import LayoutDefault from "components/layouts/LayoutDefault";
import { Book } from "Models/Book";
import { getAllBook } from "services/book-services";
import { JoinFileCDN } from "services";

const { Meta } = Card;

const Product: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    initBookData();
  };

  const initBookData = async () => {
    try {
      const rest = await getAllBook();
      if (rest) {
        let data: Book[] = rest.data;
        setBooks(data);
      }
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
  };

  return (
    <LayoutDefault>
      <div className="introduce content-container content-miss dk-flex dk-flex-row dk-font-Roboto dk-z-10 dk-items-center dk-mb-7 dk-flex-wrap dk-justify-center card-listing dk-gap-12 dk-mt-8 dk-relative">
        {books.length > 0
          ? books.map((ele, index) => (
              <a key={index} href={`/book-detail/${ele?.BookId}`} className="hover:dk-cursor-pointer hover:dk-scale-[1.2]
              hover:dk-transition-[transform_0.3s_ease] dk-shadow-xl dk-h-fit">
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      className="dk-w-[240px] dk-h-[300px]"
                      alt="example"
                      src={JoinFileCDN(ele.Img || "")}
                    />
                  }
                >
                  <Meta title={ele.Title} description="www.hieulibrary.com" />
                </Card>
              </a>
            ))
          : null}
      </div>
    </LayoutDefault>
  );
};

export default Product;
