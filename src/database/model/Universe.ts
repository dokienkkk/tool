import {Entity, Column, PrimaryColumn} from 'typeorm/browser';

@Entity('Universe')
export class Universe {
  @PrimaryColumn('uuid', {name: 'id'})
  id: string;

  @Column('text', {name: 'name'})
  name: string;

  @Column('integer', {name: 'index'})
  index: number;

  @Column('text', {name: 'projectId'})
  projectId: string;

  @Column('datetime', {name: 'createAt', default: () => 'datetime()'})
  createAt: Date;
}
