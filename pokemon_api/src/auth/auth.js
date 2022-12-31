const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

module.exports = (req, res, next) => {

    const authorizationHeader = req.headers.authorization // req.headers.authorization c'est la ou est stoker le token pour l'utilisateur

    if (!authorizationHeader) { //ici on verify si un token est fourni par le client ,autrement status 401 + message err

        const message = `vous n'avez pas fourni de jetton d'authentification . Ajoutez-en un dans l'en-tête de la requête`
        return res.status(401).json({ message })
    }


    const token = authorizationHeader.split(' ')[1] // afin de stocker le token fourni par le client on selectione celui ci comme ci contre car le token est fourni de cette facon : Bearer JLMSN8zjkleK65m (ici ,bearer est en trop !!!)
    //on indique avec la methode split() l'élément qui sépare "bearer" du token (un espace) puis on indique l'élément visé [1] ([0] étant bearer) 
   
   //ci dessous la constante decodedToken verify les éléments fourni en parametre 
   
   
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {  //la const decodedToken est utilisée pour vérifier que le jeton prend deux arguments, 
                                                                                   //l’un est la valeur de la string du jeton, et le second est la clé secrète pour faire correspondre le jeton en comprenant le salage.
                                                                                   // La méthode de validation renvoie un objet de décodage dans lequel nous avons stocké le jeton.
 
                                                                                  
         
       
        if (error) {
            const message = `L'utilisateur n'est pas autorisé à utiliser cette ressource `
            return res.status(401).json({message, data: error })
        }

        // ci dessous ,on compare l'indentifiant contenu dans le token à  l'identifiant entré par l'utilisateur
        // afin de nous assurer que le token verifié ,appartient bien à l'utilisateur qui le propose. ( ceci afin de nous premunir de certaines derives )
        const userId = decodedToken.userId //
        if (req.body.userId && req.body.userId !== userId) {
            const message = `l'dentifiant de l'utilisateur est invalide`
            res.status(401).json({ message })

        } else {
            
            next()
        }
        
    })
}