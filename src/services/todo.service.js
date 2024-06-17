const poolConnection = require("../db/db-connection");
const table = require("../db/table");
const Helper = require("../helpers/helpers");
const todoModel = require("../models/todo.model");

class tododServiceClass {
    async create(task, userID) {
        const query = {
            text: todoModel.create,
            values: [task, userID]
        };
        const response = await poolConnection.query(query);
        if (response.rowCount > 0) {
            return response?.rows[0]
        }
        throw new Error('Unable to create todo!!')
    }

    async update(task, taskID) {
        const query = {
            text: todoModel.update,
            values: [task, taskID]
        };
        const response = await poolConnection.query(query);
        if (response.rowCount > 0) {
            return response?.rows[0]
        }
        throw new Error('Unable to update todo!!')

    }


    async delete(taskID) {
        const query = {
            text: todoModel.delete,
            values: [taskID]
        };
        const response = await poolConnection.query(query);
        if (response.rowCount > 0) {
            return response?.rows[0]
        }
        throw new Error('Unable to delete todo!!')

    }

    async completeTodo(taskID) {
        const query = {
            text: todoModel.complete,
            values: [taskID]
        };
        const response = await poolConnection.query(query);
        if (response.rowCount > 0) {
            return response?.rows[0]
        }
        throw new Error('Unable to complete todo!!')

    }


    async list(selectction, andCondition, likeCondition,dateCondition, limit) {
        let finalCondition = ' where is_deleted=false ';
        let and = '';
        let limitString = '';

        if (Object.keys(andCondition).length) {
            const condition = await Helper.getAndConditionalString(andCondition);
            finalCondition = `${finalCondition} ${and} ${condition}`;
            if (and === '') {
                and = ' and ';
            }
        }

        if (Object.keys(likeCondition).length) {
            const condition = await Helper.createLikeCondition(likeCondition, 'OR');
          
            if (and === '') {
                and = ' and ';
            }
            finalCondition = `${finalCondition + and} (${condition} )`;
        }

        if (Object.keys(dateCondition).length) {
            const condition = await Helper.get_date_between_condition( dateCondition.from_date, dateCondition.to_date,"created_at");
            if (and === '') {
                and = ' and ';
            }
            finalCondition = `${finalCondition + and} (${condition} )`;
        }

        if (limit.perpage) {
            if(limit.order_by && limit.sort){
                limitString = ` order BY ${limit.order_by} ${limit.sort} `;
            }
            limitString += ` limit ${limit.perpage} OFFSET  ${limit.start}`;
        }

   

        if (finalCondition === ' where ') {
            finalCondition = '';
        }

        const query = todoModel.getList(selectction,finalCondition,limitString)        
        const response = await poolConnection.query(query);
        if (response.rowCount > 0) {
            return response?.rows
        }
        return []

    }

}

const tododService = new tododServiceClass();
module.exports = tododService;
