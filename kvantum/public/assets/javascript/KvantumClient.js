// Type definitions for jquery 3.2
// Project: https://jquery.com
// Definitions by: Leonard Thieu <https://github.com/leonard-thieu>
//                 Boris Yankov <https://github.com/borisyankov>
//                 Christian Hoffmeister <https://github.com/choffmeister>
//                 Steve Fenton <https://github.com/Steve-Fenton>
//                 Diullei Gomes <https://github.com/Diullei>
//                 Tass Iliopoulos <https://github.com/tasoili>
//                 Jason Swearingen <https://github.com/jasons-novaleaf>
//                 Sean Hill <https://github.com/seanski>
//                 Guus Goossens <https://github.com/Guuz>
//                 Kelly Summerlin <https://github.com/ksummerlin>
//                 Basarat Ali Syed <https://github.com/basarat>
//                 Nicholas Wolverson <https://github.com/nwolverson>
//                 Derek Cicerone <https://github.com/derekcicerone>
//                 Andrew Gaspar <https://github.com/AndrewGaspar>
//                 Seikichi Kondo <https://github.com/seikichi>
//                 Benjamin Jackman <https://github.com/benjaminjackman>
//                 Poul Sorensen <https://github.com/s093294>
//                 Josh Strobl <https://github.com/JoshStrobl>
//                 John Reilly <https://github.com/johnnyreilly>
//                 Dick van den Brink <https://github.com/DickvdBrink>
//                 Thomas Schulz <https://github.com/King2500>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3
// endregion
var Search;
(function (Search) {
    var SearchProperty = (function () {
        function SearchProperty(key, value) {
            this.key = key;
            this.value = value;
            this.parameterSet = key + "=" + value;
        }
        return SearchProperty;
    }());
    Search.SearchProperty = SearchProperty;
    var SearchQuery = (function () {
        function SearchQuery() {
            var properties = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                properties[_i] = arguments[_i];
            }
            this.query = "";
            for (var i = 0; i < properties.length; i++) {
                this.query += properties[i].parameterSet;
                if ((i + 1) < properties.length) {
                    this.query += "&";
                }
            }
            console.log(this.query);
        }
        return SearchQuery;
    }());
    Search.SearchQuery = SearchQuery;
    function search(url, query, callback) {
        /*
               var self = this; // Note: captured local used in closure below
        var ajaxSettings = {
            context: requestArgs,
            // Do not use an arrow function here, even though it's tempting!
            error: function(arg) { self.FailureProxyCallback(this, arg) }
        };

        $.ajax(ajaxSettings);
         */
        var ajaxSettings = {
            url: url + "?" + query.query
        };
        $.ajax(ajaxSettings).done(function (data) {
            var result;
            switch (data.status) {
                case "success":
                    result = SearchResult.SUCCESS;
                    break;
                default:
                    result = SearchResult.FAILURE;
                    break;
            }
            if (result == SearchResult.FAILURE) {
                return;
            }
            else {
                var queryResults = data.result;
                for (var queryResult in queryResults) {
                    alert(JSON.stringify(queryResult));
                }
            }
        });
        /*
        {"status":"success","query":{"id":-1,"username":"admin"},"result":[{"id":1,"username":"admin"}]} */
    }
    Search.search = search;
    var SearchResult;
    (function (SearchResult) {
        SearchResult[SearchResult["SUCCESS"] = 0] = "SUCCESS";
        SearchResult[SearchResult["FAILURE"] = 1] = "FAILURE";
    })(SearchResult = Search.SearchResult || (Search.SearchResult = {}));
})(Search || (Search = {}));
var SearchQuery = Search.SearchQuery;
var SearchProperty = Search.SearchProperty;
$(document).ready(function () {
    Search.search("search/", new SearchQuery(new SearchProperty("username", "admin")));
});
