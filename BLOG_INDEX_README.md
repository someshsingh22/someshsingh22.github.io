# Blog Auto-Indexing System

This system automatically indexes all blog posts in the `blogs` directory, excluding `blog_template.html` and other non-blog files.

## How It Works

1. All blog posts should be placed in the `blogs` directory
2. The `blogs/blog_list.json` file contains metadata for all blog posts
3. The `blog.html` page displays this list of blog posts using JavaScript

## Adding a New Blog Post

1. Create a new HTML file in the `blogs` directory (you can copy `blog_template.html` as a starting point)
2. Add your content to the file
3. Make sure your blog post includes:
   - A title in an `<h1>` tag
   - A date in a `.blog-date` element (format: "Published on: YYYY-MM-DD")
   - Content in the `.blog-text` element

## Updating the Blog Index

After adding or updating blog posts, run the update script to regenerate the blog list:

```bash
# Install required dependencies first (one-time setup)
npm install jsdom

# Run the update script
node update_blog_list.js
```

This will:
1. Scan all HTML files in the `blogs` directory (except excluded files)
2. Extract metadata from each blog post
3. Update the `blogs/blog_list.json` file
4. Sort blog posts by date (newest first)

## Customizing the Display

You can customize the blog index display by editing:
- The CSS styles in `blog.html`
- The blog entry HTML template in the `loadBlogIndex` function in `utils.js`

## Troubleshooting

If a blog post doesn't appear in the index:
1. Make sure it's in the correct directory
2. Check that it has the required HTML structure
3. Run the update script again
4. Check the console for any errors 