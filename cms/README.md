# Etapel Studio

Studio éditorial : https://studio-production-f1a3.up.railway.app · Accès depuis le site : https://etapelv1-2.vercel.app/admin/

## Versions du site

Le site public propose six langues : espagnol `/`, anglais `/en/`, allemand `/de/`, italien `/it/`, français `/fr/` et portugais du Brésil `/pt/`. Les quatre nouvelles versions couvrent les pages, les familles et les fiches produit, les formulaires et Olivia. Le sélecteur conserve la page, les filtres, les paramètres et les ancres correspondantes. Les identifiants de produits et de familles restent communs ; les sections principales ont des adresses traduites. Les anciens liens de familles restent accessibles sans entrer dans le sitemap.

Après les corrections du CMS, `cms/localize.mjs` génère les quatre nouvelles langues depuis le HTML anglais final. Les textes, métadonnées, descriptions d’images, messages interactifs et données structurées utilisent les catalogues versionnés dans `cms/locales/`. Les mêmes photographies, documents et styles sont réutilisés. Les canoniques et les liens `hreflang` relient les six versions sur `www.etapel.com`. Le Studio continue d’éditer et de valider l’espagnol et l’anglais ; l’édition directe des quatre catalogues supplémentaires se fait dans ces fichiers.

Pour traduire de nouveaux textes après une évolution du code ou une validation anglaise dans le CMS :

```sh
ETAPEL_SKIP_LOCALES=1 npm run build
npm run translations:generate
ETAPEL_REQUIRE_TRANSLATIONS=1 npm run build
```

Le premier build doit recevoir les variables CMS habituelles pour utiliser les contenus courants. La génération exige `OPENAI_API_KEY` dans l’environnement et utilise par défaut `gpt-5.4-mini` avec des sorties structurées et `store: false`. Elle ne transmet que les textes publics et reprend les traductions manquantes sans écraser celles déjà revues. Ne jamais enregistrer cette clé dans Git ou dans une commande. La clé n’est pas nécessaire sur Vercel : les visites et les builds ordinaires n’appellent aucun service de traduction. Si un nouveau texte anglais n’a pas encore de traduction, sa valeur anglaise sert temporairement de repli et le build signale les clés manquantes ; la publication des autres corrections du CMS reste possible. `ETAPEL_REQUIRE_TRANSLATIONS=1` exige une couverture complète avant une livraison multilingue.

Pour voir ces pages localement, utiliser `npm run preview` après le build : les quatre langues sont produites au post-traitement, pas par le serveur Astro de développement.

Le projet Railway **etapel-cms** est entièrement indépendant de Nathalie : sa propre instance Directus 12.6.1, PostgreSQL 18, son volume de médias, son service Studio, ses comptes et ses jetons. Les identifiants non sensibles figurent dans `deployment.json`. L'interface adopte une direction plus vive : titres Manrope en gras, bleu électrique, orange Etapel, repères colorés et photographies techniques en action. La police et les visuels sont servis localement. Le tableau de bord propose des accès directs au catalogue, aux pages et aux médias, ainsi qu’un bouton de publication synchronisé avec celui de l’en-tête. Les données et les accès restent entièrement séparés. Le site vitrine reste sur Vercel ; la boutique `etapel-tienda` n'est pas modifiée.

## Accès

Compte propriétaire initial : `olivier.steineur@icloud.com`. Le mot de passe aléatoire est conservé dans **Railway → etapel-cms → production → directus → Variables → ADMIN_PASSWORD**. Ne pas le copier dans Git. Modifier le mot de passe du compte dans Directus après récupération ; la variable de bootstrap ne reflète plus le mot de passe courant après sa modification. Le serveur SMTP de récupération de mot de passe n'est pas configuré. L'administration technique Directus est sur https://directus-production-dd39.up.railway.app/admin/.

Le rôle `Etapel content editor` est préparé pour les comptes éditoriaux. L'identité `Etapel website build` n'a que la lecture sur les cinq collections et leurs fichiers. Le propriétaire initial est administrateur. Créer les comptes de l'équipe avec leurs vraies adresses avant de partager un accès permanent.

## Éditer et publier

- **Inicio, Nosotros, CEDETEC, Soporte técnico, Contacto, Privacidad, Políticas de Etapel** : la vue visuelle affiche la vraie page avec ses textes, photos et styles. Cliquer sur un texte pour écrire sur la page ou dans le panneau latéral ; sélectionner une photo, y compris un fond, pour importer une image ou choisir dans la bibliothèque. Les formats ordinateur, tablette et mobile, le plein écran et la vue sans édition permettent de vérifier le résultat. **Contenido** localise les textes et photos ; **Textos y SEO** donne accès aux métadonnées et à la comparaison anglaise complète.
- **Productos** : 248 fiches, création, édition, brouillons et archivage, descriptions espagnoles/anglaises, marque, famille, photos, galerie, points forts, caractéristiques, variantes, blocs et documents. Les adresses existantes sont conservées.
- **Familias de producto** : les 11 familles initiales, descriptions, photographie, ordre et spécialités. Les familles liées aux anciens liens et celles qui contiennent des produits publiés restent protégées contre l'archivage.
- **Páginas del catálogo** : textes des pages de familles en espagnol et en anglais.
- **Marcas** : les 25 marques du bandeau, ajout, libellé, ordre et archivage. Les styles propres aux marques existantes sont conservés.
- **Biblioteca de imágenes** : 356 emplacements, photos des sections et galeries produits. Changer une photo met à jour tous ses usages. L'upload d'une nouvelle image l'ajoute à la bibliothèque ; elle peut ensuite être choisie dans une fiche. JPG, PNG, WebP, AVIF, 25 Mo maximum. La bibliothèque inclut les variantes mobiles du diaporama et les photographies de fond.
- **Navegación y pie** : libellés partagés des menus et pieds de page. La logique des formulaires, d'Olivia, les liens système et le filtrage catalogue restent dans le code.

