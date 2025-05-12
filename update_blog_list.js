/**
 * Script to auto-index blog posts and update blog_list.json
 * 
 * Usage:
 * - Add this script to your project root
 * - Run with Node.js: node update_blog_list.js
 * - It will scan the blogs directory and update blogs/blog_list.json
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Configuration
const BLOGS_DIR = path.join(__dirname, 'blogs');
const BLOG_LIST_FILE = path.join(BLOGS_DIR, 'blog_list.json');
const EXCLUDED_FILES = ['blog_template.html', 'index.html', 'style.css', 'blog_loader.js'];

// Function to extract metadata from a blog post
async function extractBlogMetadata(filePath, fileName) {
  try {
    // Read the HTML file
    const html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract title
    let title = fileName.replace('.html', '');
    const titleEl = document.querySelector('h1');
    if (titleEl) {
      title = titleEl.textContent.trim();
    }

    // Extract date
    let date = new Date().toISOString().split('T')[0]; // Default to today
    const dateEl = document.querySelector('.blog-date');
    if (dateEl) {
      const dateText = dateEl.textContent.replace('Published on:', '').trim();
      try {
        // Try to parse the date
        const parsedDate = new Date(dateText);
        if (!isNaN(parsedDate.getTime())) {
          date = parsedDate.toISOString().split('T')[0];
        }
      } catch (e) {
        console.warn(`Could not parse date from ${fileName}: ${dateText}`);
      }
    }

    // Extract summary
    let summary = '';
    const firstParagraph = document.querySelector('.blog-text p');
    if (firstParagraph) {
      // Get first 150 characters of the paragraph
      summary = firstParagraph.textContent.trim().substring(0, 150);
      if (firstParagraph.textContent.length > 150) {
        summary += '...';
      }
    }

    return {
      file: fileName,
      title,
      date,
      summary
    };
  } catch (error) {
    console.error(`Error extracting metadata from ${fileName}:`, error);
    return {
      file: fileName,
      title: fileName.replace('.html', ''),
      date: new Date().toISOString().split('T')[0],
      summary: 'No summary available.'
    };
  }
}

// Main function
async function updateBlogList() {
  console.log('Scanning blogs directory...');
  
  try {
    // Get all HTML files in the blogs directory
    const files = fs.readdirSync(BLOGS_DIR);
    const blogFiles = files.filter(file => 
      file.endsWith('.html') && 
      !EXCLUDED_FILES.includes(file)
    );
    
    console.log(`Found ${blogFiles.length} blog post(s).`);
    
    // Extract metadata from each blog file
    const blogs = [];
    for (const file of blogFiles) {
      const filePath = path.join(BLOGS_DIR, file);
      console.log(`Processing ${file}...`);
      const metadata = await extractBlogMetadata(filePath, file);
      blogs.push(metadata);
    }
    
    // Sort blogs by date (newest first)
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create the blog list JSON
    const blogList = { blogs };
    
    // Write to file
    fs.writeFileSync(BLOG_LIST_FILE, JSON.stringify(blogList, null, 2));
    
    console.log(`Blog list updated successfully. Found ${blogs.length} blog posts.`);
    console.log(`Blog list saved to ${BLOG_LIST_FILE}`);
  } catch (error) {
    console.error('Error updating blog list:', error);
  }
}

// Run the script
updateBlogList(); 