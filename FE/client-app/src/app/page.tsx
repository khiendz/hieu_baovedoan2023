"use client"
import LayoutDefault from "components/layouts/LayoutDefault";
import {
  QuestionCircleOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import SelectBox from "components/SelectBox";
import { getAllBook, getBookById } from "services/book-services";
import { getAllBookType } from "services/book-type-service";
import { Book } from "Models/Book";
import { BookType } from "Models/BookType";
import { removeAccents } from "utils/charactor-util";

export default function Home() {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [bookTypeList,setBookTypeList] = useState<BookType[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [timeoutId,setTimeoutId] = useState<string>("");
  const [tag,setTag] = useState<string[]>([]);
  const timeoutIdRef = useRef(timeoutId);
  timeoutIdRef.current = timeoutId;
  const [searchingData,setSeachingData] = useState<Book[]>([]);
  const searchInputRef = useRef(searchInput);
  searchInputRef.current = searchInput;

  useEffect(() => {
    const initData = async () => {
      try {
        const rest = await getAllBook();
        if (rest) {
          const dataBook: Book[] = rest.data;
          setBookList(dataBook);
        }
        const bookTypes = await getAllBookType();
        if (bookTypes) {
          const dataBookTypes: BookType[] = bookTypes.data;
          setBookTypeList(dataBookTypes);
        }
      } catch (e) {
        // Xử lý lỗi nếu cần
      }
    };

    initData();
  }, []); 

  useEffect(() => {
    clearTimeout(timeoutIdRef.current);

  if (searchInput != "") {
    clearTimeout(timeoutIdRef.current);
    const timeoutIdOb = setTimeout(() => { 
      searching();
    },1000);
    setTimeoutId(String(timeoutIdOb));
    timeoutIdRef.current = String(timeoutIdOb);
  }

  return () => {
    clearTimeout(timeoutIdRef.current || "");
  }
}, [searchInput]);

const searching = () => {
  if (searchInputRef.current) {
      const dataSearch = bookList.filter(e => {
          const removeAccentOb = removeAccents(e.Title.toUpperCase());
          const removeAccentParam = removeAccents(searchInputRef.current.toUpperCase());
          const result = removeAccentOb.includes(removeAccentParam);
          return result;
        }
      );
      setSeachingData(dataSearch);
      console.log(dataSearch);
  }
}

const handleInput = (value:string) => {
  setSeachingData([]);
  clearTimeout(timeoutIdRef.current);
  setSearchInput(value);
}

const handleSelect = (value: string[]) => {
  setTag(value);
}

  return (
    <LayoutDefault>
            <div className="content-container content-miss dk-flex dk-flex-col dk-font-Roboto dk-gap-4">
        <h1 className="dk-text-[#222] dk-font-bold dk-text-2xl dk-relative dk-z-[2]">
          Thư viện Hiếu cung cấp cho các bạn đầy đủ thông tin về tài liệu online cũng như tài liệu vật lý
        </h1>
        <h2 className="dk-font-medium dk-text-xs dk-text-[#222]">
          Trang tài liệu chính thống và đầy đủ số 1
        </h2>
        <div className="search-form dk-flex dk-flex-col dk-h-fit dk-min-h-[220px] dk-w-fit dk-min-w-[760px] dk-p-4 dk-rounded dk-shadow-sm dk-mt-4 content-miss content-miss-v2 dk-gap-5 dk-relative dk-z-10">
        <div className="field dk-relative">
            <QuestionCircleOutlined className="dk-absolute dk-left-2 dk-top-4 dk-z-[3] dk-text-[#222]" />
            <input
              className="field dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-8 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed"
              placeholder="Bạn muốn tìm cuốn sách nào ?"
              onChange={(e) => handleInput(e.target.value)}
            />
            {/* {
              searchingData?.length > 0 ?
              <div className="search-return dk-absolute dk-min-w-fit dk-max-h-[450px] dk-bg-white dk-rounded-lg dk-p-4 dk-z-40 dk-top-16 dk-shadow-lg dk-w-full dk-overflow-auto scroll-custom">
                <ul className="dk-flex dk-flex-col dk-z-20 dk-relative dk-text-[#222] dk-text-sm dk-font-bold dk-max-h-full dk-overflow-hidden">
                  {
                    searchingData?.map((ele,index) => (
                      <li key={index} className="dk-h-100% dk-p-4 hover:dk-bg-blue-100">
                        <a href={`/book-detail/${ele.BookId}`} className="dk-flex dk-justify-between dk-gap-8">
                          <span className="dk-line-clamp-5">{ele.Title}</span>
                           <img src={ele.Img || ""} className="dk-w-[150px] dk-h-[100px]"/>
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div> : 
              null
            } */}
          </div>
          <div className="select dk-flex dk-flex-row dk-gap-4 dk-relative dk-z-10">
            <SelectBox data={bookTypeList} setTag={(e:string[]) => handleSelect(e)}/>
          </div>
          <div className="dk-w-full dk-flex dk-items-center dk-justify-center dk-relative dk-z-10">
            <a 
              href={`/san-pham/${searchInputRef.current}?tag=${tag.join("+")}`}
              className="dk-p-3 dk-flex dk-gap-4 dk-bg-[#F79321] dk-text-sm dk-font-bold dk-font-Roboto dk-rounded dk-text-[#222]"
              >
              <SecurityScanOutlined />
              <span>Tìm kiếm</span>
            </a>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
