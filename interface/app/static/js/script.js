// Default file for javascript code in search interface

function gen_new_suggestion(text){
    // Generate html for autocomplete suggestions
    code = "<li class='suggest'>"+text+"</li>";
    return code;
}

function gen_new_result(object){
    // Generate html for autocomplete suggestions
    code = "<div class='col-xs-12'>" +
           "<hr>" +
           "<h4>"+object.name+"</h4>" +
           "<p>"+object.location+"</p>" +
           "<small>"+object.phone+"</small>" +
           "</div>";
    return code;
}

$(function() {

    // if click in body autocomplete closes
    $('body').click(function(){
         $('#search-suggestions').html('');
    })
    // Monitoring search-input for each keyup
    // It's a simple autocomplete made because I had errors with mongodb _id
    $("#search-input").keyup(function() {
        $.getJSON(city_url + '?name=' + $(this).val(), function (data) {
            $('#search-suggestions').html('');
            $.each(data['result'], function (key, val) {
                $('#search-suggestions').html($('#search-suggestions').html() + gen_new_suggestion(val._id));

            });
        });
    });

    // Monitoring each suggestion for click event.
    // When clicked, suggestion goes to input and force html clean
    $("#search-suggestions").on('click', '.suggest', function(){
        $("#search-input").val($(this).html());
        $("#search-suggestions").html('');
    })

    // Intercepts submit call and load hotels by ajax
    $("#search-form form").submit(function(event) {
        event.preventDefault();

        $.ajax({

    url: hotel_url + '?city_name='+$("#search-input").val()

    })
  .done(function( data ) {
      var objects = JSON.parse(data);
      $('#search-results').html('<h1>Results for '+$("#search-input").val()+'</h1>');
      for (i = 0; i < objects.result.length; i++){
          $('#search-results').html($('#search-results').html()+gen_new_result(objects.result[i]));
      }
    })

    });
});
