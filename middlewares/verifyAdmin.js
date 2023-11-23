const { client } = require("../config/db.config");
const usersCollection = client.db("bistroBoss").collection("users");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = {email}
  const userData = await usersCollection.findOne(query);
  const isAdmin = userData.role === 'admin'
  if(!isAdmin){
    return res.status(403).json({message: 'forbidden access'})
  }
  next()
};

module.exports = verifyAdmin;
