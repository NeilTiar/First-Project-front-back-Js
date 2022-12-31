const { Sequelize, DataTypes } = require('sequelize');
const pokemonModel = require('../models/pokemon');
const userModel = require('../models/user');
let pokemons = require('../../mock-pokemon');  //ce fichier statique etait utilisé afin de simuler notre BDD, mais n'est plus utile
const bcrypt = require('bcrypt');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');
const express = require('express');
let sequelize 

// si en production alors connexion BDD à distance (heroku postrgres)

if (process.env.NODE_ENV === "production") {

    sequelize = new Sequelize(
      'd7rb3md08e3u5p',
      'adixxymkvzxxjr',
      '5af296fe2bd3cfe194a512b78f2f14dc346d51b91ed03095b565e2d33511e2ff',
      
      {
        
         dialect: 'postgres',
         host: 'ec2-3-220-207-90.compute-1.amazonaws.com',
         dialectOptions: {
            ssl: {
               require: true,
               rejectUnauthorized: false
             },
            timezone: 'Etc/GMT-2' // ici timezone est utile pour signifier la date pour created at et updated at 
         },
         logging: true// ici false permet d'eviter de voir un message d'erreur apparaitre :"[SEQUELIZE0002] DeprecationWarning: The logging-option should be either a function or false. Default: console.log "
      })              //ce message n'est pas un message d'erreur mais un message pour indiquer que ce parametrage est deprecié

} else {

   //si autre que 'production' (developement) alors conexion BDD local 

    sequelize = new Sequelize(
      'pokedex',
      'neil',
      'neil',
      {
         dialect: 'postgres',
         host: 'localhost',
         dialectOptions: {
            timezone: 'Etc/GMT-2' // ici timezone est utile pour signifier la date pour created at et updated at 
         },
         logging: false// cette ligne pour eviter de voir un message d'erreur apparaitre :"[SEQUELIZE0002] DeprecationWarning: The logging-option should be either a function or false. Default: console.log "
      },

     

      
   )
}
const Pokemon = pokemonModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);



const initDb = () => {

    //  explication de .sync() ci dessous :
    // return sequelize.sync().then ...     creation d'une nouvelle table pour le model pokemon,seulement si cette table n'existe pas (ne modifie jamais la table existante, concerve les données enregistré en l'état)
    // return sequelize.sync({ force: true }).then ...   creation d'une nouvelle table en supriment d'abord la table qui pourait deja existé (efface tout pour refaire une nouvelle table)
    //return sequelize.sync({alter: true}).then ...    cette solution verifie l'etat de la table dans la bdd (colonne ,type de données .... ) puis efféctue les modifications nécéssaire pour qu'elle corresponde au model
    // simillaire à sync({force : true}) mais remplace les données différentes au model au lieu de tout suprimmer et recréer une table

      return sequelize.sync().then(_ => {
  
        console.log('la base de données"pokedex" à bien été synchronisée')


        //code ci dessous permet de creer un user en passant par l'orm squelize plutot que Thunder Client
  
        bcrypt.hash(15)
        .then(hash => {
            User.create({
                username: 'neil',
                password: hash,
                admin: true
            })
                .then(user => console.log(user.toJSON()))
                .catch(err => console.log(err))
            console.log('la base de donnée à bien été initialisée !')
        })
    
                pokemons.map(pokemon => {
                    Pokemon.create({  // ici Pokemon corespond a une variable du meme nom, voir lignes 10 et 34 pour comprendre !!!
                       name: pokemon.name,
                       hp: pokemon.hp,
                       cp: pokemon.cp,
                       picture: pokemon.picture,
                       types: pokemon.types  //.join()//  la propriété types etant une chaine de caractere en base de données ,alors que coté api rest les types sont un tableau de chaine de caractere .join() permet de generer un chaine de caractere pouvant etre sauvegarder en base de données
                                                   //pour effectuer l'operation en sens inverse string vers array ,il exist une methode split(",").cette methode été apliqué dans un premier temps mais n'est plus utile car ajout de getter et setter pour gerer ce probleme au niveau du fichier pokemon.js (models).
                 
                 
                      }).then(pokemon=> console.log(pokemon.toJSON())) //toJSON() est apliqué pour afficher correctement les informations des instance d'un model, afin d'afficher seulement les valeurs qui nous intéresse.
                       .catch(err => console.log(err));                //sans le toJSON ,des infos technique concernant notre instance sont rendu disponible ce qui pourrait posé probleme .
                       })
                       })
  
}

/*exemple d'utilisation de sequilize sans utiliser de  Model :
 
return sequelize.sync({force: true}).then(_=>{
     
 console.log('la base de données"pokedex" à bien été synchronisée')

     pokemons.map(pokemon => {
         Pokemon.create({  // ici Pokemon corespond a une variable du meme nom, voir lignes 10 et 34 pour comprendre !!!
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types  //.join()//  la propriété types etant une chaine de caractere en base de données ,alors que coté api rest les types sont un tableau de chaine de caractere .join() permet de generer un chaine de caractere pouvant etre sauvegarder en base de données
                                        //pour effectuer l'operation en sens inverse string vers array ,il exist une methode split(",").cette methode été apliqué dans un premier temps mais n'est plus utile car ajout de getter et setter pour gerer ce probleme au niveau du fichier pokemon.js (models).
      
      
           }).then(pokemon=> console.log(pokemon.toJSON())) //toJSON() est apliqué pour afficher correctement les informations des instance d'un model, afin d'afficher seulement les valeurs qui nous intéresse.
            .catch(err => console.log(err));                //sans le toJSON ,des infos technique concernant notre instance sont rendu disponible ce qui pourrait posé probleme .
         })
      */               // ) paranthese a ajouter en cas d'utilisation de intDB()


module.exports = {
   initDb, Pokemon, User
}
