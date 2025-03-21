CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`todo` text NOT NULL,
	`date` text NOT NULL,
	`priority` text NOT NULL,
	`status` text NOT NULL,
	`completed` integer NOT NULL
);
