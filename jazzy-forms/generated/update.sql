ALTER TABLE {{prefix}}jzzf_form ADD COLUMN `realtime` int(1) NOT NULL DEFAULT 1;
ALTER TABLE {{prefix}}jzzf_form CHANGE COLUMN css `css` LONGTEXT NOT NULL;
ALTER TABLE {{prefix}}jzzf_element ADD COLUMN `visible` int(12) NOT NULL DEFAULT 1;
ALTER TABLE {{prefix}}jzzf_element ADD COLUMN `prefix` varchar(16) NOT NULL;
ALTER TABLE {{prefix}}jzzf_element ADD COLUMN `postfix` varchar(16) NOT NULL;
ALTER TABLE {{prefix}}jzzf_element ADD COLUMN `zeros` int(1) NOT NULL;
ALTER TABLE {{prefix}}jzzf_element ADD COLUMN `decimals` int(1) NOT NULL DEFAULT 9;
ALTER TABLE {{prefix}}jzzf_element ADD COLUMN `fixed` int(1) NOT NULL DEFAULT 0;
ALTER TABLE {{prefix}}jzzf_element ADD COLUMN `thousands` varchar(1) NOT NULL;
ALTER TABLE {{prefix}}jzzf_element ADD COLUMN `point` varchar(1) NOT NULL DEFAULT '.';
ALTER TABLE {{prefix}}jzzf_element ADD COLUMN `classes` varchar(1024) NOT NULL;
ALTER TABLE {{prefix}}jzzf_element ADD COLUMN `divisions` int(1) NOT NULL DEFAULT 1;
ALTER TABLE {{prefix}}jzzf_element ADD COLUMN `break` int(1) NOT NULL DEFAULT 1;
ALTER TABLE {{prefix}}jzzf_element CHANGE COLUMN title `title` TEXT NOT NULL;
ALTER TABLE {{prefix}}jzzf_element CHANGE COLUMN formula `formula` TEXT NOT NULL;
