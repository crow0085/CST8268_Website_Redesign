var peopleJson;
var path = '/DATA/people.json';

$(document).ready(async function () {
    peopleJson = await getJSON();
    peopleJson = peopleJson.people; // setting the json to only be of the people object, easier so dont have to add .people everytime searching the array
    // loop to populate gallery
    peopleJson.forEach(function (value, i) {
        var div = $('<div id="div' + i + '">'); // div to hold the image and name
        div.addClass("memberContainer")
        var img = $('<img id="img' + i + '">'); // the image
        img.addClass("memberImg") // adding image class to all imgs
        img.attr('src', value.image.path); // setting the image source
        div.click(function () { // adding the click event to the image
            var id = this.id.split("div"); // removing the img part of the images id to only pass the index value
            id = id.at(-1);
            FillCard(id);
        });
        div.append(img); // adding the image element to the div element
        var name = $('<p id="name' + i + '">'); // name element
        name.addClass("memberName"); //adding class to all name id's
        name.html(value.name);
        div.append(name); // adding the name element to the div element
        $('#gallery').append(div); // adding the div element to the gallery element
    });    
    $("#closePopup").on("click", function () { // adding the initial close popup event
        closeCard();
    });
});

// async function to read and return the json file
async function getJSON() {
    return await fetch(path)
        .then((response) => response.json())
        .then((responseJson) => { return responseJson });
}

function FillCard(id) {

    var path = peopleJson[id].image.path;
    var name = peopleJson[id].name;
    var team = peopleJson[id].team;
    var desc = peopleJson[id].description;

    $("#popup").append('<img class="popup-content" src="' + path + '" alt="alt text"/>');
    $("#popup").append('<p class="popup-name">' + name + '</p>');
    $("#popup").append('<p class="popup-team">' + team + '</p>');
    $("#popup").append('<p class="popup-description">' + desc + '</p>');
    $("#popup").fadeTo("fast", 1); // making the popup card appear
    $(".content").fadeTo("fast", 0.33);// dimming the gallery 
    $("#header").fadeTo("fast", 0.33); // dimming the header 
    $("#footer").fadeTo("fast", 0.33);
    $("#gallery").find("*").addClass("disable-events"); // adding the disable events class to all child objects in the image gallery so you cant click an image while one is already blown up
}

function closeCard() {
    $("#popup").fadeTo("fast", 0); // making so the popup is no longer visible
    $(".content").fadeTo("fast", 1); // setting the gallery to fully visible
    $("#header").fadeTo("fast", 1); // setting the header to fully visible
    $("#footer").fadeTo("fast", 1);
    $("#gallery").find("*").removeClass("disable-events"); // removing the disable events class so you can click on another image
    $("#popup").hide(); // hiding the popup
    $("#popup").empty(); // emptying the popup div so the next time it populates it has no data
    $('#popup').append('<button class="btn-close" id="closePopup"></button>'); // need to re add the close button and its event since we emptied the div above
    $("#closePopup").on("click", function () {
        closeCard();
    });
}