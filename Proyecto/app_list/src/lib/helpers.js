const BCRPT = require('bcryptjs');
const helpers = {};

helpers.encryptP = async (pass) => {
    const salt = await BCRPT.genSalt(10);
    const HP = await BCRPT.hash(pass, salt);
    return HP;
};


helpers.matchPs = (pass, dOne) => {
    try {
        
        const yes = pass.localeCompare(dOne);
        //r = await BCRPT.compare(pass, dOne);
        return yes;
    } catch (e) {
        console.log(e)
    }
};


module.exports = helpers;