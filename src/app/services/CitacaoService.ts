import { AppError, HttpCode } from '../Errors/AppError';
import CitacaoEntity from '../entities/CitacaoEntity';
import CitacaoInterface from '../interfaces/entities/CitacaoInterface';
import { CitacaoRepositoryInterface } from '../interfaces/repositories/CitacaoRepositoryInterface';
import { ColecaoRepositoryInterface } from '../interfaces/repositories/ColecaoRepositoryInterface';
import CitacaoServiceInterface from '../interfaces/services/CitacaoServiceInterface';
import 'express-async-errors';

class CitacaoService implements CitacaoServiceInterface {
  private readonly citacaoRepository: CitacaoRepositoryInterface;
  private readonly colecaoRepository: ColecaoRepositoryInterface;

  constructor(
    citacaoRepository: CitacaoRepositoryInterface,
    colecaoRepository: ColecaoRepositoryInterface
  ) {
    // Injeta as dependências dos repositórios de citação e coleção
    this.citacaoRepository = citacaoRepository;
    this.colecaoRepository = colecaoRepository;
  }

  // Retorna todas as citações ou as citações filtradas por título
  async findAll(titulo?: string): Promise<CitacaoEntity[]> {
    return await this.citacaoRepository.findAll(titulo);
  }

  // Retorna uma citação pelo ID fornecido, caso exista. Caso contrário, lança um erro de não encontrado
  async findById(id: number): Promise<CitacaoEntity> {
    const citacao = await this.citacaoRepository.findById(id);
    if (citacao) {
      return citacao;
    }
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: `Citacao com ID ${id} Não encontrada.`,
    });
  }

  // Cria uma nova citação com o título e ID da coleção fornecidos
  async create({
    titulo,
    id_colecao,
  }: CitacaoInterface): Promise<CitacaoEntity> {
    return await this.citacaoRepository.create({ titulo, id_colecao });
  }

  // Atualiza uma citação pelo ID fornecido, com os campos de título e/ou ID da coleção (caso fornecidos)
  async update(
    id: number,
    { titulo, id_colecao }: CitacaoInterface
  ): Promise<CitacaoEntity> {
    const citacao = await this.citacaoRepository.getCitacaoOnly(id);

    if (!citacao) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: `Citacao com ID ${id} Não encontrada.`,
      });
    }

    if (titulo) {
      citacao.titulo = titulo;
    }

    if (id_colecao) {
      const colecao = await this.colecaoRepository.getColecaoOnly(id_colecao);
      if (!colecao) {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Colecao com ID ${id_colecao} Não encontrada.`,
        });
      }
      citacao.id_colecao = id_colecao;
    }

    return await this.citacaoRepository.update(id, citacao);
  }

  // Exclui uma citação pelo ID fornecido, caso exista. Caso contrário, lança um erro de não encontrado
  async delete(id: number): Promise<void> {
    const citacao = await this.citacaoRepository.getCitacaoOnly(id);
    if (!citacao) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: `Citacao com ID ${id} Não encontrada.`,
      });
    }
    await this.citacaoRepository.delete(id);
  }
}

export default CitacaoService;
