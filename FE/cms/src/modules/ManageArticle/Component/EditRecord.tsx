import React, { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
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
  record: Article;
}

interface Props {
  Save: any;
  Form: FormInstance;
  Articles: Article[];
  setArticles: any;
  setPopup: any;
  onInit: any;
  Cancel: any;
  record: Article;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  save,
  form,
}) => {
  return (
    <Modal
      open={open}
      title="Sửa thông tin bài viét"
      okText="Cập nhật bài viét"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        await save();
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
          <Input />
        </Form.Item>
        <Form.Item name="Description" label="Mô tả bài viết">
          <TextEditor
            initialValues={form?.getFieldValue("Description")}
            onChange={(value: any) => {
              form.setFieldValue("Description", value);
            }}
          />
        </Form.Item>
        <Form.Item name="Content" label="Mô tả bài viết">
          <TextEditor
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

const EditRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const {
    Save,
    Form,
    Articles,
    setArticles,
    setPopup,
    onInit,
    record,
    Cancel,
  } = props;

  useEffect(() => {
    if (open) onInit();
  }, [open]);

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
        Sửa thông tin bài viết
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
          Cancel();
          Form.resetFields();
        }}
        record={record}
      />
    </div>
  );
};

export default EditRecord;
