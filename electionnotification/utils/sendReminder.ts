import https from 'https';
import ContactsModel from '../models/contacts'; // Update the path to your contacts model

/**
 * Function to send reminder SMS messages for campaigns ready to be sent.
 * 
 * @param {Campaign} campaign - The campaign object.
 * @returns {Promise<void>} A promise indicating the completion of the SMS sending process.
 */
async function sendReminderSMS(campaign) {
    try {
        // Get contacts associated with the campaign
        const contacts = await ContactsModel.find({ /* Add query to filter contacts if necessary */ });

        // Iterate over each contact and send the campaign message
        for (const contact of contacts) {
            await sendSMS(contact.phone, campaign.message); // Assuming campaign.message holds the SMS message content
        }

        // Update campaign status or log success if needed
        console.log(`Reminder SMS sent for campaign: ${campaign.name}`);
    } catch (error) {
        console.error(`Error sending reminder SMS for campaign: ${campaign.name}`, error);
    }
}

/**
 * Function to send an SMS message to a given phone number.
 * 
 * @param {string} phoneNumber - The phone number to send the SMS to.
 * @param {string} message - The SMS message content.
 * @returns {Promise<void>} A promise indicating the completion of the SMS sending process.
 */
async function sendSMS(phoneNumber, message) {
    // Construct the message payload
    const postData = JSON.stringify({
        "messages": [
            {
                "destinations": [{ "to": phoneNumber }],
                "from": "ServiceSMS",
                "text": message,
            }
        ]
    });

    // Set up options for the Infobip API request
    const options = {
        'method': 'POST',
        'hostname': 'j3d28v.api.infobip.com',
        'path': '/sms/2/text/advanced',
        'headers': {
            'Authorization': `App ${process.env.API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        'maxRedirects': 20
    };

    // Send the SMS request
    const req = https.request(options, function (res) {
        let chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            let body = Buffer.concat(chunks);
            console.log(body.toString());
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    req.write(postData);
    req.end();
}

export default sendReminderSMS;
