var peopleJson;
var path = '/DATA/people.json';

$(document).ready(async function () {
    peopleJson = await getJSON();
    peopleJson = peopleJson.people; // setting the json to only be of the people object, easier so dont have to add .people everytime searching the array
    // loop to populate gallery
    peopleJson.forEach(function (value, i) {
        var div = $('<div id="div' + i + '">'); // div to hold the image and name
        var img = $('<img id="img' + i + '">'); // the image
        img.attr('src', value.image.path); // setting the image source
        img.click(function () { // adding the click event to the image
            var id = this.id.split("img"); // removing the img part of the images id to only pass the index value
            id = id.at(-1);
            FillCard(id);
        });
        div.append(img); // adding the image element to the div element
        var name = $('<p id="name' + i + '">'); // name element
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
    $("#popup").append('<p class="popup-content">' + name + '</p>');
    $("#popup").append('<p class="popup-content">' + team + '</p>');
    $("#popup").append('<p class="popup-content">' + desc + '</p>');
    $("#popup").fadeTo("fast", 1); // making the popup card appear
    $("#gallery").fadeTo("fast", 0.33); // dimming the gallery 
    $("#gallery").find("*").addClass("disable-events"); // adding the disable events class to all child objects in the image gallery so you cant click an image while one is already blown up
}

function closeCard() {
    $("#popup").fadeTo("fast", 0); // making so the popup is no longer visible
    $("#gallery").fadeTo("fast", 1); // setting the gallery to fully visible
    $("#gallery").find("*").removeClass("disable-events"); // removing the disable events class so you can click on another image
    $("#popup").hide(); // hiding the popup
    $("#popup").empty(); // emptying the popup div so the next time it populates it has no data
    $('#popup').append('<button id="closePopup">Close</button>'); // need to re add the close button and its event since we emptied the div above
    $("#closePopup").on("click", function () {
        closeCard();
    });
}