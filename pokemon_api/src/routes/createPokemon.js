const { ValidationError } = require('sequelize');
const { Pokemon } = require('../db/sequelize'); // importation du Model Pokemon dans notre point de terminaison
const auth = require('../auth/auth')


module.exports = (app) => { // on export une fonction qui prend en parametre l'application express tout entiere 
   //afin de definir des reoute plus simplement dans notre application  tout en ayant des points de terminaisons séparés dans plusieurs modules distinct

   app.post("/api/create", auth,(req, res) => {

      Pokemon.create(req.body) // la methode findAll() retourne une promesse contenant la liste de tous les pokmemons présent dans la BDD

         .then(pokemon => {
            const message = `le pokemon ${req.body.name} pokemons à bien ete crée`
            res.json({ message, data: pokemon })
         })
         .catch(error => {
          // la condition if ci dessous permet de gerer l'erreur concernant la validation du model Pokemon

          if(error instanceof ValidationError) {
            return res.status(400).json({message : error.message, data : error })
          }

          const message = "le pokémon n\'a pas pu être ajouter veuillez réessayer dans quelques instants."
          res.status(500).json({message, data: error})
         })
   })
}