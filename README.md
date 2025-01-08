### Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

### Étapes d'installation

1. Clonez le repository :

   ```bash
   git clone <url-du-repository>
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez les variables d'environnement (voir [Configuration](#configuration)).

4. Démarrez l'application :

   ```bash
   npm run start:dev
   ```

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet à partir du fichier `.env-example`.

## Documentation API

La documentation API est générée avec **Swagger** et accessible à l'adresse :

```
http://localhost:8000/api
```
