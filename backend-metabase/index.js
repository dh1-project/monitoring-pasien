require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const metabaseRoutes = require("./routes/metabase");



// ⬇️ INI YANG TADI BELUM KE-REGISTER
app.use("/api/metabase", metabaseRoutes);

app.get("/", (req, res) => {
  res.send("Backend Metabase OK");
});

app.listen(8000, () => {
  console.log("Backend jalan di http://localhost:8000");
});
