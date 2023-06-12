import { body, query } from 'express-validator';

export const CreateColecaoValidator = [//array de validadores para a rota de criação de coleção
//valida os seguintes campos do corpo da requisição
  body('titulo').notEmpty().isString().isLength({ max: 255 }),
  body('imagem').optional().isString().isLength({ max: 255 }),
  body('autor').notEmpty().isString().isLength({ max: 255 }),
  body('subtitulo').optional().isString().isLength({ max: 255 }),
];

export const UpdateColecaoValidator = [//validadores para a rota de atualização de coleção
  body('titulo').optional().isString().isLength({ max: 255 }),
  body('imagem').optional().isString().isLength({ max: 255 }),
  body('autor').optional().isString().isLength({ max: 255 }),
  body('subtitulo').optional().isString().isLength({ max: 255 }),
];


export const GetColecaoValidator = [//para a rota de busca de coleção
  query('titulo').optional().isString().isLength({ max: 255 }),
]