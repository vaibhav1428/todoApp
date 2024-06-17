const httpStatus = require("http-status");
const authService = require("../services/auth.service");
const { uuid } = require('uuidv4');
const ServerResponse = require("../utils/response/ServerResponse");
const { cjs_encrypt, cjs_decrypt } = require("../utils/encryption/encryptor");
const MailService = require("../services/mail.service");
const { generateAuthTokens } = require("../utils/tokens");
const tododService = require("../services/todo.service");

class todoControllerClass {



    async todoList(req, res) {
        try {
            const andCondition = {
                userid : cjs_decrypt(req.user.id)
            };
            const  dateCondition = {
                from_date: "",
                to_date: "",
            };
            const likeCondition = {};
            const limit = { perpage: 0, start: 0  ,order_by : 'id' , sort:'desc'  };
            const { perpage, page, completed, userid, task ,order_by ,sort,from_date,to_date} = req.query;

            if (perpage && page) {
                limit.perpage = perpage;
                limit.start = (page - 1) * perpage;
            }

            if(order_by && sort && (sort === 'asc' || sort === 'desc')){
                limit.order_by = order_by;
                limit.sort = sort; 
            }

            if (completed) {
                andCondition['completed'] = completed;
            }

            if (task) {
                likeCondition['task'] = task;
            }

            if (from_date && to_date) {
                dateCondition.from_date = from_date;
                dateCondition.to_date = to_date;
            }

            const selectction = "*";

            const todoList = await tododService.list(selectction, andCondition, likeCondition,dateCondition, limit);
            const todoData = todoList && todoList.map((data, index) => {
                return {
                    ...data,
                    id: cjs_encrypt(data.id),
                    userid: cjs_encrypt(data.userid),
                    completed: data.completed ? "Completed" : "Not completed",
                    completed_at: data?.completed_at == null ? "-" : data?.completed_at
                }
            })

            const couuntselection = 'COUNT(id) as count'
            const totaltask = await tododService.list(couuntselection, andCondition, likeCondition,dateCondition, {});
            return res.status(httpStatus.OK).send(ServerResponse.successdatamsg(todoData, `Task created Successfully`, totaltask[0].count));
        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error.message || 'An unknown error occurred'));
        }
    }


    async createTodo(req, res) {
        try {
            const { task } = req.body;
            const decryptedId = cjs_decrypt(req.user.id)
            let createdTodo = await tododService.create(task, decryptedId)
            createdTodo = {...createdTodo , id : cjs_encrypt(createdTodo.id)}
            return res.status(httpStatus.OK).send(ServerResponse.successdatamsg(createdTodo,`Task created Successfully`));
        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error.message || 'An unknown error occurred'));
        }
    }


    async updateTodo(req, res) {
        try {
            const { task, task_id } = req.body;
            const decryptedtaskId = cjs_decrypt(task_id);
            await tododService.update(task, decryptedtaskId)
            return res.status(httpStatus.OK).send(ServerResponse.successmsg(`Task updated Successfully`));
        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error.message || 'An unknown error occurred'));
        }
    }


    async deleteTodo(req, res) {
        try {
            const { task_id } = req.params;
            const decryptedtaskId = cjs_decrypt(task_id);
            await tododService.delete(decryptedtaskId)
            return res.status(httpStatus.OK).send(ServerResponse.successmsg(`Task deleted Successfully`));
        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error.message || 'An unknown error occurred'));
        }
    }

    async completeTodo(req, res) {
        try {
            const { task_id } = req.body;
            const decryptedtaskId = cjs_decrypt(task_id);
            await tododService.completeTodo(decryptedtaskId)
            return res.status(httpStatus.OK).send(ServerResponse.successmsg(`Task completed Successfully`));
        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error.message || 'An unknown error occurred'));
        }
    }



}

const todoController = new todoControllerClass();
module.exports = todoController;
