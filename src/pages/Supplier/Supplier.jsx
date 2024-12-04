import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getSuppliers, createSupplier, deleteSupplier } from '../../services/supplierService';
import { getSupplierCategories } from '../../services/supplierCategoryService';
import { useNavigate } from 'react-router-dom';

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
    fetchCategories();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getSupplierCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      fetchSuppliers();
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newSupplier = {
      company: {
        idCompany: formData.get('idcompany'),
        nmCompany: formData.get('name'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        idTax: formData.get('tax')
      },
      cdSupplierCategory: formData.get('categoryId')
    };

    try {
      await createSupplier(newSupplier);
      fetchSuppliers();
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
    }

    setEditingSupplier(null);
    handleClose();
  };

  // Função de navegação para a página de contatos
  const handleContacts = (supplierId) => {
    navigate(`/suppliers/${supplierId}/contacts/`);  // Atualizada para corresponder à URL correta
  };

  return (
    <div className="container mt-4">
      <h1>Fornecedores</h1>
      <Button variant="primary" className="mb-3" onClick={() => handleEdit(null)}>
        Criar Fornecedor
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
          {suppliers.map((supplier) => (
            <tr key={supplier.cdSupplier}>
              <td>{supplier.company?.idCompany}</td>
              <td>{supplier.company?.nmCompany}</td>
              <td>{supplier.company?.address}</td>
              <td>{supplier.supplierCategory?.nmSupplierCategory}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(supplier)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(supplier.cdSupplier)}
                >
                  Excluir
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleContacts(supplier.cdSupplier)} // Redirecionamento para contatos
                >
                  Contatos
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para criar/editar fornecedor */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSupplier ? 'Editar Fornecedor' : 'Criar Fornecedor'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formIdCompany">
              <Form.Label>ID da Empresa</Form.Label>
              <Form.Control
                type="text"
                name="idcompany"
                defaultValue={editingSupplier?.company?.idcompany || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={editingSupplier?.company?.nmCompany || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                name="address"
                defaultValue={editingSupplier?.company?.address || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="idTax">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                type="text"
                name="tax"
                defaultValue={editingSupplier?.company?.idTax || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoryId">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                name="categoryId"
                defaultValue={editingSupplier?.supplierCategory?.cdSupplierCategory || ''}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.cdSupplierCategory} value={category.cdSupplierCategory}>
                    {category.cdSupplierCategory} - {category.nmSupplierCategory}
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

export default Supplier;
