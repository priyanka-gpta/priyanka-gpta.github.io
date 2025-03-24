/* JavaScript for a simpler theme toggle */
document.addEventListener('DOMContentLoaded', () => {
    // Get the theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    // Set initial text based on current theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️';
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        themeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Tag filtering functionality
    const tags = document.querySelectorAll('.tag');
    const projectCards = document.querySelectorAll('.project-card');
    
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            tags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            tag.classList.add('active');
            
            const filter = tag.textContent.toLowerCase();
            
            // Show all projects if 'All' is selected
            if (filter === 'all') {
                projectCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            // Filter projects based on tags
            projectCards.forEach(card => {
                const projectTags = card.querySelectorAll('.project-tag');
                let hasTag = false;
                
                projectTags.forEach(projectTag => {
                    if (projectTag.textContent.toLowerCase().includes(filter)) {
                        hasTag = true;
                    }
                });
                
                card.style.display = hasTag ? 'block' : 'none';
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Tag filtering functionality for blog posts
    const tags = document.querySelectorAll('.tag');
    const blogPosts = document.querySelectorAll('.minimalist-post');
    
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            tags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            tag.classList.add('active');
            
            const filter = tag.textContent.toLowerCase();
            
            // Show all posts if 'All' is selected
            if (filter === 'all') {
                blogPosts.forEach(post => {
                    post.style.display = 'block';
                });
                return;
            }
            
            // Filter blog posts based on tags
            blogPosts.forEach(post => {
                const postTags = post.getAttribute('data-tags').split(',');
                let hasTag = false;
                
                postTags.forEach(postTag => {
                    if (postTag.toLowerCase() === filter) {
                        hasTag = true;
                    }
                });
                
                post.style.display = hasTag ? 'block' : 'none';
            });
        });
    });
});