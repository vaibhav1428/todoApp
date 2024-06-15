const mailSender = require("../utils/mailSender");
const resetTemplate = require("../utils/mailTemplate/resetTemplate");



class MailServiceClass {
    async sendPasswordLink(email, passwordresetLink, name) {
        const subject = `Password reset link`;
        const sendto = email;
        const body = resetTemplate(passwordresetLink);
        await mailSender.sendmail(sendto, subject, body);
    }

}

const MailService = new MailServiceClass();

module.exports =  MailService;