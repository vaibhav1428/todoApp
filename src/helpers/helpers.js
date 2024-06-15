class HelpersClass {
    async getAndConditionalString(obj) {
        let outputString = '';
        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            let sign = ' =';
            let key1 = key;
            if (key.indexOf(' ') >= 0) {
                const keyArr = key.split(' ');
                key1 = keyArr[0];
                sign = keyArr[1];
            }
            outputString += `and ${key1}${sign} '${value}' `;
        });
        return outputString;
    }

    async createLikeCondition(obj, type) {
        let outputString = '';
        const objKeys = Object.keys(obj);
        const objLength = objKeys.length;
        if (objLength === 1) {
            outputString += `${objKeys[0]} LIKE '%${obj[objKeys[0]]}%' `;
        } else {
            objKeys.forEach((key, index) => {
                outputString += `${key} LIKE '%${obj[key]}%' `;
                if (index !== objLength - 1) {
                    outputString += ` ${type} `;
                }
            });
        }
        return outputString;
    }

    async getDateBetweenCondition(fromDate, toDate, dbDateField) {
        return `DATE(${dbDateField}) BETWEEN '${fromDate}' AND '${toDate}'`;
    }
}

const Helper = new HelpersClass();

module.exports = Helper;
