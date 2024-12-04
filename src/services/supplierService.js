import api from './api';

// Obter todos os fornecedores
export const getSuppliers = async () => {
  const response = await api.get('/suppliers');
  return response.data;
};

// Obter um fornecedor específico
export const getSupplier = async (id) => {
  const response = await api.get(`/suppliers/${id}`);
  return response.data;
};

// Criar um novo fornecedor
export const createSupplier = async (supplierRequestDTO) => {
  const response = await api.post('/suppliers', supplierRequestDTO);
  return response.data;
};

// Excluir um fornecedor
export const deleteSupplier = async (id) => {
  await api.delete(`/suppliers/${id}`);
};
