const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/embed/dashboard/:id", (req, res) => {
  const dashboardId = Number(req.params.id);
  const { emr_perawat } = req.query;

  if (!emr_perawat) {
    return res.status(400).json({ error: "emr_perawat wajib" });
  }

  const payload = {
    resource: { dashboard: dashboardId },
    params: {
      emr_perawat: String(emr_perawat)
    },
    exp: Math.round(Date.now() / 1000) + 10 * 60
  };

  const token = jwt.sign(payload, process.env.METABASE_SECRET_KEY);

  const iframeUrl =
    process.env.METABASE_SITE_URL +
    "/embed/dashboard/" +
    token +
    "#bordered=true&titled=true";

  res.json({ iframeUrl });
});

module.exports = router;
