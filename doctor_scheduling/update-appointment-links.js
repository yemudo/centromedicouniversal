// Update all appointment links to trigger Nivin
function updateAppointmentLinks() {
    // Function to open Nivin with appointment request
    window.openNivinForAppointment = function(e) {
        if (e) e.preventDefault();
        
        // Show Nivin
        const chat = document.getElementById('nivin-chat');
        const button = document.getElementById('nivin-button');
        
        if (chat) {
            chat.style.display = 'block';
            if (button) button.style.display = 'none';
            
            // Automatically start appointment flow
            setTimeout(() => {
                const input = document.getElementById('nivin-input');
                if (input) {
                    input.value = 'Quiero solicitar una cita médica';
                    sendToNivin();
                }
            }, 500);
        }
        
        return false;
    };
    
    // Find all appointment-related links and buttons
    const appointmentSelectors = [
        'a[href*="agendar"]',
        'a[href*="appointment"]',
        'a[href*="booking"]',
        'a[href*="cita"]',
        'a[href="#appointment"]',
        'button:contains("SOLICITAR CITA")',
        '.cta:contains("SOLICITAR CITA")',
        '.hero-button:contains("SOLICITAR CITA")',
        'a.cita-btn',
        'a[onclick*="booking"]',
        '.btn:contains("Solicitar Cita")',
        '.nav-link:contains("Citas")'
    ];
    
    // Update each link/button
    appointmentSelectors.forEach(selector => {
        // Handle jQuery-style :contains selector
        if (selector.includes(':contains')) {
            const [baseSelector, searchText] = selector.split(':contains(');
            const text = searchText.replace(')', '').replace(/['"]/g, '');
            
            document.querySelectorAll(baseSelector || '*').forEach(element => {
                if (element.textContent && element.textContent.includes(text)) {
                    element.onclick = openNivinForAppointment;
                    element.href = '#';
                    element.style.cursor = 'pointer';
                }
            });
        } else {
            // Regular selector
            document.querySelectorAll(selector).forEach(element => {
                element.onclick = openNivinForAppointment;
                if (element.tagName === 'A') {
                    element.href = '#';
                }
                element.style.cursor = 'pointer';
            });
        }
    });
    
    // Also update any text that says "SOLICITAR CITA" to be clickable
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.nodeValue && node.nodeValue.includes('SOLICITAR CITA')) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const parent = textNode.parentElement;
        if (parent && parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE') {
            // Check if already clickable
            if (parent.tagName === 'A' || parent.tagName === 'BUTTON') {
                parent.onclick = openNivinForAppointment;
                if (parent.tagName === 'A') parent.href = '#';
            } else if (parent.closest('a, button')) {
                const clickable = parent.closest('a, button');
                clickable.onclick = openNivinForAppointment;
                if (clickable.tagName === 'A') clickable.href = '#';
            }
        }
    });
    
    console.log('[Nivin] Updated all appointment links to trigger Nivin assistant');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAppointmentLinks);
} else {
    updateAppointmentLinks();
}

// Also update after any dynamic content is loaded
const observer = new MutationObserver(() => {
    updateAppointmentLinks();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
