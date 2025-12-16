function DashboardPasien({ data, onLogout }) {
  const { emr, jenis, room } = data;

  const baseUrl =
    "https://darsinurse.hint-lab.id/public/dashboard/901994a0-db42-4428-91ec-bd8ad2ec8d20";

  let url = `${baseUrl}?no_emr=${encodeURIComponent(emr)}`;

  if (jenis === "rawat-inap" && room) {
    url += `&room_id=${encodeURIComponent(room)}`;
  }

  return (
    <div className="dashboard-page">
      <button className="logout-btn" onClick={onLogout}>
        Keluar
      </button>

      <iframe
        src={url}
        title="Dashboard Metabase"
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
        }}
      />
    </div>
  );
}

export default DashboardPasien;