**Guardar** enregistre dans Directus. **Publicar sitio** déclenche le Deploy Hook Vercel de `dev2`, désormais branche de production de ce projet. Le Studio vérifie l'empreinte du contenu servi pour confirmer sa publication ; l'acceptation du hook ne signifie pas que le build est terminé. Si le CMS, un média ou le build échoue, le site précédent reste disponible. La durée habituelle dépend de la file Vercel et du volume de médias. `main` n'est pas modifié. L'ancienne variable Olivia Preview spécifique à `dev` a été conservée avec une portée Preview générale pour permettre cette configuration ; la variable Production n'a pas changé.

L’espagnol est la source éditoriale des pages. **Guardar y traducir** enregistre l’espagnol puis prépare un brouillon anglais ; **Traducir al inglés** prépare aussi une première traduction sans modifier l’original. Le Studio affiche les passages espagnols correspondants à côté des propositions anglaises. **Validar y guardar inglés** enregistre la version relue ; **Publicar sitio** la met ensuite en ligne. Les brouillons ne remplacent jamais les valeurs anglaises publiées. La structure des pages anglaises reste conservée : le rapprochement des blocs est sémantique, pas fondé sur leur ordre. Un texte anglais sans équivalent espagnol est conservé. Si la source espagnole change, il faut régénérer une proposition avant de la valider. Les fiches produit gardent leurs champs anglais existants et leur édition manuelle. L'archivage/brouillon d'un texte ou d'une photo rétablit sa valeur intégrée ; un produit ou une famille non publié est exclu du prochain build. Les textes ne peuvent pas injecter de HTML. Les médias sont copiés sur Vercel à la publication, sans exposer de jeton au navigateur.

L’éditeur visuel conserve les changements en mémoire jusqu’à **Guardar**. Une photo sélectionnée dans la bibliothèque réutilise son fichier Directus ; une image d’origine du dépôt est importée dans Directus avant son affectation. La page et ses photos restent inchangées en ligne jusqu’à **Publicar sitio**. La proposition anglaise est visible dans l’aperçu, et le panneau du texte sélectionné affiche son original espagnol lorsqu’il est disponible. **Validar inglés** conserve l’étape de validation explicite.

## Fonctionnement technique

`npm run build` exécute `cms/prepare.mjs`, Astro puis `cms/finalize.mjs`. Un instantané privé est lu au build ; `cmsCollection` raccorde les fiches structurées. Les clés des textes proviennent de la page, du type d'élément et du texte source original : une modification dans Directus ne change pas sa clé. Le post-traitement conserve les éléments inline et les scripts, puis applique les textes et images publiés. Les menus et pieds de page utilisent des clés partagées par langue. Les fiches et filtres de produit proviennent des collections structurées, pas du remplacement de texte.

Le même build produit des gabarits JSON dans `dist/_studio/pages/`, annotés avec les clés originales des textes et photos. Ces annotations ne sont pas ajoutées au HTML public. `/api/preview` exige une session Studio et sert le gabarit du site configuré dans une iframe de même origine, sans scripts, formulaires actifs ni suivi Analytics. Le parent Studio applique les valeurs courantes ou les brouillons anglais et gère l’édition. Les clés restent stables après publication d’un texte modifié. Après une modification du gabarit, déployer Vercel avant le Studio Railway. Le conteneur Studio installe sa dépendance `parse5` depuis son propre lockfile.

La carte initiale est exportée depuis le HTML réellement produit et le catalogue du dépôt. Pour ajouter des textes après un changement de code : build sans `DIRECTUS_URL`, `node cms/export.mjs`, puis lancer le bootstrap avec les variables du **seul projet Etapel**. Le bootstrap ajoute les éléments manquants sans écraser les contenus existants. Ne pas le relancer après une suppression volontaire : préférer l'archivage. `.cms/` est ignoré par Git.

