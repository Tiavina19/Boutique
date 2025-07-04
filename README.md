# Yhanj'Angel - Articles Dashboard

Ce projet est un dashboard React moderne permettant d'afficher, rechercher, filtrer, ajouter, modifier et supprimer des articles. Il met l'accent sur l'expérience utilisateur, le design responsive et les bonnes pratiques de développement.

## Fonctionnalités principales

- Affichage d'une liste d'articles (Fake Store API)
- Recherche en temps réel par titre
- Filtre par catégorie
- Ajout, modification et suppression d'article via formulaire
- Modale de détails d'article avec animations
- Confirmation de suppression personnalisée
- Notifications de succès/erreur
- Loader animé personnalisé au chargement
- Pagination côté client
- Design responsive et moderne

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   cd <nom-du-dossier>
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le projet en développement :
   ```bash
   npm start
   ```

## Structure du projet

- `src/pages/Home.js` : page principale, logique d'affichage et de gestion des articles
- `src/components/ArticleCard.js` : composant carte d'article
- `src/components/ArticleForm.js` : formulaire d'ajout/modification
- `src/api/articles.js` : fonctions d'appel à l'API
- `src/styles/` : fichiers CSS organisés par composant/page

## Technologies utilisées

- ReactJS (Create React App)
- CSS modules classiques
- API Fake Store (https://fakestoreapi.com/products)

## Personnalisation

- Palette de couleurs personnalisée
- Loader animé inspiré du style Pixar
- Fond décoratif SVG
- Icônes SVG pour la recherche et les actions

## Bonnes pratiques

- Code clair, structuré et commenté
- Séparation des responsabilités (composants, styles, logique)
- Responsive design (desktop et mobile)
- Accessibilité (focus visible, contrastes)
