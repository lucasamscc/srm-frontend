import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getCustomers, createCustomer, deleteCustomer } from '../../services/customerService';
import { getCustomerCategories } from '../../services/customerCategoryService';
import { useNavigate } from 'react-router-dom';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
    fetchCategories();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCustomerCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      fetchCustomers();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newCustomer = {
      company: {
        idCompany: formData.get('idcompany'),
        nmCompany: formData.get('name'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        idTax: formData.get('tax'),
      },
      cdCustomerCategory: formData.get('categoryId'),
    };

    try {
      await createCustomer(newCustomer);
      fetchCustomers();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }

    setEditingCustomer(null);
    handleClose();
  };

  // Função de navegação para a página de contatos
  const handleContacts = (customerId) => {
    navigate(`/customers/${customerId}/contacts/`);
  };

  return (
    <div className="container mt-4">
      <h1>Clientes</h1>
      <Button variant="primary" className="mb-3" onClick={() => handleEdit(null)}>
        Criar Cliente
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.cdCustomer}>
              <td>{customer.company?.idCompany}</td>
              <td>{customer.company?.nmCompany}</td>
              <td>{customer.company?.address}</td>
              <td>{customer.customerCategory?.nmCustomerCategory}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(customer)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(customer.cdCustomer)}
                >
                  Excluir
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleContacts(customer.cdCustomer)}
                >
                  Contatos
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCustomer ? 'Editar Cliente' : 'Criar Cliente'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formIdCompany">
              <Form.Label>ID da Empresa</Form.Label>
              <Form.Control
                type="text"
                name="idcompany"
                defaultValue={editingCustomer?.company?.idCompany || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={editingCustomer?.company?.nmCompany || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                name="address"
                defaultValue={editingCustomer?.company?.address || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="idTax">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                type="text"
                name="tax"
                defaultValue={editingCustomer?.company?.idTax || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoryId">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                name="categoryId"
                defaultValue={editingCustomer?.customerCategory?.cdCustomerCategory || ''}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.cdCustomerCategory} value={category.cdCustomerCategory}>
                    {category.cdCustomerCategory} - {category.nmCustomerCategory}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Customer;
