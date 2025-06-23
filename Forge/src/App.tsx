import { Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from './components/Dashboard/DashboardLayout'
import { OverviewPage } from './components/Dashboard/OverviewPage'
import { AuraPage } from './components/Dashboard/AuraPage'
import { RewardsPage } from './components/Dashboard/RewardsPage'
import { SettingsPage } from './components/Dashboard/SettingsPage'
import { HelpPage } from './components/Help/HelpPage'
import { LoginPage } from './components/Auth/LoginPage'
import './App.css'

function App() {
  return (
    <Routes>
      {/* Dashboard and its child routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="aura" element={<AuraPage />} />
        <Route path="rewards" element={<RewardsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Default redirect to /dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
