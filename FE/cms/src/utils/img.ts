import { RcFile } from "antd/es/upload";

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    if (file instanceof Blob) {
      const reader = new FileReader();
      
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      
      reader.readAsDataURL(file);
    } else {
      // Xử lý trường hợp file không phải là kiểu Blob
      reject('File không phải là kiểu Blob');
    }
  });
