// Generate outline from headings
function generateOutline() {
  const blogText = document.querySelector('.blog-text');
  const outline = document.querySelector('.outline ul');
  const headings = blogText.querySelectorAll('h2');
  
  outline.innerHTML = ''; // Clear existing outline
  
  headings.forEach(heading => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    
    // Ensure heading has an id for linking
    if (!heading.id) {
      heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
    }
    
    // Remove numbering from the heading text
    const headingText = heading.textContent.replace(/^\d+\.\s*/, '');
    
    link.href = '#' + heading.id;
    link.textContent = headingText;
    item.appendChild(link);
    outline.appendChild(item);
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  generateOutline();
}); 