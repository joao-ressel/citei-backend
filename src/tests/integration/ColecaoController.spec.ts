import request, { SuperTest, Test } from 'supertest';
import express, { Express } from 'express';
import cors from 'cors';
import ColecaoController from '../../app/controllers/ColecaoController';
import { ColecaoRepositoryInterface } from '../../app/interfaces/repositories/ColecaoRepositoryInterface';

// Mock do ColecaoRepository para simular o comportamento dos métodos
jest.mock('../../app/repositories/ColecaoRepository', () => {
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  return {
    findAll: jest.fn().mockResolvedValue([colecao]),
    findById: jest.fn().mockResolvedValue(colecao),
    create: jest.fn().mockResolvedValue(colecao),
    update: jest.fn().mockResolvedValue(colecao),
    delete: jest.fn(),
    getColecaoOnly: jest.fn().mockResolvedValue(colecao),
  } as jest.Mocked<ColecaoRepositoryInterface>;
});

let app: Express;
let server: any;
let agent: SuperTest<Test>;

beforeAll((done) => {
  // Configuração do servidor de teste
  app = express();
  app.use(cors());
  app.use(express.json());
  app.use(ColecaoController.routes);

  // Inicia o servidor de teste
  server = app.listen(3000, () => {
    agent = request.agent(server);
    done();
  });
});

afterAll((done) => {
  // Encerra o servidor de teste
  server.close(done);
});

// Descreve o conjunto de testes para o ColecaoController
describe('ColecaoController', () => {
  const colecao = {
    id: 1,
    titulo: 'titulo',
    autor: 'autor',
    imagem: 'imagem',
  };

  // Testa o endpoint GET /colecao com título com mais de 255 caracteres
  it('should return 422 when sending a title with more than 255 characters', async () => {
    const response = await request(app).get('/colecao').query({
      titulo: 'a'.repeat(256) // 256 caracteres
    });

    expect(response.status).toBe(422); // verificando se o status code é 422
  });

  // Testa o endpoint GET /colecao/:id retornando um objeto colecao
  it('should return a 200 OK status code and a colecao object for GET /colecao/:id', async () => {
    const response = await request(app).get('/colecao/1'); // fazendo a requisição para a rota /colecao/1

    expect(response.status).toBe(200); // verificando se o status code é 200
    expect(typeof response.body === 'object').toBe(true); // verificando se o corpo da resposta é um objeto
    expect(response.body).toEqual(colecao); // verificando se o corpo da resposta é igual ao objeto colecao
  });

  // Testa o endpoint POST /colecao criando um novo objeto colecao
  it('should return a 200 OK status code and a new colecao object for POST /colecao', async () => {
    const response = await request(app).post('/colecao').send({
      titulo: 'titulo',
    }); // fazendo a requisição para a rota /colecao

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(true);
    expect(response.body).toEqual(colecao);
  });

  // Testa o endpoint POST /colecao com campos com mais de 255 caracteres
  it('should return a 422 status code when sending fields with more than 255 characters', async () => {
    const response = await request(app).post('/colecao')
    .send({ ...colecao, titulo: 'a'.repeat(256), 
    subtitulo: 'a'.repeat(256), 
    autor: 'a'.repeat(256), 
    imagem: 'a'.repeat(256) 
  }); // fazendo a requisição para a rota /colecao com campos com mais de 255 caracteres para gerar erro

    expect(response.status).toBe(422);
  });

  // Testa o endpoint POST /colecao sem enviar o título
  it('should return a 422 status code when not sending the title', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, titulo: undefined }); // fazendo a requisição para a rota /colecao sem enviar o título

    expect(response.status).toBe(422); // verificando se o status code é 422
  });

  // Testa o endpoint POST /colecao sem enviar o autor
  it('should return a 422 status code when not sending the author', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined }); // fazendo a requisição para a rota /colecao sem enviar o autor

    expect(response.status).toBe(422); // verificando se o status code é 422
    expect(response.body).toMatchSnapshot(); // verificando se o corpo da resposta é igual ao snapshot
  });

  // Testa o endpoint POST /colecao sem enviar dados obrigatórios
  it('should return a 422 status code when not sending mandatory data', async () => {
    const response = await request(app).post('/colecao').send({ ...colecao, autor: undefined, titulo: undefined, imagem: undefined });

    expect(response.status).toBe(422); // verificando se o status code é 422
    expect(response.body).toMatchSnapshot(); // verificando se o corpo da resposta é igual ao snapshot
  });

  // Testa o endpoint PUT /colecao/:id atualizando um objeto colecao
  it('should return a 200 OK status code and an updated colecao object for PUT /colecao/:id', async () => {
    const response = await request(app).put('/colecao/1').send(colecao);

    expect(response.status).toBe(200);
    expect(typeof response.body === 'object').toBe(false);
    expect(response.body).toEqual(colecao);
  });

  // Testa o endpoint DELETE /colecao/:id removendo um objeto colecao
  it('should return a 200 OK status code and a success message for DELETE /colecao/:id', async () => {
    const response = await request(app).delete('/colecao/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Colecao removida com sucesso!' });
  });
});
