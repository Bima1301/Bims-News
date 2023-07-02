-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: arkatama_day1
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_name_unique` (`name`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Olahraga','olahraga-641170ce809e6','2023-03-15 00:16:30','2023-03-15 00:16:30'),(2,'Politik','politik-641268bda8dfa','2023-03-15 17:54:21','2023-03-15 17:54:21'),(3,'Pendidikan','pendidikan-641268daefb76','2023-03-15 17:54:50','2023-03-15 17:54:50'),(4,'Hiburan','hiburan-641268e5005ea','2023-03-15 17:55:01','2023-03-15 17:55:01'),(5,'Travel','travel-6412690376f38','2023-03-15 17:55:31','2023-03-15 17:55:31'),(6,'Kesehatan','kesehatan-6412690a2a69d','2023-03-15 17:55:38','2023-03-15 17:55:38');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_post`
--

DROP TABLE IF EXISTS `category_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_post` (
  `category_id` bigint unsigned NOT NULL,
  `post_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`category_id`,`post_id`),
  KEY `category_post_post_id_foreign` (`post_id`),
  CONSTRAINT `category_post_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `category_post_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_post`
--

LOCK TABLES `category_post` WRITE;
/*!40000 ALTER TABLE `category_post` DISABLE KEYS */;
INSERT INTO `category_post` VALUES (4,1),(2,2),(3,2),(2,3),(3,3),(4,3);
/*!40000 ALTER TABLE `category_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `post_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_post_id_foreign` (`post_id`),
  KEY `comments_user_id_foreign` (`user_id`),
  CONSTRAINT `comments_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2023_02_20_073455_create_posts_table',1),(6,'2023_02_21_004612_add_slug_to_post',1),(7,'2023_02_27_014004_add_status_to_post',1),(8,'2023_03_02_082443_create_categories_table',1),(9,'2023_03_02_083318_create_comments_table',1),(10,'2023_03_03_013411_create_category_post_table',1),(11,'2023_03_13_000112_create_modules_table',1),(12,'2023_03_13_005359_create_permission_tables',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1),(2,'App\\Models\\User',2),(3,'App\\Models\\User',3),(2,'App\\Models\\User',5),(3,'App\\Models\\User',5),(3,'App\\Models\\User',6);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'post','Post Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(2,'category','Category Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(3,'comment','Comment Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(4,'user','User Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(5,'role','Role Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(6,'permission','Permission Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(7,'modul','Modul Management','2023-03-13 19:02:39','2023-03-13 19:02:39');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module_id` bigint unsigned NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`),
  KEY `permissions_module_id_foreign` (`module_id`),
  CONSTRAINT `permissions_module_id_foreign` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'create post','web',1,'Create Post Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(2,'update post','web',1,'Update Post Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(3,'delete post','web',1,'Delete Post Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(4,'read post','web',1,'Read Post Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(5,'owner post','web',1,'Owner Post Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(6,'approve post','web',1,'Approve Post Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(7,'all post','web',1,'All Post Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(8,'create category','web',2,'Create Category Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(9,'update category','web',2,'Update Category Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(10,'delete category','web',2,'Delete Category Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(11,'read category','web',2,'Read Category Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(12,'owner category','web',2,'Owner Category Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(13,'approve category','web',2,'Approve Category Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(14,'all category','web',2,'All Category Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(15,'create comment','web',3,'Create Comment Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(16,'update comment','web',3,'Update Comment Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(17,'delete comment','web',3,'Delete Comment Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(18,'read comment','web',3,'Read Comment Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(19,'owner comment','web',3,'Owner Comment Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(20,'approve comment','web',3,'Approve Comment Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(21,'all comment','web',3,'All Comment Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(22,'create user','web',4,'Create User Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(23,'update user','web',4,'Update User Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(24,'delete user','web',4,'Delete User Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(25,'read user','web',4,'Read User Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(26,'owner user','web',4,'Owner User Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(27,'approve user','web',4,'Approve User Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(28,'all user','web',4,'All User Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(29,'create role','web',5,'Create Role Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(30,'update role','web',5,'Update Role Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(31,'delete role','web',5,'Delete Role Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(32,'read role','web',5,'Read Role Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(33,'owner role','web',5,'Owner Role Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(34,'approve role','web',5,'Approve Role Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(35,'all role','web',5,'All Role Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(36,'create permission','web',6,'Create Permission Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(37,'update permission','web',6,'Update Permission Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(38,'delete permission','web',6,'Delete Permission Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(39,'read permission','web',6,'Read Permission Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(40,'owner permission','web',6,'Owner Permission Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(41,'approve permission','web',6,'Approve Permission Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(42,'all permission','web',6,'All Permission Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(43,'create modul','web',7,'Create Modul Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(44,'update modul','web',7,'Update Modul Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(45,'delete modul','web',7,'Delete Modul Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(46,'read modul','web',7,'Read Modul Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(47,'owner modul','web',7,'Owner Modul Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(48,'approve modul','web',7,'Approve Modul Management','2023-03-13 19:02:39','2023-03-13 19:02:39'),(49,'all modul','web',7,'All Modul Management','2023-03-13 19:02:39','2023-03-13 19:02:39');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_user_id_foreign` (`user_id`),
  CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,2,'Abhimaan: A Bollywood marital drama that\'s relevant even after 50 years','publish','qweqweqwe-641170e158b78','<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\"><strong class=\"ssrcss-hmf8ql-BoldText e5tfeyi3\">As the 1973 Bollywood hit film Abhimaan, with superstar Amitabh Bachchan and his wife Jaya in the lead, turns 50 this year, the BBC examines the enduring charm and impact of this movie.</strong></p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Amitabh Bachchan is best-known for his role as the angry young man of Bollywood who starred in such iconic films as Deewar, Zanjeer and Sholay.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">But many consider Abhimaan (Pride) - the musical drama about the fragility of human relationships - to be among his finest roles.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">The actor plays a popular singer who convinces his new wife to join him on stage, but his ego is hurt and jealousy takes over when she outshines him.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Director Hrishikesh Mukherjee paired Bachchan with his wife Jaya - the couple were in love and had married just a month before its release - and she won the prestigious Filmfare Award for Best Actress for her performance.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Abhimaan, which completes half a century in July, has a special significance for me - it was the first-ever Bachchan film I saw and it remains my favourite of all his films even today.</p>\r\n</div>\r\n</div>\r\n<div id=\"piano-inline1\"></div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">It was among more than half a dozen Bachchan films to release that year. The list included Saudagar, which was India\'s official Oscar entry that year, and Zanjeer, the blockbuster which established him as India\'s top action hero.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">But film critic and author Saibal Chatterjee told the BBC that \"Abhimaan was the most talked about film of the year\" and \"his biggest hit that year\".</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Fans visited cinemas in droves, entire families including parents and young children packed theatres, crowding the matinee and evening shows.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Theatre actress and a self-confessed \"huge Bachchan fan\" Monisha Bhaskar says the \"evergreen story\" of the envious husband unhappy at the success of his wife touched a chord with the audiences \"because it is rooted in reality\".</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">\"Abhimaan\'s story was very believable because ego often comes between a couple, especially in a society like India where most men are uncomfortable with their wives doing better.\"</p>\r\n</div>\r\n</div>','2023-03-16','post-image/6QqFok7sJQUTj9UYatJ9wgisyzUOzJw9vVl27jJv.webp','2023-03-15 00:16:49','2023-03-15 20:22:47'),(2,2,'US drone downing: Russia will try to retrieve remnants of drone','publish','us-drone-downing-russia-will-try-to-retrieve-remnants-of-drone-6412696bebf29','<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\"><strong class=\"ssrcss-hmf8ql-BoldText e5tfeyi3\">Russia said on Wednesday that it would try to retrieve the remnants of a US drone that crashed into the Black Sea.</strong></p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">The large MQ-9 Reaper drone&nbsp;<a class=\"ssrcss-k17ofw-InlineLink e1no5rhv0\" href=\"https://www.bbc.co.uk/news/world-europe-64957792\">plunged into the water on Tuesday.</a></p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">The US said it&nbsp;<a class=\"ssrcss-k17ofw-InlineLink e1no5rhv0\" href=\"https://www.bbc.co.uk/news/world-europe-64960384\">brought down the damaged drone</a>&nbsp;after it became \"unflyable\" when a Russian jet clipped its propeller - but Moscow has denied these claims.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Speaking on state television, Russian security council secretary Nikolai Patrushev confirmed Moscow was attempting to find the aircraft.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">\"I don\'t know whether we\'ll be able to retrieve it or not but it has to be done,\" Mr Patrushev said.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">He also said that the drone\'s presence in the Black Sea was \"confirmation\" that the US was directly involved in the war.</p>\r\n</div>\r\n</div>\r\n<div id=\"piano-inline1\"></div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Senior Washington official John Kirby said the US was also searching for the aircraft, but stressed that if Russia beat them to it, \"their ability to exploit useful intelligence will be highly minimised\".</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">That message was reiterated by General Mark Milley, America\'s top military general, who said the US has taken \"mitigating measures\" to ensure there was nothing of value on the downed drone.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">He said it would be challenging to retrieve the drone, noting the water where it crashed was anywhere between 4,000ft to 5,000ft (1,200m to 1,500m) deep.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">US military officials said the incident happened on Tuesday morning and the confrontation lasted around 30-40 minutes.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">In a statement, the US said Russian jets dumped fuel on the drone several times before the collision.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Pentagon spokesman Brig Gen Pat Ryder told reporters the drone was \"unflyable and uncontrollable\", adding the collision also likely damaged the Russian aircraft.</p>\r\n</div>\r\n</div>\r\n<div id=\"piano-inline2\"></div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Russia has denied its two Su-27 fighter jets made any contact with the US drone.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Russia\'s defence ministry said the drone crashed after a \"sharp manoeuvre\", and that it was flying with its transponders (communication devices) turned off.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">The US Defence Secretary, Lloyd Austin, confirmed he had spoken with his Russian counterpart, Sergei Shoigu, the day after the drone was downed.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">In a statement released after the phonecall, Russia\'s defence ministry said Mr Shoigu blamed the incident on \"increased reconnaissance activities against the interests of the Russian Federation\". It also called US drone flights off the coast of Crimea \"provocative\".</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"unordered-list-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<div class=\"ssrcss-1o5f7ft-BulletListContainer e5tfeyi0\">\r\n<ul role=\"list\">\r\n<li><a class=\"ssrcss-k17ofw-InlineLink e1no5rhv0\" href=\"https://www.bbc.co.uk/news/world-europe-64959498\">The US drone crash is a moment fraught with danger</a></li>\r\n</ul>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">The US and UK have previously gone to extraordinary lengths to recover their technology after crashes.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">They retrieved the wreckage of their stealth fighter jet, the F-35 from the bottom of the South China Sea after it sank.</p>\r\n</div>\r\n</div>\r\n<div id=\"piano-inline3\"></div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">But on the face of it, the Pentagon seems more relaxed about losing a Reaper drone. It\'s older technology and numerous have been lost before.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">And trying to recover a downed drone in deep waters, next to a war zone, with Russian ships and submarines patrolling, could present even greater risks of escalation.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Tensions have risen over the Black Sea ever since Russia\'s annexation of nearby Crimea in 2014.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">And since Russia\'s full-scale invasion of Ukraine, the US and the UK have stepped up surveillance flights, though always operating in international airspace.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">The lost Reaper may have been carrying a surveillance pod able to suck up electronic data such as radar emissions.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">The US Department of Defense said<a class=\"ssrcss-k17ofw-InlineLink e1no5rhv0\" href=\"https://www.defense.gov/News/Transcripts/Transcript/Article/3329354/pentagon-press-secretary-brigadier-general-pat-ryder-and-ptdo-dusdpolicy-dr-mar/\">&nbsp;in a press release</a>&nbsp;that the surveillance trips are used to gather information which helps improve security for Europe and supports \"allied partners\".</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">The US has reportedly shared intelligence with Ukraine previously,&nbsp;<a class=\"ssrcss-k17ofw-InlineLink e1no5rhv0\" href=\"https://www.bbc.co.uk/news/world-us-canada-61343044\">including to help it sink a Russian ship in the Black Sea.</a></p>\r\n</div>\r\n</div>','2023-03-16','post-image/eU5McuXrABd6t1NGkgzMBJMJJ3bGQAjCkow1vVUR.webp','2023-03-15 17:57:15','2023-03-15 18:00:19'),(3,1,'South Korea and Japan: A \'milestone\' meeting of frenemies','publish','south-korea-and-japan-a-milestone-meeting-of-frenemies-64126c7215127','<div class=\"ssrcss-dm4ypg-ComponentWrapper-HeadlineComponentWrapper egtrm1f0\" data-component=\"subheadline-block\">\r\n<h2 id=\"Seoul-makes-the-first-move-but-expects-more\" class=\"ssrcss-y2fd7s-StyledHeading e1fj1fc10\" tabindex=\"-1\"><span role=\"text\">Seoul makes the first move - but expects more</span></h2>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\"><strong class=\"ssrcss-hmf8ql-BoldText e5tfeyi3\">Jean Mackenzie in Seoul</strong></p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">South Korean President Yoon Suk Yeol has pulled off quite the coup to get this summit.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">This is the first time a South Korean leader has been invited to Tokyo for such a meeting in 12 years.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">The relationship between these neighbours has been plagued for decades by their difficult history. South Korea was colonised by Japan from 1910 until the end of World War Two. Japanese soldiers forced hundreds of thousands of Koreans to work in its mines and factories. Women were pushed into sexual slavery.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">These scars, while no longer fresh, are not forgotten nor forgiven here.</p>\r\n</div>\r\n</div>\r\n<div id=\"piano-inline1\"></div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">But last week, President Yoon dropped the demand that Japan compensate some of the victims of its slavery.&nbsp;<a class=\"ssrcss-k17ofw-InlineLink e1no5rhv0\" href=\"https://www.bbc.com/news/world-asia-64858944\">He agreed South Korea would raise the money</a>&nbsp;instead. In doing so he sought to put aside the past for the sake of the security of northeast Asia.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">The opposition leader branded the deal the \"biggest humiliation in our history\". But it won him this trip to Tokyo. Diplomats here are quietly surprised and impressed. They see it as a brave and astute move, especially for a political novice, with no foreign policy experience. Until last year, President Yoon was a lawyer.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">Since taking office, he has made repairing this fractured relationship a cornerstone of his foreign policy. With nuclear-armed North Korea becoming more dangerous, Seoul stands to benefit from sharing intelligence with Tokyo and having their militaries work together.</p>\r\n</div>\r\n</div>\r\n<div class=\"ssrcss-11r1m41-RichTextComponentWrapper ep2nwvo0\" data-component=\"text-block\">\r\n<div class=\"ssrcss-7uxr49-RichTextContainer e5tfeyi1\">\r\n<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">He also wants to please his ally, the US, which is desperately trying to draw its partners closer to combat the rise of China. President Joe Biden hailed Mr Yoon\'s Japan deal as \"a ground-breaking new chapter\". The next day he sent him an invitation to the White House for a prestigious state visit.</p>\r\n</div>\r\n</div>','2023-03-16','post-image/Njo2cGFVOoXnlMBD6FlMPqnxyToMC0Agx4zFCKgO.webp','2023-03-15 18:10:10','2023-03-15 18:10:10');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),(31,1),(32,1),(33,1),(34,1),(35,1),(36,1),(37,1),(38,1),(39,1),(40,1),(41,1),(42,1),(43,1),(44,1),(45,1),(46,1),(47,1),(48,1),(49,1),(1,2),(2,2),(3,2),(4,2),(5,2),(15,3),(18,3);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','web','Admin Role','2023-03-13 19:02:39','2023-03-13 23:58:30'),(2,'contributor','web','Contributor Role','2023-03-13 19:02:39','2023-03-13 23:58:34'),(3,'viewer','web','Viewer Role','2023-03-13 19:02:39','2023-03-13 23:58:39');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','bima@gmail.com','2023-03-13 19:02:39','$2y$10$xsSnWFw/7SDYX0bJ9uAaaeVN3J/wLbBKkpVo6IKVsGOTn5U4bHWXy','eoFzsluFWs','2023-03-13 19:02:39','2023-03-13 19:02:39'),(2,'contributor','contributor@gmail.com','2023-03-13 19:02:39','$2y$10$xsSnWFw/7SDYX0bJ9uAaaeVN3J/wLbBKkpVo6IKVsGOTn5U4bHWXy','IsomOfPXkK7Pm40psIP2ZFxj8R3UeT2cQSxSpaL3QA7KstIbbpG0Q0HY0iQP','2023-03-13 19:02:39','2023-03-13 19:02:39'),(6,'viewer','viewer@gmail.com',NULL,'$2y$10$mtRjP.9ilRs1zO.IHMOVqe715xewbMopGE3r91oIYB5aR0EjdTATG',NULL,'2023-03-15 00:07:42','2023-03-15 00:07:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'arkatama_day1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-16 11:08:39
