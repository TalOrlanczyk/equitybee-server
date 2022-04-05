import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({tableName: 'domains'})
export class Domains extends Model {
  @AllowNull(false)
  @Column
  domain: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  domainAliases: string[];

  @AllowNull(false)
  @Unique
  @Column
  domainId: string;

  @AllowNull(false)
  @Column(DataType.JSONB)
  additionalInformation: {
    logo: string;
    name: string;
    description: string;
    industry: string;
    money_raised: string;
    market_cap: string;
    annual_revenue: string;
    location: string;
    number_of_employees: string;
  };
}
