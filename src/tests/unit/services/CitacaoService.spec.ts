import { AppError } from "../../../app/Errors/AppError";
import { CitacaoRepositoryInterface } from "../../../app/interfaces/repositories/CitacaoRepositoryInterface";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import CitacaoService from "../../../app/services/CitacaoService";
import { OneCitacaoFixture, OneCitacaoOnlyFixture, manyCitacoesFixture, newCitacaoFixture } from "../../config/fixtures/CitacaoFixtures";
import { CitacaoRepositoryMock } from "../../config/mocks/CitacaoRepositoryMock";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";

// Descreve o conjunto de testes para o CitacaoService
describe('CitacaoService', () => {
  let citacaoService: CitacaoService;
  let citacaoRepositoryMock: CitacaoRepositoryInterface;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  // Executado antes de cada teste
  beforeEach(() => {
    citacaoRepositoryMock = CitacaoRepositoryMock();
    colecaoRepositoryMock = ColecaoRepositoryMock();
    citacaoService = new CitacaoService(citacaoRepositoryMock, colecaoRepositoryMock);
  });

  // Executado após cada teste
  afterEach(() => {
    jest.resetAllMocks();
  });

  // Testa o método findAll
  describe('findAll', () => {
    it('should return all CitacaoEntity objects', async () => {
      // Chama o método findAll e espera o resultado
      const result = await citacaoService.findAll();

      // Verifica se o resultado é igual ao fixture manyCitacoesFixture
      expect(result).toEqual(manyCitacoesFixture);

      // Verifica se o método findAll do citacaoRepositoryMock foi chamado
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    it('should send params to CitacaoRepository', async () => {
      const titulo = 'Citacao';
      // Chama o método findAll com o parâmetro 'titulo'
      const result = await citacaoService.findAll(titulo);

      // Verifica se o método findAll do citacaoRepositoryMock foi chamado com o parâmetro 'titulo'
      expect(citacaoRepositoryMock.findAll).toHaveBeenCalledWith(titulo);
    })
  });

  // Testa o método findById
  describe('findById', () => {
    it('should return the CitacaoEntity object with the specified ID', async () => {
      // Chama o método findById com o ID 1 e espera o resultado
      const result = await citacaoService.findById(1);

      // Verifica se o resultado é igual ao fixture OneCitacaoFixture
      expect(result).toEqual(OneCitacaoFixture);

      // Verifica se o método findById do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      // Simula que o método findById do citacaoRepositoryMock retorna null
      jest.spyOn(citacaoRepositoryMock, 'findById').mockResolvedValue(null);

      // Chama o método findById com o ID 1 e espera que lance um erro do tipo AppError
      await expect(citacaoService.findById(1)).rejects.toThrow(AppError);

      // Verifica se o método findById do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  // Testa o método create
  describe('create', () => {
    it('should create a new CitacaoEntity object', async () => {
      // Chama o método create com o novo objeto de citação newCitacaoFixture e espera o resultado
      const result = await citacaoService.create(newCitacaoFixture);

      // Verifica se o resultado é igual ao fixture OneCitacaoFixture
      expect(result).toEqual(OneCitacaoFixture);

      // Verifica se o método create do citacaoRepositoryMock foi chamado com o novo objeto de citação
      expect(citacaoRepositoryMock.create).toHaveBeenCalledWith(newCitacaoFixture);
    });
  });

  // Testa o método update
  describe('update', () => {
    it('should update the CitacaoEntity object with the specified ID', async () => {
      // Chama o método update com o ID 1 e um objeto contendo as propriedades a serem atualizadas
      const result = await citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 });

      // Verifica se o resultado é igual ao fixture OneCitacaoFixture
      expect(result).toEqual(OneCitacaoFixture);

      // Verifica se o método getCitacaoOnly do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);

      // Verifica se o método getColecaoOnly do colecaoRepositoryMock foi chamado com o ID 2
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);

      // Verifica se o método update do citacaoRepositoryMock foi chamado com o ID 1 e as propriedades atualizadas
      expect(citacaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneCitacaoOnlyFixture, id_colecao: 2, titulo: 'Updated Citacao'});
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // Simula que o método getColecaoOnly do colecaoRepositoryMock retorna null
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);

      // Chama o método update com o ID 1 e um objeto contendo as propriedades a serem atualizadas
      // e espera que lance um erro do tipo AppError
      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);

      // Verifica se o método getColecaoOnly do colecaoRepositoryMock foi chamado com o ID 2
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(2);
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      // Simula que o método getCitacaoOnly do citacaoRepositoryMock retorna null
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);

      // Chama o método update com o ID 1 e um objeto contendo as propriedades a serem atualizadas
      // e espera que lance um erro do tipo AppError
      await expect(citacaoService.update(1, { titulo: 'Updated Citacao', id_colecao: 2 })).rejects.toThrow(AppError);

      // Verifica se o método getCitacaoOnly do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });

  describe('delete', () => {
    it('should delete the CitacaoEntity object with the specified ID', async () => {
      await citacaoService.delete(1);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
      expect(citacaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);

      await expect(citacaoService.delete(1)).rejects.toThrow(AppError);
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });

  describe('delete', () => {
    it('should delete the CitacaoEntity object with the specified ID', async () => {
      // Chama o método delete com o ID 1
      await citacaoService.delete(1);
  
      // Verifica se o método getCitacaoOnly do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
  
      // Verifica se o método delete do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });
  
    it('should throw an error if the CitacaoEntity with the specified ID is not found', async () => {
      // Simula que o método getCitacaoOnly do citacaoRepositoryMock retorna null
      jest.spyOn(citacaoRepositoryMock, 'getCitacaoOnly').mockResolvedValue(null);
  
      // Chama o método delete com o ID 1 e espera que lance um erro do tipo AppError
      await expect(citacaoService.delete(1)).rejects.toThrow(AppError);
  
      // Verifica se o método getCitacaoOnly do citacaoRepositoryMock foi chamado com o ID 1
      expect(citacaoRepositoryMock.getCitacaoOnly).toHaveBeenCalledWith(1);
    });
  });
  
});
