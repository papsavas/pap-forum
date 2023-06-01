CREATE TABLE `comments` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`edited_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`author_id` int NOT NULL,
	`post_id` int NOT NULL);

CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`author_id` int NOT NULL,
	`title` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`edited_at` timestamp ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`username` varchar(20) NOT NULL,
	`email` text NOT NULL,
	`full_name` varchar(64) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`edited_at` timestamp ON UPDATE CURRENT_TIMESTAMP);
