# My Website

This is my personal website. 

## Adding New Publications

To add a new publication to display on the website:

1. Add a new project container and script in `index.html`

```html
<div class="row mb-4" id="newproject">
  <div class="col-md-3" id="newproject-img"></div>
  <div class="col-md-9" id="newproject-txt"></div>
</div>
<script type="text/javascript">
  createProjectElement(
    id = "newproject", {
    title: "Your Project Title",
    paper_url: "https://link-to-paper.com", 
    authors: "<b>Author Name</b>*, Other Author*, Another Author",
    conference: "Conference Name'YY",
    image: "figures/project-image.png",
    others: null  // Optional field for additional content
  });
</script>
```

2. Fill in the required fields:
   - `id`: Unique identifier used in div IDs
   - `title`: Publication title
   - `paper_url`: Link to the paper
   - `authors`: Author list (use `<b>` tags to highlight names)
   - `conference`: Publication venue and year
   - `image`: Path to project image in figures directory
   - `others`: Optional field for additional content

3. Add the project image to the `figures/` directory

The `utils.js` function will automatically format and display the publication entry on the website.

## Adding New Blog Posts

### How It Works

- Blogs are stored in the `blogs` directory
- Git pre-commit hook automatically updates `blog_list.json` on commit
- `blog.html` displays the list using the metadata from `blog_list.json`

## Adding a New Blog Post

1. Create a new HTML file in the `blogs` directory (copy `blog_template.html` as a starting point)
2. Include:
   - Title in an `<h1>` tag
   - Date in a `.blog-date` element (format: "Published on: YYYY-MM-DD") 
   - Content in `.blog-text` element
3. Commit your changes - the pre-commit hook handles the rest!