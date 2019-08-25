// ==UserScript==
// @name         Timus ID
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_registerMenuCommand
// @grant GM_getResourceText
// @grant GM_xmlhttpRequest
// @grant GM_getResourceURL
// @resource icon https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-256.png

// ==/UserScript==

(function() {
    'use strict';

    function updateId(){
        console.log($('#__JudgeID').val());
        GM_setValue('id', $('#__JudgeID').val());
        $('<span/>',{
            id: '__status',
            text: 'done.',
            css: {
                position: 'absolute',
                bottom: '0px',
                right: '15px',
                fontSize: '90%',
                textDecoration: 'underline',
                color: 'green',
                display: 'none'
            },
        }).appendTo('#__inpBack')
        $('#__status').fadeIn(200);
        setTimeout(function(){
            $('#__status').fadeOut(200);
        }, 3000);
        main();
    }

    function hide(){
        $('#__inpBack').fadeOut(200, function(){
            this.remove();
        });
    }

    function setId(){
        $('<div/>', {
            id: '__inpBack',
            css: {
                position: 'fixed',
                top: '10px',
                right: '10px',
                backgroundColor: '#e4e4e4f7',
                padding: '20px',
                borderRadius: '10px',
                zIndex: 99999999,
                display: 'none'
            }
        }
        ).appendTo('body');

        $('<input/>',{
            type: 'text',
            id: '__JudgeID',
            placeholder: 'Input your Judge ID'
        }).appendTo('#__inpBack');

        $('<button/>',{
            id: '__setJudgeId',
            text: 'Set',
            click: updateId
        }).appendTo('#__inpBack');

        $('<span/>',{
            id: '__hide__inpBack',
            text: 'hide',
            css: {
                position: 'absolute',
                bottom: '0px',
                left: '15px',
                fontSize: '90%',
                textDecoration: 'underline',
                cursor: 'pointer',
                color: '#0000FF'
            },
            click: hide
        }).appendTo('#__inpBack')

        $('#__inpBack').fadeIn(200);
    }

    function main(){
        if (window.location.href.indexOf("timus.ru/submit.aspx")>-1){
            document.getElementsByName('JudgeID')[0].value = GM_getValue("id", "");
        }
        if (window.location.href.indexOf("timus")>-1){
            console.log('img');
            let _el = $('table')[1].children[0].children[0].children[2];
            let id = GM_getValue("id", "");
            id = id.substr(0,id.length-2);
            $('<a/>',{
               href: `http://acm.timus.ru/author.aspx?id=${id}`,
               text: "Your profile",
               css: {
                color: "white"
            }
            }).appendTo(_el);
        }
    }

    GM_registerMenuCommand('Set Judge ID', setId);
    main();
})();