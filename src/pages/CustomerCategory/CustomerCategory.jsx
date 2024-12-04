import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import {
  getCustomerCategories,
  createCustomerCategory,
  updateCustomerCategory,
  deleteCustomerCategory,
} from '../../services/customerCategoryService';

function CustomerCategory() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Carregar categorias ao montar o componente
  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleEdit = (category) => {
    setEditingCategory(category);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomerCategory(id);
      fetchCategories();
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newCategory = {
      idCustomerCategory: formData.get('idCustomerCategory'),
      nmCustomerCategory: formData.get('nmCustomerCategory'),
    };

    try {
      if (editingCategory) {
        await updateCustomerCategory(editingCategory.cdCustomerCategory, newCategory);
      } else {
        await createCustomerCategory(newCategory);
      }
      fetchCategories();
      setErrorMessage('');
    } catch (error) {
      // Capturar erro e definir a mensagem
      setErrorMessage(error.response ? error.response.data.message : 'Erro ao salvar categoria');
      console.error('Erro ao salvar categoria:', error);
    }

    setEditingCategory(null);
    handleClose();
  };

  return (
    <div className="container mt-4">
      <h1>Categorias de Clientes</h1>

      {/* Exibir alerta com a mensagem de erro, se houver */}
      {errorMessage && (
        <Alert variant="danger">
          <strong>Erro!</strong> {errorMessage}
        </Alert>
      )}

      <Button variant="primary" className="mb-3" onClick={() => handleEdit(null)}>
        Criar Categoria
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome da Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.cdCustomerCategory}>
              <td>{category.idCustomerCategory}</td>
              <td>{category.nmCustomerCategory}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(category)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(category.cdCustomerCategory)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para criar/editar categoria */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategory ? 'Editar Categoria' : 'Criar Categoria'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formIdCustomerCategory">
              <Form.Label>ID da Categoria</Form.Label>
              <Form.Control
                type="text"
                name="idCustomerCategory"
                defaultValue={editingCategory?.idCustomerCategory || ''}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNmCustomerCategory">
              <Form.Label>Nome da Categoria</Form.Label>
              <Form.Control
                type="text"
                name="nmCustomerCategory"
                defaultValue={editingCategory?.nmCustomerCategory || ''}
                required
              />
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

export default CustomerCategory;
