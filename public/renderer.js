const ipc = require('electron').ipcRenderer;
const xlsx = require('node-xlsx');

$(document).ready(function() {

    $(".custom-btn").click(function() {
        console.log("this")
       $(".custom-btn").removeClass("active")
       $(this).addClass("active")
    })
    

});

