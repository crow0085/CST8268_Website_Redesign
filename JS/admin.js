var getUrl = "http://localhost:5000/websiteredesign";
var peopleJson;

$(document).ready(async function () {
    getJsonData();
});

function getJsonData(){
    $.ajax({
        type: 'GET',
        url: getUrl,
        headers: { 'Access-Control-Allow-Origin': '*'},
        dataType: 'json',
        success: function (returnData) {
            //alert('success');
            if (returnData !== null)
            {
                $.each(returnData, function (index, value)
                {
                    $('#drp-person').append("<option value='" + index + "'>" + value.name + "</option>");
                });
                
                console.log(returnData);
                peopleJson = returnData;
            }
        },
        error: function (event, request, settings)
        {
            alert('AjaxError' + ' : ' + settings);
        }
    });
}

$('#drp-person').change(function () {
    $("#drp-person option[value='-1']").remove();
    var index = this.value;
    $('#name').val(peopleJson[index].name);
    $('#team').val(peopleJson[index].team);
    $('#description').val(peopleJson[index].description);
    $('#img-path').val(peopleJson[index].image.path);
});
