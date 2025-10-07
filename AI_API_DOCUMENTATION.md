# API Documentation for Nivin AI - Centro Médico Universal

## Base URL
```
https://centromedicouniversal.netlify.app/.netlify/functions/ai-appointments
```

## Authentication
Include API key in headers:
```json
{
  "x-api-key": "YOUR_API_KEY",
  "Content-Type": "application/json"
}
```

## Endpoints

### 1. Check Doctor Availability
**POST** `/ai-appointments`

Check available slots for a specific doctor on a specific date.

**Request Body:**
```json
{
  "action": "checkAvailability",
  "doctor_id": "uuid",
  "date": "2025-09-26",
  "specialty": "Ginecología"
}
```

**Response:**
```json
{
  "doctor_id": "uuid",
  "date": "2025-09-26",
  "available_slots": ["08:00", "09:00", "10:00", "14:00"],
  "total_slots": 4
}
```

### 2. Find Best Available Slot
**POST** `/ai-appointments`

Find the best available appointment slot based on patient preferences.

**Request Body:**
```json
{
  "action": "findBestSlot",
  "specialty": "Ginecología",
  "preferred_date": "2025-09-26",
  "urgency_level": "routine",
  "time_preference": "morning"
}
```

**Response:**
```json
{
  "specialty": "Ginecología",
  "urgency_level": "routine",
  "best_slots": [
    {
      "doctor_id": "uuid",
      "doctor_name": "Dr. Juan Castillo",
      "date": "2025-09-26",
      "time": "09:00",
      "score": 100
    }
  ],
  "total_available": 15
}
```

### 3. Book Appointment
**POST** `/ai-appointments`

Book an appointment for a patient.

**Request Body:**
```json
{
  "action": "bookAppointment",
  "patient_id": 123,
  "patient_name": "María García",
  "patient_phone": "809-555-0123",
  "doctor_id": "uuid",
  "appointment_date": "2025-09-26",
  "appointment_time": "09:00",
  "appointment_type": "consultation",
  "symptoms": "Dolor de cabeza persistente",
  "urgency_level": "routine",
  "ai_request_id": "nivin_12345"
}
```

**Response:**
```json
{
  "success": true,
  "appointment_id": "uuid",
  "confirmation_code": "CMU-A1B2C3D4",
  "details": {
    "doctor": "Dr. Juan Castillo",
    "department": "Medicina General",
    "date": "2025-09-26",
    "time": "09:00",
    "type": "consultation"
  },
  "message": "Appointment successfully booked"
}
```

### 4. Reschedule Appointment
**POST** `/ai-appointments`

Reschedule an existing appointment.

**Request Body:**
```json
{
  "action": "rescheduleAppointment",
  "appointment_id": "uuid",
  "new_date": "2025-09-27",
  "new_time": "14:00",
  "reason": "Patient requested different time"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Appointment rescheduled successfully",
  "old_slot": {
    "date": "2025-09-26",
    "time": "09:00"
  },
  "new_slot": {
    "date": "2025-09-27",
    "time": "14:00"
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request |
| 404 | Not found |
| 409 | Conflict (slot already taken) |
| 500 | Server error |

## Integration Example for Nivin

```javascript
// Example: Book an appointment using Nivin AI
async function bookPatientAppointment(patientData) {
    const response = await fetch('https://centromedicouniversal.netlify.app/.netlify/functions/ai-appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'YOUR_API_KEY'
        },
        body: JSON.stringify({
            action: 'bookAppointment',
            patient_name: patientData.name,
            patient_phone: patientData.phone,
            doctor_id: patientData.preferredDoctor,
            appointment_date: patientData.date,
            appointment_time: patientData.time,
            symptoms: patientData.symptoms,
            urgency_level: patientData.urgency
        })
    });
    
    const result = await response.json();
    
    if (result.success) {
        // Send confirmation to patient
        return `Su cita ha sido confirmada con ${result.details.doctor} el ${result.details.date} a las ${result.details.time}. Código: ${result.confirmation_code}`;
    } else {
        // Handle error
        return `Lo siento, no pude agendar la cita: ${result.error}`;
    }
}
```

## Rate Limits
- 100 requests per minute per API key
- 1000 requests per hour per API key

## Support
For API support, contact: nuelcastillo@centromedicouniversal.com
