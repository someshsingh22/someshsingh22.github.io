// Image dimensions mapping to prevent layout shifts
const imageDimensions = {
  "figures/experigen.png": { width: 2415, height: 770, webp: "figures/experigen.webp" },
  "figures/bllava.jpeg": { width: 1384, height: 666, webp: "figures/bllava.webp" },
  "figures/transsuasion.png": { width: 970, height: 664, webp: "figures/transsuasion.webp" },
  "figures/memorability-1.png": { width: 1778, height: 1706, webp: "figures/memorability-1.webp" },
  "figures/lcbm.png": { width: 1536, height: 782, webp: "figures/lcbm.webp" },
  "figures/aes.png": { width: 1170, height: 420, webp: "figures/aes.webp" },
  "figures/minimal.png": { width: 850, height: 698, webp: "figures/minimal.webp" },
  "figures/adobe.webp": { width: 512, height: 512 },
  "figures/CIQ.png": { width: 200, height: 200 },
  "https://arxiv.org/html/2511.20854v1/x1.png": { width: 897, height: 348 }
};

function createProjectElement(id, project) {
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

  // Get dimensions for the image if available
  const dims = imageDimensions[project.image] || {};
  const widthAttr = dims.width ? ` width="${dims.width}"` : '';
  const heightAttr = dims.height ? ` height="${dims.height}"` : '';

  // Lazy load images below the fold (first 2 projects are above fold)
  const loadingAttr = ['experigen', 'memorability-tot'].includes(id) ? '' : ' loading="lazy"';

  // Use WebP with fallback if available
  let html_img;
  if (dims.webp) {
    html_img = `<picture>
            <source srcset="${dims.webp}" type="image/webp">
            <img src='${project.image}' class="img-fluid" alt="${project.title}"${widthAttr}${heightAttr}${loadingAttr}>
        </picture>`;
  } else {
    html_img = `<img src='${project.image}' class="img-fluid" alt="${project.title}"${widthAttr}${heightAttr}${loadingAttr}>`;
  }

  html_txt = `
        <div class="project-details">
            <h3 class="project-title mb-2">
                <a href="${project.paper_url}"><papertitle>${project.title}</papertitle></a>
            </h3>
            <p class="project-authors mb-1">
                ${project.authors}
            </p>
            <p class="project-venue text-muted mb-0">
                <em>${project.conference}</em>
            </p>
            ${project.others ? `<p class="project-others mt-2">${project.others}</p>` : ''}
            ${project.links && project.links.length > 0 ? `
            <div class="project-links mt-2">
                ${project.links.map(link => {
    let icon = '';
    const ln = link.name.toLowerCase();
    if (ln.includes('website')) icon = '<i class="fa-solid fa-globe"></i>';
    else if (ln.includes('code')) icon = '<i class="fa-brands fa-github"></i>';
    else if (ln.includes('dataset') || ln.includes('data') || ln.includes('lambda')) icon = '<i class="fa-solid fa-database"></i>';
    else if (ln.includes('arena')) icon = '<i class="fa-solid fa-trophy"></i>';
    return `<a href="${link.url}" class="btn-cute" target="_blank">${icon}${link.name}</a>`;
  }).join('')}
            </div>` : ''}
        </div>`

  document.getElementById(id + "-img").innerHTML = html_img;
  document.getElementById(id + "-txt").innerHTML = html_txt;
}

/**
 * Loads blog index by fetching metadata from blog_list.json
 * @param {string} containerSelector - The CSS selector for the container where blog posts will be displayed
 */
async function loadBlogIndex(containerSelector) {
  try {
    // Fetch the blog metadata from the JSON file using relative path
    const response = await fetch('./blogs/blog_list.json');
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

      // Use relative path for URLs
      blogEntry.innerHTML = `
        <h2><a href="./blogs/${blog.file}">${blog.title}</a></h2>
        <div class="blog-date">${formattedDate}</div>
        <p class="blog-preview">${blog.summary}</p>
        <a href="./blogs/${blog.file}" class="read-more">Read More</a>
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