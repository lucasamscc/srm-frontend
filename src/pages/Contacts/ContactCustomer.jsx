import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getContacts, createContact, deleteContact, updateContact } from '../../services/customerContactService';

function ContactCustomer() {
  const { customerId } = useParams();
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, [customerId]);

  const fetchContacts = async () => {
    try {
      const data = await getContacts(customerId);
      setContacts(data);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const contactData = {
      nmContact: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
      customerId,
    };

    try {
      await createContact(contactData);
      fetchContacts();
      setNewContact({ name: '', email: '', phone: '' });
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao criar contato:', error);
    }
  };

  const handleDelete = async (contact) => {
    const contactId = contact.cdContact;
    if (!contactId) {
      console.error('ID do contato não encontrado.');
      return;
    }

    try {
      await deleteContact(customerId, contactId);
      fetchContacts();
    } catch (error) {
      console.error('Erro ao excluir contato:', error);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingContact(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!editingContact || !editingContact.cdContact) {
      console.error('ID do contato não encontrado.');
      return;
    }

    const updatedContact = {
      nmContact: editingContact.nmContact,
      email: editingContact.email,
      phone: editingContact.phone,
    };

    try {
      await updateContact(customerId, editingContact.cdContact, updatedContact);
      fetchContacts();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao editar contato:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Contatos do Cliente {customerId}</h2>
      <Button variant="secondary" className="me-2" onClick={() => navigate(`/customers/`)}>
        Voltar para Clientes
      </Button>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Criar Contato
      </Button>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.cdContact || contact.email}>
              <td>{contact.nmContact}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(contact)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(contact)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingContact ? 'Editar Contato' : 'Criar Contato'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={editingContact ? handleSave : handleCreate}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={editingContact ? editingContact.nmContact : newContact.name}
                onChange={(e) => {
                  if (editingContact) {
                    setEditingContact({ ...editingContact, nmContact: e.target.value });
                  } else {
                    setNewContact({ ...newContact, name: e.target.value });
                  }
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editingContact ? editingContact.email : newContact.email}
                onChange={(e) =>
                  editingContact
                    ? setEditingContact({ ...editingContact, email: e.target.value })
                    : setNewContact({ ...newContact, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                value={editingContact ? editingContact.phone : newContact.phone}
                onChange={(e) =>
                  editingContact
                    ? setEditingContact({ ...editingContact, phone: e.target.value })
                    : setNewContact({ ...newContact, phone: e.target.value })
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
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

export default ContactCustomer;
