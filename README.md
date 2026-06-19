# Pokémagique

Application web personnelle fan-made qui génère un profil Pokémagique à partir d’un questionnaire, puis permet de télécharger une affiche PNG, un document Word et un PDF.

> Projet personnel fan-made, non officiel, sans usage commercial.

## Fonctionnalités

- Questionnaire en français, organisé en 13 étapes avec barre de progression.
- Récapitulatif modifiable avant génération.
- Calcul de génération depuis l’année de naissance avec modulo correct avant 1996.
- Calcul du starter par mois et de l’ascendant régional par jour.
- Récupération dynamique de l’image du Pokémon via PokéAPI.
- Génération IA du profil avec OpenAI si une clé API est configurée.
- Moteur local de secours si aucune clé OpenAI n’est disponible.
- Affiche A4 HTML/CSS exportable en PNG.
- Document explicatif téléchargeable en `.docx`.
- Version PDF téléchargeable du document explicatif.

## Installation

Installe Node.js, puis ouvre un terminal dans le dossier du projet et lance :

```bash
npm install
```

Cette commande télécharge les outils nécessaires au projet. Elle crée un dossier `node_modules`, qui ne doit pas être envoyé sur GitHub.

## Configuration locale

Copie `.env.example` vers `.env.local`, puis remplis tes vraies valeurs dans `.env.local` :

```bash
OPENAI_API_KEY=
OPENAI_TEXT_MODEL=
OPENAI_IMAGE_MODEL=
```

Important :

- `.env.local` contient tes secrets locaux.
- `.env.local` ne doit jamais être publié sur GitHub.
- `.env.local` est déjà dans `.gitignore`.
- `.env.example` reste vide et sert seulement de modèle.

`OPENAI_API_KEY` est nécessaire pour obtenir une génération IA complète. Sans clé, l’application génère quand même un profil de secours complet pour tester le parcours, l’affiche et les exports.

`OPENAI_TEXT_MODEL` est optionnel. Si la variable est vide, l’application utilise `gpt-4o-mini`.

`OPENAI_IMAGE_MODEL` est prévu pour une future génération décorative optionnelle.

## Lancement local

Pour lancer le site sur ton ordinateur :

```bash
npm run dev
```

Puis ouvre cette adresse dans ton navigateur :

```text
http://localhost:3000
```

Tant que le site tourne seulement sur `localhost`, tes amis ne peuvent pas y accéder. Pour leur envoyer un lien public, il faut déployer le projet sur Vercel.

## Commandes disponibles

```bash
npm install
npm run dev
npm run build
npm run start
npm run typecheck
npm run lint
```

La commande la plus importante avant de publier est :

```bash
npm run build
```

Si cette commande réussit, le projet est prêt à être construit par Vercel.

## Tester avec le profil d’exemple

En développement, le questionnaire affiche un bouton discret :

```text
Remplir avec un exemple
```

Il remplit le profil de test `Benoît`, date `07/12/2004`.

Ce profil vérifie notamment :

- génération 9 via l’année 2004 ;
- starter Eau via le mois de décembre ;
- ascendant Alola via le jour 7 ;
- Pokémon affiché réel via PokéAPI ;
- génération du profil ;
- aperçu d’affiche ;
- exports PNG, DOCX et PDF.

## Générer un résultat

1. Aller sur la page d’accueil.
2. Cliquer sur `Commencer le questionnaire`.
3. Remplir les étapes ou utiliser l’exemple de test en développement.
4. Vérifier le récapitulatif.
5. Cliquer sur `Générer mon Pokémagique`.

La page résultat affiche :

- le résumé du Pokémagique ;
- l’aperçu de l’affiche A4 ;
- le descriptif complet ;
- les boutons de téléchargement.

## Télécharger les exports

Sur la page résultat :

- `Télécharger l’affiche PNG` génère une affiche A4 verticale.
- `Télécharger le document Word` génère le document explicatif `.docx`.
- `Télécharger le PDF` génère la version imprimable A4.

Les exports PNG et PDF utilisent `puppeteer-core` et `@sparticuz/chromium` pour être compatibles avec Vercel.

En local, si l’export PNG ou PDF ne trouve pas de navigateur, installe Chrome ou Edge. Tu peux aussi ajouter cette variable dans `.env.local` :

```bash
PUPPETEER_EXECUTABLE_PATH=C:\chemin\vers\chrome.exe
```

