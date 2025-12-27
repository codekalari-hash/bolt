import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { EcoScan } from './pages/EcoScan';
import { Inventory } from './pages/Inventory';
import { EcoMiles } from './pages/EcoMiles';
import { EcoWatt } from './pages/EcoWatt';
import { EcoPlate } from './pages/EcoPlate';
import { EcoCycle } from './pages/EcoCycle';
import { Leaderboard } from './pages/Leaderboard';
import { Community } from './pages/Community';
import { Alerts } from './pages/Alerts';
import { Badges } from './pages/Badges';
import { Shop } from './pages/Shop';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="ecoscan" element={<EcoScan />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="ecomiles" element={<EcoMiles />} />
              <Route path="ecowatt" element={<EcoWatt />} />
              <Route path="ecoplate" element={<EcoPlate />} />
              <Route path="ecocycle" element={<EcoCycle />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="community" element={<Community />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="badges" element={<Badges />} />
              <Route path="shop" element={<Shop />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
