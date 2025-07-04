# 🥗 TFG - Plataforma de Seguiment Nutricional i d’Entrenament

Aquest projecte és el resultat del meu Treball de Final de Grau. Es tracta d’una plataforma web que permet gestionar de manera personalitzada la nutrició i l’activitat física, amb funcionalitats com el registre d’aliments, entrenaments i visualització de gràfiques evolutives.

---

## 📌 Característiques principals

- Registre i autenticació d’usuaris 
- Gestió d’aliments, dietes, activitats i entrenaments
- Gràfiques evolutives personalitzades amb **Recharts**
- Arquitectura client-servidor basada en tres capes: frontend, backend i base de dades
- Persistència de dades amb PostgreSQL

---

## ⚙️ Tecnologies utilitzades

### 🧠 Backend (Spring Boot)

- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven

### 🎨 Frontend (React)

- React.js (SPA)
- React Router DOM
- Axios
- Recharts
- CSS personalitzat
- `localStorage` per mantenir la sessió

### 📦 Altres eines

- Git + GitHub per al control de versions
- Postman per a proves de l'API
- pgAdmin per gestionar la base de dades
- Visual Studio Code i IntelliJ IDEA com a IDEs

---


## 🚀 Execució del projecte complet

---

### 🧑‍🍳 Requisits previs

Abans de començar, assegura’t de tenir:

- ✅ Java 17 o superior
- ✅ Node.js + npm (v16 o superior)
- ✅ PostgreSQL actiu
- ✅ Maven

---

## 🔙 Backend – Spring Boot

### 📁 1. Accedeix a la carpeta del backend
- cd backend
- mvn clean install
- mvn spring-boot:run

### 📁 2. Assegurar-se del fitxer properties
- spring.datasource.url=jdbc:postgresql://localhost:5432/nutricio_db
- spring.datasource.username=postgres
- spring.datasource.password=la_teva_contrasenya

- cd frontend
- npm install
- npm start



