// Enhanced Nivin AI Assistant for Centro Médico Universal
// Practical features for real patient use

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = undefined || 'https://hsuntoblbzlnqgeteypr.supabase.co';
const supabaseServiceKey = undefined || 'YOUR_SERVICE_KEY';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Main handler
exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const { action, data } = JSON.parse(event.body);

  switch (action) {
    case 'showAvailableNow':
      return await showAvailableNow(headers);
    case 'checkDoctorCalendar':
      return await checkDoctorCalendar(data, headers);
    case 'quickBook':
      return await quickBook(data, headers);
    case 'findBySymptom':
      return await findBySymptom(data, headers);
    case 'getNextAvailable':
      return await getNextAvailable(data, headers);
    default:
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid action' }) };
  }
};

// 1. SHOW ALL DOCTORS AVAILABLE RIGHT NOW/TODAY
async function showAvailableNow(headers) {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentHour = now.getHours();

  // Get all doctors
  const { data: doctors } = await supabase.
  from('doctors_directory').
  select('*').
  order('specialty');

  // Get today's appointments
  const { data: appointments } = await supabase.
  from('appointments').
  select('doctor_id, appointment_time').
  eq('appointment_date', today);

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  const availableNow = [];

  doctors.forEach((doctor) => {
    const doctorAppts = appointments?.filter((a) => a.doctor_id === doctor.id) || [];
    const bookedTimes = doctorAppts.map((a) => a.appointment_time.substring(0, 5));
    const availableTimes = timeSlots.filter((time) => {
      const hour = parseInt(time.split(':')[0]);
      return hour > currentHour && !bookedTimes.includes(time);
    });

    if (availableTimes.length > 0) {
      availableNow.push({
        name: doctor.doctor_name,
        specialty: doctor.specialty,
        nextSlot: availableTimes[0],
        allSlots: availableTimes
      });
    }
  });

  // Format response for Nivin
  let response = "🏥 DOCTORES DISPONIBLES HOY:\n\n";

  if (availableNow.length === 0) {
    response = "❌ No hay doctores disponibles hoy. ¿Desea ver mañana?";
  } else {
    availableNow.slice(0, 5).forEach((doc, i) => {
      response += `${i + 1}. ${doc.name}\n`;
      response += `   📋 ${doc.specialty}\n`;
      response += `   ⏰ Próximo: ${doc.nextSlot}\n`;
      response += `   ✅ Espacios: ${doc.allSlots.join(', ')}\n\n`;
    });
    response += "Responda con el número para reservar.";
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      availableCount: availableNow.length,
      doctors: availableNow,
      message: response
    })
  };
}

// 2. CHECK SPECIFIC DOCTOR'S CALENDAR
async function checkDoctorCalendar({ doctorName }, headers) {
  // Find doctor
  const { data: doctor } = await supabase.
  from('doctors_directory').
  select('*').
  ilike('doctor_name', `%${doctorName}%`).
  single();

  if (!doctor) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: 'Doctor no encontrado',
        message: `❌ No encontré al doctor "${doctorName}". ¿Puede escribir el nombre completo?`
      })
    };
  }

  // Get next 7 days availability
  const availability = {};
  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    const { data: appointments } = await supabase.
    from('appointments').
    select('appointment_time').
    eq('doctor_id', doctor.id).
    eq('appointment_date', dateStr);

    const booked = appointments?.map((a) => a.appointment_time.substring(0, 5)) || [];
    const available = timeSlots.filter((time) => !booked.includes(time));

    if (available.length > 0) {
      availability[dateStr] = available;
    }
  }

  // Format calendar view
  let response = `📅 CALENDARIO - ${doctor.doctor_name}\n`;
  response += `🏥 ${doctor.specialty}\n\n`;

  Object.entries(availability).slice(0, 3).forEach(([date, times]) => {
    const day = new Date(date).toLocaleDateString('es-DO', { weekday: 'long', day: 'numeric', month: 'short' });
    response += `📆 ${day}:\n`;
    times.forEach((time) => {
      response += `   ✅ ${time}\n`;
    });
    response += '\n';
  });

  response += "Escriba el día y hora para reservar.";

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      doctor,
      availability,
      message: response
    })
  };
}

