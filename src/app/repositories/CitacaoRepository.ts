import CitacaoEntity from "../entities/CitacaoEntity";
import CitacaoInterface from "../interfaces/entities/CitacaoInterface";
import { AppDataSource } from "../../database/data-source";
import { CitacaoRepositoryInterface } from "../interfaces/repositories/CitacaoRepositoryInterface";
import { Repository } from "typeorm";

class CitacaoRepository implements CitacaoRepositoryInterface {
  private readonly citacaoRepository: Repository<CitacaoEntity>;

  constructor() {
    // Obtém o repositório da entidade CitacaoEntity a partir da instância do AppDataSource
    this.citacaoRepository = AppDataSource.getRepository(CitacaoEntity)
  }

  async findAll(titulo: string): Promise<CitacaoEntity[]> {
    let query = `
    SELECT
      citacao.id,
      citacao.titulo as citacao_titulo,
      citacao.created_at as citacao_created_at,
      colecao.id as colecao_id,
      colecao.titulo as colecao_titulo,
      colecao.subtitulo as colecao_subtitulo,
      colecao.imagem as colecao_imagem,
      colecao.autor as colecao_autor
    FROM
      citacao
    LEFT JOIN
      colecao ON citacao.id_colecao = colecao.id
  `;
    
    if (titulo) {
      query += `WHERE citacao.titulo LIKE '%${titulo}%'`
    }

    // Executa a consulta SQL usando o método query do repositório
    return this.citacaoRepository.query(query)
  }

  async findById(id: number): Promise<CitacaoEntity | null> {
    const query = `
    SELECT
      citacao.id,
      citacao.titulo as citacao_titulo,
      citacao.created_at as citacao_created_at,
      colecao.id as colecao_id,
      colecao.titulo as colecao_titulo,
      colecao.subtitulo as colecao_subtitulo,
      colecao.imagem as colecao_imagem,
      colecao.autor as colecao_autor
    FROM
      citacao
    INNER JOIN
      colecao ON citacao.id_colecao = colecao.id
    WHERE
      citacao.id = ${id}`;
  
    // Executa a consulta SQL usando o método query do repositório
    const citacao = await this.citacaoRepository.query(query)

    // Retorna a primeira entidade encontrada ou null se nenhuma entidade foi encontrada
    return citacao.length ? citacao[0] : null
  }

  async getCitacaoOnly(id: number): Promise<CitacaoEntity> {
    // Obtém uma única entidade CitacaoEntity com base no ID usando o método findOne do repositório
    return this.citacaoRepository.findOne({ where: { id } })
  }

  async create(colecao: CitacaoInterface): Promise<CitacaoEntity> {
    // Cria uma nova entidade CitacaoEntity no banco de dados usando o método save do repositório
    return this.citacaoRepository.save(colecao)
  }

  async update(id: number, colecao: CitacaoInterface): Promise<CitacaoEntity> {
    // Atualiza uma entidade CitacaoEntity existente no banco de dados usando o método update do repositório
    await this.citacaoRepository.update(id, colecao)

    // Obtém a entidade atualizada usando o método findOne do repositório
    return this.citacaoRepository.findOne({ where: { id } })
  }

  async delete(id: number): Promise<void> {
    // Exclui uma entidade CitacaoEntity do banco de dados usando o método delete do repositório
    await this.citacaoRepository.delete(id)
  }
}

export default new CitacaoRepository()
