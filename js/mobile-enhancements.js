// Mobile Enhancement JavaScript for Centro Médico Universal
// Improves touch interactions and mobile UX

document.addEventListener('DOMContentLoaded', function() {
    
    // Detect if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && !(/Mobile/i.test(navigator.userAgent));
    
    if (isMobile || isTablet) {
        document.body.classList.add('touch-device');
    }
    
    // Improve touch scrolling
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndY < touchStartY - 50) {
            // Swipe up - could trigger actions
        }
        if (touchEndY > touchStartY + 50) {
            // Swipe down - could show refresh
        }
    }
    
    // Add pull-to-refresh for mobile (PWA feature)
    let pullToRefresh = {
        threshold: 100,
        start: 0,
        end: 0,
        refreshing: false
    };
    
    // Create mobile menu toggle
    function createMobileMenu() {
        if (!document.querySelector('.mobile-menu-toggle')) {
            const header = document.querySelector('.header-content');
            if (header) {
                const menuToggle = document.createElement('button');
                menuToggle.className = 'mobile-menu-toggle';
                menuToggle.innerHTML = '☰';
                menuToggle.style.cssText = `
                    display: none;
                    background: transparent;
                    border: none;
                    font-size: 24px;
                    color: #2E7D32;
                    cursor: pointer;
                    padding: 10px;
                `;
                
                if (window.innerWidth <= 768) {
                    menuToggle.style.display = 'block';
                }
                
                header.prepend(menuToggle);
                
                menuToggle.addEventListener('click', toggleMobileMenu);
            }
        }
    }
    
    function toggleMobileMenu() {
        const nav = document.querySelector('.dashboard-grid, .card-container');
        if (nav) {
            nav.classList.toggle('mobile-menu-open');
        }
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            window.scrollTo(0, 0);
            adjustForOrientation();
        }, 200);
    });
    
    function adjustForOrientation() {
        const orientation = window.orientation || 0;
        if (Math.abs(orientation) === 90) {
            // Landscape
            document.body.classList.add('landscape');
            document.body.classList.remove('portrait');
        } else {
            // Portrait
            document.body.classList.add('portrait');
            document.body.classList.remove('landscape');
        }
    }
    
    // Improve form inputs for mobile
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        // Prevent zoom on focus (iOS)
        input.addEventListener('focus', function() {
            if (isMobile) {
                document.querySelector('meta[name="viewport"]').setAttribute('content', 
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        });
        
        input.addEventListener('blur', function() {
            if (isMobile) {
                document.querySelector('meta[name="viewport"]').setAttribute('content', 
                    'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
            }
        });
    });
    
    // Add floating action button for mobile
    function addFloatingActionButton() {
        if (isMobile && !document.querySelector('.fab')) {
            const currentPage = window.location.pathname;
            let fabAction = '';
            let fabIcon = '';
            
            if (currentPage.includes('patients.html')) {
                fabIcon = '+';
                fabAction = 'showAddPatientModal';
            } else if (currentPage.includes('appointments.html')) {
                fabIcon = '📅';
                fabAction = 'showNewAppointmentModal';
            } else if (currentPage.includes('dashboard')) {
                fabIcon = '📊';
                fabAction = 'refreshStats';
            }
            
            if (fabIcon) {
                const fab = document.createElement('button');
                fab.className = 'fab';
                fab.innerHTML = fabIcon;
                fab.onclick = function() {
                    if (window[fabAction]) {
                        window[fabAction]();
                    }
                };
                document.body.appendChild(fab);
            }
        }
    }
    
    // Optimize tables for mobile
    function makeTablesResponsive() {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            // Wrap table in scrollable container
            if (!table.parentElement.classList.contains('table-scroll-container')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-scroll-container';
                wrapper.style.cssText = 'overflow-x: auto; -webkit-overflow-scrolling: touch;';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
            
            // Add data-labels for mobile view
            const headers = table.querySelectorAll('thead th');
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, index) => {
                    if (headers[index]) {
                        cell.setAttribute('data-label', headers[index].textContent);
                    }
                });
            });
        });
    }
    
    // Improve touch targets
    function improveTouchTargets() {
        const buttons = document.querySelectorAll('button, a.btn, a.card-btn, input[type="submit"]');
        buttons.forEach(btn => {
            const rect = btn.getBoundingClientRect();
            if (rect.height < 44 || rect.width < 44) {
                btn.style.minHeight = '44px';
                btn.style.minWidth = '44px';
            }
        });
    }
    
    // Add swipe navigation for mobile
    function enableSwipeNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleHorizontalSwipe();
        });
        
        function handleHorizontalSwipe() {
            const swipeThreshold = 100;
            const diff = touchEndX - touchStartX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe right - could go back
                    const backBtn = document.querySelector('.back-btn');
                    if (backBtn && window.history.length > 1) {
                        // Could trigger back navigation
                    }
                } else {
                    // Swipe left - could open menu
                    const menuToggle = document.querySelector('.mobile-menu-toggle');
                    if (menuToggle) {
                        menuToggle.click();
                    }
                }
            }
        }
    }
    
    // Optimize images for mobile
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading lazy attribute
            img.loading = 'lazy';
            
            // Add responsive sizing
            if (!img.style.maxWidth) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }
    
    // Add offline detection
    function setupOfflineDetection() {
        window.addEventListener('online', function() {
            const indicator = document.querySelector('.offline-indicator');
            if (indicator) {
                indicator.style.display = 'none';
            }
        });
        
        window.addEventListener('offline', function() {
            let indicator = document.querySelector('.offline-indicator');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.className = 'offline-indicator';
                indicator.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: #ff5252;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    z-index: 9999;
                    font-size: 14px;
                `;
                indicator.textContent = 'Sin conexión a internet';
                document.body.prepend(indicator);
            }
            indicator.style.display = 'block';
        });
    }
    
    // Initialize mobile enhancements
    function initMobileEnhancements() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
            addFloatingActionButton();
            makeTablesResponsive();
            improveTouchTargets();
            enableSwipeNavigation();
            optimizeImages();
            setupOfflineDetection();
            adjustForOrientation();
        }
    }
    
    // Run on load
    initMobileEnhancements();
    
    // Re-run on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initMobileEnhancements();
        }, 250);
    });
    
    // Add viewport height fix for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // Improve scrolling performance
    if (isMobile) {
        document.addEventListener('touchmove', function(e) {
            // Allow scrolling
        }, { passive: true });
    }
});

// Export functions for use in other scripts
window.mobileEnhancements = {
    isMobile: function() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    showToast: function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `mobile-toast ${type}`;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4caf50' : '#2196f3'};
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 10000;
            animation: slideUp 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translate(-50%, 100px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    @keyframes slideDown {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, 100px); opacity: 0; }
    }
    .mobile-menu-open {
        display: block !important;
        animation: slideIn 0.3s ease;
    }
    @keyframes slideIn {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }
    .touch-device input:focus,
    .touch-device textarea:focus,
    .touch-device select:focus {
        outline: 3px solid #2E7D32;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);
