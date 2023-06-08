import { AppError } from "../../../app/Errors/AppError";
import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import ColecaoService from "../../../app/services/ColecaoService";
import { ColecaoInterfaceFixture, CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../../config/fixtures/ColecaoFixture";
import { ColecaoRepositoryMock } from "../../config/mocks/ColecaoRepositoryMock";

// Descreve o conjunto de testes para o ColecaoService
describe('ColecaoService', () => {
  let colecaoService: ColecaoService;
  let colecaoRepositoryMock: ColecaoRepositoryInterface;

  // Executado antes de cada teste
  beforeEach(() => {
    colecaoRepositoryMock = ColecaoRepositoryMock();
    colecaoService = new ColecaoService(colecaoRepositoryMock);
  });

  // Executado após cada teste
  afterEach(() => {
    jest.resetAllMocks();
  });

  // Testa o método findAll
  describe('findAll', () => {
    it('should return all ColecaoEntity objects', async () => {
      // Chama o método findAll e espera o resultado
      const result = await colecaoService.findAll();

      // Verifica se o resultado é igual ao fixture ManyColecaoFixture
      expect(result).toEqual(ManyColecaoFixture);

      // Verifica se o método findAll do colecaoRepositoryMock foi chamado
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalled();
    });

    it('should call the repository with the specified title', async () => {
      // Chama o método findAll com o título 'titulo'
      await colecaoService.findAll('titulo');

      // Verifica se o método findAll do colecaoRepositoryMock foi chamado com o título 'titulo'
      expect(colecaoRepositoryMock.findAll).toHaveBeenCalledWith('titulo');
    });
  });

  // Testa o método findById
  describe('findById', () => {
    it('should return the ColecaoEntity object with the specified ID', async () => {
      // Chama o método findById com o ID 1
      const result = await colecaoService.findById(1);

      // Verifica se o resultado é igual ao fixture OneColecaoFixture
      expect(result).toEqual(OneColecaoFixture);

      // Verifica se o método findById do colecaoRepositoryMock foi chamado com o ID 1
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // Simula que o método findById do colecaoRepositoryMock retorna null
      jest.spyOn(colecaoRepositoryMock, 'findById').mockResolvedValue(null);

      // Chama o método findById com o ID 1 e espera que lance um erro do tipo AppError
      await expect(colecaoService.findById(1)).rejects.toThrow(AppError);

      // Verifica se o método findById do colecaoRepositoryMock foi chamado com o ID 1
      expect(colecaoRepositoryMock.findById).toHaveBeenCalledWith(1);
    });
  });

  // Testa o método create
  describe('create', () => {
    it('should create a new ColecaoEntity object', async () => {
      // Chama o método create com ColecaoInterfaceFixture
      const result = await colecaoService.create(ColecaoInterfaceFixture);

      // Verifica se o resultado é igual ao fixture CreatedColecaoFixture
      expect(result).toEqual(CreatedColecaoFixture);

      // Verifica se o método create do colecaoRepositoryMock foi chamado com os dados corretos
      expect(colecaoRepositoryMock.create).toHaveBeenCalledWith({ ...OneColecaoFixture, ...ColecaoInterfaceFixture, id: undefined });
    });
  });

  // Testa o método update
  describe('update', () => {
    it('should update the ColecaoEntity object with the specified ID', async () => {
      // Chama o método update com o ID 1 e ColecaoInterfaceFixture
      const result = await colecaoService.update(1, ColecaoInterfaceFixture);

      // Verifica se o resultado é igual ao fixture OneColecaoFixture
      expect(result).toEqual(OneColecaoFixture);

      // Verifica se o método getColecaoOnly do colecaoRepositoryMock foi chamado com o ID 1
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);

      // Verifica se o método update do colecaoRepositoryMock foi chamado com os dados corretos
      expect(colecaoRepositoryMock.update).toHaveBeenCalledWith(1, { ...OneColecaoFixture, ...ColecaoInterfaceFixture });
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // Simula que o método getColecaoOnly do colecaoRepositoryMock retorna null
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);

      // Chama o método update com o ID 1 e ColecaoInterfaceFixture e espera que lance um erro do tipo AppError
      await expect(colecaoService.update(1, ColecaoInterfaceFixture)).rejects.toThrow(AppError);

      // Verifica se o método getColecaoOnly do colecaoRepositoryMock foi chamado com o ID 1
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
    });
  });

  // Testa o método delete
  describe('delete', () => {
    it('should delete the ColecaoEntity object with the specified ID', async () => {
      // Chama o método delete com o ID 1
      await colecaoService.delete(1);

      // Verifica se o método getColecaoOnly do colecaoRepositoryMock foi chamado com o ID 1
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);

      // Verifica se o método delete do colecaoRepositoryMock foi chamado com o ID 1
      expect(colecaoRepositoryMock.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the ColecaoEntity with the specified ID is not found', async () => {
      // Simula que o método getColecaoOnly do colecaoRepositoryMock retorna null
      jest.spyOn(colecaoRepositoryMock, 'getColecaoOnly').mockResolvedValue(null);

      // Chama o método delete com o ID 1 e espera que lance um erro do tipo AppError
      await expect(colecaoService.delete(1)).rejects.toThrow(AppError);

      // Verifica se o método getColecaoOnly do colecaoRepositoryMock foi chamado com o ID 1
      expect(colecaoRepositoryMock.getColecaoOnly).toHaveBeenCalledWith(1);
    });
  });
});
