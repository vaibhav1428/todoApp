const table = require("../db/table");

module.exports = {
    create :  ` INSERT INTO ${table.userTable}(fullname, email, mobile_code,mobile_no) VALUES($1, $2, $3, $4) RETURNING *; `,
    updatePassword : `UPDATE ${table.userTable} SET password = $1 , password_set = $2 WHERE id = $3`,
    findUserByEmail : `SELECT * FROM ${table.userTable} WHERE email = $1`
}