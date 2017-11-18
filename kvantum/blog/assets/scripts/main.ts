class BlogEntry {
    rendered: string;
    time: string;

    constructor(public title: string,
                public created: number,
                public content: string) {
        this.rendered = markdown.toHTML(this.content);
        this.time = new Date(this.created).toLocaleString();
    }

    render(): string {
        return `
<div style='display:none' class="entry-row row">
    <div class="col">
        <div class="post"
            <article>
                <header>
                    <h1 class="mt-4 post-title">${this.title}</h1>
                    <p>Posted: ${this.time}</p>
                    <hr>
                </header>
                <div class="post-content">
                    ${this.rendered}
                </div><!-- /post-content -->
            </article>
        </div><!-- /post-->
    </div><!-- /col -->
</div><!-- /row -->
`;
    }
}

const $posts = $("#posts");
let entries: BlogEntry[];
entries = [];

let offset = 0;

$(document).ready(function () {
    let vars = getUrlVars();
    if (vars['load'] !== undefined)
    {
        getEntries(parseInt(vars['load']));
    } else
    {
        getEntries(1 );
    }
});

$("button#load-more").click(function() {
   if ($(this).hasClass("disabled")) {
       return;
   }
   getEntries( 1 );
});

function getEntries(num: number) {
    $.getJSON(`./entries?items=${num}&from=${offset}`, function (data) {
        if ( data.status === 'error')
        {
            $("button#load-more").addClass("disabled");
        } else {
            for (let resultIndex in data.result) {
                let result = data.result[resultIndex];
                entries.push(new BlogEntry(result.title, result.created, result.content));
            }
        }
        push();
    });
    offset += num;
    history.pushState('data', '', '?load=' + offset);
}

function push() {
    entries.forEach(function (entry: BlogEntry) {
        $posts.append(entry.render());
    });
    entries = [];
    $(".entry-row").fadeIn(1000);
}

function getUrlVars(): string[]
{
    let vars = [], hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(let i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