// 3. QUICK BOOK - NEXT AVAILABLE
async function quickBook({ patientName, patientPhone, specialty }, headers) {
  // Find doctors in that specialty
  const { data: doctors } = await supabase.
  from('doctors_directory').
  select('*').
  ilike('specialty', `%${specialty}%`);

  if (!doctors || doctors.length === 0) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: 'No hay doctores de esa especialidad',
        message: `❌ No encontré doctores de ${specialty}`
      })
    };
  }

  // Find first available slot
  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  let found = false;
  let booking = null;

  for (let day = 0; day < 7 && !found; day++) {
    const date = new Date();
    date.setDate(date.getDate() + day);
    const dateStr = date.toISOString().split('T')[0];

    for (const doctor of doctors) {
      const { data: appointments } = await supabase.
      from('appointments').
      select('appointment_time').
      eq('doctor_id', doctor.id).
      eq('appointment_date', dateStr);

      const booked = appointments?.map((a) => a.appointment_time.substring(0, 5)) || [];
      const available = timeSlots.find((time) => !booked.includes(time));

      if (available) {
        // Book it!
        booking = {
          doctor: doctor.doctor_name,
          date: dateStr,
          time: available,
          specialty: doctor.specialty
        };

        // Insert appointment request
        await supabase.
        from('ai_appointment_requests').
        insert({
          patient_name: patientName,
          patient_phone: patientPhone,
          requested_specialty: specialty,
          ai_assigned_doctor: doctor.id,
          preferred_date: dateStr,
          preferred_time_slot: available,
          status: 'confirmed',
          ai_notes: 'Reserva rápida via Nivin'
        });

        found = true;
        break;
      }
    }
  }

  if (booking) {
    const response = `✅ CITA CONFIRMADA\n\n` +
    `👨‍⚕️ Doctor: ${booking.doctor}\n` +
    `📅 Fecha: ${new Date(booking.date).toLocaleDateString('es-DO')}\n` +
    `⏰ Hora: ${booking.time}\n` +
    `📋 Especialidad: ${booking.specialty}\n\n` +
    `📞 Le llamaremos al ${patientPhone} para confirmar.\n` +
    `📍 Centro Médico Universal`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        booking,
        message: response
      })
    };
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({
      error: 'No hay citas disponibles',
      message: '❌ No hay espacios disponibles esta semana. ¿Desea lista de espera?'
    })
  };
}

