import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLocations1627368354121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'locations',
            columns: [
             {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            },
              {
                name: 'name',
                type: 'varchar',
              },
              {
                name: 'latitude',
                type: 'decimal',
                scale: 10,
                precision: 2,
              },
              {
                name: 'longitude',
                type: 'decimal',
                scale: 10,
                precision: 2,
              },
              {
                name: 'about',
                type: 'text',
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
              },
            ]
          }))
        }
      
        public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropTable('locations');
        }
      }
      