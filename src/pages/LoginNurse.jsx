import { useState } from "react";

function LoginNurse({ onSubmit, onBack }) {
  const [emrPerawat, setEmrPerawat] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emrPerawat.trim()) return;

    // ⬅️ KIRIM SESUAI METABASE
    onSubmit({
      emr_perawat: emrPerawat
    });
  };

  return (
    <div className="login-page">
      <div className="form-card">
        <h3>Login Perawat</h3>
        <p className="form-desc">
          Masukkan EMR Perawat untuk mengakses dashboard
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="EMR Perawat"
            value={emrPerawat}
            onChange={(e) => setEmrPerawat(e.target.value)}
            required
          />

          <button type="submit">
            Masuk Dashboard Nurse
          </button>
        </form>

        <button
          type="button"
          className="back-btn"
          onClick={onBack}
        >
          ← Kembali
        </button>
      </div>
    </div>
  );
}

export default LoginNurse;
