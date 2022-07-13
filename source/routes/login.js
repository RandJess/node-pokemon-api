const {User} = require("../db/sequelize")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/privateKey')

module.exports=(app)=>{
    app.post('api/login', (req,res)=>{
        User.findOne({ where:
        {username: req.body.username}
        })
        .then(user=>{
            if (!user) {
                const msg= " L'user n'existe pas"
                return res.status(404).json({ msg })
            }

            // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
            bcryptjs.compare(req.body.pwd, hash).then(isPwdOk => {
                if(!isPwdOk){
                    const msg= " MOT DE PASSE INCORRECT"
                    return res.status(401).json({ msg })
                }

                //JWT
                const token = jwt.sign(
                    {userId: user.id,}, 
                    privatekey,
                    {expireIn: '24h'}
                )

                const msg= " Authentification réussi 🏁"
                return res.status(401).json({ msg, data:user, token })
            })
        })
        .catch( error=>{
            const msg = " Authentification échouée,Réeesayer 😠"
            return res.json({ msg, data: error})
        })
    })

}