Ne mets pas cette variable dans GitHub si elle contient un chemin personnel.

## Préparer GitHub

GitHub sert à stocker le code en ligne. Vercel lira ensuite ce code depuis GitHub pour créer le site public.

Avant d’envoyer le projet sur GitHub, vérifie toujours :

- `.env.local` est dans `.gitignore` ;
- `.env.example` existe ;
- `.env.example` contient seulement des noms de variables, sans vraie clé ;
- `npm run build` fonctionne.

Commandes Git à lancer dans le dossier du projet :

```bash
git init
git add .
git commit -m "Initial commit - Pokemagique"
git branch -M main
git remote add origin URL_DU_DEPOT_GITHUB
git push -u origin main
```

Remplace `URL_DU_DEPOT_GITHUB` par l’adresse de ton dépôt GitHub, par exemple :

```text
https://github.com/TON-PSEUDO/pokemagique.git
```

## Déploiement Vercel pour débutant

Vercel sert à mettre ton site en ligne. Une fois déployé, Vercel te donne un lien public que tu peux envoyer à tes amis.

Les variables d’environnement doivent être ajoutées dans Vercel, pas dans GitHub.

Dans Vercel, ajoute ces variables :

```bash
OPENAI_API_KEY
OPENAI_TEXT_MODEL
OPENAI_IMAGE_MODEL
```

`OPENAI_API_KEY` doit contenir ta vraie clé OpenAI. Les deux autres peuvent rester vides si tu ne veux pas les personnaliser.

## Mettre le site en ligne avec Vercel

1. Créer un compte GitHub.
2. Créer un dépôt GitHub.
3. Envoyer le projet sur GitHub.
4. Créer un compte Vercel.
5. Cliquer sur `Add New Project` ou `New Project`.
6. Importer le dépôt GitHub.
7. Ajouter les variables d’environnement :
   `OPENAI_API_KEY`,
   `OPENAI_TEXT_MODEL`,
   `OPENAI_IMAGE_MODEL`.
8. Cliquer sur `Deploy`.
9. Copier le lien Vercel obtenu et l’envoyer aux amis.

## Réglages Vercel recommandés

Quand Vercel importe le dépôt :

- Framework Preset : `Next.js`
- Install Command : `npm install`
- Build Command : `npm run build`
- Output Directory : laisser vide, Vercel détecte Next.js

Si tu ajoutes ou modifies une variable d’environnement dans Vercel après un déploiement, relance un déploiement pour que la nouvelle valeur soit prise en compte.

## Structure principale

```text
app/
  page.tsx
  questionnaire/page.tsx
  resultat/page.tsx
  api/
    generate-profile/route.ts
    pokemon-artwork/route.ts
    export-poster/route.ts
    export-docx/route.ts
    export-pdf/route.ts
components/
  QuestionnaireWizard.tsx
  QuestionStep.tsx
  ProgressBar.tsx
  AnswerSummary.tsx
  ResultView.tsx
  PosterA4.tsx
  ProfileDocumentPreview.tsx
  DownloadButtons.tsx
  PokemonTypeBadge.tsx
  StatCard.tsx
lib/
  browser-launcher.ts
  pokemagique-data.ts
  pokemagique-calculations.ts
  pokemon-assets.ts
  prompt-builder.ts
  openai.ts
  profile-fallback.ts
  docx-generator.ts
  pdf-generator.ts
  poster-export.ts
  validation.ts
  types.ts
```

## Ce qui fonctionne sans clé API

- Questionnaire complet.
- Calcul génération / starter / ascendant.
- Profil généré par le moteur local de secours.
- Récupération PokéAPI si la connexion réseau est disponible.
- Aperçu d’affiche.
- Exports PNG, DOCX et PDF.

## Ce qui nécessite une clé API

- Génération IA personnalisée via OpenAI.

## Limites connues

- Les exports PNG et PDF nécessitent un navigateur compatible en local, ou Chromium côté Vercel.
- Si PokéAPI est indisponible, l’application affiche un emplacement propre au lieu de l’image.
- L’image décorative IA est préparée sous forme de prompt, mais l’affiche principale reste générée en HTML/CSS pour garantir la lisibilité du texte.

## Usage

Cette application est uniquement personnelle, fan-made, non officielle et non commerciale. Elle ne contient pas de logo Pokémon officiel et ne stocke pas d’images officielles dans le dépôt.
