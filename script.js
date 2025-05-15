document.addEventListener('DOMContentLoaded', function() {
    // Year section expanding/collapsing
    const yearHeaders = document.querySelectorAll('.year-header');
    
    yearHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            section.classList.toggle('expanded');
        });
    });
});   
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const articleItems = document.querySelectorAll('.article-item');
    const yearSections = document.querySelectorAll('.year-section');
    if(searchInput) {
        searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Reset view when search is cleared
            articleItems.forEach(item => {
                item.style.display = '';
            });
            
            // Only keep the first year expanded
            yearSections.forEach((section, index) => {
                if (index === 0) {
                    section.classList.add('expanded');
                } else {
                    section.classList.remove('expanded');
                }
            });
            
            return;
        }
        
        // Expand all sections during search
        yearSections.forEach(section => {
            section.classList.add('expanded');
        });
        
        // Filter articles
        let hasResults = false;
        
        articleItems.forEach(item => {
            const title = item.querySelector('.article-title').textContent.toLowerCase();
            const tags = item.querySelector('.article-tags').textContent.toLowerCase();
            const summary = item.querySelector('.article-summary').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || tags.includes(searchTerm) || summary.includes(searchTerm)) {
                item.style.display = '';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Check if we need to show each year section
        yearSections.forEach(section => {
            const sectionArticles = section.querySelectorAll('.article-item');
            let sectionHasResults = false;
            
            sectionArticles.forEach(article => {
                if (article.style.display !== 'none') {
                    sectionHasResults = true;
                }
            });
            
            if (sectionHasResults) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    })};

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            
            // If we want to use cookies instead of localStorage
            // Set a cookie that expires in 30 days
            const darkMode = body.classList.contains('dark-theme');
            document.cookie = `darkMode=${darkMode}; max-age=${60*60*24*30}; path=/`;
        });
    }
    
    // Check for dark mode cookie on page load
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    const darkModeCookie = getCookie('darkMode');
    if (darkModeCookie === 'true') {
        body.classList.add('dark-theme');
    }
    
    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop();
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // If the href matches the current page, add active class
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') || 
            (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});