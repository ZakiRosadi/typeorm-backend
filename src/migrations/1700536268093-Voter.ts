import { MigrationInterface, QueryRunner } from "typeorm";

export class Voter1700536268093 implements MigrationInterface {
    name = 'Voter1700536268093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "voter" ("id" SERIAL NOT NULL, "name" integer NOT NULL, "address" character varying NOT NULL, "gender" character varying NOT NULL, "electedPaslon" character varying NOT NULL, CONSTRAINT "PK_c1a0d8fd992c199219325d43705" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "voter"`);
    }

}
