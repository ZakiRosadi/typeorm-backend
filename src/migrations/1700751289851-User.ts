import { MigrationInterface, QueryRunner } from "typeorm";

export class User1700751289851 implements MigrationInterface {
    name = 'User1700751289851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Partai" ("id" SERIAL NOT NULL, "namaPartai" character varying NOT NULL, "ketuaUmum" character varying NOT NULL, "visiMisi" character varying NOT NULL, "alamat" character varying NOT NULL, "image" character varying NOT NULL, "postedAt" TIMESTAMP NOT NULL DEFAULT now(), "paslonId" integer, CONSTRAINT "PK_32028bd05b75043b0befa9cdfdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pemilu" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "Partai" ADD CONSTRAINT "FK_f46f23199234646401f5e934b0e" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pemilu" ADD CONSTRAINT "FK_4ccb1b866e39257684c1c406883" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pemilu" DROP CONSTRAINT "FK_4ccb1b866e39257684c1c406883"`);
        await queryRunner.query(`ALTER TABLE "Partai" DROP CONSTRAINT "FK_f46f23199234646401f5e934b0e"`);
        await queryRunner.query(`ALTER TABLE "pemilu" DROP COLUMN "userId"`);
        await queryRunner.query(`DROP TABLE "Partai"`);
    }

}
