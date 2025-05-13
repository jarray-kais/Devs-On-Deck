# Devs-On-Deck Server

## Description
Backend API pour la plateforme Devs-On-Deck, une application de mise en relation entre développeurs et organisations.

## Technologies Utilisées
- Node.js
- Express.js
- MongoDB avec Mongoose
- JWT pour l'authentification
- Cloudinary pour le stockage des fichiers
- Bcrypt pour le hachage des mots de passe

## Prérequis
- Node.js (v14 ou supérieur)
- MongoDB
- Compte Cloudinary

## Installation

1. **Cloner le repository**
```bash
git clone  https://github.com/jarray-kais/Devs-On-Deck
cd Devs-On-Deck/server
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration des variables d'environnement**
Créez un fichier `.env` à la racine du projet avec les variables suivantes :
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devs-on-deck
SECRET_KEY=votre_secret_key
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

## Structure du Projet
```
server/
├── config/         # Configuration de la base de données
├── controllers/    # Logique métier
├── middleware/     # Middlewares (auth, upload, etc.)
├── models/         # Schémas Mongoose
├── routes/         # Routes API
├── util/           # Utilitaires
└── app.js         # Point d'entrée
```

## Fonctionnalités Principales

### Authentification
- JWT pour la gestion des sessions
- Cookies sécurisés
- Refresh token

### Gestion des Fichiers
- Upload de CV
- Upload de lettres de motivation
- Upload de logos et images de profil
- Stockage Cloudinary

### Sécurité
- Validation des données
- Protection contre les injections
- Hachage des mots de passe
- CORS configuré

## Démarrage

1. **Mode développement**
```bash
npm run dev
```

2. **Mode production**
```bash
npm start
```




## Contact
email: jarraykais1@gmail.com