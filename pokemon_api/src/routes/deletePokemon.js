const { Pokemon } = require("../db/sequelize")
const auth = require('../auth/auth');

module.exports = (app) => {

    app.delete("/api/pokemon/:id",auth, (req, res) => {

        const { id } = req.params

        Pokemon.findByPk(id).then(pokemon => { // le findBypk(id) est en premier lieu car avant de suprimer un pokemon ,
                                               // il est logique de verifier si celui ci existe bien .Dans le cas contraire le client 
                                               //sera informé que celui ci n'existe pas (voir ligne 14)
            if (pokemon === null) {
                const message = 'le pokemon demandé n\'existe pas.Réessayez avec un autre identifiant ';
                return res.status(404).json({ message })
            }

            const pokemonDeleted = pokemon; // ici on stock dans une variable les données du  pokemon  ,afin d'afficher ces données en cas de suppression
                                           //voir .then ligne 24

            return Pokemon.destroy({
                where: { id: pokemon.id } //pour indiquer la suppression la ou l'id de l'url est equivalent à l'id d'un pokemon dans la base de donnée
            })
                .then(_ => {
                    const message = `le pokemon avec l\'identifiant ${pokemonDeleted.id} à bien été supprimé `
                    res.json({ message, data: pokemonDeleted }) //
                })
        })
            .catch(error => {
                const message = 'le pokemon n\'a pas pu etre effacer.Réesayer dans quelques instants '
                res.status(500).json({ message, data: error })
            })

    })

}