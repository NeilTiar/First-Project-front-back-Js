
const validTypes = ['Plante', 'Poison', 'Feu', 'Psy', 'Sol', 'Fée', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik',]

module.exports = (sequelize, DataTypes) => { //sequelize est un objet qui represente la connexion avec la BDD  //le parametre DataType permet de definir les types de donnés pour chaque propriété de notre model

   //ex : name contient un chaine de caractere (STRING)

   return sequelize.define('pokemon', { // la propriété define permet de declarer un nouveau model auprés de sequelize

    

      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },


      name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: { msg: "le champ (name) doit etre renseigné " },
            notNull: { msg: "veillez à renseigner un nom avec au moins 3 caracteres" }
         },
         unique: {
            msg: "ce nom de pokemon est deja enregistrer"
         }
      },

      hp: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: { msg: "le champ (hp) doit etre renseigné " },
            notNull: { msg: "Utilisez uniquement des nombre entier pour les points de vie " },
            isInt: { msg: "Veillez à bien utiliser des nombres entiers pour les points de vie " },
            min: {
               args: [0],
               msg: "les points de vie doivent etre superieur ou égale à 0"
            },
            max: {
               args: [999],
               msg: "le niveau maximum pour les points de vie est de 999"
            }
         }
      },


      cp: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: { msg: "le champ (cp) doit etre renseigné " },
            notNull: { msg: "Utilisez uniquement des nombre entier pour les points de caracteres" },
            isInt: { msg: "Veillez à bien utiliser des nombres entiers pour les points de caracteres" },
            min: {
               args: [0],
               msg: "les points de competences doivent etre superieur ou égale à 0"
            },
            max: {
               args: [99],
               msg: "le niveau maximum pour les points de competences est de 99"
            }
         },
      },
      picture: {
         type: DataTypes.STRING,
         allowNull: false,

         validate: {
            notNull: { msg: "picture is à required property " },
            isUrl: { msg: "the picture must be a URL with https protocol" }
         }
      },

      author: {
         type: DataTypes.STRING,
         allowNull: false,

         validate: {
            len: [2, 15],
            notEmpty: { msg: "auhor must be filled up , not empty !" },
           

            customValidator(value) {
               
                 if(value.length < 2 || value.length > 15 ) {
                  throw new Error("author must contain between 2 & 15 caracteres")
               }if(value.length == 2 ){
                  throw new Error("author must contain at least 3 caracteres ")
               }
         }
      },
   },
      types: {

         type: DataTypes.STRING,
         allowNull: false,


         get(types) {
            //les données stockées ds la bdd (chaine de caractere unique ) ne sont pas reconnu par l'api rest (objet ou tableau) et inversement, de ce fait une configuration est requise pour des echanges fonctionnel,
            return this.getDataValue('types', types.split(','))//permet de  transformer le types de données : base de données (chaine de caractere unique) vers api-rest (objet []) 
         },

         set(types) {

            this.setDataValue('types', types.join())// transformation inverse object vers chaine de caractere unique avec types.join();
            // seulement pour ce projet, l'utilisation de .join() renvoie une erreur : "styles.join() is not a function"  ???? (a voir pour mieux comprendre pourquoi ) 
            //il semblerait que le .join() soit efficace l'or de l'initialisation de la BDD via initDB() depuis le fichier sequelize.js ,mais si on alimente la BDD depuis
            //le body alors .join() pose probleme .le body parser etant actif a verifier si il y à un conflit entre .join() et celui ci. 
         },

         validate: {
            isTypesValid(value) {

               //en indiquant une fonction isTypesValid() dans l'objet de validate ,cela permet la creation d'un validateur personalisé. celui ci nous permet d'envoyer un message d'erreur si aucune valeur n'est renseigné pour le type. 

               if (!value) {
                  throw new Error('Un pokemon doit au moins avoir un type')   // throw new Error('') permet de definir un message d'erreur généré si la condition if(!value) est constaté de ce cas précis
               }

               if (value.split(',').length > 3) {  // cette condition permet de constater si un pokemon à 3 types au maximum
                  throw new Error('un pokemon peux posséder 3 types max')
               }

               //la condition ci dessous  permet de comparer le ou les types renseigné par l'utilisateur ,avec la liste de types signifié dans la variable valideTypes 
               value.split(',').forEach(type => {
                  if (!validTypes.includes(type)) {
                     throw new Error(`le type d'un pokemon doit appartenir à la liste suivante : ${validTypes} `)
                  }
               });
            }
         },
      }
   }, {
      timestampes: true,
      creatdeAt: 'created',
      updatedAt: true

   })
}



// les validations :

//representent une ou plusieurs des conditions pour definies pour les propriétés de notre model , en effet chaqune des propriétés(antité de la table pokemon) pourra compter 
// une propriété (validate :) qui conteint en valeurs un objet avec des atribue de validation tel que notNull ou isInt .
//list des atribues => https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
//remarque : recherche effectué en vain afin de definir plusieurs chaines de caractere indispensable pour l'url de la propriété "picture"; les atribues de validation on un fonctionement défini et limité 
//pas de possibilité pour  personalisé l'utilisation ou le fonctionement de ces derniers