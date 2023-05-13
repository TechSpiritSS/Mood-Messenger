const admin = require('../firebaseConfig');
const connection = require('../database');

class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No Token Provided' });
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken) {
        req.user = decodedToken;
        return next();
      }
      return res.status(401).json({ message: 'Invalid Token' });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  }

  async sendUserData(req, res, next) {
    try {
      const user = req.user;
      const name = user.name;
      const email = user.email;
      const uid = user.uid;
      const photourl = user.picture;

      const userData = await connection.query(
        'INSERT INTO `mood-messenger-database`.`Users_Table`  (uid, name, email, photourl) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=?, email=?, photourl=?',
        [uid, name, email, photourl, name, email, photourl]
      );

      return next(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Middleware();
