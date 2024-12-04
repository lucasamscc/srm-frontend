import api from './api';

// Obter todas as categorias de fornecedores
export const getSupplierCategories = async () => {
  const response = await api.get('/supplierCategories');
  return response.data;
};

// Obter uma categoria específica pelo ID
export const getSupplierCategoryById = async (id) => {
  const response = await api.get(`/supplierCategories/${id}`);
  return response.data;
};

// Criar uma nova categoria de fornecedor
export const createSupplierCategory = async (supplierCategory) => {
  const response = await api.post('/supplierCategories', supplierCategory);
  return response.data;
};

// Atualizar uma categoria de fornecedor existente
export const updateSupplierCategory = async (id, supplierCategory) => {
  const response = await api.put(`/supplierCategories/${id}`, supplierCategory);
  return response.data;
};

// Excluir uma categoria de fornecedor
export const deleteSupplierCategory = async (id) => {
  await api.delete(`/supplierCategories/${id}`);
};
