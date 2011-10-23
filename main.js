(function($){

var query = 'はてな';
var base_url = 'http://search.twitter.com/search.json';
var search_api = base_url;
var params = {
    rpp: 100,
    include_entities: true,
    with_twitter_user_id: true,
    result_type: 'mixed',
    q: query
}

function showTweets(tweets){
    console.log(tweets.length);
    if(!tweets.length){
        getTweets();
        return;
    }
    var tweet = tweets.shift().text.replace(/\n|\s\s+|http[^\s]+/,'');
    var $container = $('#text');
    $container.fadeOut(
        "slow",
        function(){
            $container.text(tweet);
            $container.fadeIn("slow");
        }
    );
    setTimeout(
        function(){ showTweets(tweets);},
        5000
    );
}

function getTweets(){
    $.ajax({
        type: 'GET',
        data: params,
        dataType: 'jsonp',
        url: search_api,
        success: function(data) {
            params  = undefined;
            search_api = base_url + data.next_page;
            var tweets = data.results;
            showTweets(tweets);
        }
    });
}

$(getTweets);

})(jQuery);