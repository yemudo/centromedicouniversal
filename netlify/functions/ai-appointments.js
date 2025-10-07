// AI Appointment Handler for Nivin
// This endpoint allows the AI to check availability and book appointments

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://hsuntoblbzlnqgeteypr.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzdW50b2JsYnpsbnFnZXRleXByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODc0MzYwMSwiZXhwIjoyMDc0MzE5NjAxfQ.esS_OV3tcmCxUYlDnuTGm_UMqk0NY8zgubW_7_iyn50';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Main handler function for Netlify Functions
exports.handler = async function (event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Parse request body
  let requestData;
  try {
    requestData = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid request format' })
    };
  }

  // Route based on action
  switch (requestData.action) {
    case 'checkAvailability':
      return await checkDoctorAvailability(requestData, headers);
    case 'bookAppointment':
      return await bookAppointment(requestData, headers);
    case 'findBestSlot':
      return await findBestAvailableSlot(requestData, headers);
    case 'rescheduleAppointment':
      return await rescheduleAppointment(requestData, headers);
    default:
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid action' })
      };
  }
};

// Check availability for a specific doctor
async function checkDoctorAvailability(data, headers) {
  const { doctor_id, date, specialty } = data;

  try {
    // Get doctor's schedule
    const { data: schedules, error: scheduleError } = await supabase.
    from('schedules').
    select('*').
    eq('doctor_id', doctor_id).
    eq('date', date);

    if (scheduleError) throw scheduleError;

    // Get existing appointments
    const { data: appointments, error: appointmentError } = await supabase.
    from('appointments').
    select('*').
    eq('doctor_id', doctor_id).
    eq('appointment_date', date);

    if (appointmentError) throw appointmentError;

    // Calculate available slots
    const availableSlots = calculateAvailableSlots(schedules, appointments);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        doctor_id,
        date,
        available_slots: availableSlots,
        total_slots: availableSlots.length
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
}

// Book an appointment
async function bookAppointment(data, headers) {
  const {
    patient_id,
    patient_name,
    patient_phone,
    doctor_id,
    appointment_date,
    appointment_time,
    appointment_type,
    symptoms,
    urgency_level,
    ai_request_id
  } = data;

  try {
    // Check if slot is still available
    const { data: existingApt } = await supabase.
    from('appointments').
    select('id').
    eq('doctor_id', doctor_id).
    eq('appointment_date', appointment_date).
    eq('appointment_time', appointment_time).
    single();

    if (existingApt) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({
          error: 'Slot already taken',
          message: 'This time slot is no longer available'
        })
      };
    }

    // Create appointment
    const { data: appointment, error } = await supabase.
    from('appointments').
    insert([{
      patient_id,
      patient_name,
      patient_phone,
      doctor_id,
      appointment_date,
      appointment_time,
      appointment_type: appointment_type || 'consultation',
      status: 'scheduled',
      notes: symptoms,
      urgency_level,
      created_by: 'AI_NIVIN',
      ai_request_id
    }]).
    select().
    single();

    if (error) throw error;

    // Log in audit trail
    await supabase.
    from('audit_log').
    insert([{
      action: 'appointment_created_by_ai',
      target_type: 'appointment',
      target_id: appointment.id,
      new_value: appointment,
      user_id: 'AI_NIVIN'
    }]);

    // Get doctor details for response
    const { data: doctor } = await supabase.
    from('profiles').
    select('first_name, last_name, department').
    eq('id', doctor_id).
    single();

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        appointment_id: appointment.id,
        confirmation_code: `CMU-${appointment.id.slice(0, 8).toUpperCase()}`,
        details: {
          doctor: `Dr. ${doctor.first_name} ${doctor.last_name}`,
          department: doctor.department,
          date: appointment_date,
          time: appointment_time,
          type: appointment_type
        },
        message: 'Appointment successfully booked'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
}

