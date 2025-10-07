// Universal function to open Nivín chat from any button
// Fixed version - directly opens the modal
function openNivinChat() {
    console.log('🤖 Opening Nivín chat...');
    
    // Get the modal
    const modal = document.getElementById('nivin-chat-modal');
    
    if (modal) {
        // Show the modal
        modal.style.display = 'flex';
        console.log('✅ Nivín chat opened successfully');
        
        // Focus on input field
        setTimeout(() => {
            const input = document.getElementById('nivin-input');
            if (input) {
                input.focus();
                console.log('✅ Input focused');
            }
        }, 100);
        
        // Display welcome message if this is first time
        const chatMessages = document.getElementById('nivin-messages');
        if (chatMessages && chatMessages.children.length === 0) {
            addNivinMessage('¡Hola! Soy Nivín, tu asistente médico virtual de Centro Médico Universal. ¿En qué puedo ayudarte hoy?');
        }
    } else {
        console.error('❌ Nivín modal not found');
        alert('El chat de Nivín no está disponible en este momento. Por favor, intenta de nuevo o llama al (809) 594-6161.');
    }
}

// Helper function to add Nivín message
function addNivinMessage(message) {
    const chatMessages = document.getElementById('nivin-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'nivin-message bot-message';
    messageDiv.innerHTML = `
        <div style="background: #E8F5E9; padding: 12px; border-radius: 15px; margin: 5px 0; max-width: 80%;">
            <strong style="color: #2E7D32;">Nivín:</strong>
            <div style="margin-top: 5px;">${message}</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Make function available globally
window.openNivinChat = openNivinChat;

console.log('✅ open-nivin.js loaded successfully');
