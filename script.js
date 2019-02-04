// ==UserScript==
// @name         RemoveBotInMsgers
// @version      0.8
// @namespace    https://up-world.ru/
// @description  Добавляет кого угодно в Черный список
// @author       Misterzym
// @match        https://vk.com/im?*
// @grant        none
// ==/UserScript==
var blackList = {};
load();
if (blackList == null)
    blackList = {};
var peaple = JSON.stringify({
    name: "",
    url: ""
});

(function() {
    var jq = document.createElement('script');
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);

    var timerId = setInterval(function() {
        for (var prop in blackList) {
            $("._im_peer_history.im-page-chat-contain").find("div[data-peer='" + prop + "']").remove();
            $(".im-mess-stack--lnk[href='" + blackList[prop].url + "']").closest(".im-mess-stack").remove();
        }

        $(".im-mess-stack").unbind().on('mouseenter', function() {
            $(this).append('<a href="#" onclick="return false;" class="addBlackList" data-peeder="' + $(this).data('peer') + '" style="position:absolute;position:absolute;right:5px;top:10px;"><img src="http://7youtube.ru/wp-content/uploads/2017/10/S9R6qL2.png" style="width:20px;"></a>');
        }).on("mouseleave", function() {
            $(this).find(".addBlackList").remove();
        }).on("click", function() {
            var peer = $(this).data("peeder");
            blackList[peer] = JSON.parse(peaple);
            blackList[peer].name = $(this).closest(".im-mess-stack").find(".im-mess-stack--pname a").html();
            blackList[peer].url = $(this).closest(".im-mess-stack").find(".im-mess-stack--pname a").attr("href");
            save();
            return false;
        });

        if (!$("a").is(".blackListButton")){
            $("._im_dialog_action_wrapper ._ui_menu").append('<div class="ui_actions_menu_sep"></div><a tabindex="0" role="link" class="ui_actions_menu_item _im_action im-action blackListButton">Черный список</a>');

            $(".blackListButton").unbind().on('click', function() {
                $(".blackListGened").remove();
                $("body").append(genBlackList());
                $(".blackListGened").fadeIn(500);
                $(".removeBlackList").on('click', function() {
                    var peed = $(this).data('peered');
                    delete blackList[peed];
                    save();
                    $(".hideBlackList").click();
                    location.reload();
                    return false;
                });
                $(".hideBlackList").on('click', function() {
                    $(this).closest(".blackListGened").fadeOut(500);
                    $(this).unbind();
                    $(this).closest(".blackListGened").remove();
                    return false;
                });
            });
        }
    }, 1000);
})();

function genBlackList() {
    //var keys=Object.keys(blackList);
    var tt = "";
    for (var prop in blackList) {
        tt = tt + '<a href="' + blackList[prop].url + '" target="_blank">' + blackList[prop].name + '</a> <a href="#" data-peered="' + prop + '" class="removeBlackList">X</a><br>';
    }
    /*for (var i = 0; i < keys.lenght; i++) {
        tt=tt+'<a href="'+blackList[keys[i]].url+'">'+blackList[keys[i]].name+'</a>';
        console.log(keys[i]+"|");
    }*/

    return '<div id="box_layer_wrap" class="blackListGened fixed" style="top:165px;">' +
        '<div id="box_layer">' +
        '<div id="box_loader">' +
        '<div class="pr pr_baw pr_medium" id="box_loader_pr">' +
        '<div class="pr_bt"></div>' +
        '<div class="pr_bt"></div>' +
        '<div class="pr_bt"></div>' +
        '</div>' +
        '<div class="back"></div>' +
        '</div>' +
        '<div class="popup_box_container" tabindex="0" style="width:30%;">' +
        '<div class="box_layout" onclick="boxQueue.skip=true;">' +
        '<div class="box_title_wrap">' +
        '<div class="box_x_button hideBlackList" aria-label="Закрыть" tabindex="0" role="button"></div>' +
        '<div class="box_title_controls"></div>' +
        '<div class="box_title">VK BlackList<sup><i></i></sup></div>' +
        '</div>' +
        '<div class="box_body box_no_buttons">' + tt +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function save() {
    localStorage.setItem('blackList', JSON.stringify(blackList));
}

function load() {
    blackList = JSON.parse(localStorage.getItem('blackList'));
}
