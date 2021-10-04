## Pré-requis

L'application est basée sur le framework Symfony en version 4.4 et nécessite un serveur web avec PHP 7.2+ et MySQL / MariaDB.

## Installation

1. Récupération du code
2. Installation des librairies en utilisant Composer `composer install`
3. Création et installation de la base de données `bin/console doctrine:database:create` puis `bin/console doctrine:schema:create`
4. Installation des librairies Javascript: `npm install`
5. Compilation du client: `npm run build`

Paramètres dans le .env.local :

- Paramètrage de la connexion avec la bdd (DATABASE_URL)
- Ajout du token d'api (API_TOKEN)
- Ajout login mot de passe (ADMIN_LOGIN)
