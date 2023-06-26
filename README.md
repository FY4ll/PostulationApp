# Postulation App

## Explication

### Résumer du projet

C'est un projet developper en react et laravel à des fins d'entrainement ainsi que de peut être plainifier le
developement
d'une application de plus grand ampleur dans le même voie.

### L'utilisation

C'est une application web qui permet de manager et de trier les postulations des entreprise afin de rendre cette tache
moin compliquer et plus ordoné avec un affichage simple, des roles simple. Le postulant de l'entreprise à un dashboard
qui vas lui expliquer l'avancement de sa postulation ainsi que les futures étapes. Les colaborateurs qui ont accès à
cette application
ont un dashboard complet avec des tableau récapitulatif ainsi que des tableau plus déveloper avec plus d'infromation
il y'a aussi des parties formulaire afin de rendre l'admistation plus simple et beaucoup plus efficiente

## Developement

### prérequis

pour lancer cette application il vous faudra laravel 10, php 8.1 ainsi que react 18.2 ou plus ainsi que vitejs. suite à
cela vous serez capable de
télécharger tout les dépendance trouver dans package.json.

Veuillez noter que cette application ne comprends pas de design pousser, le developpement à été concentrer sur le coté
serveur!

### traitement des données/ mise en place de la base de données

laravel offre un systeme de migration asser simple ce qui vous permet de récuperer tout le shéma de ma base de données
en une seul commande

```bash
php artisan migrate
```

dans la table role vous allez trouve tout les roles disponible et vous pouvez les modifiers à votre guise.
NOTE: veuillez modifier uniquement les noms car le système à été régler via l'id des roles. Si vous voulez modifier le
système
d'affichage selon les roles, il vous faudra aller dans le fcher authenticatedLayout et modifier la condition qui permet
l'affichge

### lancement du projet

pour lancer le projet il vous faudra php artisan ainsi que npm.

Pour le serveur php: veuillez entrer la commende

``` bash 
php artisan serve 
```

Pour le serveur react:

```bash
npm run dev
```

### les routes

si vous voulez ajouter ou modifier des routes il vous faut aller dans web.php. pour le rendu des pages JSX j'ai utilise
inertia un librairie permetant de faire le rendu d'un seul fichier react.
Ce qui permet la liaison entre le back-end et le front-end.

### dictionnaire de donnée

Table "failed_jobs"

| Colonne                 | Type                     | Contraintes                                     |
|-------------------------|--------------------------|-------------------------------------------------|
| id                      | bigint unsigned          | Clé primaire, Auto-incrémentée                  |
| uuid                    | varchar(255)             | Non nulle                                       |
| connection              | text                     | Non nulle                                       |
| queue                   | text                     | Non nulle                                       |
| payload                 | longtext                 | Non nulle                                       |
| exception               | longtext                 | Non nulle                                       |
| failed_at               | timestamp                | Valeur par défaut: CURRENT_TIMESTAMP, Non nulle |
| failed_jobs_uuid_unique | Contrainte unique (uuid) |                                                 |

Table "files"

| Colonne    | Type            | Contraintes                    |
|------------|-----------------|--------------------------------|
| id         | bigint unsigned | Clé primaire, Auto-incrémentée |
| created_at | timestamp       | Nullable                       |
| updated_at | timestamp       | Nullable                       |

Table "migrations"

| Colonne   | Type         | Contraintes                    |
|-----------|--------------|--------------------------------|
| id        | int unsigned | Clé primaire, Auto-incrémentée |
| migration | varchar(255) | Non nulle                      |
| batch     | int          | Non nulle                      |

Table "password_reset_tokens"

| Colonne    | Type         | Contraintes             |
|------------|--------------|-------------------------|
| email      | varchar(255) | Clé primaire, Non nulle |
| token      | varchar(255) | Non nulle               |
| created_at | timestamp    | Nullable                |

Table "personal_access_tokens"

| Colonne                             | Type                      | Contraintes                    |
|-------------------------------------|---------------------------|--------------------------------|
| id                                  | bigint unsigned           | Clé primaire, Auto-incrémentée |
| tokenable_type                      | varchar(255)              | Non nulle                      |
| tokenable_id                        | bigint unsigned           | Non nulle                      |
| name                                | varchar(255)              | Non nulle                      |
| token                               | varchar(64)               | Non nulle                      |
| abilities                           | text                      | Nullable                       |
| last_used_at                        | timestamp                 | Nullable                       |
| expires_at                          | timestamp                 | Nullable                       |
| created_at                          | timestamp                 | Nullable                       |
| updated_at                          | timestamp                 | Nullable                       |
| personal_access_tokens_token_unique | Contrainte unique (token) |                                |

