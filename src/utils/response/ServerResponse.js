class ServerResponseClass {
     errorMsg() {
        return {
            message: "Internal Server Error",
            status: "fail",
            code: "E0044"
        };
    }

     badRequest() {
        return {
            message: "Bad Request",
            status: "fail",
            code: "E0057"
        };
    }

     validationResponse(msg) {
        const response = {
            message: msg,
            status: "fail",
            code: "E0021"
        };
        return response;
    }

     errormsg(msg, code = "E0044") {
        const response = {
            message: msg, // for local testing
            // message: "Internal Server Error", // at server uncomment this
            status: "fail",
            code: code
        };
        return response;
    }

     errorMsgWithData(msg, data, code) {
        const response = {
            message: msg,
            status: "fail",
            code: code
        };
        if (data) {
            response.data = data;
        }
        return response;
    }

     successdatamsg(data, msg = 'success', record_count = null) {
        Object.keys(data).forEach(key => {
            if (data[key] === null) {
                data[key] = '';
            }
        });
        const response = {
            data: data,
            message: msg,
            status: "success",
            code: "00"
        };
        if (record_count !== null) {
            response.total_records = record_count;
        }
        return response;
    }

     successmsg(msg = 'Success') {
        const response = {
            message: msg,
            status: "success",
            code: "00"
        };
        return response;
    }

     successmsgwithsummary(data, summary, msg = 'success') {
        const response = {
            data: {
                summary: summary,
                list: data
            },
            message: msg,
            status: "success",
            code: "00"
        };
        return response;
    }

     emailalereadyused(email) {
        const response = {
            message: `email ${email} is taken by someone, please enter other email`,
            status: "fail",
            code: "E0058"
        };
        return response;
    }

     mobilealereadyused(mobile_no) {
        const response = {
            message: `Mobile no ${mobile_no} is taken by someone, please enter other mobile no`,
            status: "fail",
            code: "E0058"
        };
        return response;
    }

     AlreadyExist(t) {
        const response = {
            message: `Record ${t} is already exist`,
            status: "fail",
            code: "E0058"
        };
        return response;
    }

     loginSuccess(data) {
        const response = {
            message: "Login Successfully",
            data: data,
            status: "success",
            code: "00"
        };
        return response;
    }

     verifyEmail(data) {
        const response = {
            message: "OTP sent, Please Verify your mail",
            status: "success",
            code: "00"
        };
        return response;
    }

    verifyMobile(data) {
        const response = {
            message: "Otp sent on your mobile no",
            status: "success",
            code: "00"
        };
        return response;
    }
}


const ServerResponse = new ServerResponseClass();

module.exports = ServerResponse;
