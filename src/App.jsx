import { useState } from "react";
import InputPasien from "./pages/InputPasien";
import DashboardPasien from "./pages/DashboardPasien";

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

  if (role === "nurse" && nurseData && !selectedPasien) {
  return (
    <DashboardNurse
      nurseId={nurseData.nurseId}
      onSelectPasien={(pasien) => setSelectedPasien(pasien)}
      onLogout={() => setNurseData(null)}
    />
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
