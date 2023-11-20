import { MigrationInterface, QueryRunner } from "typeorm";

export class Partai1700452355587 implements MigrationInterface {
    name = 'Partai1700452355587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partai" ("id" SERIAL NOT NULL, "namaPartai" character varying NOT NULL, "ketuaUmum" character varying NOT NULL, "visiMisi" character varying NOT NULL, "alamat" character varying NOT NULL, "image" character varying NOT NULL, "postedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c5c70fa29884e15f3b88a1b40b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "partai"`);
    }

}
