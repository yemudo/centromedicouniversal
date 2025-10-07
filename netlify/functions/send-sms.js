// Twilio SMS Function for Netlify
// This sends complaints as real SMS messages
// You need to set up a Twilio account and add environment variables

const twilio = require('twilio');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Parse request body
  const { to, body, isUrgent } = JSON.parse(event.body);

  // Get Twilio credentials from environment variables
  const accountSid = undefined;
  const authToken = undefined;
  const fromNumber = undefined;

  // Check if Twilio is configured
  if (!accountSid || !authToken || !fromNumber) {
    console.log('Twilio not configured');
    return {
      statusCode: 503,
      body: JSON.stringify({ error: 'SMS service not configured' })
    };
  }

  // Initialize Twilio client
  const client = twilio(accountSid, authToken);

  try {
    // Send SMS
    const message = await client.messages.create({
      body: isUrgent ? `🔴 URGENTE - ${body}` : body,
      from: fromNumber,
      to: to || '+18095946161' // Default to your admin number
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        messageId: message.sid
      })
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send SMS',
        details: error.message
      })
    };
  }
};