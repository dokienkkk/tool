import {Entity, Column, PrimaryColumn} from 'typeorm/browser';

@Entity('address')
export class Address {
  @PrimaryColumn('uuid', {name: 'id'})
  id: string;

  @Column('integer', {name: 'order'})
  order: number;

  @Column('integer', {name: 'deviceType'})
  deviceType: number;

  @Column('text', {name: 'deviceName'})
  deviceName: string;

  @Column('datetime', {name: 'createAt', default: () => 'datetime()'})
  createAt: Date;
}
