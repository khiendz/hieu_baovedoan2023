export function generateUID() {
    const maxNumber = 9999999999; // Giới hạn số tối đa
    const randomNumericString = Math.floor(Math.random() * maxNumber);
    const timestampString = Date.now().toString().substr(5); // Sử dụng một phần của timestamp
  
    const uid = timestampString + randomNumericString;
  
    return parseInt(uid.substr(0, 10)); // Giới hạn chiều dài tối đa là 20 kí tự
  }
  