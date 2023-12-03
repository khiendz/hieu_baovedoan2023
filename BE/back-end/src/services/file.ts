import fs from "fs";
import path from "path";

export const saveFile = async (file: any, midName: any) => {
  const imgData: any = file.split(';base64,').pop();
  const imgBuffer = Buffer.from(imgData, 'base64');

  const filename = `file_${midName}_${Date.now()}.png`;
  const filePath = path.join('public/static/images', filename);
  fs.writeFileSync(filePath, imgBuffer);
  return filename;
};

export function isBase64(str: string): boolean {
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}