Table "postulations"

| Colonne                | Type            | Contraintes                    |
|------------------------|-----------------|--------------------------------|
| id                     | bigint unsigned | Clé primaire, Auto-incrémentée |
| nom                    | varchar(255)    | Non nulle                      |
| prenom                 | varchar(255)    | Non nulle                      |
| mail                   | varchar(255)    | Non nulle                      |
| apprentissage          | varchar(255)    | Non nulle                      |
| situation              | varchar(255)    | Non nulle                      |
| cv_path                | varchar(255)    | Nullable                       |
| motivation_path        | varchar(255)    | Nullable                       |
| video_path             | varchar(255)    | Nullable                       |
| created_at             | timestamp       | Nullable                       |
| updated_at             | timestamp       | Nullable                       |
| avancement_postulation | varchar(255)    | Non nulle                      |

Table "role"

| Colonne    | Type            | Contraintes                    |
|------------|-----------------|--------------------------------|
| id         | bigint unsigned | Clé primaire, Auto-incrémentée |
| role_name  | varchar(255)    | Non nulle                      |
| created_at | datetime        | Nullable                       |
| updated_at | timestamp       | Nullable                       |

Table "users"

| Colonne            | Type                      | Contraintes                    |
|--------------------|---------------------------|--------------------------------|
| id                 | bigint unsigned           | Clé primaire, Auto-incrémentée |
| name               | varchar(255)              | Non nulle                      |
| email              | varchar(255)              | Non nulle                      |
| email_verified_at  | timestamp                 | Nullable                       |
| password           | varchar(255)              | Non nulle                      |
| remember_token     | varchar(100)              | Nullable                       |
| created_at         | timestamp                 | Nullable                       |
| updated_at         | timestamp                 | Nullable                       |
| users_email_unique | Contrainte unique (email) |                                |

Table "postulation_user"

| Colonne                                 | Type                                                                    | Contraintes                    |
|-----------------------------------------|-------------------------------------------------------------------------|--------------------------------|
| id                                      | bigint unsigned                                                         | Clé primaire, Auto-incrémentée |
| user_id                                 | bigint unsigned                                                         | Non nulle                      |
| postulation_id                          | bigint unsigned                                                         | Non nulle                      |
| created_at                              | timestamp                                                               | Nullable                       |
| updated_at                              | timestamp                                                               | Nullable                       |
| postulation_user_postulation_id_foreign | Contrainte de clé étrangère (postulation_id) référence postulations(id) |                                |
| postulation_user_user_id_foreign        | Contrainte de clé étrangère (user_id) référence users(id)               |                                |

Table "postulations_preavis"

| Colonne                                     | Type                                                                                            | Contraintes                    |
|---------------------------------------------|-------------------------------------------------------------------------------------------------|--------------------------------|
| id                                          | bigint unsigned                                                                                 | Clé primaire, Auto-incrémentée |
| postulation_id                              | bigint unsigned                                                                                 | Non nulle                      |
| colab_id                                    | bigint unsigned                                                                                 | Non nulle                      |
| resultat                                    | char(255)                                                                                       | Nullable                       |
| commentaire                                 | longtext                                                                                        | Nullable                       |
| created_at                                  | timestamp                                                                                       | Nullable                       |
| updated_at                                  | timestamp                                                                                       | Nullable                       |
| postulations_preavis_colab_id_foreign       | Contrainte de clé étrangère (colab_id) référence users(id), Suppression en cascade              |                                |
| postulations_preavis_postulation_id_foreign | Contrainte de clé étrangère (postulation_id) référence postulations(id), Suppression en cascade |                                |

Table "user_role"

| Colonne                   | Type                                                                              | Contraintes                    |
|---------------------------|-----------------------------------------------------------------------------------|--------------------------------|
| id                        | bigint unsigned                                                                   | Clé primaire, Auto-incrémentée |
| user_id                   | bigint unsigned                                                                   | Non nulle                      |
| role_id                   | bigint unsigned                                                                   | Non nulle                      |
| created_at                | timestamp                                                                         | Nullable                       |
| updated_at                | timestamp                                                                         | Nullable                       |
| user_role_user_id_foreign | Contrainte de clé étrangère (user_id) référence users(id), Suppression en cascade |                                |


