---
title: "Développeur Web (Alternance)"
company: "Nopow-Link"
logo: "/images/experiences/nopow-link.webp"
location: "Bordeaux"
duration: "3 years (2021 - 2024)"
start: "2021-09"
end: "2024-08"
stack:
  - Vue.js
  - Django
  - Django REST Framework
  - Symfony
  - JavaScript
  - WordPress
  - Webpack
  - Sass
---

## Contexte

Nopow-Link était une start-up composée de deux personnes : le fondateur, **Paul Prikazsky**, et moi-même.  
L'objectif du produit : développer une application web sur le modèle deun réseau social, dédiée au **netlinking** (mise en relation, gestion de profils, sites et contenus).

## Ce que j'ai fait

### Développement de la V1 (sortie mai 2022)
* **Système de favoris** : ajout d'un mécanisme de mise en favoris des profils (composant Vue + communication avec l'API).
* **Algorithme de placement automatisé** sur une carte type quadrillage (style “bataille navale”) :
  * premier jet sous forme de script Python,
  * intégration dans l'application pour positionner automatiquement les utilisateurs sur la carte à la création du compte,
  * possibilité de déplacer les utilisateurs ensuite.
* **Pagination générique** : création d'un composant Vue réutilisable pour paginer et classer des listes renvoyées par l'API (notamment pages d'un site associé à un utilisateur).
* **Librairie JavaScript (npm)** : développement d'une lib de placement automatisé de lien :
  * détection de l'emplacement,
  * récupération du lien,
  * modification du HTML du site cible pour insérer le lien,
  * gestion d'occurrences multiples (placements successifs sans décaler les index).

### Parcours guidé de création de compte
* Mise en place d'un **assistant multi-étapes** (front Vue + back) pour aider les nouveaux utilisateurs à configurer correctement leur compte :
  * image de profil + URL du site,
  * choix du plugin,
  * installation / vérification clé API,
  * redirection vers la carte pour lancer le placement automatique.

### Développement de la V2 (sortie décembre 2023)
* **Système de chat** :
  * back + front,
  * utilisation de **WebSockets**,
  * composants Vue pour gérer channels, tri/affichage des messages.
* **Moteur de recherche** :
  * création d'un **scraper** pour répertorier les URLs d'un site et gérer les rebonds,
  * stockage en base + association aux comptes,
  * système d'analyse de contenu pour extraire des **mots-clés**,
  * exploitation des mots-clés pour enrichir la recherche.
* **Refonte / réorganisation du produit** :
  * échanges avec le fondateur,
  * découpage en tickets page par page,
  * déplacement/réorganisation de fonctionnalités et écrans.

## Points clés

* Projet en **petite équipe** : forte autonomie, priorisation, itérations rapides.
* Développement **fullstack** orienté produit : UI, API, scripts, intégrations.
* Travail “qualité” : composants réutilisables, logique robuste (pagination, occurrences, placement).
