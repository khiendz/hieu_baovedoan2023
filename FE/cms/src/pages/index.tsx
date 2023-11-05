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
import { format } from "date-fns";
import Manager from "modules/Manager";

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
          Thống kê các loại thông tin về thư viện đến ngày {format(new Date(),"dd-MM-yyyy")}
        </h1>
        <h2 className="dk-font-medium dk-text-xs dk-text-[#222]">
          Trang tài liệu chính thống và đầy đủ số 1
        </h2>
        <div className="search-form dk-flex dk-flex-col dk-h-fit dk-min-h-[220px] dk-w-fit dk-min-w-[760px] dk-p-4 dk-rounded dk-shadow-sm dk-mt-4 content-miss content-miss-v2 dk-gap-5 dk-relative dk-z-10">
            <Manager/>
        </div>
      </div>
    </LayoutDefault>
  );
}
