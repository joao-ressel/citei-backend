import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateColecaoTable1685670316914 } from './migrations/1685670316914-CreateColecaoTable'
import { CreateCitacaoTable1685674751168 } from './migrations/1685674751168-CreateCitacaoTable'
import ColecaoEntity from "../app/entities/ColecaoEntity"
import CitacaoEntity from "../app/entities/CitacaoEntity"

// Cria uma nova instância de DataSource para configurar a conexão com o banco de dados
export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any,     // Tipo de banco de dados definido no arquivo .env
    host: process.env.DB_HOST,            // Host do banco de dados definido no arquivo .env
    port: process.env.DB_PORT as any,     // Porta do banco de dados definida no arquivo .env
    username: process.env.DB_USER,        // Nome de usuário do banco de dados definido no arquivo .env
    password: process.env.DB_PASS,        // Senha do banco de dados definida no arquivo .env
    database: process.env.DB_NAME,        // Nome do banco de dados definido no arquivo .env
    synchronize: true,                    // Sincroniza as entidades com o esquema do banco de dados
    logging: false,                       // Desativa o log do TypeORM
    entities: [ColecaoEntity, CitacaoEntity],  // Entidades usadas pela aplicação
    migrations: [CreateColecaoTable1685670316914, CreateCitacaoTable1685674751168],  // Migrações usadas pela aplicação
    subscribers: [],                      // Subscribers usados pela aplicação
})
