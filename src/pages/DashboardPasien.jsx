import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function DashboardPasien({ data, onLogout }) {
  const { emr, jenis, room } = data;
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    // SIMULASI DATA (nanti diganti fetch backend)
    setTimeout(() => {
      setDashboard({
        emr,
        latest: {
          hr: 78,
          rr: 18,
          fall: false,
        },
        history: [
          { time: "10:00", hr: 80, rr: 19, fall: 0 },
          { time: "10:05", hr: 78, rr: 18, fall: 0 },
          { time: "10:10", hr: 76, rr: 17, fall: 1 },
          { time: "10:15", hr: 79, rr: 18, fall: 0 },
        ],
      });
    }, 600);
  }, [emr]);

  if (!dashboard) {
    return <div className="center">Memuat data pasien...</div>;
  }

  const { latest, history } = dashboard;

  return (
    <div className="dashboard-page">
      <button className="logout-btn" onClick={onLogout}>
        Keluar
      </button>

      <div className="dashboard-header">
        <h2>Kondisi Pasien</h2>
        <p>
          EMR <strong>{emr}</strong>
          {jenis === "rawat-inap" && room && (
            <> · Ruang <strong>{room}</strong></>
          )}
        </p>
      </div>

      {/* CARD RINGKAS */}
      <div className="dashboard-grid">
        <div className="card">
          <p>Heart Rate</p>
          <h2>{latest.hr} bpm</h2>
        </div>

        <div className="card">
          <p>Respiratory Rate</p>
          <h2>{latest.rr} rpm</h2>
        </div>

        <div className={`card ${latest.fall ? "danger" : "safe"}`}>
          <p>Status Fall</p>
          <h2>{latest.fall ? "Terdeteksi" : "Aman"}</h2>
        </div>
      </div>

      {/* ================= GRAFIK ================= */}
      <div className="chart-section">

        {/* HR */}
        <div className="chart-box">
          <h3>Riwayat Heart Rate</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line dataKey="hr" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RR */}
        <div className="chart-box">
          <h3>Riwayat Respiratory Rate</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line dataKey="rr" stroke="#509ee3" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* FALL */}
        <div className="chart-box">
          <h3>Riwayat Status Fall</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 1]} ticks={[0, 1]} />
              <Tooltip />
              <Line
                type="stepAfter"
                dataKey="fall"
                stroke="#f97316"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default DashboardPasien;
