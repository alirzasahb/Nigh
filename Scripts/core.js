// Global Variables
var obj_JSON;
var timeTbl = {};
var timeIndx = {};

function init() {
    LoadJSON(function(response) {
        if (response != undefined && response != null && response != "") {
            obj_JSON = JSON.parse(response);
            for (i = 0; i < obj_JSON.Labels.length; i++) {
                var label = obj_JSON.Labels[i];
                CreateListItem(label);
                // Fill Time Table For Active Style
                timeTbl[label.Start] = i.toString();
                timeIndx[i.toString()] = label.End;
            }
            // Active Style First Child By Default
            if (custom_list.getElementsByTagName("li")[0] != undefined) {
                custom_list.getElementsByTagName("li")[0].classList.add("inTime");
            }
            // Events
            video.addEventListener('timeupdate', function() {
                if (timeTbl != null && timeTbl != undefined) {
                    var indx = Object.keys(timeTbl).indexOf(Math.round(video.currentTime).toString());
                    if (indx != -1) {
                        var lbl = custom_list.getElementsByTagName("li")[timeTbl[Math.round(video.currentTime).toString()]];
                        var active = custom_list.getElementsByClassName("inTime")[0];
                        if (active == null || active == undefined) {
                            lbl.classList.add("inTime");
                        } else {
                            active.classList.remove("inTime");
                            lbl.classList.add("inTime");
                        }
                    }
                }
            });
        } else {
            alert("Video Config File Was Not Find!");
        }
    });
}

function CreateListItem(label) {
    var item = document.createElement("li");
    var txt = document.createElement("p");
    var title = document.createElement("em");
    title.setAttribute("onclick", "ChangeVideoTime(event)");
    title.innerHTML = label.Title;
    txt.appendChild(title);
    txt.innerHTML = txt.innerHTML + "<itm>" + "زمان شروع : " + "</itm>" + "<itm>" + label.Start + "</itm>" + "<itm>" + "، زمان پایان : " + "</itm>" + "<itm>" + label.End + "</itm>";
    item.appendChild(txt);
    var list = custom_list.getElementsByTagName("ol")[0];
    list.appendChild(item);
}

function ChangeVideoTime(event) {
    var startTime = event.target.parentNode.getElementsByTagName("itm")[1].innerHTML;
    if (startTime != undefined) {
        video.pause();
        video.currentTime = startTime;
        // Set Active Style
        /*// Check If Any Element Have Class
        var active = event.target.parentNode.parentNode.parentNode.getElementsByClassName("inTime")[0];
        if (active == null || active == undefined){
        	event.target.parentNode.parentNode.classList.add("inTime");
        } else {
        	active.classList.remove("inTime");
        	event.target.parentNode.parentNode.classList.add("inTime");		
        }*/
        // Back To VideoPlayer
        video.scrollIntoView();
    }
}

function LoadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'video.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4) {
            // Required Use Of An Anonymous Callback As .Open Will NOT Return A Value But Simply Returns Undefined In Asynchronous Mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

btn_change_view.addEventListener('click', function(e) {

    if (!custom_list.classList.contains("hideElement")) {
        custom_list.classList.add("hideElement");
    } else {
        custom_list.classList.remove("hideElement");
    }
});

// Runtime
init();
