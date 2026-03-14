import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import RootLayout from "./layouts/RootLayout/RootLayout";
import EquipmentLayout from "./layouts/EquipmentLayout/EquipmentLayout";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import MaintenanceLayout from "./layouts/MaintenanceLayout/MaintenanceLayout";

import DashboardHome from "./pages/DashboardHome";
import EquipmentOverview from "./pages/Equipment/EquipmentOverview";
import MaintenanceHome from "./pages/MaintenanceHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout/>}>
          <Route path='/' element={<Navigate to="/dashboard" replace />} />
          <Route path='/dashboard' element={<DashboardLayout/>}>
            <Route index element={<DashboardHome/>}/>
          </Route>
          <Route path='/equipment' element={<EquipmentLayout/>}>
            <Route index element={<EquipmentOverview/>}/>
          </Route>
          <Route path='/maintenance' element={<MaintenanceLayout/>}>
            <Route index element={<MaintenanceHome/>}/>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;