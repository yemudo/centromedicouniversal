/**
 * Centro Médico Universal - Doctor Filter
 * Handles the "My Providers" sidebar section
 */

class DoctorFilter {
    constructor() {
        this.selectedDoctors = new Set();
        this.allDoctors = CMU_CONFIG.DOCTORS;
        this.searchTerm = '';
        
        this.init();
    }
    
    init() {
        this.renderDoctorList();
        this.attachEventListeners();
        this.selectAll(); // Start with all doctors selected
    }
    
    renderDoctorList() {
        const providerList = document.getElementById('provider-list');
        if (!providerList) return;
        
        // Keep the "Select All" checkbox
        const selectAllHtml = `
            <label class="filter-item select-all">
                <input type="checkbox" id="select-all-providers" checked>
                <span class="filter-label"><strong>Todos</strong></span>
            </label>
        `;
        
        // Filter doctors by search term
        const filteredDoctors = this.allDoctors.filter(doctor => {
            if (!this.searchTerm) return true;
            const searchLower = this.searchTerm.toLowerCase();
            return doctor.name.toLowerCase().includes(searchLower) ||
                   doctor.specialty.toLowerCase().includes(searchLower);
        });
        
        // Generate doctor checkboxes
        const doctorHtml = filteredDoctors.map(doctor => `
            <label class="filter-item" data-doctor-id="${doctor.id}">
                <input type="checkbox" 
                       class="doctor-checkbox" 
                       value="${doctor.id}" 
                       ${this.selectedDoctors.has(doctor.id) ? 'checked' : ''}>
                <span class="filter-label">${doctor.name}</span>
                <span class="filter-count">${doctor.specialty}</span>
            </label>
        `).join('');
        
        providerList.innerHTML = selectAllHtml + doctorHtml;
    }
    
    attachEventListeners() {
        // Search box
        const searchInput = document.getElementById('provider-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.renderDoctorList();
                this.reattachCheckboxListeners();
            });
        }
        
        // Select All checkbox
        const selectAll = document.getElementById('select-all-providers');
        if (selectAll) {
            selectAll.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.selectAll();
                } else {
                    this.deselectAll();
                }
            });
        }
        
        this.reattachCheckboxListeners();
    }
    
    reattachCheckboxListeners() {
        // Individual doctor checkboxes
        const checkboxes = document.querySelectorAll('.doctor-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const doctorId = parseInt(e.target.value);
                if (e.target.checked) {
                    this.selectedDoctors.add(doctorId);
                } else {
                    this.selectedDoctors.delete(doctorId);
                }
                this.updateSelectAllCheckbox();
                this.onSelectionChange();
            });
        });
    }
    
    selectAll() {
        this.selectedDoctors.clear();
        this.allDoctors.forEach(doctor => {
            this.selectedDoctors.add(doctor.id);
        });
        this.renderDoctorList();
        this.reattachCheckboxListeners();
        this.onSelectionChange();
    }
    
    deselectAll() {
        this.selectedDoctors.clear();
        this.renderDoctorList();
        this.reattachCheckboxListeners();
        this.onSelectionChange();
    }
    
    updateSelectAllCheckbox() {
        const selectAll = document.getElementById('select-all-providers');
        if (selectAll) {
            selectAll.checked = this.selectedDoctors.size === this.allDoctors.length;
        }
    }
    
    getSelectedDoctors() {
        return this.allDoctors.filter(doctor => 
            this.selectedDoctors.has(doctor.id)
        );
    }
    
    onSelectionChange() {
        // Trigger calendar update
        if (window.receptionCalendar) {
            window.receptionCalendar.updateCalendar();
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.doctorFilter = new DoctorFilter();
});
