import { useState } from "react";
import Header from "../components/header";

function InputPasien({ onSubmit }) {
  const [jenis, setJenis] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emr = e.target.emr.value.trim();
    const room = e.target.room?.value.trim() || "";

    if (!emr) return;

    onSubmit({
      emr,
      jenis,
      room, // boleh kosong
    });
  };

 return (
  <div className="app-container">
    <Header />

    <div className="form-wrapper">
      <form className="form-card" onSubmit={handleSubmit}>
        <h3>Masukkan Data Pasien</h3>
        <p className="form-desc">
          Gunakan nomor rekam medis untuk mengakses informasi pasien
        </p>

        <select
          name="jenis"
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          required
        >
          <option value="">Pilih Jenis Perawatan</option>
          <option value="rawat-inap">Rawat Inap</option>
          <option value="rawat-jalan">Rawat Jalan</option>
        </select>

        {jenis === "rawat-inap" && (
          <input
            type="text"
            name="room"
            placeholder="Room ID (opsional)"
          />
        )}

        <input
          type="text"
          name="emr"
          placeholder="Nomor EMR Pasien"
          required
        />

        <button type="submit">
          Tampilkan Informasi Pasien
        </button>
      </form>
    </div>
  </div>
);
}

export default InputPasien;
