import { MigrationInterface, QueryRunner } from "typeorm";

export class Pemilu1700021521694 implements MigrationInterface {
  name = "Pemilu1700021521694";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pemilu" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "image" character varying NOT NULL, "author" character varying NOT NULL, "postedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ca3b9941eb997cdf81c5be9996d" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pemilu"`);
  }
}
