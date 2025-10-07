// Update for schedule-management.html
// Replace the loadDoctors function with this version that uses doctors_directory

async function loadDoctors() {
    try {
        // Load doctors from doctors_directory table
        let { data: doctors, error } = await supabase
            .from('doctors_directory')
            .select('id, doctor_name, specialty')
            .eq('is_active', true)
            .order('doctor_name');
        
        if (error) {
            console.error('Error loading doctors:', error);
            showMessage('Error al cargar doctores', 'error');
            return;
        }

        // Clear and populate dropdown
        doctorSelect.innerHTML = '<option value="">Seleccionar Doctor...</option>';
        
        if (doctors && doctors.length > 0) {
            doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = `${doctor.doctor_name} - ${doctor.specialty}`;
                doctorSelect.appendChild(option);
            });
            
            console.log(`Loaded ${doctors.length} doctors`);
        } else {
            console.log('No doctors found in directory');
        }
    } catch (error) {
        console.error('Error in loadDoctors:', error);
        showMessage('Error al cargar doctores', 'error');
    }
}

// INSTRUCTIONS:
// 1. Open your schedule-management.html file
// 2. Find the loadDoctors() function
// 3. Replace it with the code above
// 4. Save and test - all 83 doctors should appear in the dropdown
