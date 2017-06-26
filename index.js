$(document).ready(function() {

    let dedication = {count: 0, items: []}

    $('#add-to-list').click(function() {

        const val = $('#dedication-input').val()

        if (val != "" && dedication.items.indexOf(val) == -1) {

            dedication.count++;
            dedication.items.push(val);

            const tr = $(`<tr><td>${dedication.count}</td><td>${val}</td></tr>`);
            $('#dedication-items').append(tr)
            $('#dedication-input').val('');

            $("#dedication-table").tablesorter();
        }
    });


    $('#delete-input').click(function() {
        $('#dedication-input').val('');
    });


    $("#dedication-input").keyup(function(event){
        if(event.keyCode == 13){
            $("#add-to-list").click();
        }
    });


    
});