// Find the best available slot based on criteria
async function findBestAvailableSlot(data, headers) {
  const {
    specialty,
    preferred_date,
    urgency_level,
    time_preference // morning, afternoon, evening
  } = data;

  try {
    // Get all doctors with the specialty
    const { data: doctors } = await supabase.
    from('profiles').
    select('id, first_name, last_name').
    eq('user_role', 'doctor').
    eq('department', specialty);

    if (!doctors || doctors.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: 'No doctors found for this specialty'
        })
      };
    }

    // Check next 7 days for urgent, 14 for regular
    const daysToCheck = urgency_level === 'urgent' ? 7 : 14;
    const availableSlots = [];

    const startDate = new Date(preferred_date || new Date());

    for (let dayOffset = 0; dayOffset < daysToCheck; dayOffset++) {
      const checkDate = new Date(startDate);
      checkDate.setDate(startDate.getDate() + dayOffset);
      const dateString = checkDate.toISOString().split('T')[0];

      for (const doctor of doctors) {
        // Get doctor's schedule for this date
        const { data: schedules } = await supabase.
        from('schedules').
        select('*').
        eq('doctor_id', doctor.id).
        eq('date', dateString);

        // Get existing appointments
        const { data: appointments } = await supabase.
        from('appointments').
        select('appointment_time').
        eq('doctor_id', doctor.id).
        eq('appointment_date', dateString);

        // Get available times
        const times = getAvailableTimesForDay(schedules, appointments, time_preference);

        times.forEach((time) => {
          availableSlots.push({
            doctor_id: doctor.id,
            doctor_name: `Dr. ${doctor.first_name} ${doctor.last_name}`,
            date: dateString,
            time: time,
            score: calculateSlotScore(dayOffset, time, time_preference)
          });
        });
      }

      // If we found urgent slots, stop looking
      if (urgency_level === 'urgent' && availableSlots.length > 0) {
        break;
      }
    }

    // Sort by score (best first)
    availableSlots.sort((a, b) => b.score - a.score);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        specialty,
        urgency_level,
        best_slots: availableSlots.slice(0, 5), // Return top 5 options
        total_available: availableSlots.length
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
}

// Reschedule an existing appointment
async function rescheduleAppointment(data, headers) {
  const {
    appointment_id,
    new_date,
    new_time,
    reason
  } = data;

  try {
    // Get existing appointment
    const { data: appointment } = await supabase.
    from('appointments').
    select('*').
    eq('id', appointment_id).
    single();

    if (!appointment) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Appointment not found' })
      };
    }

    // Check new slot availability
    const { data: conflictCheck } = await supabase.
    from('appointments').
    select('id').
    eq('doctor_id', appointment.doctor_id).
    eq('appointment_date', new_date).
    eq('appointment_time', new_time).
    single();

    if (conflictCheck) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({
          error: 'New time slot is not available'
        })
      };
    }

    // Update appointment
    const { data: updated, error } = await supabase.
    from('appointments').
    update({
      appointment_date: new_date,
      appointment_time: new_time,
      notes: `${appointment.notes}\n\n[Rescheduled by AI: ${reason}]`,
      updated_at: new Date().toISOString()
    }).
    eq('id', appointment_id).
    select().
    single();

    if (error) throw error;

    // Log the change
    await supabase.
    from('audit_log').
    insert([{
      action: 'appointment_rescheduled_by_ai',
      target_type: 'appointment',
      target_id: appointment_id,
      old_value: { date: appointment.appointment_date, time: appointment.appointment_time },
      new_value: { date: new_date, time: new_time, reason },
      user_id: 'AI_NIVIN'
    }]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Appointment rescheduled successfully',
        old_slot: { date: appointment.appointment_date, time: appointment.appointment_time },
        new_slot: { date: new_date, time: new_time }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
}

// Helper functions
function calculateAvailableSlots(schedules, appointments) {
  const slots = [];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const bookedTimes = appointments.map((apt) => apt.appointment_time.substring(0, 5));

  timeSlots.forEach((time) => {
    if (!bookedTimes.includes(time)) {
      slots.push(time);
    }
  });

  return slots;
}

function getAvailableTimesForDay(schedules, appointments, preference) {
  const allSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  const morningSlots = ['08:00', '09:00', '10:00', '11:00'];
  const afternoonSlots = ['14:00', '15:00', '16:00', '17:00'];

  const bookedTimes = appointments.map((apt) => apt.appointment_time.substring(0, 5));

  let preferredSlots = allSlots;
  if (preference === 'morning') preferredSlots = morningSlots;
  if (preference === 'afternoon') preferredSlots = afternoonSlots;

  return preferredSlots.filter((time) => !bookedTimes.includes(time));
}

function calculateSlotScore(dayOffset, time, preference) {
  let score = 100 - dayOffset * 10; // Sooner is better

  const hour = parseInt(time.split(':')[0]);
  if (preference === 'morning' && hour < 12) score += 20;
  if (preference === 'afternoon' && hour >= 14) score += 20;

  return score;
}