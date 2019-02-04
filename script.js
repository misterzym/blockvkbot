// ==UserScript==
// @name         RemoveBotInMsgers
// @version      0.3
// @namespace    https://up-world.ru/
// @description  Удаляет назойливого бота с ID 526941523 из бесед... из ВСЕХ БЕСЕД
// @author       Misterzym
// @match        https://vk.com/im?*
// @grant        none
// ==/UserScript==

(function() {
    var jq = document.createElement('script');
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    var timerId = setInterval(function(){
        $("._im_peer_history.im-page-chat-contain").find("div[data-peer='526941523']").remove();
        $(".im-mess-stack--lnk[href='/pillow.developers']").closest(".im-mess-stack").remove();
    }, 500);
})();
