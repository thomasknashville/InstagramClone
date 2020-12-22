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
app.post("/pics", uploader.single("photo"), (req, res) => {
  console.log({ req });
  res.json({
    photo: req.file.path,
  });
});

app.listen(4000, () => {
  console.log("Express server is now running on port 4000");
});
