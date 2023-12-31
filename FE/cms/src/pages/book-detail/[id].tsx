import React, { useState, useEffect } from "react";
import { Card } from "antd";
import LayoutDefault from "components/layouts/LayoutDefault";
import { Book } from "Models/Book";
import { getBookById } from "services/book-services";
import { useRouter } from "next/router";
import format from "date-fns/format";
import AcceptOrder from "modules/AcceptOrder";
import PopupMessage from "components/PopupMessage";

const { Meta } = Card;

const Product: React.FC = () => {
  const router = useRouter();
  const [book, setBook] = useState<Book>();
  const { id } = router.query;
  const [orderAccept, setOrrderAccept] = useState(false);
  const [dataPopup, setDataPopup] = useState<any>(null);

  useEffect(() => {
    initData();
  }, [id]);

  const initData = () => {
    initBookData();
  };

  const initBookData = async () => {
    if (id === null || id === undefined) return;
    try {
      const idParam = parseInt(id[0]);
      const rest = await getBookById(idParam.toString() || "");
      if (rest) {
        let data: Book = rest;
        setBook(data);
      }
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
  };

  const showPopup = ({
    status,
    message,
    title,
  }: {
    status?: any;
    message?: any;
    title?: any;
  }) => {
    setDataPopup({
      status: status === 200 || status === "ok" ? "success" : "error",
      title: title
        ? title
        : status
        ? "<b>Đăng nhập thành công</b>"
        : "<b>Tài khoản hoặc mật khẩu không đúng</b>",
      message: message || "Vui lòng kiểm tra đường truyền mạng",
      onClose: () => {
        setDataPopup(null);
      },
    });
  };

  return (
    <>
      <LayoutDefault>
        <div className="introduce content-container content-miss dk-flex dk-flex-row dk-font-Roboto dk-gap-4 dk-z-10 dk-items-center dk-mb-7 dk-flex-wrap dk-justify-center">
          {book ? (
            <>
              <h1 className="dk-font-bold dk-text-2xl dk-font-Roboto dk-text-center dk-w-full">
                {book?.Title}
              </h1>
              <div className="info dk-flex dk-justify-center dk-items-start dk-gap-5">
                <img
                  src={book?.Img || ""}
                  className="dk-w-[250px] dk-h-[450px]"
                />
                <div className="dk-flex dk-flex-col dk-justify-between dk-gap-44">
                  <ul className="dk-list-none dk-font-Inter dk-font-medium dk-text-base">
                    <li>Tác giả: {book?.Author}</li>
                    <li>ISBN: {book?.ISBN}</li>
                    <li>Vị trí: {book?.Location}</li>
                    <li>
                      Năm xuất bản:{" "}
                      {format(
                        new Date(book?.PublicYear?.toString() || ""),
                        "dd-MM-yyyy"
                      )}
                    </li>
                    <li>Số lượng: {book?.Quantity}</li>
                  </ul>
                  <button
                    className="dk-bg-orange-500 dk-p-4 dk-font-Inter dk-text-white dk-font-semibold dk-text-sm dk-rounded-xl"
                    onClick={() => {
                      setOrrderAccept(!orderAccept);
                    }}
                  >
                    Thuê sách trực tuyến
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </LayoutDefault>
      {orderAccept ? (
        <AcceptOrder
          bookOrder={book}
          setBook={setBook}
          setOrder={setOrrderAccept}
          showPopup={showPopup}
        />
      ) : null}
      <PopupMessage {...dataPopup} />
    </>
  );
};

export default Product;
