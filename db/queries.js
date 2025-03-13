const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getMessageById(id) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id=$1", [id]);
    return rows;
  }

async function insertMessage(parms) {
  const values = [parms.user, parms.text, parms.added]
  await pool.query(`INSERT INTO messages ("user", text, added) VALUES ($1, $2, $3)`, values);
}

module.exports = {
  getAllMessages,
  getMessageById,
  insertMessage
};
