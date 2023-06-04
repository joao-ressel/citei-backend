import { Request, Response, Router } from "express";
import CitacaoService from "../services/CitacaoService";
import CitacaoInterface from "../interfaces/entities/CitacaoInterface";
import { validationResult } from 'express-validator';
import { CreateCitacaoValidator, UpdateCitacaoValidator } from "../validators/CitacaoValidator";

class CitacaoController {
    public routes = Router()
    private readonly citacaoService
    constructor() {
        this.citacaoService = new CitacaoService();
        this.routes.get('/citacao',  this.findAll)
        this.routes.get('/citacao/:id', this.findById)
        this.routes.post('/citacao', CreateCitacaoValidator, this.create)
        this.routes.put('/citacao/:id', UpdateCitacaoValidator, this.update)
        this.routes.delete('/citacao/:id', this.delete)
    }

    async findAll(_request: Request, response: Response): Promise<Response> {
        const citacoes = await this.citacaoService.findAll()
        return response.json(citacoes)
    }

    async findById(request: Request, response: Response): Promise<Response>  {
        const { id } = request.params
        const citacao = await this.citacaoService.findById(Number(id))
        return response.json(citacao)
    }

    async create(request: Request, response: Response): Promise<Response> {
        const result = validationResult(request);
        if (!result.isEmpty()) {
            return response.status(400).json({ errors: result.array() });
        }
        const citacao = request.body as CitacaoInterface
        const newCitacao = await this.citacaoService.create(citacao)
        return response.json(newCitacao)
    }

    async update (request: Request, response: Response): Promise<Response>  {
        const result = validationResult(request);
        if (!result.isEmpty()) {
            return response.status(400).json({ errors: result.array() });
        }
        const { id } = request.params
        const citacao = request.body as CitacaoInterface
        const updatedCitacao = await this.citacaoService.update(Number(id), citacao)
        return response.json(updatedCitacao)
    }

    async delete (request: Request, response: Response): Promise<Response>  {
        const { id } = request.params
        await this.citacaoService.delete(Number(id))
        return response.json({ message: 'Citacao removida com sucesso!' })
    }
}

export default new CitacaoController()