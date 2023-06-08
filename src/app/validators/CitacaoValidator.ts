import { body } from 'express-validator';

// Validador para a criação de uma nova citação
export const CreateCitacaoValidator = [
  // Verifica se o campo 'titulo' não está vazio e é uma string
  body('titulo').notEmpty().isString(),
  // Verifica se o campo 'id_colecao' não está vazio e é um número inteiro
  body('id_colecao').notEmpty().isInt(),
];

// Validador para a atualização de uma citação existente
export const UpdateCitacaoValidator = [
  // Verifica se o campo 'titulo' é opcional, e caso esteja presente, é uma string com tamanho entre 3 e 255 caracteres
  body('titulo').optional().isString().isLength({ min: 3, max: 255 }),
  // Verifica se o campo 'id_colecao' é opcional, e caso esteja presente, é um número inteiro
  body('id_colecao').optional().isNumeric().isInt(),
];

// Validador para a busca de citações
export const GetCitacaoValidator = [
  // Verifica se o campo 'titulo' é opcional, e caso esteja presente, é uma string com tamanho máximo de 255 caracteres
  body('titulo').optional().isString().isLength({ max: 255 }),
];
