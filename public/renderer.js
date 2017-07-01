const ipc = require('electron').ipcRenderer;
const xlsx = require('node-xlsx');

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

            ipc.send('receive-items', dedication.items)
        }
    });


/*    $('#delete-input').click(function() {
        $('#dedication-input').val('');
    });
*/

 /*   $("#dedication-input").keyup(function(event){
        if(event.keyCode == 13){
            $("#add-to-list").click();
        }
    });*/

/*    $("#path-file").click(function() {
        ipc.send('open-file-dialog')
    })*/


/*    $("#new-path-file").click(function() {
        ipc.send('open-dir-dialog')
    })*/

/*    ipc.on('selected-file', function (event, data) {
        const {files: path, file} = data
        const excel = xlsx.parse(file);
        console.log(excel)

        $("#path-file").val(path);
    })*/
/*
    ipc.on('selected-directory', function (event, path) {
        $("#new-path-file").val(path);
    })
*/
});

