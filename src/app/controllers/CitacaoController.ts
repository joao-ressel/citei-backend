import { Request, Response, Router } from 'express';
import CitacaoService from '../services/CitacaoService';
import CitacaoInterface from '../interfaces/entities/CitacaoInterface';
import { validationResult } from 'express-validator';
import {
  CreateCitacaoValidator,
  GetCitacaoValidator,
  UpdateCitacaoValidator,
} from '../validators/CitacaoValidator';
import CitacaoRepository from '../repositories/CitacaoRepository';
import ColecaoRepository from '../repositories/ColecaoRepository';
import errorHandler from '../Errors/ErrorHandle';
import CitacaoServiceInterface from '../interfaces/services/CitacaoServiceInterface';

class CitacaoController {
  public routes = Router();
  private citacaoService: CitacaoServiceInterface;

  constructor() {
    // Inicializa o serviço de citacao com os repositórios de citacao e colecao
    this.citacaoService = new CitacaoService(
      CitacaoRepository,
      ColecaoRepository
    );
  
    // Define as rotas do controller
    this.routes.get('/citacao', GetCitacaoValidator, this.findAll.bind(this));
    this.routes.get('/citacao/:id', this.findById.bind(this));
    this.routes.post(
      '/citacao',
      CreateCitacaoValidator,
      this.create.bind(this)
    );
    this.routes.put(
      '/citacao/:id',
      UpdateCitacaoValidator,
      this.update.bind(this)
    );
    this.routes.delete('/citacao/:id', this.delete.bind(this));
  }

  // Handler para a rota GET /citacao
  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      // Chama o serviço para buscar todas as citacoes com o titulo fornecido
      const citacoes = await this.citacaoService.findAll(request.query.titulo as string);
      return response.json(citacoes);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  // Handler para a rota GET /citacao/:id
  async findById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      // Chama o serviço para buscar uma citacao pelo ID fornecido
      const citacao = await this.citacaoService.findById(Number(id));
      return response.json(citacao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  // Handler para a rota POST /citacao
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const result = validationResult(request);
      if (!result.isEmpty()) {
        // Retorna um erro de validação caso haja erros nos dados fornecidos
        return response.status(400).json({ errors: result.array() });
      }
      const citacao = request.body as CitacaoInterface;
      // Chama o serviço para criar uma nova citacao
      const newCitacao = await this.citacaoService.create(citacao);
      return response.json(newCitacao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  // Handler para a rota PUT /citacao/:id
  async update(request: Request, response: Response): Promise<Response> {
    try {
      const result = validationResult(request);
      if (!result.isEmpty()) {
        // Retorna um erro de validação caso haja erros nos dados fornecidos
        return response.status(400).json({ errors: result.array() });
      }
      const { id } = request.params;
      const citacao = request.body as CitacaoInterface;
      // Chama o serviço para atualizar uma citacao pelo ID fornecido
      const updatedCitacao = await this.citacaoService.update(
        Number(id),
        citacao
      );
      return response.json(updatedCitacao);
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }

  // Handler para a rota DELETE /citacao/:id
  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      // Chama o serviço para remover uma citacao pelo ID fornecido
      await this.citacaoService.delete(Number(id));
      return response.json({ message: 'Citacao removida com sucesso!' });
    } catch (error) {
      errorHandler(error, request, response, null);
    }
  }
}

export default new CitacaoController();