// 4. FIND DOCTOR BY SYMPTOM
async function findBySymptom({ symptom }, headers) {
  // EMERGENCY SYMPTOMS - DIRECT TO ER
  const emergencySymptoms = [
  'dolor de pecho severo',
  'dolor de pecho',
  'no puedo respirar',
  'falta de aire severa',
  'convulsiones',
  'desmayo',
  'sangrado abundante',
  'trauma severo',
  'fractura expuesta',
  'accidente',
  'pérdida de consciencia',
  'dolor abdominal severo',
  'vómito con sangre',
  'dolor de cabeza súbito severo',
  'parálisis',
  'quemadura grave',
  'sobredosis',
  'intento de suicidio',
  'reacción alérgica severa'];


  const lowerSymptom = symptom.toLowerCase();

  // CHECK FOR EMERGENCY FIRST
  for (const emergency of emergencySymptoms) {
    if (lowerSymptom.includes(emergency)) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          emergency: true,
          message: `🚨 EMERGENCIA MÉDICA 🚨\n\n` +
          `⚠️ DIRÍJASE INMEDIATAMENTE A EMERGENCIAS\n\n` +
          `🏥 Centro Médico Universal - EMERGENCIAS\n` +
          `📞 Emergencia: (809) 594-6161\n` +
          `🚑 O llame al 911\n\n` +
          `NO ESPERE CITA - VAYA AHORA\n\n` +
          `Síntomas de emergencia detectados:\n` +
          `"${symptom}"\n\n` +
          `Su vida es prioridad. Será atendido inmediatamente.`
        })
      };
    }
  }

  // NON-EMERGENCY SYMPTOMS - Continue with specialist matching
  const symptomMap = {
    // Head/Neurological
    'dolor de cabeza': ['Neurología', 'Medicina Interna'],
    'migraña': ['Neurología'],
    'mareo': ['Neurología', 'Otorrinolaringología'],

    // Chest/Heart (non-emergency)
    'palpitaciones': ['Cardiología'],
    'presión alta': ['Cardiología', 'Medicina Interna'],

    // Stomach/Digestive
    'dolor de estómago': ['Gastroenterología', 'Medicina Interna'],
    'dolor abdominal': ['Gastroenterología', 'Cirugía General'],
    'acidez': ['Gastroenterología'],

    // Women's Health
    'embarazo': ['Ginecología y Obstetricia'],
    'menstruación': ['Ginecología'],
    'ginecología': ['Ginecología y Obstetricia'],

    // Children - URGENT CHECK
    'fiebre bebé': ['Pediatría'],
    'bebé no respira bien': ['EMERGENCIA'],
    'niño enfermo': ['Pediatría'],
    'bebé': ['Pediatría', 'Pediatra Perinatólogo'],

    // Bones/Muscles
    'dolor de espalda': ['Ortopedia', 'Traumatología'],
    'dolor de huesos': ['Ortopedia'],
    'fractura': ['Traumatología', 'Ortopedia'],

    // Skin
    'alergia': ['Dermatología', 'Medicina Interna'],
    'piel': ['Dermatología'],
    'rash': ['Dermatología', 'Pediatría'],

    // General
    'chequeo': ['Medicina Interna'],
    'diabetes': ['Endocrinología', 'Medicina Interna'],
    'tiroides': ['Endocrinología']
  };

  // Find matching specialties
  let specialties = [];

  for (const [key, value] of Object.entries(symptomMap)) {
    if (lowerSymptom.includes(key) || key.includes(lowerSymptom)) {
      // Check if it's marked for emergency
      if (value.includes('EMERGENCIA')) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            emergency: true,
            message: `🚨 ATENCIÓN URGENTE REQUERIDA 🚨\n\n` +
            `Por favor acuda a EMERGENCIAS inmediatamente.\n` +
            `Centro Médico Universal - Emergencias 24/7\n` +
            `📞 (809) 594-6161`
          })
        };
      }
      specialties = value;
      break;
    }
  }

  // Default to internal medicine
  if (specialties.length === 0) {
    specialties = ['Medicina Interna'];
  }

  // Find available doctors for non-emergency
  const { data: doctors } = await supabase.
  from('doctors_directory').
  select('*').
  in('specialty', specialties);

  // Check today's availability for each
  const today = new Date().toISOString().split('T')[0];
  const availableDoctors = [];

  for (const doctor of doctors) {
    const { data: appointments } = await supabase.
    from('appointments').
    select('appointment_time').
    eq('doctor_id', doctor.id).
    eq('appointment_date', today);

    const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
    const booked = appointments?.map((a) => a.appointment_time.substring(0, 5)) || [];
    const available = timeSlots.filter((time) => !booked.includes(time));

    if (available.length > 0) {
      availableDoctors.push({
        name: doctor.doctor_name,
        specialty: doctor.specialty,
        availableToday: available
      });
    }
  }

  // Format response for regular appointments
  let response = `💡 Para "${symptom}" recomiendo:\n\n`;
  response += `📋 Especialidades: ${specialties.join(', ')}\n\n`;

  if (availableDoctors.length > 0) {
    response += "✅ DOCTORES DISPONIBLES HOY:\n\n";
    availableDoctors.slice(0, 3).forEach((doc, i) => {
      response += `${i + 1}. ${doc.name}\n`;
      response += `   ${doc.specialty}\n`;
      response += `   Horas: ${doc.availableToday.slice(0, 3).join(', ')}\n\n`;
    });
    response += "Escriba el número para reservar.";
  } else {
    response += "❌ No hay disponibilidad hoy.\n";
    response += "¿Desea primera cita disponible mañana?";
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      symptom,
      recommendedSpecialties: specialties,
      availableDoctors,
      message: response
    })
  };
}

// 5. GET NEXT AVAILABLE FOR ANY SPECIALTY
async function getNextAvailable({ specialty }, headers) {
  const { data: doctors } = await supabase.
  from('doctors_directory').
  select('*').
  ilike('specialty', `%${specialty}%`);

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  const nextSlots = [];

  for (const doctor of doctors) {
    for (let day = 0; day < 7; day++) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      const dateStr = date.toISOString().split('T')[0];

      const { data: appointments } = await supabase.
      from('appointments').
      select('appointment_time').
      eq('doctor_id', doctor.id).
      eq('appointment_date', dateStr);

      const booked = appointments?.map((a) => a.appointment_time.substring(0, 5)) || [];
      const available = timeSlots.find((time) => !booked.includes(time));

      if (available) {
        nextSlots.push({
          doctor: doctor.doctor_name,
          date: dateStr,
          time: available,
          daysFromNow: day
        });
        break;
      }
    }
  }

  // Sort by soonest
  nextSlots.sort((a, b) => a.daysFromNow - b.daysFromNow);

  let response = `🔍 Próximas citas - ${specialty}:\n\n`;
  nextSlots.slice(0, 3).forEach((slot, i) => {
    const dayText = slot.daysFromNow === 0 ? 'HOY' :
    slot.daysFromNow === 1 ? 'MAÑANA' :
    `en ${slot.daysFromNow} días`;
    response += `${i + 1}. ${slot.doctor}\n`;
    response += `   📅 ${dayText} - ${slot.time}\n\n`;
  });

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      specialty,
      nextAvailable: nextSlots,
      message: response
    })
  };
}