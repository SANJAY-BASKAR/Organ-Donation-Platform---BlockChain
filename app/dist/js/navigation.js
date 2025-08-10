/**
 * Navigation component loader
 * This script dynamically loads the navigation component into all pages
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to load and insert navigation
    async function loadNavigation() {
        try {
            // Fetch the navigation HTML
            const response = await fetch('/navigation');
            if (!response.ok) {
                throw new Error(`Failed to load navigation: ${response.status}`);
            }
            
            const navigationHTML = await response.text();
            
            // Find the header element in the current page
            const currentHeader = document.querySelector('header');
            
            if (currentHeader) {
                // Replace existing header with the navigation component
                currentHeader.outerHTML = navigationHTML;
                
                // Execute any scripts within the navigation HTML
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = navigationHTML;
                const scripts = tempContainer.querySelectorAll('script');
                
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                });
            } else {
                console.error('No header element found in the page');
                // If no header exists, create one at the beginning of the body
                const newHeader = document.createElement('div');
                newHeader.innerHTML = navigationHTML;
                document.body.insertBefore(newHeader.firstElementChild, document.body.firstChild);
            }
        } catch (error) {
            console.error('Error loading navigation:', error);
            // Fallback to a basic navigation if loading fails
            createFallbackNavigation();
        }
    }
    
    // Function to create a fallback navigation in case of loading errors
    function createFallbackNavigation() {
        const fallbackNav = `
        <header class="site-header">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <nav class="main-nav">
                            <a href="/homepage" class="logo-link"><img id="logo" src="../images/organ-donation-platform-logo-1.svg" alt="Organ Donation Platform"></a>
                            <ul class="nav-links">
                                <li><a href="/homepage">Home</a></li>
                                <li><a href="/about-us">About Us</a></li>
                                <li><a href="/contact">Contact</a></li>
                                <li><a href="/awareness">Awareness</a></li>
                                <li><a href="/donor-pledge">Pledge</a></li>
                                <li><a href="/" class="dashboard-link">Dashboard <i class="fas fa-chart-line"></i></a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>`;
        
        const currentHeader = document.querySelector('header');
        if (currentHeader) {
            currentHeader.outerHTML = fallbackNav;
        } else {
            const newHeader = document.createElement('div');
            newHeader.innerHTML = fallbackNav;
            document.body.insertBefore(newHeader.firstElementChild, document.body.firstChild);
        }
    }
    
    // Load the navigation
    loadNavigation();
}); 