Variables Vercel Production : `DIRECTUS_URL`, `DIRECTUS_READ_TOKEN`, `PUBLIC_STUDIO_URL`. Variables Studio : `DIRECTUS_URL`, `STUDIO_SESSION_SECRET`, `STUDIO_ORIGIN`, `STUDIO_SITE_URL`, `VERCEL_DEPLOY_HOOK`, `PORT`, `OPENAI_API_KEY`, `TRANSLATION_MODEL`. Les sessions sont chiffrées dans un cookie HttpOnly, Secure, SameSite Strict ; les mutations exigent l'origine configurée et les permissions Directus de l'utilisateur. Les révisions empêchent d'écraser une fiche modifiée depuis son chargement. Aucun jeton administrateur de service n'est utilisé par le Studio.

Le tableau de bord compare le contenu courant à l’empreinte du site pour signaler les changements à publier. Produits : recherche, filtres par famille et état, pagination de 25 fiches ; médias : recherche et pagination de 24 images. L’éditeur demande confirmation avant de fermer une fiche modifiée sans l’enregistrer.

Pour ajouter les nouveaux textes et médias après un changement de code, générer le seed depuis un build sans CMS puis utiliser le script additif :

```sh
node cms/export.mjs
railway variables --service directus --json | node cms/sync-content.mjs
railway variables --service directus --json | node cms/sync-content.mjs --apply
```

Le premier passage est une simulation. Le script ne crée que les textes et médias manquants, sans modifier les contenus existants, les comptes, les permissions ou les jetons. Ne pas l’utiliser pour recréer une suppression volontaire.

Le hook exige un dernier commit vérifié par GitHub quand la politique Vercel l'impose. Conserver cette protection. Les publications de code doivent être signées ou utiliser `createCommitOnBranch` avec contrôle du commit parent.

## Exploitation

Railway contient deux volumes persistants : PostgreSQL et `/directus/uploads`. Conserver base et médias ensemble lors d'une restauration. Une sauvegarde externe et un exercice de restauration restent à organiser ; les volumes persistants seuls ne sont pas une sauvegarde. Les secrets restent dans les plateformes d'hébergement. La première connexion technique Directus peut demander au propriétaire de déclarer son projet ; aucune acceptation de conditions n'est automatisée.

Vérifications : `npm test`, `npm run build`, puis les parcours Studio et la publication en navigateur. Déploiement Studio : `railway up --service studio --detach`, depuis le projet lié indiqué dans `deployment.json`. La variable `RAILWAY_DOCKERFILE_PATH` fixe le Dockerfile ; `.railwayignore` limite l'archive aux sources utiles au Studio. Vérifier `/health` après chaque déploiement. Site : `vercel --prod --yes` dans ce checkout lié au projet Vercel existant.

Sur `dev`, utiliser un déploiement Vercel Preview (`vercel --yes`, ou `vercel deploy --prebuilt` après `vercel build`), sans `--prod`. Le domaine SEO de référence reste `https://www.etapel.com` pour les canoniques, les variantes ES/EN et les données structurées. `cms/finalize.mjs` synchronise les métadonnées sociales avec les textes publiés du CMS et génère `/sitemap.xml` depuis les seules pages canoniques effectivement construites ; les anciennes URL de familles et `/admin` en sont exclus. Les aperçus protégés Vercel restent réservés à la validation.

Références API : [authentification Directus](https://directus.com/docs/api/authentication), [contenus Directus](https://directus.com/docs/api/items), [fichiers Directus](https://directus.com/docs/api/files), [Deploy Hooks Vercel](https://vercel.com/docs/deploy-hooks).

Le choix d’une photographie reste dans le formulaire : vérifier son aperçu puis enregistrer la fiche pour conserver le remplacement.

Au premier montage du volume de médias Railway, son répertoire doit appartenir à l’utilisateur Directus `node` (UID/GID 1000). L’instance Etapel a été configurée ainsi ; conserver cette propriété lors d’une restauration. Le service Directus continue de fonctionner sans droits root.

## Traduction des pages et validation

`cms/translations.mjs` utilise l’API Responses OpenAI avec le modèle `gpt-5.4-mini`, une sortie JSON stricte et `store: false`. Seuls les textes éditoriaux nécessaires sont transmis. Les noms de marques, chiffres, adresses et liens sont protégés et vérifiés avant tout enregistrement. La clé reste sur le service Railway Studio, jamais dans le navigateur, Git ou Vercel. Les appels ont lieu lors de l’enregistrement espagnol ou à la demande, pas pendant les visites du site.

Le champ JSON `etapel_texts.translation` contient la proposition, les références des originaux, l’empreinte espagnole et l’état de validation. `value` reste la valeur publiée jusqu’à une validation explicite. Une régénération conserve donc aussi l’anglais précédemment validé. Les écritures et validations utilisent les permissions du compte connecté et vérifient les révisions pour éviter les écrasements.

Initialisation idempotente du seul champ de revue, sans toucher aux textes existants :

```sh
railway variables --service directus --json | node cms/provision-translations.mjs
```

Une panne du fournisseur conserve l’espagnol enregistré et les versions anglaises antérieures ; le Studio permet de réessayer. Les brouillons anglais sont persistants et restent accessibles après rechargement. Le tableau de bord signale les propositions en attente.

Référence : [sorties structurées OpenAI](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses).
