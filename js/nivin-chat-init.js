// Nivín AI Chat Interface with Gemini Pro Integration
// Fixed version - ensures chat modal opens properly

(function() {
    'use strict';
    
    console.log('🤖 Nivín Chat Interface Initializing...');
    
    // Wait for DOM and all scripts to load
    function initNivinChat() {
        console.log('✅ Nivín Chat Ready');
        
        // Override any alert() calls that might be interfering
        const modal = document.getElementById('nivin-chat-modal');
        const button = document.getElementById('nivin-float-button');
        
        if (!modal || !button) {
            console.error('❌ Nivín elements not found');
            return;
        }
        
        // Force proper click handler
        button.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = 'flex';
            console.log('🎯 Nivín chat opened');
            
            // Focus input
            setTimeout(() => {
                const input = document.getElementById('nivin-input');
                if (input) input.focus();
            }, 100);
            
            return false;
        };
        
        // Verify Gemini integration
        if (window.NivinAI && window.NivinAI.handleMessage) {
            console.log('✅ Gemini Pro integration active');
            console.log(`📊 ${window.NivinAI.doctors?.length || 0} doctors loaded`);
        } else {
            console.warn('⚠️  Gemini Pro not loaded yet, using fallback');
        }
    }
    
    // Initialize after everything loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNivinChat);
    } else {
        initNivinChat();
    }
    
    // Also initialize after a short delay to ensure all scripts loaded
    setTimeout(initNivinChat, 1000);
    
})();
