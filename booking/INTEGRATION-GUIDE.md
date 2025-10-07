# Centro Médico Universal - Booking System Integration Guide

## 🏥 BOOKING SYSTEM OPTIONS

### Option 1: Custom Solution (What we just created)
**Location:** `/booking/index.html`
- ✅ Fully customized to your brand
- ✅ No monthly fees
- ✅ Complete control
- ❌ Needs backend integration

### Option 2: ZOHO BOOKINGS Integration
**Best for:** Professional medical centers
**Cost:** $6-15/month per user

```html
<!-- Add to your website -->
<iframe src="https://your-clinic.zohobookings.com" 
        width="100%" 
        height="600px" 
        frameborder="0">
</iframe>
```

**Setup Steps:**
1. Sign up at: https://www.zoho.com/bookings/
2. Configure services (Ginecología, Salud Sexual, etc.)
3. Add Dr. Castillo's schedule
4. Set up insurance options
5. Get embed code

### Option 3: CALENDLY Integration
**Best for:** Simple scheduling
**Cost:** Free - $16/month

```html
<!-- Calendly inline widget -->
<div class="calendly-inline-widget" 
     data-url="https://calendly.com/centro-medico-universal" 
     style="min-width:320px;height:630px;">
</div>
<script type="text/javascript" 
        src="https://assets.calendly.com/assets/external/widget.js">
</script>
```

### Option 4: GOOGLE CALENDAR Appointment Slots
**Best for:** Free solution
**Cost:** FREE

```html
<!-- Google Calendar Appointment -->
<iframe src="https://calendar.google.com/calendar/appointments/schedules/YOUR_ID" 
        style="border: 0" 
        width="100%" 
        height="600" 
        frameborder="0">
</iframe>
```

### Option 5: SIMPLYBOOK.ME
**Best for:** Medical practices
**Cost:** $29.90/month

Features:
- Medical intake forms
- Insurance verification
- SMS reminders
- Multi-location support
- HIPAA compliant

### Option 6: DOCPLANNER / DOCTORALIA
**Best for:** Latin America
**Cost:** Custom pricing

Very popular in Dominican Republic!

## 📱 WHATSAPP BOOKING Integration

```javascript
// WhatsApp Quick Booking
function bookViaWhatsApp() {
    const phone = "18095946161";
    const message = "Hola, me gustaría agendar una cita médica";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
}
```

## 🔌 BACKEND INTEGRATION for Custom Solution

### Option A: Google Sheets (FREE)
```javascript
// Send form data to Google Sheets
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(formData)
});
```

### Option B: EmailJS (FREE - 200 emails/month)
```javascript
// Setup: https://www.emailjs.com/
emailjs.send("service_id", "template_id", {
    patient_name: formData.firstName + ' ' + formData.lastName,
    appointment_date: formData.date,
    appointment_time: formData.time,
    service: formData.service
});
```

### Option C: Formspree (FREE - 50 submissions/month)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- Your form fields -->
</form>
```

## 💰 RECOMMENDED FOR YOUR CLINIC:

**Best Option:** ZOHO BOOKINGS
- Professional medical features
- Supports multiple doctors
- Insurance management
- SMS/Email reminders
- Patient history
- Online payments
- Spanish language
- Mobile app

**Budget Option:** Custom + Google Sheets + WhatsApp
- Use our custom form
- Save to Google Sheets
- Send WhatsApp confirmation
- Total cost: $0

## 🚀 QUICK IMPLEMENTATION:

1. **Immediate:** Use custom booking form + WhatsApp
2. **Week 1:** Set up Zoho trial
3. **Week 2:** Configure and test
4. **Week 3:** Go live with full integration

## 📞 SUPPORT:
- Zoho: +1-888-900-9646
- Calendly: support@calendly.com
- SimplyBook: +1-347-535-4446
