const jwt=require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ msg: "Not Authorised" })
    if (req.headers.authorization && req.headers.authorization.startswith("Bearer ")) {
        const token = req.headers.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) return res.status(403).json({ msg: "Wrong or Expired token" })
            else {
                req.user = data
                next()
            }
         })
    }
}

const adminVerifyToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ msg: "Not Authorised" })
    if (req.headers.authorization && req.headers.authorization.startswith("Bearer ")) {
        const token = req.headers.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) return res.status(403).json({ msg: "Wrong or Expired token" })
            else {
                if(!data.isAdmin)return res.status(403).json({msg:"You are not Admin"})
                req.user = data
                next()
            }
        })
    }
}

module.exports={verifyToken,adminVerifyToken}