import { AppError, HttpCode } from '../Errors/AppError';
import ColecaoEntity from '../entities/ColecaoEntity';
import ColecaoInterface from '../interfaces/entities/ColecaoInterface';
import { ColecaoRepositoryInterface } from '../interfaces/repositories/ColecaoRepositoryInterface';
import ColecaoServiceInterface from '../interfaces/services/ColecaoServiceInterface';
import ColecaoRepository from '../repositories/ColecaoRepository';

class ColecaoService implements ColecaoServiceInterface {
  private readonly colecaoRepository: ColecaoRepositoryInterface;

  constructor(colecaoRepository: ColecaoRepositoryInterface) {
    // Injeta a dependência do repositório de coleção
    this.colecaoRepository = colecaoRepository;
  }

  // Retorna todas as coleções ou as coleções filtradas por título
  async findAll(titulo?: string): Promise<ColecaoEntity[]> {
    return await this.colecaoRepository.findAll(titulo);
  }

  // Retorna uma coleção pelo ID fornecido, caso exista. Caso contrário, lança um erro de não encontrado
  async findById(id: number): Promise<ColecaoEntity> {
    const colecao = await this.colecaoRepository.findById(id);
    if (colecao) {
      return colecao;
    }
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: `Citacao com ID ${id} Não encontrada.`,
    });
  }

  // Cria uma nova coleção com os campos de autor, título, subtitulo e imagem fornecidos
  async create({
    autor,
    titulo,
    subtitulo,
    imagem,
  }: ColecaoInterface): Promise<ColecaoEntity> {
    return await this.colecaoRepository.create({
      autor,
      titulo,
      subtitulo,
      imagem,
    });
  }

  // Atualiza uma coleção pelo ID fornecido, com os campos de autor, título, subtitulo e/ou imagem (caso fornecidos)
  async update(
    id: number,
    { autor, titulo, subtitulo, imagem }: ColecaoInterface
  ): Promise<ColecaoEntity> {
    const colecao = await this.colecaoRepository.getColecaoOnly(id);
    // verifica se a coleção existe
    if (!colecao) {
      // caso não exista, lança um erro de não encontrado
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: `Colecao com ID ${id} Não encontrada.`,
      });
    }
    // caso exista, atualiza os campos fornecidos
    if (autor) {
      colecao.autor = autor;
    }

    if (titulo) {
      colecao.titulo = titulo;
    }

    if (subtitulo) {
      colecao.subtitulo = subtitulo;
    }

    if (imagem) {
      colecao.imagem = imagem;
    }

    return await this.colecaoRepository.update(id, colecao);
  }

  // Exclui uma coleção pelo ID fornecido, caso exista. Caso contrário, lança um erro de não encontrado
  async delete(id: number): Promise<void> {
    const colecao = await this.colecaoRepository.getColecaoOnly(id);
    if (!colecao) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: `Colecao com ID ${id} Não encontrada.`,
      });
    }
    return await this.colecaoRepository.delete(id);
  }
}

export default ColecaoService;
