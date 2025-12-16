import { useState } from "react";
import InputPasien from "./pages/InputPasien";
import DashboardPasien from "./pages/DashboardPasien";

function App() {
  const [pasien, setPasien] = useState(null);

  return !pasien ? (
    <InputPasien onSubmit={setPasien} />
  ) : (
    <DashboardPasien
      data={pasien}
      onLogout={() => setPasien(null)}
    />
  );
}

export default App;
