const express = require("express");
const router = express.Router();

router.get("/nurse", (req, res) => {
  res.json([]); // sementara kosong
});

module.exports = router;
