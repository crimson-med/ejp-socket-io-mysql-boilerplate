CREATE TABLE `ejp_dev`.`user`
  (
     `id`              INT(11) NOT NULL auto_increment,
     `username`        VARCHAR(255) NOT NULL,
     `email`           VARCHAR(255) NOT NULL,
     `password`        VARCHAR(255) NOT NULL,
     `ip`              VARCHAR(255) NOT NULL,
     `firstconnection` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     `lastconnection`  TIMESTAMP NOT NULL,
     PRIMARY KEY (`id`)
  )
engine = innodb;

INSERT INTO `ejp_dev`.`user`
            (`id`,
             `username`,
             `email`,
             `password`,
             `ip`,
             `firstconnection`,
             `lastconnection`)
VALUES      ('1',
             'ejp_test',
             'ejp_test@dev.com',
             '$2a$15$aGoHFL.0yNqubjCoqmG.p.YAD.5yx3wVdjElfDHZqdxosO2oxBF0m',
             '::ffff:127.0.0.1',
             '2018-07-07 05:05:12',
             '2018-07-07 05:05:12');
