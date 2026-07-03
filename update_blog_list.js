/**
 * Script to auto-compile blog posts and update index files.
 * 
 * Usage:
 * - Place blog post HTML content fragments in blogs/src/ (e.g. blogs/src/agents.html)
 * - Run: node update_blog_list.js
 * - This compiles them into fully-formed pages at blogs/*.html, updates blogs/blog_list.json,
 *   and updates root blog.html with static pre-rendered list.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Configuration
const ROOT_DIR = __dirname;
const BLOGS_DIR = path.join(ROOT_DIR, 'blogs');
const BLOGS_SRC_DIR = path.join(BLOGS_DIR, 'src');
const BLOG_LIST_FILE = path.join(BLOGS_DIR, 'blog_list.json');
const BLOG_INDEX_FILE = path.join(ROOT_DIR, 'blog.html');

console.log('--- Static Blog Compiler ---');

// Create folders if they don't exist
if (!fs.existsSync(BLOGS_SRC_DIR)) {
  fs.mkdirSync(BLOGS_SRC_DIR, { recursive: true });
}

// Current Year
const currentYear = new Date().getFullYear();

// HTML template wrapper for dynamic posts
const postTemplate = (title, summary, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Somesh Singh</title>
  
  <meta name="description" content="${summary.replace(/"/g, '&quot;')}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${summary.replace(/"/g, '&quot;')}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary">
  
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  
  <!-- Fonts (Inter & Merriweather) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" rel="stylesheet">
  
  <!-- Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" type="text/css" href="../style.css">
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="icon" type="image/png" href="../seal_icon.png">
</head>
<body>
  <!-- Navigation Bar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
    <div class="container">
      <a class="navbar-brand font-merriweather" href="../index.html">Somesh Singh</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="../index.html#about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../index.html#news">News</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../index.html#research">Research</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../index.html#awards">Awards</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="../blog.html">Blog</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Content with Padding for fixed navbar -->
  <div style="padding-top: 76px;">
    <div class="blog-layout">
      <!-- Left sidebar TOC -->
      <aside class="blog-sidebar">
        <div class="toc-title">ON THIS PAGE</div>
        <ul class="toc-list" id="toc-list"></ul>
      </aside>

      <!-- Main reading container -->
      <main class="blog-main">
        ${content}
      </main>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-light py-4 mt-5">
    <div class="container text-center">
      <p class="mb-0">&copy; ${currentYear} Somesh Singh</p>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  
  <!-- Table of Contents Sync Script -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const container = document.getElementById('toc-list');
      const headings = document.querySelectorAll('.blog-text h2, .blog-text h3');
      
      if (!container || headings.length === 0) return;
      
      const tocItems = [];
      let currentGroup = container;
      
      headings.forEach((heading, idx) => {
        if (!heading.id) {
          heading.id = heading.textContent.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }
        
        const li = document.createElement('li');
        li.className = 'toc-item';
        
        const a = document.createElement('a');
        a.className = 'toc-link';
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        li.appendChild(a);
        
        if (heading.tagName === 'H3') {
          let subUl = currentGroup.querySelector('ul.toc-sub');
          if (!subUl) {
            subUl = document.createElement('ul');
            subUl.className = 'toc-sub';
            currentGroup.appendChild(subUl);
          }
          subUl.appendChild(li);
        } else {
          container.appendChild(li);
          currentGroup = li;
        }
        
        tocItems.push({ heading, link: a });
      });

      // Scroll Sync Highlighting with IntersectionObserver
      const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -50% 0px',
        threshold: 0
      };

      let activeItem = null;

      const observer = new IntersectionObserver((entries) => {
        // Collect currently intersecting headers
        const visibleHeadings = entries.filter(e => e.isIntersecting);
        if (visibleHeadings.length > 0) {
          // Pick the first intersecting heading or top-most active
          const entry = visibleHeadings[0];
          const matchingLink = tocItems.find(item => item.heading === entry.target)?.link;
          if (matchingLink) {
            if (activeItem) {
              activeItem.classList.remove('active');
            }
            matchingLink.classList.add('active');
            activeItem = matchingLink;
          }
        }
      }, observerOptions);

      headings.forEach(h => observer.observe(h));
    });
  </script>

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-7PE268E625"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-7PE268E625');
  </script>
</body>
</html>
`;

// HTML template wrapper for blog index listing
const indexTemplate = (blogListHtml) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Somesh Singh</title>
  
  <meta name="description" content="Thoughts, blueprints, and research ideas by Somesh Singh.">
  
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  
  <!-- Fonts (Inter & Merriweather) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" rel="stylesheet">
  
  <!-- Style sheets -->
  <link rel="stylesheet" type="text/css" href="style.css">
  
  <style>
    /* Clean Minimalist Blog List Styling */
    body {
      background-color: #fafafa;
    }
    .blog-index-container {
      max-width: 680px;
      margin: 0 auto;
      padding: 4rem 1.5rem 5rem;
    }
    
    .blog-index-header {
      margin-bottom: 4rem;
    }
    
    .blog-index-title {
      font-family: var(--font-display), 'Merriweather', serif;
      font-size: 2.75rem;
      font-weight: 700;
      color: var(--color-text-main);
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }
    
    .blog-index-subtitle {
      font-family: var(--font-primary), 'Inter', sans-serif;
      font-size: 1.05rem;
      color: var(--color-text-muted);
      font-weight: 400;
    }
    
    .blog-list {
      display: flex;
      flex-direction: column;
      gap: 3.5rem;
    }
    
    .blog-entry {
      border: none;
      padding: 0;
      margin: 0;
    }
    
    .blog-date {
      font-family: var(--font-primary), 'Inter', sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }
    
    .blog-title {
      font-family: var(--font-display), 'Merriweather', serif;
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.35;
      margin-bottom: 0.75rem;
    }
    
    .blog-title a {
      color: var(--color-text-main);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .blog-title a:hover {
      color: var(--color-link);
    }
    
    .blog-preview {
      font-family: var(--font-primary), 'Inter', sans-serif;
      font-size: 0.95rem;
      line-height: 1.65;
      color: var(--color-text-muted);
      margin-bottom: 1rem;
    }
    
    .read-more-link {
      font-family: var(--font-primary), 'Inter', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-link);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: gap 0.2s ease, color 0.2s ease;
    }
    
    .read-more-link:hover {
      color: var(--color-link-hover);
      gap: 0.6rem;
    }
  </style>
  <link rel="icon" type="image/png" href="seal_icon.png">
