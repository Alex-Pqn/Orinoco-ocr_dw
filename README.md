![Orinoco Icon](/public/img/Orinoco%20logo%205.jpg) ![Orinoco Icon](/public/img/Orinoco%20logo.jpg) ![Orinoco Icon](/public/img/Orinoco%20logo%203.jpg) ![Orinoco Icon](/public/img/Orinoco%20logo%202.jpg) ![Orinoco Icon](/public/img/Orinoco%20logo%204.jpg)

## Construire un site e-commerce - Orinoco
### P5 - OpenClassrooms "Développeur Web"
#### Contexte du projet

L'objectif ? Se démarquer des grands site e-commerce comme Amazon en créant des applications thématiques ne vendant qu’un seul groupe de produits. Il y a par exemple Oribook pour les livres ou Oritextil pour les vêtements. Dans un premier temps, Paul, le fondateur de l’entreprise, souhaite créer un premier MVP pour démontrer le fonctionnement de ses applications à ses investisseurs. L’équipe est constituée de Jeanne, développeuse back-end travaillant sur les API et vous, pour la partie front-end.

L’application web sera composée de 4 pages :

- une page de vue sous forme de liste, montrant tous les articles disponibles à la vente
- une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier
- une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de texte dans les champs date
- une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.

Ensuitez, vous planifierez une suite de tests unitaires pour couvrir au minimum 80 % de la base de code pour le front-end. Vous devrez formaliser un plan pour atteindre ce résultat, sans obligation d’écrire ces tests. Expliquez quelles lignes seront testées, et quels “test cases” seront envisagés.

#### Objectifs réalisés
- Site web créé en HTML5/CSS3 & Javascript
- Communication avec une API REST existante
- Réalisation d'un [plan de tests unitaires](/Plans/Plan%20de%20tests%20unitaires.pdf)
- Requête GET afin de récupérer les données de l'API
- Stockage persistant des données dans le localStorage
- Formulaire de validation de commande avec des événements Javascript et la validation des données
- Requête POST afin d'envoyer le panier d'achat et recevoir en retour le numéro de commande unique
- Architecture des dossiers et fichiers respectée
- Utilisation de Sass et de la méthodologie BEM. Préfixage du CSS
- Responsive
- Accessibilité appliquée

## Prerequisites

You will need to have Node and `npm` installed locally on your machine.

## Project setup

### Install
```
npm install
```

### Start API
The API should run on `localhost` with default port `3000`. If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. `Listening on port 3001`.
```
npm run start
```

### Start App
Open the [index.html](/index.html) file in your browser or use an extension to start a local server on this file.

### Compiles sass
Please install sass before `npm install sass -g`
```
npm run sass
```

### Prefix css
Please install autoprefixer and postcss before `npm install autoprefixer postcss postcss-cli -g`
```
npm run prefix
```

## Preview

![Site au complet](/public/img/Orinoco.png)
<br/>
<br/>
<br/>
<br/>
![Commande d'un appareil](/public/img/Orinoco%202.png)
<br/>
<br/>
<br/>
<br/>
![Validation du panier d'achat](/public/img/Orinoco%203.png)
