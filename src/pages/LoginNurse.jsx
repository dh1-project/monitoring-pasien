import { useState } from "react";

function LoginNurse({ onSubmit, onBack }) {
  const [nurseId, setNurseId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nurseId.trim()) return;

    onSubmit({ nurseId });
  };

  return (
    <div className="login-page">
      <div className="form-card">
        <h3>Login Perawat</h3>
        <p className="form-desc">
          Masukkan ID Perawat untuk mengakses data pasien
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ID Nurse"
            value={nurseId}
            onChange={(e) => setNurseId(e.target.value)}
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
