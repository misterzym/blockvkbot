// ==UserScript==
// @name         RemoveBotInMsgers
// @version      0.5
// @namespace    https://up-world.ru/
// @description  Удаляет назойливых ботов или людей
// @author       Misterzym
// @match        https://vk.com/im?*
// @grant        none
// ==/UserScript==

var blackList = {};
load();
if (blackList==null)
    blackList = {};
var peaple = JSON.stringify({name:"",url:""});

(function() {
    var jq = document.createElement('script');
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);

    var timerId = setInterval(function(){
        $("._im_peer_history.im-page-chat-contain").find("div[data-peer='526941523']").remove();
        $(".im-mess-stack--lnk[href='/pillow.developers']").closest(".im-mess-stack").remove();
    }, 1000);

    setTimeout(function(){
        $("._im_dialog_action_wrapper ._ui_menu").append('<div class="ui_actions_menu_sep"></div><a tabindex="0" role="link" class="ui_actions_menu_item _im_action im-action" onclick="return false;">Черный список</a>');
        $(".im-mess-stack").on('mouseenter',function(){
            $(this).append('<a href="#" onclick="return false;" class="addBlackList" style="position:absolute;position:absolute;right:5px;top:10px;"><img src="http://7youtube.ru/wp-content/uploads/2017/10/S9R6qL2.png" style="width:20px;"></a>');
        }).on("mouseleave",function(){
            $(this).find(".addBlackList").remove();
        }).on("click",function(){
            var peer=$(this).closest(".im-mess-stack").data("peer");
            var name=$(this).closest(".im-mess-stack").find(".im-mess-stack--pname a").html();
            var url=$(this).closest(".im-mess-stack").find(".im-mess-stack--pname a").attr("href");
            blackList[peer]=JSON.parse(peaple);
            blackList[peer].name=name;
            blackList[peer].url=url;
            console.log(blackList);
            save();
        });
    },1000);
})();


function save(){
    localStorage.setItem('blackList', JSON.stringify(blackList));
}

function load(){
    blackList = JSON.parse(localStorage.getItem('blackList'));
}
