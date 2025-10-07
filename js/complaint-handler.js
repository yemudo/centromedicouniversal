// Enhanced Complaint System with SMS/WhatsApp Integration
// For Centro Médico Universal - Nivin

// Configuration for complaints
const COMPLAINT_CONFIG = {
    // WhatsApp Business number (change to your number)
    whatsappNumber: '18095946161', // Your business WhatsApp
    adminPhone: '18095946161', // Admin cell phone for complaints
    
    // Email backup
    adminEmail: 'info@centromedicouniversal.com',
    
    // Twilio configuration (if you want real SMS)
    twilioEnabled: false, // Set to true if you have Twilio account
    twilioAccountSid: 'YOUR_TWILIO_ACCOUNT_SID',
    twilioAuthToken: 'YOUR_TWILIO_AUTH_TOKEN', 
    twilioPhoneNumber: '+1234567890', // Your Twilio phone number
    
    // Urgent keywords that trigger immediate notification
    urgentKeywords: ['emergencia', 'urgente', 'maltrato', 'discriminación', 'abuso', 'grave']
};

// Function to send complaint via WhatsApp (simplest method)
function sendComplaintToWhatsApp(complaintData) {
    const { name, phone, message, timestamp } = complaintData;
    
    // Format the complaint message
    const complaintText = `🔴 NUEVA QUEJA - Centro Médico Universal
    
📅 Fecha: ${new Date(timestamp).toLocaleString('es-DO')}
👤 Nombre: ${name || 'No proporcionado'}
📞 Teléfono: ${phone || 'No proporcionado'}

📝 Queja:
${message}

⚠️ Requiere atención inmediata`;
    
    // Create WhatsApp link (this will open WhatsApp with pre-filled message)
    const whatsappUrl = `https://wa.me/${COMPLAINT_CONFIG.whatsappNumber}?text=${encodeURIComponent(complaintText)}`;
    
    // For automatic sending, you'd need WhatsApp Business API
    // For now, this will open WhatsApp with the message ready to send
    return whatsappUrl;
}

// Function to send complaint via Twilio SMS (requires Twilio account)
async function sendComplaintViaSMS(complaintData) {
    if (!COMPLAINT_CONFIG.twilioEnabled) {
        console.log('Twilio not enabled');
        return false;
    }
    
    const { name, phone, message, timestamp } = complaintData;
    
    // Format SMS message (160 char limit for SMS)
    const smsText = `QUEJA CMU: ${name || 'Anónimo'} - ${message.substring(0, 100)}... Tel: ${phone || 'N/A'}`;
    
    try {
        // This would need to call your backend endpoint that uses Twilio
        const response = await fetch('/.netlify/functions/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: COMPLAINT_CONFIG.adminPhone,
                body: smsText
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('Error sending SMS:', error);
        return false;
    }
}

// Function to send complaint via email (backup)
function sendComplaintViaEmail(complaintData) {
    const { name, phone, message, timestamp } = complaintData;
    
    const subject = `QUEJA URGENTE - ${name || 'Anónimo'} - ${new Date(timestamp).toLocaleDateString()}`;
    const body = `Nueva queja recibida:
    
Fecha/Hora: ${new Date(timestamp).toLocaleString('es-DO')}
Nombre: ${name || 'No proporcionado'}
Teléfono: ${phone || 'No proporcionado'}

Mensaje de Queja:
${message}

---
Esta queja requiere atención inmediata.
Sistema de Quejas - Centro Médico Universal`;
    
    const mailtoUrl = `mailto:${COMPLAINT_CONFIG.adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    return mailtoUrl;
}

// Check if complaint is urgent
function isUrgentComplaint(message) {
    const lowerMessage = message.toLowerCase();
    return COMPLAINT_CONFIG.urgentKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Main complaint submission function
async function submitComplaint(complaintData) {
    const isUrgent = isUrgentComplaint(complaintData.message);
    
    // Store in database (if you have Supabase or similar)
    try {
        if (typeof supabase !== 'undefined') {
            await supabase
                .from('complaints')
                .insert({
                    patient_name: complaintData.name,
                    patient_phone: complaintData.phone,
                    complaint_text: complaintData.message,
                    is_urgent: isUrgent,
                    created_at: complaintData.timestamp,
                    status: 'pending'
                });
        }
    } catch (error) {
        console.error('Error storing complaint:', error);
    }
    
    // Send notifications
    const results = {
        whatsapp: false,
        sms: false,
        email: false
    };
    
    // 1. Try WhatsApp (most reliable for Dominican Republic)
    const whatsappUrl = sendComplaintToWhatsApp(complaintData);
    if (whatsappUrl) {
        // Open WhatsApp in new window/tab
        window.open(whatsappUrl, '_blank');
        results.whatsapp = true;
    }
    
    // 2. Try SMS if Twilio is configured
    if (COMPLAINT_CONFIG.twilioEnabled) {
        results.sms = await sendComplaintViaSMS(complaintData);
    }
    
    // 3. Email as backup
    const emailUrl = sendComplaintViaEmail(complaintData);
    if (emailUrl && !results.whatsapp) {
        window.location.href = emailUrl;
        results.email = true;
    }
    
    return results;
}

// Export for use in gemini-integration.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        submitComplaint,
        sendComplaintToWhatsApp,
        sendComplaintViaEmail,
        isUrgentComplaint,
        COMPLAINT_CONFIG
    };
}