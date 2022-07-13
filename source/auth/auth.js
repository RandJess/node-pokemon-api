const jwt = require ("jsonwebtoken")
const token = require ("../auth/privateKey")

// MiddleWare d'authentificationn pour extrraire le header et verification de la validé du jeton
module.exports=(req, res, next)=>{
    const authHeader = req.headers.authorization //on rec le header 
    if (!authHeader) {
        const msg= "Y a pas de jeton , inserer un"
        return res.status(401).json({ msg})
    }
    const token= authHeader.split('')[1]
    const decodedToken= jwt.verify(token, privateKey, (error, decodedToken)=>{
        if (error) {
            const msg= "Pas autorisé"
            return res.status(401).json({ msg, data: error})
        }
        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId){
            const msg= "Identifiant invalide"
            return res.status(401).json({msg})
        }else{
            next()
        }
    })
}