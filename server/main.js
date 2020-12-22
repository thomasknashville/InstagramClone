import express from "express";
import { uploader, UPLOAD_DIRECTORY, getUploadedFiles, findUploadedFile } from "./utils";
import path from "path";

// install/use cors module to comply with CORS policy "its ok for different services/browsers to make requests to this address"
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(UPLOAD_DIRECTORY));

// GET Array
app.get("/pics", async (req, res) => {
  try {
    const files = await getUploadedFiles();
    res.json(files.map((file) => `/uploads/${file}`));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET with size condition
// this is only for checking size for render. We need to limit file size for Upload
// app.get("/pics", async (req, res) => {
//   try {
//     const files = await getUploadedFiles();
//     const fileData = files.map((file) => `/uploads/${file}`);
//     if (!req.query.size) {
//       res.json(fileData);
//       return;
//     }
//     const size = Number.parseInt(req.query.size, 10);
//     const results = [];
//     for (let file of files) {
//       const result = await findUploadedFile(file);
//       if (result.size <= size) {
//         results.push(file);
//       }
//     }
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // this is only for checking size for render. We need to limit file size for Upload
// app.get("/pics-hard-mode", async (req, res) => {
//   try {
//     const files = await getUploadedFiles();
//     const fileData = files.map((file) => path.join(".", UPLOAD_DIRECTORY, file));
//     if (!req.query.size) {
//       res.json(fileData);
//       return;
//     }
//     const size = Number.parseInt(req.query.size, 10);

//     const promises = files.map((file) => findUploadedFile(file));
//     const results = await Promise.all(promises);
//     const photos = [];
//     results.forEach((data, i) => {
//       if (data.size <= size) {
//         photos.push(fileData[i]);
//       }
//     });
// for (let file of files) {
//   const result = await findUploadedFile(file);
//   if (result.size <= size) {
//     results.push(file);
//   }
// }
//     res.json(photos);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// GET one photo
app.get("/pics/:filename", async (req, res) => {
  try {
    const { birthtime, size } = await findUploadedFile(req.params.filename);
    res.json({ birthtime, size });
  } catch (err) {
    res.status(404).json({ message: "Unable to find file." });
  }
});

// post/create file
app.post("/photos", uploader.single("photo"), (req, res) => {
  console.log({ req });
  res.json({
    photo: req.file.path,
  });
});

//post/2mb
// let filesizeLimit = 2 * 1024

// app.post("/photos", uploader.single("photo"), (res, req) => {
//   if (req.params.size <= filesizeLimit)
//   Photos.push("photo")
//   res.json({
//     res.send("Photo upload success!"),
//   });
// });
//set postman to form-data, key = photo, drop down change to file, select the file, send

// req.params.size

// app.use(uploadPics ({
//   limits:
// {
//   filesize: 2 *1024 * 1024 *1024
// }
// })):

app.listen(4000, () => {
  console.log("Express server is now running on port 4000");
});
