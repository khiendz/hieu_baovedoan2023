import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./style.scss";
import { toolbarOptions } from "./Components/ToolbarOptions";
import { formats } from "./Components/Formats";

const Quill = dynamic(import("react-quill"), { ssr: false });

const TextEditor: React.FC<any> = (props: any) => {
  const { initialValues, onChange } = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initialValues);
  }, []);

  useEffect(() => {
    if (props && onChange) {
      onChange(value);
    }
  }, [value]);

  return (
    <Quill
      theme="snow"
      value={value ?? initialValues}
      modules={{
        toolbar: [...toolbarOptions],
      }}
      formats={...formats}
      onChange={setValue}
    />
  );
};

export default TextEditor;
