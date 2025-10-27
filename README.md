# Node.js Docker Web Application

## 📌 Description

Ce projet est une **application web Node.js containerisée avec Docker**. L’objectif est de créer un serveur web simple avec plusieurs routes et de pratiquer la **containerisation et le healthcheck**.

L’application expose les routes suivantes :

* `GET /` : Page d’accueil
* `GET /api/health` : Vérifie la santé de l’application (healthcheck)
* `GET /api/info` : Informations sur l’environnement
* `GET /api/time` : Heure actuelle du serveur

---

## 🛠️ Prérequis

* [Docker](https://www.docker.com/) installé sur votre machine
* Node.js (facultatif pour développement local, pas nécessaire pour Docker)

---

## 📂 Structure du projet

```
node-app/
│
├─ server.js          # Serveur Node.js avec Express
├─ package.json       # Dépendances npm
├─ package-lock.json  # Lockfile npm
├─ Dockerfile.optim   # Dockerfile optimisé avec healthcheck
└─ .dockerignore      # Fichiers à ignorer pour Docker
```

---

## 🚀 Instructions d’installation et d’exécution

### 1. Build de l’image Docker

```bash
docker build -t node-app:1.1 -f Dockerfile.optim .
```

### 2. Lancer le conteneur

```bash
docker rm -f node-app-2      # Supprimer ancien conteneur si présent
docker run -d --name node-app-2 -p 3000:3000 node-app:1.1
```

### 3. Vérifier que le conteneur fonctionne

```bash
docker ps
```

### 4. Tester les routes

* Page d’accueil : [http://localhost:3000/](http://localhost:3000/)
* Health : [http://localhost:3000/api/health](http://localhost:3000/api/health)
* Info : [http://localhost:3000/api/info](http://localhost:3000/api/info)
* Heure : [http://localhost:3000/api/time](http://localhost:3000/api/time)

---

## ✅ Healthcheck Docker

Le Dockerfile contient un healthcheck automatique :

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -q --spider http://localhost:3000/api/health || exit 1
```

Tester le healthcheck depuis Docker :

```bash
docker inspect --format="{{.State.Health.Status}}" node-app-2
```

* `healthy` → conteneur opérationnel
* `unhealthy` → le healthcheck échoue

---

## 🧹 Nettoyage

```bash
docker stop node-app-2
docker rm node-app-2
docker image prune -f   # pour supprimer les images inutilisées
```

---

## 📦 Comparaison des images

* `node-app:1.0` : image initiale (~1.58 GB)
* `node-app:1.1` : image optimisée (~188 MB)

L’optimisation a été réalisée en utilisant **Alpine** et une copie **sélective des fichiers**.

---

## 💡 Notes

* Le projet peut être déployé sur n’importe quelle machine avec Docker sans installer Node.js localement.
* Les routes et le healthcheck permettent de tester la disponibilité et le bon fonctionnement du conteneur.

---


