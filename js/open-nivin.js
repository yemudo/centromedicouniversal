// Universal function to open Nivín chat
function openNivinChat() {
    console.log('🤖 Opening Nivín chat...');
    
    const modal = document.getElementById('nivin-chat-modal');
    const button = document.getElementById('nivin-float-button');
    
    if (modal) {
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        if (button) button.style.display = 'none';
        console.log('✅ Nivín chat opened');
        
        setTimeout(() => {
            const input = document.getElementById('nivin-input');
            if (input) input.focus();
        }, 100);
    } else {
        console.error('❌ Modal not found');
    }
}

// Function to close Nivín chat
function closeNivinChat() {
    const modal = document.getElementById('nivin-chat-modal');
    const button = document.getElementById('nivin-float-button');
    
    if (modal) modal.style.display = 'none';
    if (button) button.style.display = 'block';
    console.log('✅ Nivín chat closed');
}

window.openNivinChat = openNivinChat;
window.closeNivinChat = closeNivinChat;

console.log('✅ open-nivin.js loaded - v2');
