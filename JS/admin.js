var apiUrl = "http://localhost:5000/websiteredesign";
//var apiUrl = "http://localhost:5013/websiteredesign";
var peopleJson;
var imageNames;
var currentSelected = -1;

$(document).ready(async function () {
    $('#lblConfirmation').hide();
    getJsonData();
    getImageData();
});

function getJsonData() {
    $.ajax({
        type: 'GET',
        url: apiUrl,
        headers: { 'Access-Control-Allow-Origin': '*' },
        dataType: 'json',
        success: function (returnData) {
            //alert('success');
            if (returnData !== null) {
                $('#drp-person').empty();
                if (currentSelected == -1)
                    $('#drp-person').append("<option value='-1'>select...</option>");
                $.each(returnData, function (index, value) {
                    $('#drp-person').append("<option value='" + index + "'>" + value.name + "</option>");
                });
                $('#drp-person').val(currentSelected);
                if (currentSelected != -1)
                    console.log(returnData);
                peopleJson = returnData;
            }
        },
        error: function (event, request, settings) {
            alert('AjaxError' + ' : ' + settings);
        }
    });
}

function getImageData() {
    $.ajax({
        type: 'GET',
        url: apiUrl + "/GetImageFileNames",
        headers: { 'Access-Control-Allow-Origin': '*' },
        dataType: 'json',
        success: function (returnData) {
            //alert('success');
            if (returnData !== null) {
                $.each(returnData, function (index, value) {
                    $('#drp-img').append("<option value='" + value + "'>" + value + "</option>");
                });
                console.log(returnData);
                imageNames = returnData;
            }
        },
        error: function (event, request, settings) {
            alert('AjaxError' + ' : ' + settings);
        }
    });
}

$('#drp-person').change(function () {
    $('#lblConfirmation').hide();
    $("#drp-person option[value='-1']").remove();
    $("#drp-img option[value='-1']").remove();
    currentSelected = this.value;
    $('#name').val(peopleJson[currentSelected].name);
    $('#team').val(peopleJson[currentSelected].team);
    $('#description').val(peopleJson[currentSelected].description);
    $('#drp-img').val(peopleJson[currentSelected].image);
    $('#drp-img-prev').attr('src', apiUrl + "/" + $('#drp-img option:selected').text());
});

$('#drp-img').change(function (e) {
    $("#drp-img option[value='-1']").remove();
    $('#drp-img-prev').attr('src', apiUrl + "/" + $('#drp-img option:selected').text());
});

$('#save').click(async function (e) {

    var person = {
        name: $('#name').val(),
        image: $('#drp-img option:selected').text(),
        team: $('#team').val(),
        description: $('#description').val(),
        id: peopleJson[$("#drp-person").val()].id
    }
    console.log(person);
    await $.ajax({
        url: apiUrl,
        type: 'PUT',
        contentType: "application/json",
        data: JSON.stringify(person),
        async: true,
        success: function () {
            getJsonData();
            $('#lblConfirmation').show();
            $('#lblConfirmation').html("Successfully edited " + $('#name').val());
        },
        error: function (event, request, settings) {
            console.log(settings);
            console.log(event);
            console.log(request);
        }
    });

});

$('#add').click(async function (e) {

    var person = {
        name: $('#name').val(),
        image: $('#drp-img option:selected').text(),
        team: $('#team').val(),
        description: $('#description').val(),
        id: peopleJson[$("#drp-person").val()].id
    }
    console.log(person);
    await $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(person),
        async: true,
        success: function () {
            currentSelected = peopleJson.length;
            alert(currentSelected);
            getJsonData();
            $('#lblConfirmation').show();
            $('#lblConfirmation').html("Successfully added " + $('#name').val());
        },
        error: function (event, request, settings) {
            console.log(settings);
            console.log(event);
            console.log(request);
        }
    });

});

$('#remove').click(function (e) {

    var person = {
        name: $('#name').val(),
        image: $('#drp-img option:selected').text(),
        team: $('#team').val(),
        description: $('#description').val(),
        id: peopleJson[$("#drp-person").val()].id
    }
    console.log(person);
    $.ajax({
        url: apiUrl,
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: 'DELETE',
        contentType: "application/json",
        data: JSON.stringify(person),
        success: function () {
            currentSelected = -1;
            getJsonData();
            $('#lblConfirmation').show();
            $('#lblConfirmation').html("Successfully deleted " + $('#name').val());
        },
        error: function (event, request, settings) {
            console.log(settings);
            console.log(event);
            console.log(request);
        }
    });

});
