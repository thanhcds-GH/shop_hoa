import fs from 'fs';
import path from 'path';

// Đường dẫn tới file products.js
const filePath = path.resolve('D:/SHOP_HOA/fontend/src/data/products.js');

// Đọc nội dung file
let content = fs.readFileSync(filePath, 'utf8');

// Thay thế tất cả .jpg và .png thành .webp
content = content.replace(/\.(jpg|jpeg|png)/gi, '.webp');

// Ghi lại nội dung đã chỉnh sửa vào file products.js
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Đã thay toàn bộ đường dẫn ảnh sang .webp trong products.js');
