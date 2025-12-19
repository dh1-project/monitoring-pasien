function RoleSelect({ onSelect }) {
  return (
    <div className="role-page">
      <div className="role-card">
        <h2>Pilih Akses</h2>
        <p className="role-desc">
          Silakan pilih peran untuk melanjutkan
        </p>

        <button
          className="role-btn"
          onClick={() => onSelect("pasien")}
        >
          Pasien / Keluarga
        </button>

        <button
          className="role-btn outline"
          onClick={() => onSelect("nurse")}
        >
          Perawat (Nurse)
        </button>
      </div>
    </div>
  );
}

export default RoleSelect;
