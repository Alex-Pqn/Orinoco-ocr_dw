## Construire un site e-commerce - Orinoco
### P5 - OpenClassrooms "Développeur Web"
- Site web créé en HTML5/CSS3 & Javascript
- Communication avec une API REST existante
- Réalisation d'un [plan de tests unitaires](/Plans/Plan%20de%20tests%20unitaires.pdf)
- Requête GET afin de récupérer les données de l'API
- Possibilité de mettre dans son panier d'achat un appareil photo personnalisable
- Stockage persistant des données dans le localStorage
- Suppression d'un ou de tous les appareils dans le panier d'achat et formulaire de validation de commande avec des événements Javascript et la validation des données
- Requête POST afin d'envoyer le panier d'achat et recevoir en retour le numéro de commande unique à afficher au client
- Architecture des dossiers et fichiers respectée
- Utilisation de Sass et préfixage du CSS
- Responsive
- Accessibilité appliquée

### Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Installation ###

Clone this repo. From within the project folder, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

For an optimal start-up, run the scripts that are with ("sass" and "prefix")
sass script : "npm install sass -g"
prefix script : "npm install autoprefixer postcss postcss-cli -g"

### Start-up commands ###
"node server", "run sass" and "run prefix"

---

![Site au complet](/public/img/Orinoco.png)


![Commande d'un appareil](/public/img/Orinoco%202.png)


![Validation du panier d'achat](/public/img/Orinoco%203.png)
