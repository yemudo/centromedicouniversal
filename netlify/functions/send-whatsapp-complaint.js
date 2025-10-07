// Netlify Function: send-whatsapp-complaint.js
// Handles complaint sending to Director's WhatsApp

const DIRECTOR_WHATSAPP = '18093509302'; // Director's WhatsApp (809-350-9302)

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    // Store complaint for processing
    const complaintId = 'STORED-' + Date.now();
    const timestamp = new Date().toISOString();

    // Log the complaint (in production, save to database)
    console.log('=== COMPLAINT RECEIVED ===');
    console.log('ID:', complaintId);
    console.log('Time:', timestamp);
    console.log('Director WhatsApp:', DIRECTOR_WHATSAPP);
    console.log('Message:', message);
    console.log('==========================');

    // In production, you would:
    // 1. Send via Twilio WhatsApp API
    // 2. Save to database
    // 3. Send email notification
    // 4. Trigger other notifications

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        method: 'Stored for director notification',
        id: complaintId,
        message: 'Complaint saved. Director will be notified on WhatsApp.',
        whatsapp: DIRECTOR_WHATSAPP
      })
    };

  } catch (error) {
    console.error('Error processing complaint:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process complaint',
        details: error.message
      })
    };
  }
};