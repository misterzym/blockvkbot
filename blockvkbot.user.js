// ==UserScript==
// @name         RemoveBotInMsgers
// @version      0.10.5
// @homepage https://github.com/misterzym/blockvkbot
// @description  Добавляет кого угодно в Черный список
// @author       Misterzym
// @match        https://vk.com/*
// @updateURL    https://raw.githubusercontent.com/misterzym/blockvkbot/master/script.js
// @downloadURL  https://raw.githubusercontent.com/misterzym/blockvkbot/master/script.js
// @icon         https://net-bit.ru/wp-content/uploads/userJsFiles/vkBlackList/logo.png
// @grant        GM_getResourceURL
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @resource     jquery https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @resource     add https://net-bit.ru/wp-content/uploads/userJsFiles/vkBlackList/add.png
// @resource     del https://net-bit.ru/wp-content/uploads/userJsFiles/vkBlackList/del.png
// ==/UserScript==
var blackList = {};
load();
var peaple = JSON.stringify({
    name: "",
    url: ""
});

(function() {
    GM_registerMenuCommand("Черный список диалогов",function(){
        $(".blackListGened").remove();
        $("body").append(genBlackListUsers());
        $(".blackListGened").fadeIn(500);
        $(".removeBlackList").on('click', function() {
            var peed = $(this).data('peered');
            delete blackList[peed];
            save();
            $(".hideBlackList").click();
            location.reload();
            return false;
        });
        $(".hideBlackList").unbind().on('click', function() {
            $(this).closest(".blackListGened").fadeOut(500);
            $(this).unbind();
            $(".removeBlackList").unbind();
            $(this).closest(".blackListGened").remove();
            return false;
        });
    }, "13");
    var timerId = setInterval(function() {
        if (typeof $ !=="function"){
            var script = document.createElement("script");
            script.textContent = window.atob(GM_getResourceURL("jquery").replace("data:text/javascript;base64,",""));
            document.body.appendChild(script);
            return;
        }

        if (window.location.href.indexOf("vk.com/im?")!==-1){
            for (var prop in blackList) {
                $("div[data-peer='" + prop + "']").remove();
                $(".im-mess-stack--lnk[href='" + blackList[prop].url + "']").closest(".im-mess-stack").remove();
                $(".nim-dialog._im_dialog[data-list-id='" + prop + "']").remove();
            }

            $(".im-mess-stack").unbind().on('mouseenter', function() {
                $(this).append('<a href="#" onclick="return false;" class="addBlackList" data-peeder="' + $(this).data('peer') + '" style="position:absolute;position:absolute;right:5px;top:10px;"><img src="'+GM_getResourceURL("add")+'" style="width:20px;"></a>');
                $(".addBlackList").on("click", function() {
                    var peer = $(this).data("peeder");
                    blackList[peer] = JSON.parse(peaple);
                    blackList[peer].name = $(this).closest(".im-mess-stack").find(".im-mess-stack--pname a").html();
                    blackList[peer].url = $(this).closest(".im-mess-stack").find(".im-mess-stack--pname a").attr("href");
                    blackList[peer].avatar = $(this).closest(".im-mess-stack").find(".nim-peer--photo img").attr("src");
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
        }
    }, 1000);
})();

function showModal(head,body){
    return '<div id="box_layer_wrap" class="blackListGened fixed" style="top:165px;"><div id="box_layer"><div id="box_loader"><div class="pr pr_baw pr_medium" id="box_loader_pr"><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><div class="back"></div></div><div class="popup_box_container" tabindex="0" style="width:30%;"><div class="box_layout" onclick="boxQueue.skip=true;"><div class="box_title_wrap"><div class="box_x_button hideBlackList" aria-label="Закрыть" tabindex="0" role="button"></div><div class="box_title_controls"></div><div class="box_title">'+head+'<sup><i></i></sup></div></div><div class="box_body box_no_buttons">' + body + '</div></div></div></div></div>';
}

function genBlackListUsers() {
    var tt = "";
    for (var prop in blackList) {
        tt = tt + '<div style="line-height:1.7;"><img src="' + blackList[prop].avatar + '" style="float:left;margin-right:10px;"> <a href="' + blackList[prop].url + '" target="_blank" style="font-weight:bold;">' + blackList[prop].name + '</a><br><a href="#" data-peered="' + prop + '" class="removeBlackList"><img style="width:13px;" src="'+GM_getResourceURL("del")+'""></a></div><br style="clear:both;">';
    }

    return showModal("VK Black List",tt);
}

function save() {
    GM_setValue("blackList",JSON.stringify(blackList));
}

function load() {
    blackList = JSON.parse(GM_getValue("blackList","{}"));
}
