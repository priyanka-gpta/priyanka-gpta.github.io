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
    articleItems.forEach(item => {
        const title = item.querySelector('.article-title').textContent.toLowerCase();
        const tags = item.querySelector('.article-tags').textContent.toLowerCase();
        const summary = item.querySelector('.article-summary').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || tags.includes(searchTerm) || summary.includes(searchTerm)) {
            item.style.display = '';
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

// Load and render blog posts from JSON and Markdown
async function loadBlogPosts() {
    const blogList = document.getElementById('blog-list');
    if (!blogList) {
        console.log('blog-list not found');
        return;
    }
    console.log('blog-list found');

    // Load index.json
    const res = await fetch('posts/index.json');
    const posts = await res.json();

    // Sort posts by date descending
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    // Render posts
    blogList.innerHTML = '';
    for (const post of posts) {
        // Fetch markdown content
        const mdRes = await fetch(`posts/${post.file}`);
        const mdText = await mdRes.text();

        // Convert markdown to HTML (requires marked.js)
        const html = window.marked.parse(mdText);

        // Build post card
        const postEl = document.createElement('div');
        postEl.className = 'post';
        postEl.innerHTML = `
            <div class="post-meta">${new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            <h2 class="post-title">${post.title}</h2>
            <div class="post-tags">${post.tags.map(tag => `<span class="article-tag">${tag}</span>`).join(' ')}</div>
            <div class="post-summary">${post.summary}</div>
            <details>
                <summary>Expand..</summary>
                <div class="post-content">${html}</div>
            </details>
        `;
        blogList.appendChild(postEl);
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', loadBlogPosts);