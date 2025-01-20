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