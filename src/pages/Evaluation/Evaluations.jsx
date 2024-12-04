import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { getEvaluations, createEvaluation, deleteEvaluation } from '../../services/evaluationService';
import { getSuppliers } from '../../services/supplierService';

const Evaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvaluation, setNewEvaluation] = useState({ supplierId: '', score: '', comment: '' });

  useEffect(() => {
    loadEvaluations();
    loadSuppliers();
  }, []);

  const loadEvaluations = async () => {
    try {
      const data = await getEvaluations();
      setEvaluations(data);
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
    }
  };

  const loadSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error('Erro ao carregar fornecedores:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvaluation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newEvaluation,
        date: new Date().toISOString().split('T')[0],
      };
      await createEvaluation(payload);
      loadEvaluations();
      setShowModal(false);
      setNewEvaluation({ supplierId: '', score: '', comment: '' });
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
    }
  };
  

  const handleDeleteEvaluation = async (id) => {
    if (!window.confirm('Deseja realmente excluir esta avaliação?')) return;
    try {
      await deleteEvaluation(id);
      loadEvaluations();
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error);
    }
  };

  return (
    <div>
      <h2>Avaliações</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Avaliar Fornecedor
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fornecedor</th>
            <th>Pontuação</th>
            <th>Comentário</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((evaluation) => (
            <tr key={evaluation.cdEvaluation}>
              <td>{evaluation.cdEvaluation}</td>
              <td>{evaluation.supplier?.company?.nmCompany || 'Fornecedor não informado'}</td>
              <td>{evaluation.score}</td>
              <td>{evaluation.comment}</td>
              <td>{new Date(evaluation.date).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteEvaluation(evaluation.cdEvaluation)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para criar avaliação */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Avaliação</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formSupplier">
              <Form.Label>Fornecedor</Form.Label>
              <Form.Select
                name="supplierId"
                value={newEvaluation.supplierId || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione um fornecedor</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.cdSupplier} value={supplier.cdSupplier}>
                    {supplier.company?.nmCompany || 'Nome não informado'}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formScore">
              <Form.Label>Pontuação</Form.Label>
              <Form.Control
                type="number"
                name="score"
                value={newEvaluation.score}
                onChange={handleInputChange}
                min="0"
                max="10"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formComment">
              <Form.Label>Comentário</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                value={newEvaluation.comment}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
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
};

export default Evaluations;
