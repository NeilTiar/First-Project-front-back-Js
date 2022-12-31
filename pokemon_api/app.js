/*const {success} = require('./helper.js');
const {getUniqueId} = require('./helper'); ces modules été utiliser avec un fichier static pour simuler une BDD */

require('dotenv').config();
const cors = require('cors');
const express = require('express'); //famework permetant l'utilisation des midleware ,des objets req ,res ,next .......
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');// permet de lire toutes les données contenues dans une requête HTTP,
// telles que les en-têtes, req.headers (tableau),req.body ,grace à express qui transforme automatiquement la demande en objets javascript.

/* option de cors par defaut: 

{
   origin: '*',
   methode :"GET,HEAD,PUT,PATCH,POST,DELETE",
   preflightContinue : "false",
   optionsSuccessStatus : 204
  }*/
  

const sequelize = require('./src/db/sequelize');

//exemple de terminaison alternative (ligne 40 à 44)ss
//const updatePokemon = require('./src/routes/updatePokemon');
//updatePokemon(app)
const app = express();

// ci dessous le port "3000" est defini pour le developement ( local ), et process.env.port pour la partie production ( deployement ) cela permet d'accéder au port
// défini dynamiquement par heroku 

port = process.env.PORT || 3000

//VARIABLE D'ENVIRONEMENT "NODE_ENV" ,elle se trouve dans le script du fichier package.json, et permet de specifier l'environement dans lequel une application s'execute ( developement ou production )
// express recupère cette variable pour savoir si il doit fonctionner en mode production ou non, ceci permet à express de fonctionné de facon beaucoup plus optimisé et ainsi d'apporter 
// des reponses plus rapidement à nos  utilisateurs

app

   .use(favicon(__dirname + '/public/purple.ico'))
   .use(bodyParser.json())
   .use(cors())


sequelize.initDb(); //utilisation de .sync() dans la fonction initDb dans le fichier sequelize.js.

//la fonction initDb() etait utilisé afin d'initialiser la BDD a chaque redemarage du server.
//si des modification etait effectuer ,une réinitialisation etait effectuer grace a un .map
//ainsi le fichier statique qui copiait  tous les pokemons sur la BDD aprés chaque redémmarage ,utilisation de .sync({force :true}).



app.get('/', (req, res) => {
   res.json("hello Heroku! 🖐️")
})

//Ici nous placerons nos futurs points de terminaison pour interagir avec la base de données.
require('./src/routes/updatePokemon')(app)
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findOnePokemon')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/login')(app)
require('./src/routes/signUp')(app)
//il est possible de require un endpoint en assignant une IIFE (Imediately invoked fonction expression)
//est ainsi en faire une fonction classique 



//On ajoute la gestion des erreurs 404 ,dans le cas ou le client renseigne un URL inexistant
// en d'autre terme si le client renseigne une route differente de toute les routes que l'on à creer, celui ci receveras alors le massage ci-dessous


app.use(({ res }) => {
   const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL'
   res.status(404).json({ message })

   //la ligne ci dessus ,permet de retourner le code que l'on souhaite à nos client .
   //evidement ici le code 404 sera renvoyé en cas d'erreur .
})



app.listen(port, () => (console.log(`server on port:${port}`)));


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
ci dessous exemple de points de terminaison concernant simulation BDD via fichier static



app.get("/",(req,res) =>res.send("message from server nodeJS, with new nodemon test")); 

app.get("/api/tshirt/:id/:name",(req,res)=>{

const {id} = req.params;
const {name} = req.params;
 res.send(`TSHIRT n°${id} de la marque ${name}`);

});


app.get("/api/pokemon/:id/",(req,res)=>{
 try{
    const id = parseInt(req.params.id);
    const {name} = req.params;
    const message = "un pokemon à bien été trouvé";
    const pokemonById = pokemons.find(pokemon => pokemon.id===id);

    res.status(200).json(success(message,pokemonById));
 }catch(err){
    console.error(err).res.status(500)
 }
});

app.get("/api/pokemons",(req,res)=>{

const message= "ci dessous la liste de tous les pokemons disponible dans notre tableau (api fictif) à bien été trouvé";



res.status(200).json(success(message,pokemons))  

});

app.post("/api/pokemons",(req,res)=>{

const id = getUniqueId(pokemons);
const pokemonCreated = {...{id: id,created : new Date(),...req.body}}; 
pokemons.push(pokemonCreated);
const message = `le pokemon ${pokemonCreated.name} à bien ete crée !`;
res.status(200).json(success(message,pokemonCreated))
});


app.put("/api/pokemon/:id",(req,res)=>{

const id = parseInt(req.params.id);
const pokemonUpdated = {...req.body, id:id }
pokemons = pokemons.map( pokemon => {
return pokemon.id === id ? pokemonUpdated : pokemon
})
message = `le pokemon ${pokemonUpdated.name} à bien été modifié`
res.status(200).json(success(message,pokemonUpdated))
});


app.delete("/api/pokemon/:id",(req,res)=>{

const id = parseInt(req.params.id);

const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id) // ici on stock l'id du pokemon a effacer pour transmetre les info (voir pokemonDeleted dans res.json plus bas),

const newPokemonList = pokemons.filter(pokemon => pokemon.id !== id)  // ici on compare tous les id  pour renvoyer un tableau avec les pokemons qui ont un id =! de req.params.id

   console.log("test:",newPokemonList)

const message = `le pokemon ${pokemonDeleted.name} avec l'id ${pokemonDeleted.id} à bien été suprimé`

pokemons.push(newPokemonList)

res.status(200).json(success("la nouvelle list de pokemon :",newPokemonList)) 


});*/






