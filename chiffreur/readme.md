# 🔐 Chiffreur AES-GCM (PWA)

Ce projet est une application web simple et sécurisée permettant de **chiffrer/déchiffrer** du texte (ou des clés) en utilisant l’API `Crypto` native du navigateur (AES-GCM + PBKDF2).  
L’application fonctionne **hors-ligne** grâce à sa version **PWA**.

---

## ✨ Fonctionnalités

- Chiffrement/déchiffrement 100% local (pas de serveur)
- Interface simple et responsive
- Fonctionne en ligne ou hors-ligne
- Peut être installée comme une appli mobile ou de bureau

---

## 🛠️ Technologies

- HTML, CSS, JavaScript
- API Web Crypto (AES-GCM, PBKDF2)
- Service Worker
- Manifest.json (PWA)

---

## 🚀 Déploiement sur GitHub Pages

1. Cloner ou forker ce dépôt
2. Activer GitHub Pages dans les **Settings > Pages**
   - Branch: `main`
   - Dossier: `/ (root)`
3. Accéder à :  
   `https://<ton-pseudo>.github.io/<nom-du-dépôt>`

---

## 📱 Utilisation mobile

1. Ouvre le site dans un navigateur moderne (Chrome, Safari, etc.)
2. Clique sur “Ajouter à l’écran d’accueil”
3. L’app est prête à être utilisée comme une appli native

---

## 🔒 Sécurité

- Le chiffrement est effectué avec **AES-GCM** (authentifié)
- La clé est dérivée via **PBKDF2 + SHA-256**
- L’IV et le salt sont générés aléatoirement pour chaque chiffrement

> Rien n’est envoyé sur un serveur. Tout reste local à ton navigateur.

---

## 🧩 Exemple de structure

