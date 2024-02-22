import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import QuickSale from "./pages/QuickSale/Index";
import Clients from "./pages/Clients";
import Invoices from "./pages/Invoices";
import Coupons from "./pages/Coupons";
import Staff from "./pages/Staff";
import Roles from "./pages/Roles";
import Services from "./pages/Services";
import Groups from "./pages/Services/Groups";
import Prints from "./pages/Prints";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route
          path="/quicksale"
          element={<ProtectedRoute element={<QuickSale />} />}
        >
          <Route
            path="/quicksale/clients/create"
            element={<ProtectedRoute element={<Clients.Create />} />}
          />
        </Route>
        <Route
          path="/invoices"
          element={<ProtectedRoute element={<Invoices.Index />} />}
        />
        <Route
          path="/invoices/:id"
          element={<ProtectedRoute element={<Invoices.Show />} />}
        />
        <Route
          path="/prints/invoices/:id"
          element={<ProtectedRoute element={<Prints.Invoice />} />}
        />
        <Route
          path="/clients"
          element={<ProtectedRoute element={<Clients.Index />} />}
        >
          <Route
            path="/clients/create"
            element={<ProtectedRoute element={<Clients.Create />} />}
          />
          <Route
            path="/clients/edit/:id"
            element={<ProtectedRoute element={<Clients.Edit />} />}
          />
        </Route>
        <Route
          path="/coupons"
          element={<ProtectedRoute element={<Coupons.Index />} />}
        >
          <Route
            path="/coupons/create"
            element={<ProtectedRoute element={<Coupons.Create />} />}
          />
          <Route
            path="/coupons/edit/:id"
            element={<ProtectedRoute element={<Coupons.Edit />} />}
          />
        </Route>
        <Route
          path="/staff"
          element={<ProtectedRoute element={<Staff.Index />} />}
        >
          <Route
            path="/staff/create"
            element={<ProtectedRoute element={<Staff.Create />} />}
          />
          <Route
            path="/staff/edit/:id"
            element={<ProtectedRoute element={<Staff.Edit />} />}
          />
        </Route>
        <Route
          path="/services"
          element={<ProtectedRoute element={<Services.Index />} />}
        >
          <Route
            path="/services/create"
            element={<ProtectedRoute element={<Services.Create />} />}
          />
          <Route
            path="/services/edit/:id"
            element={<ProtectedRoute element={<Services.Edit />} />}
          />
          <Route
            path="/services/groups/create"
            element={<ProtectedRoute element={<Groups.Create />} />}
          />
          <Route
            path="/services/groups/edit/:id"
            element={<ProtectedRoute element={<Groups.Edit />} />}
          />
        </Route>
        <Route
          path="/roles-and-permissions"
          element={<ProtectedRoute element={<Roles.Index />} />}
        >
          <Route
            path="/roles-and-permissions/create"
            element={<ProtectedRoute element={<Roles.Create />} />}
          />
          <Route
            path="/roles-and-permissions/edit/:id"
            element={<ProtectedRoute element={<Roles.Edit />} />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
