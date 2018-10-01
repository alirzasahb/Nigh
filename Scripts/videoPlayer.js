 // Blob Video Player
function init() {
    // Request For Video File
    loadVideo(function(response) {
        if (response != undefined && response != null) {
            var fileMimeType = prompt("***- Enter Video MimeType -***", "Like : Video/mp4");
            var videoBlob = new Blob([response], {
                "type": fileMimeType
            });
            var URL = window.URL || window.webkitURL;
            var docURL = URL.createObjectURL(videoBlob);
            var videoPlayer = document.getElementById("video");
            videoPlayer.addEventListener("load", function(evt) {
                URL.revokeObjectURL(docURL);
            });
            videoPlayer.setAttribute("src", docURL);
        } else {
            alert("The Video Was Not Found!");
        }
    });
}

function loadVideo(callback) {
    var xobj = new XMLHttpRequest();
    xobj.responseType = "blob";
    var fileName = prompt("***- Enter Video With Extension -***", "Like : FileExample.mp4");
    xobj.open('POST', fileName, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4) {
            // Required Use Of An Anonymous Callback As .Open Will NOT Return A Value But Simply Returns Undefined In Asynchronous Mode
            callback(xobj.response);
        }
    };
    xobj.send(null);
}


// Controls

// Runtime
init();
