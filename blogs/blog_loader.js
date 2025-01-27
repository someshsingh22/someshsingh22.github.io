document.addEventListener('DOMContentLoaded', function() {
    // Load the common header
    const header = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Blog - Somesh Singh</title>
            
            <!-- Same CSS and Fonts as main page -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href='https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
            <link rel="stylesheet" type="text/css" href="../style.css">
            <link rel="stylesheet" type="text/css" href="style.css">
            <link rel="icon" type="image/png" href="../seal_icon.png">
            <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&family=Roboto+Condensed:wght@700&display=swap" rel="stylesheet">
        </head>
    `;

    const navigation = `
        <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="../index.html">Somesh Singh</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
    `;

    const footer = `
        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <script src="script.js"></script>
        <script src="../script.js"></script>
        
        <!-- Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7PE268E625"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7PE268E625');
        </script>
    `;

    // Insert header
    document.documentElement.innerHTML = header + document.documentElement.innerHTML;
    
    // Insert navigation after body tag
    const bodyContent = document.body.innerHTML;
    document.body.innerHTML = navigation + `
        <div style="padding-top: 76px;">
            <div class="blog-container">
                <div class="outline">
                    <h4>Contents</h4>
                    <ul id="outline-list"></ul>
                </div>
                ${bodyContent}
            </div>
        </div>
    `;

    // Generate outline from headings
    function generateOutline() {
        const outlineList = document.getElementById('outline-list');
        const headings = document.querySelectorAll('.blog-text h2, .blog-text h3');
        
        headings.forEach(heading => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            // Add appropriate class based on heading level
            if (heading.tagName === 'H3') {
                li.classList.add('sub-item');
            }
            
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;
            li.appendChild(a);
            outlineList.appendChild(li);
        });
    }

    generateOutline();

    // Append footer
    document.body.innerHTML += footer;
}); 