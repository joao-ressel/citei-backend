import ColecaoEntity from "../../../app/entities/ColecaoEntity";
import ColecaoInterface from "../../../app/interfaces/entities/ColecaoInterface";

export const OneColecaoFixture: ColecaoEntity = {//representa uma única instância da entidade
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}

export const ManyColecaoFixture: ColecaoEntity[] = [//array de objetos que representa várias instâncias da entidade
  {
    id: 1,
    titulo: 'titulo',
    subtitulo: 'subtitulo',
    autor: 'autor',
    imagem: 'imagem',
  },
  {
    id: 2,
    titulo: 'titulo',
    subtitulo: 'subtitulo',
    autor: 'autor',
    imagem: 'imagem',
  },
]

export const ColecaoInterfaceFixture: ColecaoInterface = {//representa a estrutura de dados esperada para criar uma nova instância da entidade
  titulo: 'titulo',
  autor: 'autor',
  imagem: 'imagem',
  subtitulo: 'subtitulo',
}

export const CreatedColecaoFixture: ColecaoEntity = {//é um objeto que representa uma instância da entidade que foi criada com sucesso
  id: 1,
  titulo: 'titulo',
  subtitulo: 'subtitulo',
  autor: 'autor',
  imagem: 'imagem',
}
