import cron from 'node-cron';
import  CampaignModel  from "../models/campain";
import sendReminderSMS  from './sendReminder'; // Update the path to your sendReminderSMS function

// Define the cron job
cron.schedule('* * * * * ', async () =>{
  console.log('Running reminder scheduler...');

  try {
    // Find campaigns scheduled within the next 5 minutes
    const currentTime = new Date();
    const fiveMinutesLater = new Date(currentTime.getTime() + 1 * 60000);
    console.log('Current Time:', currentTime);
    console.log('Five Minutes Later:', fiveMinutesLater);

    const campaigns = await CampaignModel.find({
      sendDateTime: { $gte: currentTime, $lte: fiveMinutesLater }
    });
    console.log('Campaigns found:', campaigns);

    // Send reminder SMS for each campaign
    for (const campaign of campaigns) {
      console.log('Sending reminder SMS for campaign:', campaign.name);
      // await sendReminderSMS(campaign); // Implement this function to send reminder SMS
      console.log('Reminder SMS sent for campaign:', campaign.name);
    }
  } catch (error) {
    console.error('Error in reminder scheduler:', error);
  }
});
