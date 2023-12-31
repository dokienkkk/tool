import {Entity, Column, PrimaryColumn} from 'typeorm/browser';

@Entity('project')
export class Project {
  @PrimaryColumn('uuid', {name: 'id'})
  id: string;

  @Column('text', {name: 'name'})
  name: string;

  @Column('datetime', {name: 'createAt', default: () => 'datetime()'})
  createAt: Date;
}
