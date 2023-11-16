import { MigrationInterface, QueryRunner } from "typeorm";

export class Paslon1700051932585 implements MigrationInterface {
    name = 'Paslon1700051932585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paslon" ("id" SERIAL NOT NULL, "idOrder" character varying NOT NULL, "namaPaslon" character varying NOT NULL, "visiMisi" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_f3367efce21ffeeff1e3f58244d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "paslon"`);
    }

}
