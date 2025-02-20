// ==UserScript==
// @name         UYAP Session ID Changer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  UYAP e-Satış sistemi için JSESSIONID değiştirici
// @author       Your name
// @match        https://esatis.uyap.gov.tr/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Header stil tanımları
    const styles = `
        .session-changer-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: #f0f0f0;
            padding: 10px;
            z-index: 9999;
            display: flex;
            gap: 10px;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .session-input {
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 300px;
        }
        .session-button {
            padding: 5px 15px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .session-button:hover {
            background: #0056b3;
        }
    `;

    // Stil ekle
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Header oluştur
    const header = document.createElement('div');
    header.className = 'session-changer-header';
    header.innerHTML = `
        <input type="text" class="session-input" placeholder="Yeni JSESSIONID değerini girin">
        <button class="session-button">Değiştir</button>
    `;
    document.body.prepend(header);

    // Body'ye padding ekle
    document.body.style.paddingTop = '50px';

    // Buton click eventi
    const button = header.querySelector('.session-button');
    const input = header.querySelector('.session-input');

    const header2 = document.querySelector(".page-header")
    header2.style.marginTop = "64px"

    button.addEventListener('click', () => {
        const newSessionId = input.value.trim();
        if (newSessionId) {
            document.cookie = `JSESSIONID=${newSessionId}; path=/`;
            location.reload();
        } else {
            alert('Lütfen geçerli bir JSESSIONID değeri girin');
        }
    });
})();