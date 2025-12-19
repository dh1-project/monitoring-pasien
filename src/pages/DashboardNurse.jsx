function DashboardNurse({ nurseId, onLogout, onSelectPasien }) {
  // DATA DUMMY (NANTI DIGANTI DARI METABASE)
  const pasienList = [
    {emr: "388389",room_id: "ICU-01",fall: false,},
    {emr: "388390",room_id: "ICU-02",fall: true,},
    {emr: "388391",room_id: "ICU-03",fall: true,},
    {emr: "400897",room_id: "sutite-04",fall: false,},
    {emr: "923986",room_id: "sutite-05",fall: false,},
  ];

  // 🔴 SORT PASIEN FALL DI ATAS
  const sortedPasienList = [...pasienList].sort(
    (a, b) => b.fall - a.fall
  );

  return (
    <div className="dashboard-page">
  <div className="glass-card wide nurse-card">
    
    {/* HEADER */}
    <div className="dashboard-header nurse-header">
      <div>
        <h2>Dashboard Nurse</h2>
        <p>ID Nurse: <b>{nurseId}</b></p>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>

    {/* TABLE HEADER */}
    <div className="table-header">
      <span>EMR</span>
      <span>Room</span>
      <span>Status</span>
      <span>Aksi</span>
    </div>

    {/* LIST PASIEN */}
    <div className="patient-list">
      {sortedPasienList.map((p, index) => (
        <div
          className={`patient-row ${p.fall ? "row-danger" : ""}`}
          key={index}
        >
          <span className="emr">{p.emr}</span>
          <span>{p.room_id}</span>

          <span className={`status-pill ${p.fall ? "danger" : "safe"}`}>
            {p.fall ? "FALL DETECTED" : "AMAN"}
          </span>

          <button
            className="detail-btn"
            onClick={() => onSelectPasien(p)}
          >
            Lihat Detail
          </button>
        </div>
      ))}
    </div>

  </div>
</div>

  );
}

export default DashboardNurse;
