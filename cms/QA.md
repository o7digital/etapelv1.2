# Validation Etapel Studio — 9 novembre 2026

- `npm test` : 18 tests réussis, incluant langues, catalogue, Olivia et CMS.
- Build statique avec le jeton Directus en lecture seule : 499 pages générées.
- Studio Railway : connexion réelle, tableau de bord, 225 produits, pages espagnoles et anglaises.
- Édition d’un texte, enregistrement et rechargement : valeur conservée dans Directus, contenu d’origine ensuite restauré.
- Sauvegarde d’une fiche produit existante : données structurées acceptées et conservées.
- Chrome : éditeur produit, navigation mobile à 390 px, aucun débordement ni erreur JavaScript.
- API : refus des visiteurs non connectés, écritures cross-origin, champs non autorisés et révisions périmées ; sessions chiffrées, jetons absents des réponses.

La publication du contenu est confirmée uniquement par l’empreinte servie sur `/.well-known/etapel-content.json`, pas par la seule réponse du Deploy Hook.

- Upload réel de la photographie approuvée de l’équipe, remplacement de son emplacement et rechargement du Studio : état conservé.
- Premier Deploy Hook déclenché depuis l’API Studio : build de production READY et empreinte demandée retrouvée sur le site public.
- Contrôle Vercel en production : accueil, anglais, catalogue, fiches, CEDETEC, support, contact et accès `/admin/`.

# Validation Etapel Studio — 16 novembre 2026

- `dev2` créée depuis `dev`, avec `origin/main` déjà inclus dans son historique ; aucune correction récente perdue.
- `npm test` : 26 tests réussis. Contrôles des titres SEO, des sources d’images mobiles et des permissions/empreintes de publication.
- Build statique connecté au vrai Directus avec le jeton en lecture seule : 547 pages.
- Synchronisation additive : 110 textes et 15 médias ajoutés ; aucun contenu existant écrasé. Total : 1 928 textes, 356 médias, 248 produits, 11 familles et 25 marques.
- Firefox : connexion réelle, tableau de bord, filtres et pagination produits/médias, création et édition d’un brouillon, rechargement et persistance, confirmation des changements non enregistrés, politiques en espagnol/anglais, navigation à 390 px et déconnexion. Brouillons QA supprimés après les parcours.
- Aucune erreur JavaScript constatée ; aucun débordement horizontal mobile.
- Publication Vercel et Deploy Hook du Studio raccordés à `dev2`. Polices Manrope et Italiana servies localement, avec leurs licences.

- Studio Railway et site Vercel déployés puis contrôlés en production. Déclenchement réel depuis le Studio : déploiement Vercel READY, source Git `dev2`, hook « Etapel Studio dev2 ».
- Lecture des cinq collections en parallèle pour réduire l’attente du tableau de bord et de la publication.

# Refonte visuelle du Studio — 16 novembre 2026

- Nouvelle direction : Manrope en gras, bleu électrique, orange franc, repères vert/violet, photographie de peinture en action, accès rapides illustrés et statistiques cliquables. Connexion, navigation, contenus et éditeur utilisent la même identité.
- Visuels existants Etapel copiés dans les assets du Studio et servis depuis une liste de routes fixe. Aucune dépendance de police ou d’image externe.
- `npm test` : 26 tests réussis. Build connecté au Directus réel : 547 pages.
- Firefox : parcours complet du catalogue et des médias, création/édition/rechargement d’un brouillon puis suppression des données QA, politiques bilingues, confirmation des modifications non enregistrées et déconnexion.
- Connexion avec le compte Olivier, images réelles, contrôles à 360, 390, 768, 1024 et 1440 px, absence de débordement, éditeur mobile et préférence de mouvement réduit vérifiés.
- Les boutons de publication de l’en-tête et du tableau de bord restent synchronisés. Les réponses de succès et d’échec de publication ont été simulées dans le navigateur pour ce contrôle de l’interface ; aucun déploiement n’a été déclenché par ces fixtures.
