"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./service";
import classNames from "classnames";
import { provinces } from "./data-address";
import styles from "./styles.module.scss";

export default function TourForm() {
  const { data: userInfo } = {
    data: {
      id: "",
      name: "",
      date: "",
      fromTo: "",
    },
  };
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    date: false,
    fromTo: false,
  });
  const [focusedField, setFocusedField] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: userInfo?.name || "",
    date: userInfo?.date || new Date(),
    fromTo: userInfo?.fromTo,
  });

  const characterLimits = {
    name: 35,
    fromTo: 1000,
  };

  const handleFormSubmit = async (values: any) => {};

  return (
    <div className={styles.contactContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Lựa chọn tour du lịch</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize={true}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className={styles.form}>
              <div
                className={classNames(
                  styles.field,
                  touchedFields["name"] && errors["name"]
                    ? styles.error
                    : touchedFields["name"] && focusedField == "name"
                    ? styles.success
                    : ""
                )}
              >
                <label
                  htmlFor="name"
                  className={`${styles.requireField} dk-whitespace-nowrap`}
                >
                  Tour du lịch
                </label>
                <Field
                  type="search"
                  id="name"
                  name="name"
                  placeholder="Bạn muốn đi đâu ?"
                  onChange={(e: any) => {
                    setFieldValue("name", e.target.value);
                    setInitialValues({
                      ...values,
                      name: e.target.value,
                    });
                    if (!touchedFields["name"]) {
                      setTouchedFields((prevTouched) => ({
                        ...prevTouched,
                        name: true,
                      }));
                    }
                  }}
                />
                <span
                  className={classNames(
                    styles.charCount,
                    touched["name"] ? styles.touched : ""
                  )}
                >
                  {values?.name?.length}/{characterLimits.name}
                </span>
                {errors.name && touchedFields["name"] ? (
                  <div className={styles.error}>{errors.name}</div>
                ) : null}
                {!touchedFields["name"] ? (
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.error}
                  />
                ) : null}
              </div>
              <div
                className={classNames(
                  styles.field,
                  touchedFields["date"] && errors["date"]
                    ? styles.error
                    : touchedFields["date"] && focusedField == "date"
                    ? styles.success
                    : ""
                )}
              >
                <label
                  htmlFor="date"
                  className={`${styles.requireField} dk-whitespace-nowrap`}
                >
                  Ngày khởi hành
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  onChange={(e: any) => {
                    setFieldValue("date", e.target.value);
                    setInitialValues({
                      ...values,
                      date: e.target.value,
                    });
                    if (!touchedFields["date"]) {
                      setTouchedFields((prevTouched) => ({
                        ...prevTouched,
                        date: true,
                      }));
                    }
                  }}
                />
                {errors.date && touchedFields["date"] ? (
                  <div className={styles.error}>{errors.name}</div>
                ) : null}
                {!touchedFields["date"] ? (
                  <ErrorMessage
                    name="date"
                    component="div"
                    className={styles.error}
                  />
                ) : null}
              </div>
              <div
                className={classNames(
                  styles.field,
                  touchedFields["date"] && errors["date"]
                    ? styles.error
                    : touchedFields["date"] && focusedField == "date"
                    ? styles.success
                    : ""
                )}
              >
                <label
                  htmlFor="date"
                  className={`${styles.requireField} dk-whitespace-nowrap`}
                >
                  Khởi hành từ
                </label>
                <Field
                  type="select"
                  as="select"
                  id="fromTo"
                  name="fromTo"
                  onChange={(e: any) => {
                    setFieldValue("fromTo", e.target.value);
                    setInitialValues({
                      ...values,
                      date: e.target.value,
                    });
                    if (!touchedFields["fromTo"]) {
                      setTouchedFields((prevTouched) => ({
                        ...prevTouched,
                        date: true,
                      }));
                    }
                  }}
                >
                  {provinces.map((elements) => (
                    <option key={elements.index + 1} value={elements.name}>
                      {elements.name}
                    </option>
                  ))}
                </Field>
                {errors.fromTo && touchedFields["fromTo"] ? (
                  <div className={styles.error}>{errors.fromTo}</div>
                ) : null}
                {!touchedFields["fromTo"] ? (
                  <ErrorMessage
                    name="fromTo"
                    component="div"
                    className={styles.error}
                  />
                ) : null}
              </div>
              <button
                className={classNames(
                  styles.submit,
                  values.name &&
                    values.date &&
                    values.fromTo &&
                    Object.values(errors).every((error) => !error)
                    ? styles.succeed
                    : ""
                )}
                type="submit"
              >
                {"Gửi"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
