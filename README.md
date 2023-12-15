# Postulation App
ce projet nest plus en development
## Explication

### Résumé du projet

C'est un projet développé en [React](https://www.google.com/search?q=React)
et [Laravel](https://www.google.com/search?q=Laravel) à des fins d'entraînement ainsi que potentiellement pour planifier
le développement d'une application de plus grande envergure dans la même voie.

### Utilisation

C'est une application web qui permet de gérer et trier les postulations des entreprises afin de rendre cette tâche moins
compliquée et mieux organisée. Elle offre un affichage simple et des rôles clairs. Les postulants d'entreprises ont un
tableau de bord leur permettant de suivre l'avancement de leur candidature et les étapes à venir. Les collaborateurs qui
ont accès à cette application disposent d'un tableau de bord complet avec des tableaux récapitulatifs et des tableaux
plus détaillés contenant plus d'informations. Des formulaires sont également disponibles pour simplifier et rendre
l'administration plus efficace.

## Développement

### Prérequis

Pour lancer cette application, vous aurez besoin
de [Laravel 10](https://www.google.com/search?q=Laravel%2010), [PHP 8.1](https://www.google.com/search?q=PHP%208.1), [React 18.2](https://www.google.com/search?q=React%2018.2)
ou plus ainsi que [ViteJS](https://www.google.com/search?q=ViteJS). Suite à cela, vous serez capable de télécharger
toutes les dépendances trouvées dans package.json.

Veuillez noter que cette application n'a pas de design poussé. Le développement a été concentré sur le côté serveur !

### Traitement des données / mise en place de la base de données

Laravel offre un système de migration assez simple qui vous permet de récupérer tout le schéma de ma base de données en
une seule commande :
```bash
php artisan migrate
```

Dans la table des rôles, vous trouverez tous les rôles disponibles et vous pouvez les modifier à votre guise. Notez que
vous ne devez modifier que les noms, car le système a été réglé via l'ID des rôles. Si vous voulez modifier le système
d'affichage selon les rôles, il vous faudra aller dans le fichier `authenticatedLayout` et modifier la condition qui
permet l'affichage.

### Lancement du projet

Pour lancer le projet, il vous faudra `php artisan` ainsi que `npm`.

Pour le serveur PHP, veuillez entrer la commande :

``` bash 
php artisan serve 
```

Pour le serveur React :

```bash
npm run dev
```

### Les routes

Si vous voulez ajouter ou modifier des routes, il vous faut aller dans `web.php`. Pour le rendu des pages JSX, j'ai
utilisé Inertia, une librairie permettant de faire le rendu d'un seul fichier React. Ce qui permet la liaison entre le
back-end et le front-end.

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