</head>
<body>
  <!-- Navigation Bar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
    <div class="container">
      <a class="navbar-brand font-merriweather" href="index.html">Somesh Singh</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="index.html#about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="index.html#news">News</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="index.html#research">Research</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="index.html#awards">Awards</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="blog.html">Blog</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Add padding to account for fixed navbar -->
  <div style="padding-top: 76px;">
    <div class="blog-index-container">
      <header class="blog-index-header">
        <h1 class="blog-index-title">Writing</h1>
        <p class="blog-index-subtitle">Blueprints, reviews, and research ideas.</p>
      </header>
      
      <div id="blog-container">
        ${blogListHtml}
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-light py-4 mt-5">
    <div class="container text-center">
      <p class="mb-0">&copy; ${currentYear} Somesh Singh</p>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-7PE268E625"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-7PE268E625');
  </script>
</body>
</html>
`;

// Helper to extract metadata and compile a single post file
async function compilePost(fileName) {
  const sourcePath = path.join(BLOGS_SRC_DIR, fileName);
  const targetPath = path.join(BLOGS_DIR, fileName);
  
  const html = fs.readFileSync(sourcePath, 'utf8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Extract metadata
  let title = fileName.replace('.html', '');
  const titleEl = document.querySelector('h1');
  if (titleEl) {
    title = titleEl.textContent.trim();
  }

  let date = new Date().toISOString().split('T')[0];
  const dateEl = document.querySelector('.blog-date');
  if (dateEl) {
    const dateText = dateEl.textContent.replace('Published on:', '').replace('Published:', '').trim();
    try {
      const parsedDate = new Date(dateText);
      if (!isNaN(parsedDate.getTime())) {
        date = parsedDate.toISOString().split('T')[0];
      }
    } catch (e) {
      console.warn(`Could not parse date from ${fileName}: ${dateText}`);
    }
  }

  let summary = '';
  const firstParagraph = document.querySelector('.blog-text p');
  if (firstParagraph) {
    summary = firstParagraph.textContent.trim().substring(0, 150);
    if (firstParagraph.textContent.length > 150) {
      summary += '...';
    }
  }

  // Extract the inner HTML content of the main blog wrapper (e.g. .blog-content)
  const mainContentEl = document.querySelector('.blog-content');
  const cleanContentHtml = mainContentEl ? mainContentEl.innerHTML : html;

  // Compile the post with postTemplate
  const compiledHtml = postTemplate(title, summary, cleanContentHtml);
  
  // Write the output toblogs/
  fs.writeFileSync(targetPath, compiledHtml);
  console.log(`Compiled: blogs/src/${fileName} -> blogs/${fileName}`);

  return {
    file: fileName,
    title,
    date,
    summary
  };
}

async function run() {
  try {
    const files = fs.readdirSync(BLOGS_SRC_DIR);
    const blogFiles = files.filter(f => f.endsWith('.html'));

    console.log(`Found ${blogFiles.length} source file(s) in blogs/src/.`);

    const blogsMetadata = [];
    
    for (const file of blogFiles) {
      // Compile & extract
      const meta = await compilePost(file);
      
      // Let's exclude blog_template.html from list indexing
      if (file !== 'blog_template.html') {
        blogsMetadata.push(meta);
      }
    }

    // Sort newer first
    blogsMetadata.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Save metadata JSON
    fs.writeFileSync(BLOG_LIST_FILE, JSON.stringify({ blogs: blogsMetadata }, null, 2));
    console.log(`Updated database: blogs/blog_list.json`);

    // Build the blog index list HTML (statically computed!)
    let blogListHtml = '';
    if (blogsMetadata.length === 0) {
      blogListHtml = '<p class="text-center font-merriweather">No blog posts available yet. Stay tuned!</p>';
    } else {
      blogListHtml = '<div class="blog-list">';
      for (const blog of blogsMetadata) {
        const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        blogListHtml += `
        <article class="blog-entry">
          <div class="blog-date">${formattedDate}</div>
          <h2 class="blog-title">
            <a href="./blogs/${blog.file}">${blog.title}</a>
          </h2>
          <p class="blog-preview">${blog.summary}</p>
          <a href="./blogs/${blog.file}" class="read-more-link">
            Read post &nbsp;<i class="fa-solid fa-arrow-right-long" style="font-size: 0.85em;"></i>
          </a>
        </article>
        `;
      }
      blogListHtml += '</div>';
    }

    // Complete compilation of the root blog.html page
    const compiledIndex = indexTemplate(blogListHtml);
    fs.writeFileSync(BLOG_INDEX_FILE, compiledIndex);
    console.log(`Compiled Root Blog Index page: blog.html`);
    console.log('Compile successfully completed!');

  } catch (err) {
    console.error('Compilation failed:', err);
  }
}

run();