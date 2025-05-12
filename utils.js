function createProjectElement(id, project){
    /* Create an element in Project
    tag: some tags
    title: title of the project or publications
    paper_url: link to the paper
    authors: authors
    conference: publication venue
    image (optional): directory to project image
    others (optional): anything else
    */
    if (project.tag == null)
        project.tag = id;
    if (project.others == null)
        project.others = "";

    html_img = `<img src='${project.image}' class="img-fluid" alt="${project.title}">`
    html_txt = `
        <p>
            <a href="${project.paper_url}"><papertitle>${project.title}</papertitle></a>
            <br>
            <br>
            ${project.authors}
            <br>
            <em>${project.conference}</em>
            <br>
            ${project.others}
        </p>`

    document.getElementById(id + "-img").innerHTML = html_img;
    document.getElementById(id + "-txt").innerHTML = html_txt;
}

/**
 * Loads blog index by fetching metadata from blog_list.json
 * @param {string} containerSelector - The CSS selector for the container where blog posts will be displayed
 */
async function loadBlogIndex(containerSelector) {
  try {
    // Get the base URL - handles both GitHub Pages and local development
    const baseUrl = window.location.pathname.includes('github.io') 
      ? window.location.pathname.split('/').slice(0, -1).join('/') 
      : '';
    
    console.log('Base URL detected:', baseUrl);
    
    // Fetch the blog metadata from the JSON file with the correct base path
    const response = await fetch(`${baseUrl}/blogs/blog_list.json`);
    if (!response.ok) {
      console.error('HTTP Error:', response.status, response.statusText);
      throw new Error(`Failed to fetch blog list (HTTP ${response.status})`);
    }

    const data = await response.json();
    const blogs = data.blogs || [];
    
    const blogContainer = document.querySelector(containerSelector);
    if (!blogContainer) return;
    
    blogContainer.innerHTML = '<h1>Blog Posts</h1>';
    
    if (blogs.length === 0) {
      blogContainer.innerHTML += '<p>No blog posts available yet. Stay tuned!</p>';
      return;
    }
    
    // Create list of blogs
    const blogList = document.createElement('div');
    blogList.className = 'blog-list';
    
    // Sort blogs by date (newest first)
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create blog entries
    for (const blog of blogs) {
      if (blog.file === 'blog_template.html') continue; // Skip template file
      
      const blogEntry = document.createElement('div');
      blogEntry.className = 'blog-entry';
      
      const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Use the same base URL for blog links
      blogEntry.innerHTML = `
        <h2><a href="${baseUrl}/blogs/${blog.file}">${blog.title}</a></h2>
        <div class="blog-date">${formattedDate}</div>
        <p class="blog-preview">${blog.summary}</p>
        <a href="${baseUrl}/blogs/${blog.file}" class="read-more">Read More</a>
      `;
      
      blogList.appendChild(blogEntry);
    }
    
    blogContainer.appendChild(blogList);
    
  } catch (error) {
    console.error('Error loading blog index:', error);
    const blogContainer = document.querySelector(containerSelector);
    if (blogContainer) {
      blogContainer.innerHTML = `
        <h1>Blog Posts</h1>
        <p>Error loading blog posts. Please try again later.</p>
        <p class="text-danger">Error details: ${error.message}</p>
        <p>Make sure the file blogs/blog_list.json exists and is accessible.</p>
      `;
    }
  }
}