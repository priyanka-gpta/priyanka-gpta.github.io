
// Search functionality
const articleSearchInput = document.getElementById('search-input');
if(articleSearchInput) {
    articleSearchInput.addEventListener('input', function() {
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
    });
};

// Navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (
            href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')
        ) {
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
    const res = await fetch('posts/index.json');
    const posts = await res.json();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    blogList.innerHTML = '';
    for (const post of posts) {
        const mdRes = await fetch(`posts/${post.file}`);
        const mdText = await mdRes.text();
        const html = window.marked.parse(mdText);
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
document.addEventListener('DOMContentLoaded', loadBlogPosts);

// Search functionality for dynamically rendered posts
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const postItems = document.querySelectorAll('#blog-list .post');
        postItems.forEach(item => {
            const title = item.querySelector('.post-title')?.textContent.toLowerCase() || '';
            const tags = item.querySelector('.post-tags')?.textContent.toLowerCase() || '';
            const summary = item.querySelector('.post-summary')?.textContent.toLowerCase() || '';
            if (
                title.includes(searchTerm) ||
                tags.includes(searchTerm) ||
                summary.includes(searchTerm)
            ) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}