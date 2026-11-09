# Validation Etapel Studio — 9 novembre 2026

- `npm test` : 18 tests réussis, incluant langues, catalogue, Olivia et CMS.
- Build statique avec le jeton Directus en lecture seule : 499 pages générées.
- Studio Railway : connexion réelle, tableau de bord, 225 produits, pages espagnoles et anglaises.
- Édition d’un texte, enregistrement et rechargement : valeur conservée dans Directus, contenu d’origine ensuite restauré.
- Sauvegarde d’une fiche produit existante : données structurées acceptées et conservées.
- Chrome : éditeur produit, navigation mobile à 390 px, aucun débordement ni erreur JavaScript.
- API : refus des visiteurs non connectés, écritures cross-origin, champs non autorisés et révisions périmées ; sessions chiffrées, jetons absents des réponses.

La publication du contenu est confirmée uniquement par l’empreinte servie sur `/.well-known/etapel-content.json`, pas par la seule réponse du Deploy Hook.
