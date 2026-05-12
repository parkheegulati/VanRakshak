import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ClaimsMap from './pages/ClaimsMap';
import AIAlerts from './pages/AIAlerts';
import ClaimTracker from './pages/ClaimTracker';
import Analytics from './pages/Analytics';
import CitizenPortal from './pages/CitizenPortal';
import OfficerDashboard from './pages/OfficerDashboard';
import FloatingAssistant from './components/FloatingAssistant';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<ClaimsMap />} />
          <Route path="/alerts" element={<AIAlerts />} />
          <Route path="/track" element={<ClaimTracker />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/file-claim" element={<CitizenPortal />} />
          <Route path="/officer" element={<OfficerDashboard />} />
        </Routes>
        <FloatingAssistant />
      </Layout>
    </Router>
  );
}

export default App;
