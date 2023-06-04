import { Request, Response, Router } from "express";
import ColecaoService from "../services/ColecaoService";
import ColecaoInterface from "../interfaces/entities/ColecaoInterface";
import { CreateColecaoValidator, UpdateColecaoValidator } from "../validators/ColecaoValidator";

class ColecaoController {
    public routes = Router()

    constructor() {
        this.routes.get('/colecao', this.findAll)
        this.routes.get('/colecao/:id', this.findById)
        this.routes.post('/colecao', CreateColecaoValidator, this.create)
        this.routes.put('/colecao/:id', UpdateColecaoValidator, this.update)
        this.routes.delete('/colecao/:id', this.delete)
    }

    async findAll(_request: Request, response: Response): Promise<Response> {
        const colecoes = await ColecaoService.findAll()
        return response.json(colecoes)
    }

    async findById(request: Request, response: Response): Promise<Response>  {
        const { id } = request.params
        const colecao = await ColecaoService.findById(Number(id))
        return response.json(colecao)
    }

    async create(request: Request, response: Response): Promise<Response> {
        const colecao = request.body as ColecaoInterface
        const newColecao = await ColecaoService.create(colecao)
        return response.json(newColecao)
    }

    async update (request: Request, response: Response): Promise<Response>  {
        const { id } = request.params
        const colecao = request.body as ColecaoInterface
        const updatedColecao = await ColecaoService.update(Number(id), colecao)
        return response.json(updatedColecao)
    }

    async delete (request: Request, response: Response): Promise<Response>  {
        const { id } = request.params
        await ColecaoService.delete(Number(id))
        return response.json({ message: 'Colecao removida com sucesso!' })
    }
}

export default new ColecaoController()