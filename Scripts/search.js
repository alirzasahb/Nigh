var isOnFind = false;

function init() {
    btn_search_Lbls.addEventListener("click", function() {
        find(search_label.value)
    });
}


function find(keyword) {
    var highlighter = new highlight("custom_list");
    highlighter.apply(keyword);
}



function highlight(id) {
    var targetNode = document.getElementById(id) || document.body;
    this.apply = function(input) {
        video.pause();
        var labels = targetNode.getElementsByTagName("em");
        var lbl_count = labels.length;
        if (input.length >= 2) {
            for (var i = 0; i < lbl_count; i++) {
                // Clear Highlighted Elements
                labels[i].classList.remove("highlight");
                // Highlight Element Contains Input String
                if (labels[i].innerHTML.includes(input)) {
                    labels[i].classList.add("highlight");
                }
            }
        } else if (input.length == 0) {
            for (var i = 0; i < lbl_count; i++) {
                // Clear Highlighted Elements
                labels[i].classList.remove("highlight");
            }
        } else {
            alert("لطفا از یک کلمه برای جست و جو استفاده کنید");
        }

        // Scroll To First Found Element
        var highlight_array = targetNode.getElementsByClassName("highlight");
        if (highlight_array.length > 0) {
            highlight_array[0].scrollIntoView();
        } else if (highlight_array.length == 0) {
            // Alert To User That There Is No Result
            alert("نتیجه ای یافت نشد")
        }
    }

}

// Runtime
init();
