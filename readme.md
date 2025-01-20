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