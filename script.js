// ==UserScript==
// @name         RemoveBotInMsgers
// @version      0.9.5
// @namespace    https://up-world.ru/
// @homepage https://github.com/reek/anti-adblock-killer/
// @description  Добавляет кого угодно в Черный список
// @author       Misterzym
// @match        https://vk.com/im?*
// @updateURL https://raw.githubusercontent.com/misterzym/blockvkbot/master/script.js
// @downloadURL https://raw.githubusercontent.com/misterzym/blockvkbot/master/script.js
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
            $(this).append('<a href="#" onclick="return false;" class="addBlackList" data-peeder="' + $(this).data('peer') + '" style="position:absolute;position:absolute;right:5px;top:10px;"><img src="data:image/png;base64,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" style="width:20px;"></a>');
            $(".addBlackList").on("click", function() {
                var peer = $(this).data("peeder");
                blackList[peer] = JSON.parse(peaple);
                blackList[peer].name = $(this).closest(".im-mess-stack").find(".im-mess-stack--pname a").html();
                blackList[peer].url = $(this).closest(".im-mess-stack").find(".im-mess-stack--pname a").attr("href");
                save();
                return false;
            });
        }).on("mouseleave", function() {
            $(this).find(".addBlackList").unbind().remove();
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
    var tt = "";
    for (var prop in blackList) {
        tt = tt + '<a href="' + blackList[prop].url + '" target="_blank">' + blackList[prop].name + '</a> <a href="#" data-peered="' + prop + '" class="removeBlackList"><img style="width:13px;" src="data:image/png;base64,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"></a><br>';
    }

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
