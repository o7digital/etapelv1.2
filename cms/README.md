# Etapel Studio

Studio éditorial : https://studio-production-f1a3.up.railway.app · Accès depuis le site : https://etapelv1-2.vercel.app/admin/

Le projet Railway **etapel-cms** est entièrement indépendant de Nathalie : sa propre instance Directus 12.6.1, PostgreSQL 18, son volume de médias, son service Studio, ses comptes et ses jetons. Les identifiants non sensibles figurent dans `deployment.json`. L'interface reprend le bleu nuit, le blanc et l'orange Etapel. Le site vitrine reste sur Vercel ; la boutique `etapel-tienda` n'est pas modifiée.

## Accès

Compte propriétaire initial : `olivier.steineur@icloud.com`. Le mot de passe aléatoire est conservé dans **Railway → etapel-cms → production → directus → Variables → ADMIN_PASSWORD**. Ne pas le copier dans Git. Modifier le mot de passe du compte dans Directus après récupération ; la variable de bootstrap ne reflète plus le mot de passe courant après sa modification. Le serveur SMTP de récupération de mot de passe n'est pas configuré. L'administration technique Directus est sur https://directus-production-dd39.up.railway.app/admin/.

Le rôle `Etapel content editor` est préparé pour les comptes éditoriaux. L'identité `Etapel website build` n'a que la lecture sur les cinq collections et leurs fichiers. Le propriétaire initial est administrateur. Créer les comptes de l'équipe avec leurs vraies adresses avant de partager un accès permanent.

## Éditer et publier

- **Inicio, Nosotros, CEDETEC, Soporte técnico, Contacto, Privacidad** : textes et métadonnées SEO, classés selon les sections actuelles. Les textes sont préremplis ; le vert signale les champs éditables.
- **Productos** : 225 fiches initiales, création, édition, brouillons et archivage, descriptions espagnoles/anglaises, marque, famille, photos, galerie, points forts, caractéristiques, variantes, blocs et documents. Les adresses existantes sont conservées.
- **Familias de producto** : les 11 familles initiales, descriptions, photographie, ordre et spécialités. Les familles liées aux anciens liens et celles qui contiennent des produits publiés restent protégées contre l'archivage.
- **Páginas del catálogo** : textes des pages de familles en espagnol et en anglais.
- **Marcas** : les 25 marques du bandeau, ajout, libellé, ordre et archivage. Les styles propres aux marques existantes sont conservés.
- **Biblioteca de imágenes** : 321 emplacements initiaux, photos des sections et galeries produits. Changer une photo met à jour tous ses usages. L'upload d'une nouvelle image l'ajoute à la bibliothèque ; elle peut ensuite être choisie dans une fiche. JPG, PNG, WebP, AVIF, 25 Mo maximum.
- **Navegación y pie** : libellés partagés des menus et pieds de page. La logique des formulaires, d'Olivia, les liens système et le filtrage catalogue restent dans le code.

**Guardar** enregistre dans Directus. **Publicar sitio** déclenche le Deploy Hook Vercel de `dev`, désormais branche de production de ce projet. Le Studio vérifie l'empreinte du contenu servi pour confirmer sa publication ; l'acceptation du hook ne signifie pas que le build est terminé. Si le CMS, un média ou le build échoue, le site précédent reste disponible. La durée habituelle dépend de la file Vercel et du volume de médias. `main` n'est pas modifié. L'ancienne variable Olivia Preview spécifique à `dev` a été conservée avec une portée Preview générale pour permettre cette configuration ; la variable Production n'a pas changé.

L'espagnol et l'anglais sont éditables séparément ; aucune traduction automatique n'est facturée ni déclenchée. Les champs de collection en anglais existants sont conservés. L'archivage/brouillon d'un texte ou d'une photo rétablit sa valeur intégrée ; un produit ou une famille non publié est exclu du prochain build. Les textes ne peuvent pas injecter de HTML. Les médias sont copiés sur Vercel à la publication, sans exposer de jeton au navigateur.

## Fonctionnement technique

`npm run build` exécute `cms/prepare.mjs`, Astro puis `cms/finalize.mjs`. Un instantané privé est lu au build ; `cmsCollection` raccorde les fiches structurées. Les clés des textes proviennent de la page, du type d'élément et du texte source original : une modification dans Directus ne change pas sa clé. Le post-traitement conserve les éléments inline et les scripts, puis applique les textes et images publiés. Les menus et pieds de page utilisent des clés partagées par langue. Les fiches et filtres de produit proviennent des collections structurées, pas du remplacement de texte.

La carte initiale est exportée depuis le HTML réellement produit et le catalogue du dépôt. Pour ajouter des textes après un changement de code : build sans `DIRECTUS_URL`, `node cms/export.mjs`, puis lancer le bootstrap avec les variables du **seul projet Etapel**. Le bootstrap ajoute les éléments manquants sans écraser les contenus existants. Ne pas le relancer après une suppression volontaire : préférer l'archivage. `.cms/` est ignoré par Git.

Variables Vercel Production : `DIRECTUS_URL`, `DIRECTUS_READ_TOKEN`, `PUBLIC_STUDIO_URL`. Variables Studio : `DIRECTUS_URL`, `STUDIO_SESSION_SECRET`, `STUDIO_ORIGIN`, `STUDIO_SITE_URL`, `VERCEL_DEPLOY_HOOK`, `PORT`. Les sessions sont chiffrées dans un cookie HttpOnly, Secure, SameSite Strict ; les mutations exigent l'origine configurée et les permissions Directus de l'utilisateur. Les révisions empêchent d'écraser une fiche modifiée depuis son chargement. Aucun jeton administrateur de service n'est utilisé par le Studio.

Le hook exige un dernier commit vérifié par GitHub quand la politique Vercel l'impose. Conserver cette protection. Les publications de code doivent être signées ou utiliser `createCommitOnBranch` avec contrôle du commit parent.

## Exploitation

Railway contient deux volumes persistants : PostgreSQL et `/directus/uploads`. Conserver base et médias ensemble lors d'une restauration. Une sauvegarde externe et un exercice de restauration restent à organiser ; les volumes persistants seuls ne sont pas une sauvegarde. Les secrets restent dans les plateformes d'hébergement. La première connexion technique Directus peut demander au propriétaire de déclarer son projet ; aucune acceptation de conditions n'est automatisée.

Vérifications : `npm test`, `npm run build`, puis les parcours Studio et la publication en navigateur. Déploiement Studio : `railway up --service studio --detach`, depuis le projet lié indiqué dans `deployment.json`. La variable `RAILWAY_DOCKERFILE_PATH` fixe le Dockerfile ; `.railwayignore` limite l'archive aux sources utiles au Studio. Vérifier `/health` après chaque déploiement. Site : `vercel --prod --yes` dans ce checkout lié au projet Vercel existant.

Références API : [authentification Directus](https://directus.com/docs/api/authentication), [contenus Directus](https://directus.com/docs/api/items), [fichiers Directus](https://directus.com/docs/api/files), [Deploy Hooks Vercel](https://vercel.com/docs/deploy-hooks).

Le choix d’une photographie reste dans le formulaire : vérifier son aperçu puis enregistrer la fiche pour conserver le remplacement.

Au premier montage du volume de médias Railway, son répertoire doit appartenir à l’utilisateur Directus `node` (UID/GID 1000). L’instance Etapel a été configurée ainsi ; conserver cette propriété lors d’une restauration. Le service Directus continue de fonctionner sans droits root.
