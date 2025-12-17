import { useState } from "react";
import Header from "../components/Header";

function InputPasien({ onSubmit }) {
  const [jenis, setJenis] = useState("");
  const [emr, setEmr] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!emr.trim()) {
      setError("Nomor EMR wajib diisi");
      return;
    }

    if (jenis === "rawat-inap" && !room.trim()) {
      setError("Room ID wajib diisi untuk rawat inap");
      return;
    }

    onSubmit({
      emr: emr.trim(),
      jenis,
      room: jenis === "rawat-inap" ? room.trim() : null,
    });
  };

  return (
    <div className="input-page">
      <Header />

      <div className="form-wrapper">
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Akses Informasi Pasien</h3>
          <p className="form-desc">
            Masukkan data untuk melihat ringkasan kondisi pasien
          </p>

          <select
            value={jenis}
            onChange={(e) => {
              setJenis(e.target.value);
              setRoom(""); // reset room saat ganti jenis
            }}
          >
            <option value="">Pilih Jenis Perawatan</option>
            <option value="rawat-inap">Rawat Inap</option>
            <option value="rawat-jalan">Rawat Jalan</option>
          </select>

          {jenis === "rawat-inap" && (
            <input
              type="text"
              placeholder="Room ID (wajib)"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          )}

          <input
            type="text"
            placeholder="Nomor EMR Pasien"
            value={emr}
            onChange={(e) => setEmr(e.target.value)}
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit">
            Lihat Informasi
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputPasien;
