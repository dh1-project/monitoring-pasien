import { useState } from "react";
import RoleSelect from "./pages/RoleSelect";
import InputPasien from "./pages/InputPasien";
import LoginNurse from "./pages/LoginNurse";
import DashboardPasien from "./pages/DashboardPasien";
import DashboardNurse from "./pages/DashboardNurse";
import Alrm from "./alrm/alrm";
import "./App.css";

function App() {
  const [role, setRole] = useState(null);
  const [pasienData, setPasienData] = useState(null);
  const [nurseData, setNurseData] = useState(null);
  const [selectedPasien, setSelectedPasien] = useState(null);

  // PILIH ROLE
  if (!role) {
    return <RoleSelect onSelect={setRole} />;
  }

  // PASIEN
  if (role === "pasien" && !pasienData) {
    return (
      <InputPasien
        onSubmit={setPasienData}
        onBack={() => setRole(null)}
      />
    );
  }

  if (role === "pasien" && pasienData) {
    return (
      <DashboardPasien
        data={pasienData}
        onLogout={() => {
          setPasienData(null);
        }}
      />
    );
  }

  // NURSE
  if (role === "nurse" && !nurseData) {
    return (
      <LoginNurse
        onSubmit={setNurseData}
        onBack={() => setRole(null)}
      />
    );
  }

  // if (role === "nurse" && nurseData && !selectedPasien) {
  // return (
  //   <DashboardNurse
  //     nurseId={nurseData.nurseId}
  //     onSelectPasien={(pasien) => setSelectedPasien(pasien)}
  //     onLogout={() => setNurseData(null)}
  //   />
  // );
  if (role === "nurse" && nurseData && !selectedPasien) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Alrm />   {/* ✅ Alarm monitoring jalan di sini */}
      <DashboardNurse
        nurseId={nurseData.nurseId}
        onSelectPasien={(pasien) => setSelectedPasien(pasien)}
        onLogout={() => setNurseData(null)}
      />
    </div>
  );
}
  if (role === "nurse" && nurseData && selectedPasien) {
  return (
    <DashboardPasien
      data={selectedPasien}
      onLogout={() => setSelectedPasien(null)} // ⬅️ balik ke dashboard nurse
    />
  );
}
  return null;
}

export default App;
