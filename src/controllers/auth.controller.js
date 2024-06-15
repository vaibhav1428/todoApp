const httpStatus = require("http-status");
const authService = require("../services/auth.service");
const { uuid } = require('uuidv4');
const ServerResponse = require("../utils/response/ServerResponse");
const { cjs_encrypt } = require("../utils/encryption/encryptor");
const MailService = require("../services/mail.service");
const { generateAuthTokens } = require("../utils/tokens");

class authControllerClass {
    async register(req, res) {
        try {
            const { full_name, country_code, mobile, email } = req.body;
            const createUser = await authService.createUser(full_name, country_code, mobile, email)
            const token = uuid()
            const InsertToken = await authService.InsertToken(createUser.id, token);
            const urlSend = `http://localhost:8081/reset-password?email=${email}&token=${token}`;
            await MailService.sendPasswordLink(email, urlSend, full_name);
            return res.status(httpStatus.OK).send(ServerResponse.successmsg(`${email} registered successfully`));
        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error.message || 'An unknown error occurred'));
        }

    }

    async passwordSetup(req, res) {
        try {
            const {password, user_details, token_details } = req.body
            await Promise.all[
                authService.passwordSetup(user_details.id, password),
                authService.expiretoken(token_details.id)
            ];
            return res.status(httpStatus.OK).send(ServerResponse.successmsg(`Congraluation, your password is updated successfully. Kindly login`));
        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error.message || 'An unknown error occurred'));
        }

    }
    async login(req, res) {
        try {
            const {email, password ,user_details} = req.body;
            const comparepassword = authService.comparepassword(password , user_details.password)
            if(!comparepassword){
                return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse('Invalid credentials!!'));  
            }

            const jwtData = { id: cjs_encrypt(user_details?.id), email : email};
            const generateToken = await generateAuthTokens(jwtData);
            const responseData  = { ...generateToken,email}
            return res.status(httpStatus.OK).send(ServerResponse.successdatamsg(responseData,`login successfully`));
        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).send(ServerResponse.validationResponse(error.message || 'An unknown error occurred'));
        }

    }







}

const authController = new authControllerClass();
module.exports = authController;
