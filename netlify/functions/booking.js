// Centro Médico Universal - Booking System Backend
// Deploy this to Netlify Functions for serverless booking handling

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const bookingData = JSON.parse(event.body);

    // Validate required fields
    const requiredFields = ['name', 'phone', 'email', 'specialty', 'date', 'time'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: `Campo requerido: ${field}`
          })
        };
      }
    }

    // Create booking object
    const booking = {
      bookingId: 'CMU-' + Date.now(),
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Send confirmation email (simplified version)
    await sendConfirmationEmail(bookingData);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Cita agendada exitosamente',
        bookingId: booking.bookingId,
        details: booking
      })
    };

  } catch (error) {
    console.error('Booking error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error al procesar la cita',
        details: error.message
      })
    };
  }
};

// Email Confirmation Function
async function sendConfirmationEmail(data) {
  // This is a simplified version - in production you'd use SendGrid or similar
  console.log(`
        Sending confirmation email to ${data.email}:
        
        Centro Médico Universal
        Confirmación de Cita
        
        Hola ${data.name},
        
        Su cita ha sido confirmada:
        - Fecha: ${data.date}
        - Hora: ${data.time}
        - Especialidad: ${data.specialty}
        ${data.insurance ? `- Seguro: ${data.insurance}` : ''}
        
        Recordatorios:
        - Llegue 15 minutos antes
        - Traiga documento de identidad
        - Traiga tarjeta de seguro médico
        
        Tel: (809) 594-6161
    `);

  return { sent: true, to: data.email };
}