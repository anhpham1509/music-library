DROP TABLE IF EXIST User;
DROP TABLE IF EXIST Song;

CREATE TABLE "User" (
    "id" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "name" character varying NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    CONSTRAINT "PK_User" PRIMARY KEY ("id")
);

CREATE TABLE "Song" (
    "id" character varying NOT NULL,
    "title" character varying NOT NULL,
    "artist" character varying NOT NULL,
    "cover" character varying NOT NULL,
    "url" character varying NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    CONSTRAINT "PK_Song" PRIMARY KEY ("id")
);
