const { Pokemon } = require('../db/sequelize');
const { ValidationError } = require('sequelize');
const pokemon = require('../models/pokemon');
const auth = require('../auth/auth');





module.exports = (app) => {

  app.put("/api/update/pokemon/:id", auth, (req, res, next) => {

    const { id } = req.params

    function getLastName() {
      Pokemon.findByPk(id)
      .then(pokemon => {
        lastName = `${pokemon.name}`
      })
    }

    getLastName()

    /*la fonction getLastName peremet de récupérer le nom du pokemon avant modification afin de présenter le précédent nom au client
    la variable "lastName" n'est pas précédé d'un "const" ou d'un "let" ,ceci afin de permetre une portée en dehors de la fonctions
    et ainsi accéder au précédent nom du pokemon depuis une promesse ligne 51 "previousName"*/


    Pokemon.update(req.body, {

      where: { id: id }
    })

      .then(_ => {

        //le return ci dessous permet de transmetre l'erreur eventuel de la methode findByPk dans le bloc .catch situé plus bas dans le code
        return Pokemon.findByPk(id)

          .then(pokemon => {

            if (pokemon === null) {
              const message = `ce pokemon n'existe pas ,veuillez essayer un pokemon avec un identifiant different`
              return res.status(404).json({ message, data: pokemon })
            }

            //ci dessous la gestion d'erreur technique dans le cas ou ,le pokemon n'existe pas  

            const message = `le pokemon ${pokemon.name} à bien ete mis a jour `
            const previousName = `précédement nomé : ${lastName}`
            res.json({ message, previousName, data: pokemon })

          })
      })

      .catch(error => {

        if (error instanceof ValidationError) {
          return res.status(500).json({ message: error.message, data: error })

        }

        // la condition if ci dessous permet de gerer les erreurs metier concernant la validation du model Pokemon

        const message = 'le pokemon n\'a pas pu etre modifier.Réesayer dans quelques instants '
        console.log(error)
        res.status(500).json({ message, data: error })

      })

    /*.catch(error => {
      const message = 'le pokemon n\'a pas pu etre modifier.Réesayer dans quelques instants '
      res.status(500).json({message, data: error})
    })*/

  })
}

//ici nous avons 2 erreurs 500 possible,l'un l'orsque sequelize est solicité pour trouver un pokemon par son id ;
// puis une seconde fois pour une possible erreur concernant l'update.
//ces 2 erreurs peuvent survenir indepandement l'une de l'autre ,il faut donc bien gérer ces deux éventualitées 

