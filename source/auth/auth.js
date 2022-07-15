const jwt = require ("jsonwebtoken")
const privateKey = require ("../auth/privateKey")

// MiddleWare d'authentificationn pour extrraire le header et verification de la validé du jeton
module.exports=(req, res, next)=>{
    const authHeader = req.headers.authorization //on rec le header 
    if (!authHeader) {
        const msg= "Y a pas de jeton , inserer un"
        return res.status(401).json({ msg})
    }
    // NB: le split io faut faire attention (' ')
    //  const text= "i love you"
    const token= authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, privateKey, (error, tokenVerifed)=>{
        if (error) {
            const msg= "Pas autorisé"
            return res.status(401).json({ msg, data: error})
        }
        console.log(error);
        const userId = tokenVerifed.userId
        console.log(userId);
        if(req.body.userId && req.body.userId !== userId){
            const msg= "Identifiant invalide"
            return res.status(401).json({msg})
        }else{
            next()
        }
    })
}