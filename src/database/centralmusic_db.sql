-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: centralmusic
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amplifier_details`
--

DROP TABLE IF EXISTS `amplifier_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amplifier_details` (
  `product_id` int(11) NOT NULL,
  `tecnologia` varchar(45) NOT NULL,
  `parlante` varchar(45) NOT NULL,
  `potencia` varchar(45) NOT NULL,
  `peso` varchar(45) NOT NULL,
  `dimensiones` varchar(45) NOT NULL,
  `origen` varchar(45) NOT NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `fk_amp_details_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amplifier_details`
--

LOCK TABLES `amplifier_details` WRITE;
/*!40000 ALTER TABLE `amplifier_details` DISABLE KEYS */;
INSERT INTO `amplifier_details` VALUES (9,'valvular','2x4','50 watts','25kg','27.3 x 38.8 x 20.3 cm','Inglaterra');
/*!40000 ALTER TABLE `amplifier_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `idCategory` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'guitar'),(2,'efect'),(3,'amplifier');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guitar_details`
--

DROP TABLE IF EXISTS `guitar_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guitar_details` (
  `product_id` int(11) NOT NULL,
  `model` varchar(45) NOT NULL,
  `line` varchar(45) NOT NULL,
  `body_finish` varchar(45) NOT NULL,
  `material_body` varchar(45) NOT NULL,
  `hand` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `material_fretboard` varchar(45) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_guitar_electric_details_product_idx` (`product_id`),
  CONSTRAINT `fk_guitar_details_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guitar_details`
--

LOCK TABLES `guitar_details` WRITE;
/*!40000 ALTER TABLE `guitar_details` DISABLE KEYS */;
INSERT INTO `guitar_details` VALUES (1,'stratocaster','afinity','brillante','caoba','diestro','pink shell','alamo'),(2,'stratocaster','afinity','red','palo rosa','diestro','shell blue','caoba'),(3,'taylor','pro','natural','quebracho','diestro','black','palo borracho'),(14,'criolla','pro','natural','caoba','diestro','marron','rose wood'),(17,'telecaster','mate','red','caoba','diestro','red','rose wood');
/*!40000 ALTER TABLE `guitar_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marca` (
  `idMarca` int(11) NOT NULL AUTO_INCREMENT,
  `marca` varchar(45) NOT NULL,
  PRIMARY KEY (`idMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'fender'),(2,'les paul'),(3,'sx');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(200) NOT NULL,
  `stock` varchar(45) NOT NULL,
  `idSubcategory` int(11) NOT NULL,
  `idMarca` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_marca_idx` (`idMarca`),
  KEY `fk_product_subcategory_idx` (`idSubcategory`),
  CONSTRAINT `fk_product_marca` FOREIGN KEY (`idMarca`) REFERENCES `marca` (`idMarca`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_subcategory` FOREIGN KEY (`idSubcategory`) REFERENCES `subcategory` (`idSubcategory`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'3500','guitarra stratocaster xml20','guitarra para todos los estilos','25',1,1),(2,'1500','guitarra sx strato 22','guitarra para principiantes','30',1,3),(3,'1000','guitarra ranchera 1993','guitarra para tocar country','10',2,3),(9,'5000','amplificador fender twin reverb','amplificador valvular','15',7,1),(10,'5000','amplificador fender delexe','amplificador valvular 50W','15',7,1),(11,'5000','amplificador fender down','amplificador valvular 100W','15',8,1),(12,'5000','amplificador fender terminator','amplificador valvular 100W','15',8,1),(13,'5000','guitarra criolla x2 peso','guitarra del norte para tirar sapucais','20',3,1),(14,'5000','guitarra del chaqueño','guitarra hecha en chaco','1',3,3),(16,'5000','pedal distorsion','pedal para grunge','10',6,1),(17,'10000','fender telecaster','telecaster año 60','10',1,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategory` (
  `idSubcategory` int(11) NOT NULL AUTO_INCREMENT,
  `subcategory` varchar(45) NOT NULL,
  `idCategory` int(11) NOT NULL,
  PRIMARY KEY (`idSubcategory`),
  KEY `fk_subcategory_category_idx` (`idCategory`),
  CONSTRAINT `fk_subcategory_category` FOREIGN KEY (`idCategory`) REFERENCES `category` (`idCategory`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'guitarra electrica',1),(2,'guitarra acustica',1),(3,'guitarra criolla',1),(6,'pedal',2),(7,'amplificador para guitarra',3),(8,'amplificador para bajo',3),(9,'amplificador multifuncion',3);
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'centralmusic'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-11 15:48:46
