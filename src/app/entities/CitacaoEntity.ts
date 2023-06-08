import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import ColecaoEntity from './ColecaoEntity';

@Entity('citacao')
class CitacaoEntity {
    // Identificador único gerado automaticamente
    @PrimaryGeneratedColumn('increment')
    id?: number;

    // Título da citação
    @Column({ length: 1000, type: 'varchar', nullable: false })
    titulo: string;

    // Data de criação da citação
    @CreateDateColumn({ name: 'created_at' })
    created_at?: Date;

    // ID da coleção associada à citação
    @Column({ name: 'id_colecao', type: 'int', nullable: false })
    id_colecao: number;

    // Relacionamento de um-para-muitos com a entidade de coleção
    @OneToMany(() => ColecaoEntity, (colecao) => colecao.citacoes)
    colecao?: ColecaoEntity;
}

export default CitacaoEntity;
