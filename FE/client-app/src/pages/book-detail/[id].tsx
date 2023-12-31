import React, { useState, useEffect } from "react";
import { Card } from "antd";
import LayoutDefault from "components/layouts/LayoutDefault";
import { Book } from "Models/Book";
import { getBookById } from "services/book-services";
import { useRouter } from "next/router";
import format from "date-fns/format";
import AcceptOrder from "modules/AcceptOrder";
import PopupMessage from "components/PopupMessage";
import { BookType } from "Models/BookType";
import { JoinFileCDN, getAllBookType, userService } from "services";
import { Book_BookType } from "Models/Book_BookType";
import { useAppContext } from "hook/use-app-context";

const { Meta } = Card;

const Product: React.FC = () => {
  const router = useRouter();
  const [book, setBook] = useState<Book>(new Book());
  const [bookTypes, setBookType] = useState([]);
  const { id } = router.query;
  const [orderAccept, setOrrderAccept] = useState(false);
  const [dataPopup, setDataPopup] = useState<any>(null);
  const { data: openRegister, setData: setOpenRegister } =
    useAppContext("open-register-form");

  useEffect(() => {
    initData();
    initBookType();
  }, [id]);

  const initData = () => {
    initBookData();
  };

  const initBookType = async () => {
    try {
      const result = await getAllBookType();
      if (result) {
        setBookType(result.data);
      }
    } catch (e) {}
  };

  const initBookData = async () => {
    if (id === null || id === undefined) return;
    try {
      const idParam = parseInt(id.toString());
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
              <div className="info dk-flex dk-justify-center dk-items-start dk-gap-5 dk-w-[500px]">
                <img
                  src={JoinFileCDN(book?.Img || "")}
                  className="dk-w-[250px] dk-h-[450px] dk-rounded-3xl"
                />
                <div className="dk-flex dk-flex-col dk-justify-between dk-gap-5">
                  <ul className="dk-list-none dk-font-Inter dk-font-medium dk-text-base">
                    <li>
                      <span>Tác giả: </span>
                      {book?.Author?.Name}
                    </li>
                    <li>
                      Thể loại:{" "}
                      {bookTypes
                        .filter((ob: BookType) =>
                          book.Book_BookType?.find(
                            (el: Book_BookType) =>
                              el.BookTypeId == ob.BookTypeId
                          )
                        )
                        .map((ob: BookType) => ob?.Name)
                        ?.join(", ")}
                    </li>
                    <li>ISBN: {book?.ISBN}</li>
                    <li>Vị trí: {book?.Location}</li>
                    <li>
                      Năm xuất bản:{" "}
                      {format(
                        book?.PublicYear
                          ? new Date(book?.PublicYear?.toString() || "")
                          : new Date(),
                        "dd-MM-yyyy"
                      )}
                    </li>
                    <li>Số lượng: {book?.Quantity}</li>
                    <li>Mã sách: {book?.Barcode}</li>
                    <li>Nhà xuất bản: {book?.Publisher?.Name}</li>
                  </ul>
                  {book.Description ? (
                    <div
                      className="schedule dk-flex dk-flex-col dk-gap-4 dk-bg-white dk-p-4 dk-rounded-lg"
                      dangerouslySetInnerHTML={{
                        __html: book.Description ? book.Description : "",
                      }}
                    ></div>
                  ) : null}

                  <button
                    className="dk-bg-orange-500 dk-p-4 dk-font-Inter dk-text-white dk-font-semibold dk-text-sm dk-rounded-xl"
                    onClick={() => {
                      if (!userService.userValue) {
                        showPopup({
                          status: 401,
                          message:
                            "Nếu chưa có tài khoản, hãy tạo account để sử dụng chức năng thuê sách",
                          title: "Đăng nhập để thuê sách",
                        });
                        setOpenRegister(true);
                        return;
                      }

                      if (book.Quantity == 0) {
                        showPopup({
                          status: 401,
                          message:
                            "Số lượng sách trong thư viện đã được mượn hết",
                          title: "Vui lòng chờ thư viện cập nhật sách",
                        });
                        return;
                      }

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
