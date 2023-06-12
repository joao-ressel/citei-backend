import { ColecaoRepositoryInterface } from "../../../app/interfaces/repositories/ColecaoRepositoryInterface";
import { CreatedColecaoFixture, ManyColecaoFixture, OneColecaoFixture } from "../fixtures/ColecaoFixture";

//utiliza biblioteca jest que permite substituir o comportamento real do repositório por um comportamento simulado
export const ColecaoRepositoryMock = (): jest.Mocked<ColecaoRepositoryInterface> => {
  return {
    findAll: jest.fn().mockResolvedValue(ManyColecaoFixture),
    findById: jest.fn().mockResolvedValue(OneColecaoFixture),
    create: jest.fn().mockResolvedValue(CreatedColecaoFixture),
    update: jest.fn().mockResolvedValue(OneColecaoFixture),
    delete: jest.fn(),
    getColecaoOnly: jest.fn().mockResolvedValue(OneColecaoFixture),
  } as jest.Mocked<ColecaoRepositoryInterface>;
};