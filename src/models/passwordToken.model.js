const table = require("../db/table");

module.exports = {
    create : ` INSERT INTO ${table.passwordsSetTable}(token, userID) VALUES($1, $2) RETURNING *; `,
    findTokenbyEmailandToken : `SELECT * FROM ${table.passwordsSetTable} WHERE userID = $1 AND token = $2 ORDER BY id DESC LIMIT 1`,
    expiretoken : `UPDATE ${table.passwordsSetTable} SET is_expired = true  WHERE id = $1`
}