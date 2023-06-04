import CitacaoEntity from "../../entities/CitacaoEntity";
import CitacaoInterface from "../entities/CitacaoInterface";

interface CitacaoServiceInterface {
  findAll(): Promise<CitacaoEntity[]>;
  findById(id: number): Promise<CitacaoEntity>;
  create(citacao: CitacaoInterface): Promise<CitacaoEntity>;
  update(id: number, colecao: CitacaoInterface): Promise<CitacaoEntity>;
  delete(id: number): Promise<void>;
}

export default CitacaoServiceInterface;