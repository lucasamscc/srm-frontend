import api from './api';

// Obter todos os clientes
export const getCustomers = async () => {
  const response = await api.get('/customers');
  return response.data;
};

// Obter um cliente específico
export const getCustomer = async (id) => {
  const response = await api.get(`/customers/${id}`);
  return response.data;
};

// Criar um novo cliente
export const createCustomer = async (customerRequestDTO) => {
  const response = await api.post('/customers', customerRequestDTO);
  return response.data;
};

// Excluir um cliente
export const deleteCustomer = async (id) => {
  await api.delete(`/customers/${id}`);
};
