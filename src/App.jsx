import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import AppFooter from './components/Footer';
import Home from './pages/Home/Home';
import Supplier from './pages/Supplier/Supplier';
import Customer from './pages/Customer/Customer';
import SupplierCategory from './pages/SupplierCategory/SupplierCategory';
import CustomerCategory from './pages/CustomerCategory/CustomerCategory';
import Evaluations from './pages/Evaluation/Evaluations';
import ContactSupplier from './pages/Contacts/ContactSupplier';
import ContactCustomer from './pages/Contacts/ContactCustomer';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <AppNavbar />
        <div className="container flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/suppliers" element={<Supplier />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/supplierCategories" element={<SupplierCategory />} />
            <Route path="/customerCategories" element={<CustomerCategory />} />
            <Route path="/evaluations" element={<Evaluations />} />
            <Route path="/suppliers/:supplierId/contacts" element={<ContactSupplier />} />
            <Route path="/customers/:customerId/contacts" element={<ContactCustomer />} />
          </Routes>
        </div>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
