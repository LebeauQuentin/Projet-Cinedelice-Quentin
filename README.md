# Project Name: ciné délices

## Dépendances installées côté backend

     - express
     - dotenv
     - sequelize
     - cors
     - argon2
     - jsonwebtoken
     - joi

## Dépendances installées côté frontend

     - react
     - react-dom
     - react-toastify

## côté backend pour la gestion du .env

Aller dans le dossier api et faire :

    ```bash
    cp .env.example .env
    ```

## côté backend pour la gestion du .env.db.docker

Aller dans le dossier api et faire :

    ```bash
    cp .env.db.docker.example .env.db.docker
    ```
    
attention env.db.docker.example est un exemple de fichier .env.db.docker, il faut le renommer en .env.db.docker et modifier les variables

## les commandes docker

    ```bash
    npm run up # pour lancer les conteneurs
    npm run down # pour stopper les conteneurs
    npm run build # pour reconstruire les images
    
    docker compose down -v # pour stopper les conteneurs et supprimer les volumes
    docker compose build --no-cache # pour reconstruire les images sans utiliser les images précédentes
    docker compose up -d # pour lancer les conteneurs en arrière plan
    ```

## Lien projet Origine

`https://github.com/LebeauQuentin/Projet-Cinedelice-Quentin`
