import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Vui lòng nhập đủ thông tin")
      .matches(
        /^[a-zA-Z0-9_\s\p{L}]+$/u,
        "Họ và tên không được chứa ký tự đặc biệt"
      )
      .max(35, "Họ và tên nhập quá giới hạn ký tự cho phép"),
    email: Yup.string()
      .required("Vui lòng nhập đủ thông tin")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ"),
    title: Yup.string()
      .required("Vui lòng nhập đủ thông tin")
      .max(100, "Tiêu đề nhập quá giới hạn ký tự cho phép"),
    content: Yup.string()
    .required("Vui lòng nhập đủ thông tin")
    .max(1000, "Nội dung nhập quá giới hạn ký tự cho phép"),
});

