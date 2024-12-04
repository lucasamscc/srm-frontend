import api from './api';

/**
 * Função para obter os contatos de um fornecedor.
 * @param {number} supplierId - ID do fornecedor.
 * @returns {Promise<Array>} - Lista de contatos.
 */
export const getContacts = async (supplierId) => {
  try {
    const response = await api.get(`/suppliers/${supplierId}/contacts`);
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
    // Certifique-se de que supplierId é passado corretamente como uma string
    const response = await fetch(`http://localhost:8080/suppliers/${contactData.supplierId}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData), // Envia os dados do contato
    });

    if (!response.ok) {
      throw new Error('Erro ao criar contato');
    }

    return await response.json(); // Retorna o contato criado
  } catch (error) {
    console.error('Erro na requisição de criação do contato:', error);
    throw error; // Repassa o erro para quem chamar a função
  }
};


/**
 * Função para excluir um contato.
 * @param {number} contactId - ID do contato a ser excluído.
 * @returns {Promise} - Promise de exclusão.
 */
export const deleteContact = async (supplierId, contactId) => {
    try {
      const response = await api.delete(`/suppliers/${supplierId}/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir contato:', error);
      throw error;
    }
  };
  

/**
 * Função para editar um contato.
 * @param {number} supplierId - ID do fornecedor.
 * @param {number} contactId - ID do contato.
 * @param {Object} contactData - Dados do contato a ser editado.
 * @returns {Promise<Object>} - Contato atualizado.
 */
export const updateContact = async (supplierId, contactId, contactData) => {
  try {
    const response = await api.put(`/suppliers/${supplierId}/contacts/${contactId}`, contactData);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar contato:', error);
    throw error;
  }
};
