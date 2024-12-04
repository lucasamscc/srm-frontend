import api from './api';

// Obter todas as categorias de clientes
export const getCustomerCategories = async () => {
  const response = await api.get('/customerCategories');
  return response.data;
};

// Obter uma categoria de cliente específica pelo ID
export const getCustomerCategoryById = async (id) => {
  const response = await api.get(`/customerCategories/${id}`);
  return response.data;
};

// Criar uma nova categoria de cliente
export const createCustomerCategory = async (customerCategory) => {
  const response = await api.post('/customerCategories', customerCategory);
  return response.data;
};

// Atualizar uma categoria de cliente existente
export const updateCustomerCategory = async (id, customerCategory) => {
  const response = await api.put(`/customerCategories/${id}`, customerCategory);
  return response.data;
};

// Excluir uma categoria de cliente
export const deleteCustomerCategory = async (id) => {
  await api.delete(`/customerCategories/${id}`);
};
