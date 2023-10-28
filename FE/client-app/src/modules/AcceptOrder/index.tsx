"use client";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "hook/use-app-context";
import { BorrowedBook } from "Models/BorrowedBook";
import classNames from "classnames";
import { Book } from "Models/Book";

type Props = {
  bookOrder: any;
  setBook: any;
  setOrder: any;
  showPopup: any;
};

export default function AcceptOrder(props: Props) {
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
              phone: "",
              email: "",
              different: "",
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
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
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
