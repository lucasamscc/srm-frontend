import api from './api';

// Obter todas as avaliações
export const getEvaluations = async () => {
  const response = await api.get('/evaluations');
  return response.data;
};

// Criar uma nova avaliação
export const createEvaluation = async (evaluation) => {
  const response = await api.post('/evaluations', evaluation);
  return response.data;
};

// Excluir uma avaliação
export const deleteEvaluation = async (id) => {
  await api.delete(`/evaluations/${id}`);
};
