import { body } from 'express-validator';

export const CreateColecaoValidator = [
  body('titulo').notEmpty().isString(),
  body('imagem').notEmpty().isString(),
  body('autor').notEmpty().isString(),
  body('subtitulo').optional().isString(),
];

export const UpdateColecaoValidator = [
  body('titulo').optional().isString(),
  body('imagem').optional().isString(),
  body('autor').optional().isString(),
  body('subtitulo').optional().isString(),
];