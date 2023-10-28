import React, { useState, useEffect } from "react";
import { Card } from "antd";
import LayoutDefault from "components/layouts/LayoutDefault";
import { Book } from "Models/Book";
import { getBookByName } from "services/book-services";
import { useRouter } from "next/router";

const { Meta } = Card;

const Product: React.FC = () => {
    debugger
  const router = useRouter();
  const [books,setBooks] = useState<Book[]>([]);
  const { id } = router.query;

  useEffect(() => {
    initData();
  }, [id]);

  const initData = () => {
    initBookData();
  };

  const initBookData = async () => {
    if (id === null || id === undefined) return;
    try {
      const idParam = id;
      const rest = await getBookByName(idParam.toString() || "");
      if (rest) {
        let data: Book[] = rest;
        setBooks(data);
      }
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
  };
  
  return (<LayoutDefault>
    <div className="introduce content-container content-miss dk-flex dk-flex-row dk-font-Roboto dk-gap-4 dk-z-10 dk-items-center dk-mb-7 dk-flex-wrap dk-justify-center">
    <h2 className="dk-font-Inter dk-font-bold dk-text-2xl">{`Tìm kiếm sách : "${id}"`}</h2>
      {
        books.length > 0 ?
        books.map((ele,index) => (
            <a key={index} href={`/book-detail/${ele?.BookId}`} className="hover:dk-cursor-pointer hover:dk-scale-[1.2]
            hover:dk-transition-[transform_0.3s_ease] dk-shadow-xl dk-h-fit">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    className="dk-w-[240px] dk-h-[300px]"
                    alt="example"
                    src={ele.Img || ""}
                  />
                }
              >
                <Meta title={ele.Title} description="www.hieulibrary.com" />
              </Card>
            </a>
        )) : null
      }
    </div>
  </LayoutDefault>) 
};

export default Product;
