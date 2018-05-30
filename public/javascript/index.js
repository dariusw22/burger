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

    function renderArticles(articles) {
        // This function handles appending HTML containing our article data to the page
        // We are passed an array of JSON containing all available articles in our database
        var articlesCards = [];
        // pass each article JSON object to the createCard function returns a bootstrap
        // card with the article data inside 
        for ( var i = 0; i < articles.length; i++) {
            articlesCards.push(createCard(articles[i]));
        }
        // when we have all the HTML from the articles stored in the articleCards array
        // append to the articleCards container 
        articleContainer.append(articleCards);
    }

    function createCard(article){
            // This function takes in a single JSON object for an article/headline
            // It constructs a jQuery element containing all of the formatted HTML for the
            // article card
            var card = $(
                [
                    "<div class='card'>",
                    "<div class='card-header'>",
                    "<h3>",
                    "<a class='article-link' target='_blank' href='" + article.url + "'>",
                    article.headline,
                    "</a>",
                    "<a class='btn btn-success save'>",
                    "Save Article",
                    "</a>",
                    "<h3>",
                    "</div>",
                    "<div class='card-body'>",
                    article.summary,
                    "</div>",
                    "</div>"
                ].join("")
            );
            // attach the articles id to the jQuery element 
            // use this to figure out which article the user wants to save 
            card.data("_id", article._id);
            // return the constructed card jQuery element
            return card;
    }

    function renderEmpty() {
        // Function to render HTML to the page to say that there are no articles to view
        // Using a joined array of HTML string data because its easier to read/ change than a concatenated string
        var emptyAlert = $(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
                "</div>",
                "<div class='card'>",
                "<div class='card-header text-center'>",
                "<h3>What Would You Like To Do?</h3>",
                "</div>",
                "<div class='card-body text-center'>",
                "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
                "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );
        // Appending this data to the page 
        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        // triggered when the user wants to save an article
        // RRetrieving the rendered article with the .data method
        var articleToSave = $(this)
            .parents(".child")
            .data();
            articleToSave.saved = true;
            // Using a patch method to be semantic since this is an update to an existing record in our collection
            $.ajax({
                method: "PUT",
                url: "/api/headlines/" + articleToSave._id,
                data: articleToSave
            }).then(function(data) {
                // if the data is saved succesfully 
                if (data.saved) {
                    // run the initPage function again.
                    initPage();
                }
            });
    }
});