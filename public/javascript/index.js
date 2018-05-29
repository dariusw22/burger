// global bootbox
$(document).ready(function() {
    // Setting a reference to the article-container div where all the dynamic content will go
    // Adding event listeners to any dynamically generated "save article"
    // and "scrape new article" buttons
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    // Once the page is ready, run the initPage function
    initPage();

    function initPage() {
        // Empty the article container, run an AJAX request for any unsaved headlines
        articleContainer.empty();
        $.get("/api/headlines?saved=false").then(function(data) {
            // If there are headlines render them to the page
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                // render a message saying there are no articles
                renderEmpty();
            }
        });
    }
});