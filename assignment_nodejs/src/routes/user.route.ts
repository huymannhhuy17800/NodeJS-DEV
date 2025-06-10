import express from "express";
import multer from "multer";
import path from "path";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller";

const router = express.Router();

const baseUrl = "/users";

//handle middleware

// router.use(authenBasic);
// config multer upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // giới hạn 5 mb
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) != ".png") {
      return cb(
        new Error("File khong hop le, chi chap nhan JPEG, PNG hoac Excel.")
      );
    }
    cb(null, true);
  },
});

router.get(baseUrl, getAllUsers);

router.get(baseUrl + "/:id", getUser);

router.post(baseUrl, createUser);

router.put(baseUrl + "/:id", updateUser);

router.delete(baseUrl + "/:id", deleteUser);

// router.post("/upload", upload.single("file"), uploadFile);

export default router;
