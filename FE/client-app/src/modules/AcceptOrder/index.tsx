"use client";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BorrowedBook } from "Models/BorrowedBook";
import classNames from "classnames";
import { Member } from "Models/Member";
import { AddBorrowedBook } from "services/borrowedBook-services";
import { AddMember, getAllMember } from "services";
import { Book } from "Models/Book";
import dayjs from "dayjs";

type Props = {
  bookOrder: Book;
  setBook: any;
  setOrder: any;
  showPopup: any;
};

export default function AcceptOrder(props: Props) {
  const [members,setMembers] = useState<Member[]>();
  const {bookOrder, setBook, setOrder} = props;

  useEffect(() => {
    initMember();
  }, []);

  const HandleAddBorrowedBook = async (borrowedBook: BorrowedBook) => {
    if (!borrowedBook)
      return null;

    try {
      const result = await AddBorrowedBook(borrowedBook);
      if (result) 
        return result.data;
      return null;
    }catch (e){
      console.log(e);
      return null;
    }
  }

  const HandleAddMember = async (member: Member) => {
    if (!member)
      return null;

    try {
      if (members?.find(ob => ob.MemberId == member.MemberId))
        return;
      const result = await AddMember(member);
      if (result) 
        return result.data;
      return null;
    }catch (e){
      console.log(e);
      return null;
    }
  }

  const initMember = async () => {
    const result = await getAllMember();
    if (result && result?.data)
      setMembers(result.data);
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.content} dk-flex dk-items-center dk-justify-center`}
      >
        <div className="dk-bg-white dk-w-[440px] dk-p-4 dk-rounded-md dk-relative dk-z-10">
          <p className="dk-font-Inter dk-text-[#fd8d4c] dk-text-2xl dk-font-bold">
            Thuê sách trực tuyến
          </p>
          <p className="dk-text-sm dk-font-Merriweather dk-text-gray-400">
            Độc giả vui lòng nhập thông tin liên hệ bên dưới
          </p>
          <Formik
            initialValues={{
              fullName: "",
              phone: null,
              email: "",
              different: "",
              dueDate: new Date()
            }}
            enableReinitialize={true}
            validate={(values) => {
              const errors: any = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const isNewMember = members?.find(ob => ob.Phone == values.phone);
              const member = new Member(
                (members?.length || 0) + 1,
                values.fullName,
                values.different,
                values.phone,
                values.email,
                new Date(),
                0,
                []
              );
              let borrowedBook = new BorrowedBook(
                0,
                isNewMember ? isNewMember.MemberId : member?.MemberId,
                bookOrder.BookId,
                new Date(),
                new Date(values.dueDate),
                new Date(),
                20000,
                member,
                bookOrder,
                []
              );

              if (isNewMember === undefined) {
                HandleAddMember(member).then(async (data: Member) => {
                  borrowedBook = new BorrowedBook(
                    0,
                    data?.MemberId,
                    bookOrder.BookId,
                    new Date(),
                    new Date(values.dueDate),
                    new Date(),
                    20000,
                    member,
                    bookOrder,
                    []
                  );
                  const result = await HandleAddBorrowedBook(borrowedBook);

                  if (result) {
                    setSubmitting(false);
                    setOrder(false);
                  }
                })
              } else {
                const result = await HandleAddBorrowedBook(borrowedBook);

                if (result) {
                  setSubmitting(false);
                  setOrder(false);
                }
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={classNames(styles.fieldContainer)}>
                  <Field
                    className={classNames(styles.field, {
                      [styles.success]: !errors.fullName && touched.fullName,
                    })}
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Họ tên đầy đủ"
                    onChange={(e: any) => {
                      setFieldValue("fullName", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="userName"
                    component="div"
                  />
                </div>
                <div className={classNames(styles.fieldContainer)}>
                  <Field
                    className={classNames(styles.field, {
                      [styles.success]: !errors.phone && touched.phone,
                    })}
                    type="phone"
                    id="phone"
                    name="phone"
                    placeholder="Số điện thoại"
                    onChange={(e: any) => {
                      setFieldValue("phone", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="phone"
                    component="div"
                  />
                </div>
                <div className={classNames(styles.fieldContainer)}>
                  <Field
                    className={classNames(styles.field, {
                      [styles.success]: !errors.email && touched.email,
                    })}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Địa chỉ email"
                    onChange={(e: any) => {
                      setFieldValue("email", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="email"
                    component="div"
                  />
                </div>
                <div className={classNames(styles.fieldContainer)}>
                  <Field
                    className={classNames(styles.field, {
                      [styles.success]: !errors.different && touched.different,
                    })}
                    type="text"
                    id="different"
                    name="different"
                    placeholder="Địa chỉ"
                    onChange={(e: any) => {
                      setFieldValue("different", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="different"
                    component="div"
                  />
                </div>
                <div className={classNames(styles.fieldContainer)}>
                  <p className="dk-mt-5">Hạn trả:</p>
                  <Field
                    className={classNames(styles.field, {
                      [styles.success]: !errors.dueDate && touched.dueDate,
                    }, styles.different)}
                    type="date"
                    id="different"
                    name="dueDate"
                    placeholder="Địa chỉ"
                    onChange={(e: any) => {
                      setFieldValue("dueDate", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="dueDate"
                    component="div"
                  />
                </div>
                {errors.email && touched.email && errors.email}
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.cancel}
                    type="button"
                    onClick={() => {
                      props.setOrder(false);
                    }}
                  >
                    Hủy
                  </button>
                  <button className={styles.submit} type="submit" onClick={
                    () => {
                      props.showPopup({status: 200,message: "Thuê sách thành công",title: "Bạn sẽ được liên hệ sớm nhất để xác nhận thông tin"})
                    }
                  }>
                    Thuê sách
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
