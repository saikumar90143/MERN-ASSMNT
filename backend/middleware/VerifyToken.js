import jwt from 'jsonwebtoken'
import User from '../model/AuthModel.js'

const verifyToken = async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    let DecodedData;
    if (token) {
        DecodedData = jwt.verify(token, process.env.SECURE_KEY)
        console.log('DecodedData: ', DecodedData);
        req.user = await User.findById(DecodedData.id).select('-password')
        console.log(req.user)
    } else if (!token) {
        res.status(404).json({ message: "not authorized" })
    }
    next()
}

export default verifyToken