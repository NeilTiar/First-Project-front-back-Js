

module.exports = (sequelize, DataTypes) => {

    return sequelize.define('User', {  // grace à cette ligne, une table sera crée mais attention un (s) sera ajouter automatiquement .ici une table "Users" est crée

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "ce nom de est deja pris "
            },
            validate: {
                len: { // len correspond à lenght ,args : 4 permet de definir le nombre de caractere
                    args: [4],
                    msg: "String length is not in this range"
                }
            }},

            password: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [4],
                        msg: "String length is not in this range"
                    }
                },
                notNull: {msg : "please make sure you've filed up the field password"}
            
      },
            //par deafaut sequelize ajoute un (s) pour chaque table créer ce qui peux poser propbleme l'ors des requetes
    })                    //pour resoudre ce probleme il est possible d'indiquer le nom de la table directement depuis la class grace à la 
    //propriété "table name" ou en ajoutant la propriété "freezeTableName: true " afin de bloquer le comportement par defaut de sequelize.

} 
