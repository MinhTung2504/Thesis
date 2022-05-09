const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
// exports.uploadToCloudinary = (locaFilePath) => {
//   var folderName = "Houses";

//   var filePathOnCloudinary = folderName + "/" + locaFilePath;

//   return cloudinary.uploader
//     .upload(locaFilePath, { public_id: filePathOnCloudinary })
//     .then((result) => {
//       fs.unlinkSync(locaFilePath);

//       return {
//         message: "Success",
//         url: result.secure_url,
//       };
//     })
//     .catch((error) => {
//       fs.unlinkSync(locaFilePath);
//       return { message: "Fail" };
//     });
// };
