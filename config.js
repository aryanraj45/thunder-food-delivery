const envar = require('./envar');
const TWO_HOURS = 1000*60*60*24;
module.exports = {
    MONGODB: `mongodb+srv://${envar.MONGODB_USERID}:${envar.MONGODB_PASSWD}@${envar.MONGODB_CLUSID}.g5cto.mongodb.net/merng?retryWrites=true&w=majority`,
    PORT : 3000,
    SESS_LIFETIME : envar.SESS_LIFETIME,
    SESS_NAME : envar.SESS_NAME,
    SESS_SECRET : envar.SESS_SECRET,
    RAZOR_PAY_KEY_ID: envar.RAZOR_PAY_KEY_ID,
    RAZOR_PAY_KEY_SECRET: envar.RAZOR_PAY_KEY_SECRET,
    TWO_HOURS
}