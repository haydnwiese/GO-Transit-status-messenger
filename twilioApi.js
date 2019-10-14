const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const phoneNumber = process.env.PHONE_NUMBER;
const twilioNumber = process.env.TWILIO_NUMBER;

exports.sendMessage = message =>  {
    client.messages.create({
        body: '----------------------------------------' + message,
        to: phoneNumber,
        from: twilioNumber
    })
    .then(message => console.log(message.sid))
    .catch(e => console.log(e));
}