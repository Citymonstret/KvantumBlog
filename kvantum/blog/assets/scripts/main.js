var BlogEntry = (function () {
    function BlogEntry(title, created, content) {
        this.title = title;
        this.created = created;
        this.content = content;
        this.rendered = markdown.toHTML(this.content);
        this.time = new Date(this.created).toLocaleString();
    }
    BlogEntry.prototype.render = function () {
        return "\n<div style='display:none' class=\"entry-row row\">\n    <div class=\"col\">\n        <div class=\"post\"\n            <article>\n                <header>\n                    <h1 class=\"mt-4 post-title\">" + this.title + "</h1>\n                    <p>Posted: " + this.time + "</p>\n                    <hr>\n                </header>\n                <div class=\"post-content\">\n                    " + this.rendered + "\n                </div><!-- /post-content -->\n            </article>\n        </div><!-- /post-->\n    </div><!-- /col -->\n</div><!-- /row -->\n";
    };
    return BlogEntry;
}());
var $posts = $("#posts");
var entries;
entries = [];
var offset = 0;
$(document).ready(function () {
    var vars = getUrlVars();
    if (vars['load'] !== undefined) {
        getEntries(parseInt(vars['load']));
    }
    else {
        getEntries(1);
    }
});
$("button#load-more").click(function () {
    if ($(this).hasClass("disabled")) {
        return;
    }
    getEntries(1);
});
function getEntries(num) {
    $.getJSON("./entries?items=" + num + "&from=" + offset, function (data) {
        if (data.status === 'error') {
            $("button#load-more").addClass("disabled");
        }
        else {
            for (var resultIndex in data.result) {
                var result = data.result[resultIndex];
                entries.push(new BlogEntry(result.title, result.created, result.content));
            }
        }
        push();
    });
    offset += num;
    history.pushState('data', '', '?load=' + offset);
}
function push() {
    entries.forEach(function (entry) {
        $posts.append(entry.render());
    });
    entries = [];
    $(".entry-row").fadeIn(1000);
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
