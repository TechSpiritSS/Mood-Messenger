const connection = require('../database');

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    connection.query(
      'SELECT sender_id, receiver_id, message_text, created_at FROM `mood-messenger-database`.`Message_Table` WHERE users = ? OR users = ? ORDER BY created_at ASC',
      [`${from},${to}`, `${to},${from}`],
      (error, results, fields) => {
        if (error) throw error;
        let resultArray = [];

        for (let i = 0; i < results.length; i++) {
          resultArray.push({
            fromSelf: results[i].sender_id === from,
            message: results[i].message_text,
            createdAt: results[i].created_at.split(' ')[1],
          });
        }

        return res.json(resultArray);
      }
    );
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, createdAt } = req.body;
    const query =
      'INSERT INTO `mood-messenger-database`.`Message_Table` (message_text, sender_id, users, receiver_id, created_at) VALUES (?, ?, ?, ?, ?)';
    const result = await connection.query(query, [
      message,
      from,
      `${from},${to}`,
      to,
      createdAt,
    ]);

    if (result.affectedRows === 1) {
      return res.json({ msg: 'Message added successfully.' });
    } else {
      return res.json({ msg: 'Failed to add message to the database' });
    }
  } catch (ex) {
    next(ex);
  }
};
