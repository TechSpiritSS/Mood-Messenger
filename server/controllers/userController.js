const connection = require('../database');

module.exports.getAllUsers = async (req, res, next) => {
  try {
    connection.query(
      'SELECT * FROM `mood-messenger-database`.`Users_Table`',
      (error, results, fields) => {
        if (error) throw error;
        return res.json(results);
      }
    );
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const uid = req.params.id;
    const photourl = req.body.image;
    connection.query(
      'UPDATE `mood-messenger-database`.`Users_Table` SET photourl = ? WHERE id = ?',
      [photourl, uid],
      (error, results, fields) => {
        if (error) throw error;
        return res.json(results);
      }
    );
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: 'User id is required ' });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
