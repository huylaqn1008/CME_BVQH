import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE user = ? AND password = ?";
  con.query(sql, [req.body.user, req.body.password], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Database query error" });
    }
    if (result.length > 0) {
      const user = result[0].email;
      const token = jwt.sign({ role: "admin", user: user }, "jwt_secret_key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);

      res.send({ message: "Đăng nhập thành công", token });
    } else {
      res.send({ message: "Sai username hoặc password" });
    }
  });
});

router.get("/department", (req, res) => {
  const sql = "SELECT * FROM department";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Lỗi truy vấn" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_department", (req, res) => {
  const sql = "INSERT INTO department (`name`) VALUES (?)";
  con.query(sql, [req.body.department], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Lỗi truy vấn" });
    return res.json({ Status: true });
  });
});

// image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
// end image upload setup

router.post("/add_employee", upload.single("image"), (req, res) => {
  const sql =
    "INSERT INTO employee  (`name`, `user`, `password`, `cccd`, `department_id`, `image`)  VALUES (?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Lỗi mã hóa mật khẩu" });
    const value = [
      req.body.name,
      req.body.user,
      hash,
      req.body.cccd,
      req.body.department_id,
      req.file.filename,
    ];
    con.query(sql, [value], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Lỗi truy vấn" });
      return res.json({ Status: true });
    });
  });
});

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Lỗi truy vấn" });
    return res.json({ Status: true, Result: result });
  });
});

export { router as AdminRoute };
