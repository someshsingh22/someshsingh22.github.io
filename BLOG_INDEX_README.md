# Blog Auto-Indexing System

This system automatically indexes all blog posts in the `blogs` directory, excluding `blog_template.html` and other non-blog files.

## How It Works

1. All blog posts should be placed in the `blogs` directory
2. The `blogs/blog_list.json` file contains metadata for all blog posts
3. The `blog.html` page displays this list of blog posts using JavaScript
4. A pre-commit Git hook automatically updates the blog list whenever you make a commit

## Adding a New Blog Post

1. Create a new HTML file in the `blogs` directory (you can copy `blog_template.html` as a starting point)
2. Add your content to the file
3. Make sure your blog post includes:
   - A title in an `<h1>` tag
   - A date in a `.blog-date` element (format: "Published on: YYYY-MM-DD")
   - Content in the `.blog-text` element
4. Commit your changes! The pre-commit hook will automatically update the blog list

## Manual Updating (if needed)

You can manually update the blog index by running:

```bash
# Install required dependencies first (one-time setup)
npm install

# Run the update script
npm run update-blog-list
```

This will:
1. Scan all HTML files in the `blogs` directory (except excluded files)
2. Extract metadata from each blog post
3. Update the `blogs/blog_list.json` file
4. Sort blog posts by date (newest first)

## Pre-Commit Hook

The system uses a Git pre-commit hook to automatically update the blog list whenever you make a commit. This ensures that your blog index is always up to date.

If you clone this repository, the hook will be set up automatically when you run `npm install`.

## Customizing the Display

You can customize the blog index display by editing:
- The CSS styles in `blog.html`
- The blog entry HTML template in the `loadBlogIndex` function in `utils.js`

## Troubleshooting

If a blog post doesn't appear in the index:
1. Make sure it's in the correct directory
2. Check that it has the required HTML structure
3. Run the update script manually
4. Check the console for any errors 