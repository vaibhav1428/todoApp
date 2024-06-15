const poolConnection = require("../db/db-connection");
const table = require("../db/table");
const passwordTokenModel = require("../models/passwordToken.model");
const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');


class authServiceClass {

    async findUserByEmail(email){
        const query  = {
            text: userModel.findUserByEmail,
            values: [email],
        };
        const response = await poolConnection.query(query);
        return response.rowCount > 0  ? response?.rows[0] : false;
    } 
    
    
    async createUser(fullname, countryCode, mobile, email){
        const query  = {
            text: userModel.create,
            values: [fullname, email,countryCode,  mobile ],
        };
        const response = await poolConnection.query(query);
        return response.rowCount > 0  ? response?.rows[0] : {};
    }   
    
    
    async InsertToken(userID,token){
        const query  = {
            text: passwordTokenModel.create,
            values: [token, userID],
        };
        const response = await poolConnection.query(query);
        return response.rowCount > 0  ? response?.rows[0] : {};
    }

  
    async findTokenDetails(userID,token){
        const query  = {
            text: passwordTokenModel.findTokenbyEmailandToken,
            values: [userID, token],
        };
        const response = await poolConnection.query(query);
        if (response.rowCount > 0) {
            return response?.rows[0]
        }
        throw new Error('Invalid email or token!!')

    }  


    async passwordSetup(userID,password){
        const generatePassword = await this.generatePassword(password);
        
        const query  = {
            text: userModel.updatePassword,
            values: [generatePassword,true,userID]
        };
        const response = await poolConnection.query(query);
        return response.rowCount > 0  ? response?.rows[0] : {};
    }


    async expiretoken(tokenID){
        const query  = {
            text: passwordTokenModel.expiretoken,
            values: [tokenID]
        };
        const response = await poolConnection.query(query);
        return response.rowCount > 0  ? response?.rows[0] : {};
    }


    generatePassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = bcrypt.hashSync(password, salt);
        return hashpassword
    };


    comparepassword = async (password,userPassword) => {
        const comparepassword = bcrypt.compare(password, userPassword);
        return comparepassword;
    };






}

const authService = new authServiceClass();
module.exports = authService;
