const table = require("../db/table");

module.exports = {
    create: `INSERT INTO ${table.todoTable} (task, userID) VALUES ($1,$2);`,
    update: `UPDATE ${table.todoTable} SET task = $1  WHERE id = $2`,
    delete: `UPDATE ${table.todoTable} SET is_deleted = true  WHERE id = $1;`,
    complete: `UPDATE ${table.todoTable} SET completed = true  WHERE id = $1;`,
    getList : (selectction,finalCondition,limitString)=> `select ${selectction} from ${table.todoTable} ${finalCondition}  ${limitString}`
}