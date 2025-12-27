import { useEffect, useState } from "react";

function DashboardNurse({ emrPerawat, onLogout, onSelectPasien }) {

  /* ===============================
     STATE METABASE EMBED
     =============================== */
  const [iframeUrl, setIframeUrl] = useState("");
  const [loadingEmbed, setLoadingEmbed] = useState(true);
  const [errorEmbed, setErrorEmbed] = useState(null);

  /* ===============================
     FETCH METABASE EMBED
     =============================== */
  useEffect(() => {
  fetch(
    `http://localhost:8000/api/metabase/embed/dashboard/11?emr_perawat=${emrPerawat}`
  )
    .then(res => res.json())
    .then(data => {
      setIframeUrl(data.iframeUrl);
      setLoadingEmbed(false);
    })
    .catch(err => {
      console.error(err);
      setLoadingEmbed(false);
    });
}, [emrPerawat]);

  return (
    <div className="dashboard-page">
      <div className="glass-card wide nurse-card">

        {/* ================= HEADER ================= */}
        <div className="dashboard-header nurse-header">
          <div>
            <h2>Dashboard Nurse</h2>
            <p>EMR Perawat: <b>{emrPerawat}</b></p>
          </div>

          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>

        {/* ================= METABASE EMBED ================= */}
        <div className="metabase-container">
          <h3>Monitoring Pasien (Metabase)</h3>

          {loadingEmbed && <p>Memuat dashboard Metabase...</p>}

          {errorEmbed && (
            <p style={{ color: "red" }}>
              Gagal memuat dashboard: {errorEmbed}
            </p>
          )}

          {!loadingEmbed && iframeUrl && (
            <iframe
              src={iframeUrl}
              width="100%"
              height="650"
              frameBorder="0"
              allowTransparency
              title="Dashboard Metabase"
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default DashboardNurse;
