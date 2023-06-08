import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import CitacaoEntity from './CitacaoEntity';

@Entity('colecao')
class ColecaoEntity {
    // Identificador único gerado automaticamente
    @PrimaryGeneratedColumn('increment')
    id: number;

    // Título da coleção
    @Column({ length: 100, type: 'varchar', nullable: false })
    titulo: string;

    // Subtítulo da coleção (opcional)
    @Column({ length: 100, type: 'varchar', nullable: true })
    subtitulo?: string;

    // URL ou caminho da imagem representando a coleção
    @Column({ type: 'varchar' })
    imagem: string;

    // Autor da coleção
    @Column({ length: 100, type: 'varchar', nullable: false })
    autor: string;

    // Data de criação da coleção
    @CreateDateColumn({ name: 'created_at' })
    created_at?: Date;

    // Relacionamento de um-para-muitos com a entidade de citação
    @OneToMany(() => CitacaoEntity, (citacao) => citacao.colecao)
    citacoes?: CitacaoEntity[];
}

export default ColecaoEntity;
