/**
 * Centro Médico Universal - Specialty Filter
 * Handles the "My Resources" (Specialties) sidebar section
 */

class SpecialtyFilter {
    constructor() {
        this.selectedSpecialties = new Set();
        this.specialties = CMU_CONFIG.getSpecialties();
        this.searchTerm = '';
        
        this.init();
    }
    
    init() {
        this.renderSpecialtyList();
        this.attachEventListeners();
        this.selectAll(); // Start with all specialties selected
    }
    
    renderSpecialtyList() {
        const specialtyList = document.getElementById('specialty-list');
        if (!specialtyList) return;
        
        // Keep the "Select All" checkbox
        const selectAllHtml = `
            <label class="filter-item select-all">
                <input type="checkbox" id="select-all-specialties" checked>
                <span class="filter-label"><strong>Todas</strong></span>
            </label>
        `;
        
        // Filter specialties by search term
        const filteredSpecialties = this.specialties.filter(specialty => {
            if (!this.searchTerm) return true;
            return specialty.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
        
        // Generate specialty checkboxes with doctor counts
        const specialtyHtml = filteredSpecialties.map(specialty => `
            <label class="filter-item" data-specialty="${specialty.name}">
                <input type="checkbox" 
                       class="specialty-checkbox" 
                       value="${specialty.name}" 
                       ${this.selectedSpecialties.has(specialty.name) ? 'checked' : ''}>
                <span class="filter-label">${specialty.name}</span>
                <span class="filter-count">(${specialty.count})</span>
            </label>
        `).join('');
        
        specialtyList.innerHTML = selectAllHtml + specialtyHtml;
    }
    
    attachEventListeners() {
        // Search box
        const searchInput = document.getElementById('specialty-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.renderSpecialtyList();
                this.reattachCheckboxListeners();
            });
        }
        
        // Select All checkbox
        const selectAll = document.getElementById('select-all-specialties');
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
        // Individual specialty checkboxes
        const checkboxes = document.querySelectorAll('.specialty-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const specialtyName = e.target.value;
                if (e.target.checked) {
                    this.selectedSpecialties.add(specialtyName);
                } else {
                    this.selectedSpecialties.delete(specialtyName);
                }
                this.updateSelectAllCheckbox();
                this.onSelectionChange();
            });
        });
    }
    
    selectAll() {
        this.selectedSpecialties.clear();
        this.specialties.forEach(specialty => {
            this.selectedSpecialties.add(specialty.name);
        });
        this.renderSpecialtyList();
        this.reattachCheckboxListeners();
        this.onSelectionChange();
    }
    
    deselectAll() {
        this.selectedSpecialties.clear();
        this.renderSpecialtyList();
        this.reattachCheckboxListeners();
        this.onSelectionChange();
    }
    
    updateSelectAllCheckbox() {
        const selectAll = document.getElementById('select-all-specialties');
        if (selectAll) {
            selectAll.checked = this.selectedSpecialties.size === this.specialties.length;
        }
    }
    
    getSelectedSpecialties() {
        return Array.from(this.selectedSpecialties);
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
    window.specialtyFilter = new SpecialtyFilter();
});
