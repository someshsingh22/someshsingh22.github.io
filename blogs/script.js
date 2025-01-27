// Generate highlights from marked content
function generateHighlights() {
  const highlightsContainer = document.querySelector('.highlights');
  const highlightedElements = document.querySelectorAll('[data-highlight]');
  
  highlightsContainer.innerHTML = '<h4>Highlights</h4>';
  
  highlightedElements.forEach(element => {
    const highlight = document.createElement('div');
    highlight.className = 'highlight-item';
    
    const title = document.createElement('div');
    title.className = 'highlight-title';
    title.textContent = element.dataset.highlightTitle || 'Highlight';
    
    const content = document.createElement('div');
    content.textContent = element.textContent;
    
    highlight.appendChild(title);
    highlight.appendChild(content);
    highlightsContainer.appendChild(highlight);
  });
}

// Generate outline from headings
function generateOutline() {
  const blogText = document.querySelector('.blog-text');
  const outline = document.querySelector('.outline ul');
  const headings = blogText.querySelectorAll('h2, h3, h4');
  
  outline.innerHTML = ''; // Clear example outline
  
  let currentList = outline;
  let previousLevel = 2;
  
  headings.forEach(heading => {
    const level = parseInt(heading.tagName[1]);
    const item = document.createElement('li');
    const link = document.createElement('a');
    
    // Ensure heading has an id for linking
    if (!heading.id) {
      heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
    }
    
    link.href = '#' + heading.id;
    link.textContent = heading.textContent;
    item.appendChild(link);
    
    if (level > previousLevel) {
      const newList = document.createElement('ul');
      currentList.lastElementChild.appendChild(newList);
      currentList = newList;
    } else if (level < previousLevel) {
      currentList = outline;
    }
    
    currentList.appendChild(item);
    previousLevel = level;
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  generateHighlights();
  generateOutline();
}); 