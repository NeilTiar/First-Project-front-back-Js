const { Pokemon } = require('../db/sequelize'); // importation du Model Pokemon dans notre point de terminaison
const { Op } = require('sequelize') // cette ligne permet d'importer les opérateurs de sequlize
const auth = require('../auth/auth')
// require Op sans destructuring
//const sequelise = require('sequelize')
//Op = sequelise.Op

module.exports = (app) => { // on export une fonction qui prend en parametre l'application express toute entiere 
                            //afin de definir des routes plus simplement dans notre application tout en ayant des points de terminaisons séparés dans plusieurs modules distinct ()

   app.get("/api/pokemons",auth,(req, res) => {

      if (req.query.name ) { // si on recherche un pokemon par nom ..........

         const name = req.query.name            //req.query est un objet contenant toutes les information contenu dans l'url , dans ce cas on extrait le parametre de requette name de l'url en passant par req fourni par express
         //pour info (req.params est lui aussi un objet ,mais il contient toutes les info concernant les id)

         const userLimit = parseInt(req.query.limit) || 2; // cette variable contient une limit indiqué dans l'url ,et dans le cas ou aucune limite n'est indiqué une valeur par defaut (définie aprés le ||)

        if (name.length < 2 ) {
        
         const message = "veuillez indiquer au moins 3 caracterès pour votre recherche"
         console.log(message)
         return res.status(404).json({message}) // {message} destructuring equivalent à message : message //  ceci est utilisé dans un souci de lisibilité si on indique json.(message)
         //on pourra recevoir "veuillez indiquer au moins 3 caacterès pour votre recherche" sans  "message : "  devant.
         
        }
        
         return Pokemon.findAndCountAll({  // findAndCountAll va chercher 2 infos en base de donnée ,les résultats demandé ( limité à 6 dans cet exemple ) et le nombre total de résultat 
            where: {
               name: { // ici ,name est une propriété du model Pokemon

                  
            //ci dessous [sequelise.Op.ilke] sequelise n'est pas indiqué car destructuration utilisé voir ligne 2

                  [Op.iLike]: `%${name}%`} //   ici on utilise un operateur provenant de l'orm sequelize ,afin de faciliter les requettes sql vers notre BDD
                  //[op.iLike] permet une requette pour effectué une recherche comparative permissive,ex si le nom dans la BDD possede une majuscule et que le 
                  //client renseigne une recherche sans majuscule. iLike va proposer toutes les données trouvé en BDD qui corespondent.

                  //[Op.like] permet d'effectué des recheches à l'instar de iLike ,mais les données ne seront pas propposées dans le cas ou le client renseigne un des caractere 
                  //ou nom sans majuscule , pour une donnée qui en possede une (like est un peu moins permissif)

                  //[Op.eq] permet d'éffectuer une recherche strictement similaire à la donnée recherchée ;il faudrat dans ce cas réspecter la ou le majuscle,
                  //et le client devra renseigener dans le champ le nom exacte . (recgherche strict)

                  //en ce qui concerne les % autour de %${name}% pour determiner une recherche global pour sur le nom d'un pokemon ( notre cas )
                  // ${name}% pour rechercher un pokemon qui commence par le terme de recherche et $%{name} pour rechercher un pokemon qui se termine par le terme de recherche 
                 
            },
            limit:userLimit // "limit" en parametre de la methode findAll ,permet de limter le resultat à 6 pokemons dans ce cas 
         })
            .then (({count,rows}) => {  //ici count correspond au nombre de resultats total ,et rows correspond aux données des pokemon visé (limité à 6)
               
               const message = `il y a ${count} qui correspondent à la recherche  ${name}`
               res.json({ message, data: rows })
            })

      } else {

         Pokemon.findAll({        // la methode findAll() retourne une promesse contenant la liste de tous les pokmemons présent dans la BDD
            order: [
               ['id', 'ASC'],
            ]
         })
            .then(pokemons => {
               const message = `la liste de  pokemons à bien ete recupéré`
               res.json({ message, data: pokemons })
            })
            .catch(error => {
               const message = `la liste des pokemons n'a pas pu etre récupéré.Veuillez réessayer`
               res.status(500).json({ message, data: error })
            })
      }
   })
}     
