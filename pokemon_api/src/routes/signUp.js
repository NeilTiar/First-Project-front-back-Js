const { ValidationError, Sequelize } = require('sequelize')
const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt');
const { restart } = require('nodemon');

module.exports = (app) => {

    app.post("/api/signup", (req, res) => {

        const {username ,password }= req.body;
        const hasedPassword = bcrypt.hash(password,10);

if(req.body.password < 2){

    const message = "your password must include at least 2 characteres !! "
    return res.status(401).json({ message })
}

    hasedPassword
            .then((hash) => {
               
                User.create({ username: username,
                              password: hash })
                          
                    .then(user => {
                       
                        //!!! une condition est imperative afin de definir un succes pour interagir avec la bdd
                        const message = `votre compte à bien été creer avec l'identifiant suivant ${username}`
                        return res.status(200).json({ message, user})
                    })

                    .catch(err => {
                        const msgError = err.essage
                        const message = "une erreur s'est produite"
                        return res.status(401).json({ msgError })
                    })

                  
            })


        })
    }

