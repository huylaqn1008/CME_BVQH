import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE user = ? AND password = ?";
  con.query(sql, [req.body.username, req.body.password], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Database query error" });
    }
    if (result.length > 0) {
      const user = result[0].email;
      const token = jwt.sign(
        { role: "admin", user: user },
        "jwt_secret_key", 
        { expiresIn: "1d",}
      );
      res.cookie("token", token);

      res.send({ message: "Đăng nhập thành công", token });
    } else {
      res.send({ message: "Sai username hoặc password" });
    }
  });
});

export { router as AdminRoute };
