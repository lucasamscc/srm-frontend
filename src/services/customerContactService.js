import api from './api';

/**
 * Função para obter os contatos de um cliente.
 * @param {number} customerId - ID do cliente.
 * @returns {Promise<Array>} - Lista de contatos.
 */
export const getContacts = async (customerId) => {
  try {
    const response = await api.get(`/customers/${customerId}/contacts`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    throw error;
  }
};

/**
 * Função para criar um novo contato.
 * @param {Object} contactData - Dados do novo contato.
 * @returns {Promise<Object>} - Contato criado.
 */
export const createContact = async (contactData) => {
  try {
    const response = await fetch(`http://localhost:8080/customers/${contactData.customerId}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar contato');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição de criação do contato:', error);
    throw error;
  }
};

/**
 * Função para excluir um contato.
 * @param {number} customerId - ID do cliente.
 * @param {number} contactId - ID do contato a ser excluído.
 * @returns {Promise} - Promise de exclusão.
 */
export const deleteContact = async (customerId, contactId) => {
  try {
    const response = await api.delete(`/customers/${customerId}/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir contato:', error);
    throw error;
  }
};

/**
 * Função para editar um contato.
 * @param {number} customerId - ID do cliente.
 * @param {number} contactId - ID do contato.
 * @param {Object} contactData - Dados do contato a ser editado.
 * @returns {Promise<Object>} - Contato atualizado.
 */
export const updateContact = async (customerId, contactId, contactData) => {
  try {
    const response = await api.put(`/customers/${customerId}/contacts/${contactId}`, contactData);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar contato:', error);
    throw error;
  }
};
