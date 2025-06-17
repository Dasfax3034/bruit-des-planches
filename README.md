# Le Bruit Des Planches

Le Bruit Des Planches est un site vitrine/blog statique pour la pièce de théâtre _Gueules Noires_, avec une section éditoriale (articles, tops, critiques) administrée via un CMS simple et sans backend.

---

## 🎯 Objectif

- Mettre en avant des pièces (infos, visuels, dates)
- Poster du contenu éditorial autour du théâtre
- Optimiser le SEO avec une approche content-first
- Gérer le site via une interface d’admin accessible (Decap CMS)

---

## 🧰 Stack

| Tech         | Usage                             |
|--------------|------------------------------------|
| Next.js      | Frontend statique (SSG)            |
| Tailwind CSS | Design rapide et responsive        |
| Decap CMS    | CMS Git-based via interface `/admin` |
| Markdown     | Stockage des articles (`/content`) |
| Netlify      | Déploiement + Git Gateway          |
| ButtonDown   | Envoi d’emails (Newsletter) |
| Resend       | Envoi d’emails (formulaire contact) |

---

## 📂 Structure
/src
├── content/
│   └── articles/         # Articles au format Markdown
├── app/
│   ├── page.tsx         # Page d’accueil
│   ├── layout.tsx         # Root Layout
│   ├── articles/[slug]/page.tsx # Page dynamique d’article
│   ├── contact/page.tsx       # Page de contact avec formulaire
│   └── admin/            # Interface Decap CMS
├── globals.css           # Tailwind + reset
├── .env.local            # Clés API (non commit)

---

## 🚀 Lancer le projet en local

```bash
git clone https://github.com/ton-utilisateur/le-bruit-des-planches.git
cd le-bruit-des-planches
npm install
npm run dev
```
Accessible sur http://localhost:3000.

⸻

## 🧪 Ajouter un article manuellement

Créer un fichier .md dans content/articles/ :

---
title: "Top 10 des pièces à Avignon 2025"
slug: "top-10-avignon"
description: "Nos coups de cœur du festival"
date: "2025-06-17"
---

Contenu markdown ici...

---

## 🔐 Variables d’environnement

Créer un fichier .env.local (non commit) :
RESEND_API_KEY=your_resend_key
RESEND_CONTACT_TO=you@example.com
BUTTONDOWN_API_KEY=your_buttondown_key

---

## ✉️ Formulaire de contact (via Resend)

POST vers /api/send.ts. Nécessite RESEND_API_KEY.
Modifiable dans pages/contact.tsx.

---

## 🛠 Admin CMS (Decap)

Accessible à /admin.
Assurez-vous que Git Gateway est activé dans Netlify + que vous êtes authentifié via Identity.

Fichier config : public/admin/config.yml.

---

## 🌍 Déploiement

Déploiement auto via Netlify (connecté à GitHub).
Variables d’env nécessaires à configurer dans Netlify → Project Settings → Environment.

---

## 📝 Licence

Libre d’utilisation pour usage éditorial ou culturel.
Pas de garantie, pas de support. Faites-en ce que vous voulez.

---

## 🤝 Contribuer

Fork, PR, issue, ou juste une étoile ⭐ si ça vous aide.