import React, { useState } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
} from "antd";
import UploadFileImage from "components/UploadFileImage";
import TextEditor from "components/TextEditor";
import { Article } from "Models/Article.model";

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  save: any;
  form: FormInstance;
  articles: Article[];
  setArticles: any;
  setPopup: any;
}

interface Props {
  Save: any;
  Form: FormInstance;
  Articles: Article[];
  setArticles: any;
  setPopup: any;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  save,
  form,
  articles,
  setArticles,
  setPopup,
}) => {
  return (
    <Modal
      open={open}
      title="Tạo một tin tức mới"
      okText="Tạo tin tức"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Article;
        const result = await save(
          {
            ...row,
          },
          articles,
          setArticles
        );
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        onCreate();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="Title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Làm ơn nhập tiêu đề!" }]}
        >
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>
        <Form.Item name="Description" label="Mô tả bài viết">
          <TextEditor
            placeholder="Nhập mô tả"
            initialValues={form?.getFieldValue("Description")}
            onChange={(value: any) => {
              form.setFieldValue("Description", value);
            }}
          />
        </Form.Item>
        <Form.Item name="Content" label="Nội dung bài viết">
          <TextEditor
            placeholder="Nhập nội dung bài viết"
            initialValues={form?.getFieldValue("Content")}
            onChange={(value: any) => {
              form.setFieldValue("Content", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="Thumb"
          label="Ảnh đại diện"
          className="dk-w-full dk-flex dk-justify-center"
          rules={[{ required: true, message: "Làm ơn nhập ảnh đại diện" }]}
        >
          <UploadFileImage lengthMaxImage={1} form={form} keyField="Thumb" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const {
    Save,
    Form,
    Articles,
    setArticles,
    setPopup,
  } = props;

  const onCreate = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Tạo bài viết mới
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        articles={Articles}
        setArticles={setArticles}
        setPopup={setPopup}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddRecord;
