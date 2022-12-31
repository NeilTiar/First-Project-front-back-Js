const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const privateKey = require('../auth/private_key');
const jwt = require('jsonwebtoken');
const compareFunction = require("./signUp")


//piste pour resoudre ce probleme de login : https://www.youtube.com/watch?v=ON0NnDs3W9o&ab_channel=TutorialsWebsite
                                           
module.exports = (app) => {

    app.post("/api/login", (req, res) => { //! 1 semaine de perdu ,tentative avec app.post a la place de app.put

        User.findOne({ where: { username: req.body.username } }).then(user => {


            //en cas de tentative de connexion, si l'utilisateur n'existe pas ,nous lui retournont un code erreur 400 et un message d'erreur 
            if (!user) {
                const message = `L'utilisateur demandé n'existe pas`
                return res.status(404).json({ message })
            }

            try {
                const client = req.body.password;
                const bdd = user.password
                
   
                    bcrypt.compare(client,bdd ,function(err, isPasswordValid){ 

                     const messageErr = "wrong password, please try again"  
                        if(!isPasswordValid){return res.status(401).json({messageErr,isPasswordValid})}

                            const token = jwt.sign(
                                { userId: user.id }, // 1- transmition du user Id 
                                privateKey,          // 2-permet le salage de notre token ,en effet sans cette clé l'encryptage peut s'avére peu éficace car il suffirait de testé le token avec plusieurs encryptage différent, afin de décoder le token.
                                { expiresIn: '1h' }, // 3-permet de definir le temps avant expiration du token 
                            )
                            const username = user.username;
                            const message = `L'utilisateur à été connécté avec succés`;
                            return res.json({ token, username, message})   
                                
                    })

              }  
            catch  {
                const messageError = err.message;
                const Userpass = user.password;
                const clientPass = req.body.password;
                const message = `le mot de passe est incorrect`
                return res.status(401).json({ messageError, Userpass, clientPass })
            }


                /*  .then(isPasswordValid => {

                      if (isPasswordValid) {

                          //jwt ,ici on configure et on transmet des données necesaire pour générer un token grace à 3 parametres 
                          const token = jwt.sign(

                              { userId: user.id }, // 1- transmition du user Id 
                              privateKey,          // 2-permet le salage de notre token ,en effet sans cette clé l'encryptage peut s'avére peu éficace car il suffirait de testé le token avec plusieurs encryptage différent, afin de décoder le token.
                              { expiresIn: '1h' }, // 3-permet de definir le temps avant expiration du token 
                          )

                          const password = user.password;
                          const message = `L'utilisateur à été connécté avec succés`;
                          console.log(hashedClient)
                          return res.json({ token, password, message, isPasswordValid }) // ici, token est indiqué afin de retourner un jeton à l'utilisateur
                      }
                  })
          } catch (err) {
              const messageError = err.message;
              const Userpass = user.password;
              const clientPass = req.body.password;
              const message = `le mot de passe est incorrect`
              return res.status(401).json({ messageError, Userpass, clientPass })
          }

      })*/


          })
    }
    
    )}
   