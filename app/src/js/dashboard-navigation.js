/**
 * Dashboard-specific navigation component loader
 * This script dynamically loads the navigation component for the dashboard page
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to ensure dashboard navigation is styled exactly like homepage
    function setupNavigation() {
        // Find the dashboard link in the navigation
        const dashboardLink = document.querySelector('#nav-dashboard');
        if (dashboardLink) {
            // Add active class to the dashboard link
            dashboardLink.classList.add('active');
            
            // Make sure other links don't have active class
            document.querySelectorAll('nav ul li a:not(#nav-dashboard)').forEach(link => {
                link.classList.remove('active');
            });
        }
        
        // Add event listeners for hover effects on nav items
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.color = '#3498db';
            });
            
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.color = '';
                }
            });
        });
        
        // Add animation to the logo
        const logo = document.querySelector('#logo');
        if (logo) {
            logo.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        }
    }
    
    // Call setup function when DOM is loaded
    setupNavigation();
}); 