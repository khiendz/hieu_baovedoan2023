import { BorrowedBook } from "Models/BorrowedBook";
import { useAppContext } from "hook/use-app-context";
import { useEffect } from "react";
import { getBorrowedBookByPhone } from "services";
import format from "date-fns/format";
import { Button } from "antd";
import { AddPayment } from "services/payment-service";
import { Payment } from "Models/Payment";
import { OrderParams } from "Models/OrderParams";
import { removeAccents } from "utils/charactor-util";
import { generateUID } from "utils/uid";

export default function HistoryOrderBook() {
  const { data: borrowedBooks, setData: setBorrowedBooks } =
    useAppContext("borrowBook");
  const { data: user, setData: setUser } = useAppContext("user");

  useEffect(() => {
    if (user) initBorrowBook();
  }, [user]);

  const initBorrowBook = async () => {
    try {
      if (!user) return;
      const result = await getBorrowedBookByPhone(user.Phone);
      if (result && result.status == 200) {
        setBorrowedBooks(result.data?.reverse());
      }
    } catch {}
  };

  const handleAddPayment = async (values: any) => {
    const paymentOrder = new OrderParams();
    paymentOrder.amount = values?.Amount || 0;
    paymentOrder.cancelUrl = window.location.href;
    paymentOrder.returnUrl = window.location.href;
    paymentOrder.description = `${removeAccents(user?.LastName)} payment`;
    const orderCode = generateUID();
    paymentOrder.orderCode = orderCode;

    const paymentCreate = new Payment();
    paymentCreate.Amount = values?.Amount || 0;
    paymentCreate.PaymentDate = new Date();
    paymentCreate.StatePayments = 1;

    const addPaymentResult = await AddPayment(paymentCreate);

    if (addPaymentResult && addPaymentResult.status == 200) {

    }
  }

  return (
    <div className="dk-flex dk-flex-col dk-gap-2 content-container content-miss dk-font-Roboto dk-z-10 dk-mb-7">
      {borrowedBooks
        ? borrowedBooks?.map((ele: BorrowedBook, index: string) => (
            <div
              key={index}
              className="dk-font-Roboto dk-text-sm dk-min-w-[500px] dk-w-full dk-p-4 dk-bg-white dk-rounded-xl dk-h-fit"
            >
              <div>
                <span className="dk-font-bold">Người thuê: </span>
                {ele.Member.Name}
              </div>
              <div>
                <span className="dk-font-bold">Mã thuê sách: </span>
                {ele.TransactionId}
              </div>
              <div>
                <span className="dk-font-bold">Mã sách: </span>
                {ele.BookId}
              </div>
              <div>
                <span className="dk-font-bold">Tên sách: </span>
                {ele.Book.Title}
              </div>
              <div>
                <span className="dk-font-bold">Ngày thuê: </span>
                {`${format(
                  ele.BorrowDate ? new Date(ele.BorrowDate) : new Date(),
                  "dd-MM-yyyy"
                )}`}
              </div>
              <div>
                <span className="dk-font-bold">Hạn trả thuê: </span>
                {`${format(
                  ele.DueDate ? new Date(ele.DueDate) : new Date(),
                  "dd-MM-yyyy"
                )}`}
              </div>
              <div>
                <span className="dk-font-bold">Ngày trả: </span>
                {ele.ReturnDate ? (
                  `${format(new Date(ele.ReturnDate), "dd-MM-yyyy")}`
                ) : (
                  <span className="dk-p-1 dk-bg-red-500 dk-font-semibold dk-text-white dk-rounded">
                    Chưa trả
                  </span>
                )}
              </div>
              {ele.DueDate &&
              new Date(ele.ReturnDate || new Date()).getTime() >
                new Date(ele.DueDate).getTime() &&
              Math.floor(
                (new Date(ele.ReturnDate || new Date()).getTime() -
                  new Date(ele.DueDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              ) >= 1 ? (
                <div className="dk-mt-2 dk-flex dk-gap-3">
                  <span className="dk-font-bold">
                    Bạn đã trễ hạn:
                    {
                      <span className="dk-p-1 dk-bg-red-500 dk-font-semibold dk-text-white dk-rounded">
                        {Math.floor(
                          (new Date(ele.ReturnDate || new Date()).getTime() -
                            new Date(ele.DueDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        Ngày
                      </span>
                    }
                  </span>{" "}
                  -
                  <span className="dk-font-bold">
                    Tổng phí trễ hạn:{" "}
                    {
                      <span className="dk-p-1 dk-bg-red-500 dk-font-semibold dk-text-white dk-rounded">
                        {(
                          ele.Book.LateFeeType.FeeAmount *
                          Math.floor(
                            (new Date().getTime() -
                              new Date(ele.DueDate).getTime()) /
                              (1000 * 60 * 60 * 24) /
                              ele.Book.LateFeeType.DateCount
                          )
                        ).toLocaleString("vi-VN")}{" "}
                        VND
                      </span>
                    }
                  </span>
                  <span className="dk-font-bold">
                    Tình trạng thanh toán:{" "}
                    {
                      <span
                        className={`dk-p-1 ${
                          ele?.LateFee?.length > 0 &&
                          ele.LateFee[0].Payment.length > 0
                            ? "dk-bg-green-500"
                            : "dk-bg-red-500"
                        }
                             dk-bg-red-500 dk-font-semibold dk-text-white dk-rounded`}
                      >
                        {ele?.LateFee?.length > 0 &&
                        ele.LateFee[0].Payment.length > 0
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </span>
                    }
                  </span>
                </div>
              ) : null}
              <div className="dk-mt-2">
                {ele.DueDate &&
                new Date(ele.ReturnDate || new Date()).getTime() >
                  new Date(ele.DueDate).getTime() &&
                Math.floor(
                  (new Date(ele.ReturnDate || new Date()).getTime() -
                    new Date(ele.DueDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                ) >= 1 &&
                !(
                  ele?.LateFee?.length > 0 && ele.LateFee[0].Payment.length > 0
                ) ? (
                  <Button className="dk-bg-green-600 dk-font-bold dk-text-white hover:dk-scale-110">
                    Thanh toán
                  </Button>
                ) : null}
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
