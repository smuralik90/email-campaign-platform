import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import Contacts from "./pages/Contacts";

import AddContact from "./pages/AddContact";

import ImportContacts from "./pages/ImportContacts";

import ContactDetail from "./pages/ContactDetail";

import Segments from "./pages/Segments";

import Templates from "./pages/Templates";

import TemplateEditor
from "./pages/TemplateEditor";

import NewCampaign
from "./pages/NewCampaign";

import Campaigns
from "./pages/Campaigns";

import ProtectedRoute
from "./routes/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contacts/add"
          element={
            <ProtectedRoute>
              <AddContact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contacts/import"
          element={
            <ProtectedRoute>
              <ImportContacts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contacts/segments"
          element={
            <ProtectedRoute>
              <Segments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contacts/:id"
          element={
            <ProtectedRoute>
              <ContactDetail />
            </ProtectedRoute>
          }
        />

        {/* TEMPLATE ROUTES */}

        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <Templates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates/new"
          element={
            <ProtectedRoute>
              <TemplateEditor />
            </ProtectedRoute>
          }
        />

        {/* CAMPAIGN ROUTES */}

        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <Campaigns />
            </ProtectedRoute>
          }
        />

        <Route
          path="/campaigns/new"
          element={
            <ProtectedRoute>
              <NewCampaign />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;