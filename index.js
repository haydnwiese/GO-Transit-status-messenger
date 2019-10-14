const transitApi = require('./transitApi');
const messagingApi = require('./twilioApi');
const schedule = require('node-schedule');

//Schedule job for 7:30am Monday to Friday
schedule.scheduleJob('30 7 * * 1-5', function() {
    fetchTransitData();
});

async function fetchTransitData() {
    let data = await transitApi.fetchData();
    let message = '';
    data.forEach(item => {
        let attributes = item._attributes;
        console.log(attributes);
        message += ` ${attributes.ScheduledTime} `;
        attributes.Delay == 0 ? 
            (message += '---------> On Time              ') : 
            (message += `---------> Delayed ${attributes.DelayDesc} `);
        //Spaces added for formatting
    });
    messagingApi.sendMessage(message);
}