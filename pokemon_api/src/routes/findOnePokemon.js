
const { success } = require('../../helper');
const { Pokemon } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
  app.get("/api/pokemon/:id",auth, (req, res) => {

    const { id } = req.params

    Pokemon.findByPk(id) //la methode findByPk permet de reconnaitre une valeur a partir d'une chaine de caractère,dans ce cas plus besoin de parsInt


      .then(pokemon => {

        const message = 'le pokemon  à bien été trouvé dans la bdd'
        const message2 = "le pokemon n'a pas ete trouvé dans la bdd"

        if (pokemon !== null) {
          res.json({ message, data: pokemon }) //res.json avec un "j" minuscule grosse perte de temps pour ce detail !!!
        } else {

          return res.status(404).json({ message2 })
        }
      })
      
      .catch(err => {
        const message = `probleme avec la BDD, veullez réessayer ulterieurement :`
        res.status(500).json({message,data : err})
   })
 })
}
 