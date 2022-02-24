/**
 *
 * You can write your code anywhere but dont just claim this project
 * because it will make it harder for you. Dont Forget that. anruc
 * 
 */

"use strict"; 

$(document).ready(function (e) {
    // gettingMenuAsync(meinKosu, 'meinKosu');
});

// $(document).on('input', '#searchText', ':text', () => {
//     let checkType = $("#searchText").val();
//     searchDataTable(checkType);
// });




// document.body.addEventListener('click', selectMenu('hyojiChuShosai'), true);
$("#meinKosu").click(() => {
    selectMenu('meinKosu');
});

$("#meinKosu1").click(() => {
    selectMenu('meinKosu1');
});

$("#meinKosu2").click(() => {
    selectMenu('meinKosu2');
});




function showLoad() {
    $('.MYmainLoad').show();
    setTimeout(function () {
        $('.MYmainLoad img').css({
            'transform': 'scale(1.0)'
        });
    }, 100);
}

function hideLoad() {
    $('.MYmainLoad img').css({
        'transform': 'scale(0.0)'
    });
    setTimeout(function () {
        $('.MYmainLoad').hide();
    }, 810);
}




// 
const myBGSVG_ = `<svg width="100%" height="600" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="transparent" d="M0 0h900v600H0z"/><path d="M595.714 161.796c-5.45 9.726-17.385 11.062-36.506 9.214-14.381-1.393-27.495-2.47-41.877-10.311-10.066-5.485-18.034-12.905-23.85-20.112-6.302-7.807-15.098-16.717-10.786-25.569 5.926-12.16 40.196-22.402 73.473-5.654 36.555 18.404 44.877 42.926 39.546 52.432z" fill="url(#a)"/><path d="M344.424 479.633c-34.372-48.085-69.572-99.191-115.657-124.363-47.535-25.977-56.301-9.967-59.592 15.486-3.29 25.453 11.376 85.759 76.247 120.072 64.889 34.323 131.163 33.808 99.002-11.195z" fill="url(#b)"/><path d="M593.89 437.164c-35.516 4.658-72.884 8.898-99.491 26.357-27.451 18.005-21.392 27.26-8.722 36.281 12.67 9.021 49.099 18.385 85.953-6.511 36.865-24.902 55.498-60.484 22.26-56.127z" fill="url(#c)"/><path d="M642.364 200.774c-15.441 3.658-31.773-9.437-31.773-9.437s8.715-19.019 24.162-22.666c15.441-3.658 31.768 9.426 31.768 9.426s-8.716 19.019-24.157 22.677z" fill="url(#d)"/><path d="M380.737 126.418c16.257 11.198 41.092 3.37 41.092 3.37s-1.538-25.978-17.805-37.165c-16.256-11.197-41.081-3.38-41.081-3.38s1.538 25.978 17.794 37.175z" fill="url(#e)"/><path d="M169.072 286.15c17.623 17.938 50.579 14.156 50.579 14.156s4.361-32.865-13.279-50.791c-17.624-17.937-50.563-14.166-50.563-14.166s-4.361 32.864 13.263 50.801z" fill="url(#f)"/><ellipse cx="688.098" cy="345.528" rx="13.097" ry="12.528" transform="rotate(180 688.098 345.528)" fill="#666AF6"/><ellipse cx="242.058" cy="459.11" rx="17.653" ry="17.083" transform="rotate(180 242.058 459.11)" fill="#666AF6"/><circle r="6.264" transform="matrix(-1 0 0 1 258.264 257.264)" fill="#666AF6"/><circle r="11.958" transform="matrix(-1 0 0 1 620.958 134.958)" fill="#666AF6"/><circle r="10.755" transform="matrix(-1 0 0 1 693.755 447.755)" fill="#E1E4E5"/><circle r="11.313" transform="matrix(-1 0 0 1 188.313 342.312)" fill="#E1E4E5"/><circle r="3.986" transform="matrix(-1 0 0 1 296.724 516.624)" fill="#E1E4E5"/><circle r="5.694" transform="matrix(-1 0 0 1 576.694 146.694)" fill="#E1E4E5"/><circle r="5.565" transform="scale(1 -1) rotate(-75 -80.094 -332.51)" fill="#E1E4E5"/><circle r="7.403" transform="matrix(-1 0 0 1 212.591 154.763)" fill="#E1E4E5"/><ellipse rx="5.694" ry="4.556" transform="matrix(-1 0 0 1 636.695 328.556)" fill="#E1E4E5"/><circle r="11.581" transform="scale(1 -1) rotate(-75 157.704 -346.09)" fill="#E1E4E5"/><path d="M726.174 290h.149c.882 12.499 10.177 12.691 10.177 12.691s-10.25.2-10.25 14.642c0-14.442-10.25-14.642-10.25-14.642s9.291-.192 10.174-12.691zM326.521 113h.257c1.519 21.873 17.528 22.21 17.528 22.21s-17.653.35-17.653 25.623c0-25.273-17.653-25.623-17.653-25.623s16.002-.337 17.521-22.21z" fill="#E1E4E5"/><circle cx="434.63" cy="306.298" r="148.172" stroke="#E1E4E5" stroke-width="4"/><circle cx="434.63" cy="306.298" r="90.55" fill="#666AF6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M437.934 339.495a185.711 185.711 0 0 1 27.982-29.863l.173-.148a4.196 4.196 0 0 0 0-6.377l-.173-.149a185.663 185.663 0 0 1-27.982-29.862 4.126 4.126 0 0 0-6.606 0 185.624 185.624 0 0 1-27.983 29.862l-.172.149a4.192 4.192 0 0 0 0 6.377l.172.148a185.672 185.672 0 0 1 27.983 29.863 4.126 4.126 0 0 0 6.606 0zm-3.306-123.754v-57.623 57.623z" fill="#fff"/><path d="M434.628 215.741v-57.623" stroke="#E1E4E5" stroke-width="4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M434.628 396.845v57.623-57.623z" fill="#fff"/><path d="M434.628 396.845v57.623" stroke="#E1E4E5" stroke-width="4"/><path fill-rule="evenodd" clip-rule="evenodd" d="m539.398 201.518-40.746 40.745 40.746-40.745z" fill="#fff"/><path d="m539.398 201.518-40.746 40.745" stroke="#E1E4E5" stroke-width="4"/><path fill-rule="evenodd" clip-rule="evenodd" d="m370.596 370.32-40.746 40.746 40.746-40.746z" fill="#fff"/><path d="m370.596 370.32-40.746 40.746" stroke="#E1E4E5" stroke-width="4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M582.801 306.296h-57.624 57.624z" fill="#fff"/><path d="M582.801 306.296h-57.624" stroke="#E1E4E5" stroke-width="4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M344.074 306.296H286.45h57.624z" fill="#fff"/><path d="M344.074 306.296H286.45" stroke="#E1E4E5" stroke-width="4"/><path fill-rule="evenodd" clip-rule="evenodd" d="m498.652 370.32 40.746 40.746-40.746-40.746z" fill="#fff"/><path d="m498.652 370.32 40.746 40.746" stroke="#E1E4E5" stroke-width="4"/><path fill-rule="evenodd" clip-rule="evenodd" d="m329.85 201.518 40.746 40.745-40.746-40.745z" fill="#fff"/><path d="m329.85 201.518 40.746 40.745" stroke="#E1E4E5" stroke-width="4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M632.928 360.066h-62.264c-13.739.041-24.866 11.168-24.906 24.906v62.265c.04 13.738 11.167 24.865 24.906 24.906h62.264c13.739-.041 24.866-11.168 24.906-24.906v-62.265c-.04-13.738-11.167-24.865-24.906-24.906z" fill="#666AF6" stroke="#666AF6" stroke-width="7.813" stroke-linecap="round" stroke-linejoin="round"/><circle cx="573.841" cy="395.318" r="7.767" fill="#fff"/><circle cx="573.84" cy="437.142" r="7.767" fill="#fff"/><circle cx="601.325" cy="395.318" r="7.767" fill="#fff"/><circle cx="601.325" cy="437.142" r="7.767" fill="#fff"/><circle cx="628.809" cy="395.318" r="7.767" fill="#fff"/><circle cx="628.809" cy="437.142" r="7.767" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M304.308 360.066h-62.264c-13.738.041-24.866 11.168-24.906 24.906v62.265c.04 13.738 11.168 24.865 24.906 24.906h62.264c13.739-.041 24.866-11.168 24.906-24.906v-62.265c-.04-13.738-11.167-24.865-24.906-24.906z" fill="#666AF6" stroke="#666AF6" stroke-width="7.813" stroke-linecap="round" stroke-linejoin="round"/><circle cx="245.221" cy="395.318" r="7.767" fill="#fff"/><circle cx="245.22" cy="437.142" r="7.767" fill="#fff"/><circle cx="272.705" cy="395.318" r="7.767" fill="#fff"/><circle cx="272.705" cy="437.142" r="7.767" fill="#fff"/><circle cx="300.189" cy="395.318" r="7.767" fill="#fff"/><circle cx="300.189" cy="437.142" r="7.767" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M664.866 239.792a34.071 34.071 0 1 1-48.184 0c13.305-13.305 34.878-13.305 48.184 0z" fill="#666AF6"/><path d="M664.866 239.792a34.071 34.071 0 1 1-48.184 0c13.305-13.305 34.878-13.305 48.184 0" stroke="#666AF6" stroke-width="4.75" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M642.208 278.306a80.649 80.649 0 0 1 12.154-12.974l.075-.065a1.821 1.821 0 0 0 0-2.771l-.075-.064a80.69 80.69 0 0 1-12.154-12.974 1.793 1.793 0 0 0-2.869 0 80.69 80.69 0 0 1-12.154 12.974l-.075.065a1.821 1.821 0 0 0 0 2.771l.075.064a80.69 80.69 0 0 1 12.154 12.974 1.79 1.79 0 0 0 2.869 0z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M513.8 144.343a25.072 25.072 0 1 1-40.891 27.322 25.072 25.072 0 0 1 5.435-27.322c9.791-9.791 25.665-9.791 35.456 0z" fill="#666AF6"/><path d="M513.8 144.343a25.072 25.072 0 1 1-40.891 27.322 25.072 25.072 0 0 1 5.435-27.322c9.791-9.791 25.665-9.791 35.456 0" stroke="#666AF6" stroke-width="3.495" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M497.127 172.683a59.339 59.339 0 0 1 8.944-9.547l.055-.047a1.342 1.342 0 0 0 0-2.039l-.055-.047a59.345 59.345 0 0 1-8.944-9.548 1.32 1.32 0 0 0-2.111 0 59.342 59.342 0 0 1-8.943 9.548l-.056.047a1.34 1.34 0 0 0 0 2.039l.056.047a59.384 59.384 0 0 1 8.943 9.548 1.32 1.32 0 0 0 2.111-.001z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M292.032 168.093a34.072 34.072 0 1 1-48.184 0c13.306-13.305 34.879-13.305 48.184 0z" fill="#666AF6"/><path d="M292.032 168.093a34.072 34.072 0 1 1-48.184 0c13.306-13.305 34.879-13.305 48.184 0" stroke="#666AF6" stroke-width="4.75" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M269.374 206.607a80.69 80.69 0 0 1 12.154-12.974l.075-.064a1.825 1.825 0 0 0 0-2.771l-.075-.065a80.649 80.649 0 0 1-12.154-12.974 1.791 1.791 0 0 0-2.869 0 80.697 80.697 0 0 1-12.154 12.975l-.075.064a1.821 1.821 0 0 0 0 2.771l.075.064a80.655 80.655 0 0 1 12.154 12.975 1.792 1.792 0 0 0 2.869-.001z" fill="#fff"/><defs><linearGradient id="a" x1="559.001" y1="224.83" x2="510.427" y2="6.557" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient><linearGradient id="b" x1="306.045" y1="637.485" x2="193.275" y2="115.985" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient><linearGradient id="c" x1="667.34" y1="502.72" x2="356.333" y2="414.229" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient><linearGradient id="d" x1="584.216" y1="209.87" x2="719.389" y2="146.009" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient><linearGradient id="e" x1="444.063" y1="163.158" x2="316.097" y2="28.221" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient><linearGradient id="f" x1="239.387" y1="347.42" x2="111.978" y2="147.696" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient></defs></svg>`;
const mySVG_ = `<svg width="900" height="280" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill="transparent" d="M0 0h900v600H0z"/>
<path d="M664.767 163.615c-18.258-59.591-176.061-136.502-300.73-40.891-57.982 44.47-39.985 76.384-73.369 139.387-19.9 37.551-55.149 73.356-52.794 116.467 2.025 37.215 21.497 70.871 47.839 87.747 59.242 37.953 153.103 44.395 202.173-67.631 49.069-112.026 223.951-81.384 176.881-235.079z" fill="url(#a)"/>
<path d="M718.482 350.71c-12.461-16.021-34.309-15.171-68.223-6.629-25.504 6.428-48.815 11.944-72.563 29.98-16.623 12.617-28.942 28.146-37.444 42.704-9.215 15.771-22.618 34.208-12.442 48.966 13.983 20.271 78.46 29.359 133.79-9.862 60.779-43.094 69.071-89.503 56.882-105.159z" fill="url(#b)"/>
<path d="M282.477 208.573c-17.51 46.69-35.036 96.024-67.095 126.6-33.065 31.549-43.705 20.416-51.944.393-8.24-20.024-9.456-72.371 35.916-114.498 45.385-42.139 99.505-56.191 83.123-12.495z" fill="url(#c)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M319.978 153.41h272.653c21.52 0 38.95 17.43 38.95 38.95v7.498H281.028v-7.498c0-21.52 17.43-38.95 38.95-38.95zm-38.95 96.729v195.399c0 21.52 17.43 38.95 38.95 38.95h272.653c21.52 0 38.95-17.43 38.95-38.95V250.139H281.028z" fill="#435ebe"/>
<path d="M631.581 199.858v12.583c6.949 0 12.583-5.633 12.583-12.583h-12.583zm-350.553 0h-12.583c0 6.95 5.633 12.583 12.583 12.583v-12.583zm0 50.281v-12.583c-6.95 0-12.583 5.634-12.583 12.583h12.583zm350.553 0h12.583c0-6.949-5.634-12.583-12.583-12.583v12.583zm-38.95-109.312H319.978v25.166h272.653v-25.166zm51.533 51.533c0-28.469-23.064-51.533-51.533-51.533v25.166c14.57 0 26.367 11.796 26.367 26.367h25.166zm0 7.498v-7.498h-25.166v7.498h25.166zm-363.136 12.583h350.553v-25.166H281.028v25.166zm-12.583-20.081v7.498h25.166v-7.498h-25.166zm51.533-51.533c-28.469 0-51.533 23.064-51.533 51.533h25.166c0-14.571 11.796-26.367 26.367-26.367v-25.166zm-51.533 109.312v195.399h25.166V250.139h-25.166zm0 195.399c0 28.469 23.064 51.533 51.533 51.533v-25.166c-14.571 0-26.367-11.797-26.367-26.367h-25.166zm51.533 51.533h272.653v-25.166H319.978v25.166zm272.653 0c28.469 0 51.533-23.064 51.533-51.533h-25.166c0 14.57-11.797 26.367-26.367 26.367v25.166zm51.533-51.533V250.139h-25.166v195.399h25.166zm-12.583-207.982H281.028v25.166h350.553v-25.166z" fill="#435ebe"/><rect x="305.977" y="286.429" width="55.093" height="55.093" rx="16.895" fill="#fff"/><rect x="305.977" y="371.895" width="55.093" height="55.093" rx="16.895" fill="#fff"/><rect x="387.104" y="286.429" width="55.996" height="55.093" rx="16.895" fill="#fff"/><rect x="387.104" y="371.895" width="55.996" height="55.093" rx="16.895" fill="#fff"/><rect x="469.134" y="286.429" width="55.093" height="55.093" rx="16.895" fill="#fff"/><rect x="469.134" y="371.895" width="55.093" height="55.093" rx="16.895" fill="#fff"/><rect x="550.26" y="286.429" width="55.093" height="55.093" rx="16.895" fill="#fff"/><rect x="326.208" y="107.774" width="22.651" height="80.896" rx="11.325" fill="#435ebe"/><rect x="483.686" y="107.774" width="22.651" height="80.896" rx="11.325" fill="#435ebe"/><rect x="404.947" y="107.774" width="22.651" height="80.896" rx="11.325" fill="#435ebe"/><rect x="562.425" y="107.774" width="22.651" height="80.896" rx="11.325" fill="#435ebe"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M682.103 381.275c32.195 32.195 32.195 84.394 0 116.589-32.195 32.195-84.394 32.195-116.589 0-32.195-32.195-32.195-84.394 0-116.589 32.195-32.195 84.394-32.195 116.589 0z" fill="#435ebe"/>
<path d="M682.103 381.275c32.195 32.195 32.195 84.394 0 116.589-32.195 32.195-84.394 32.195-116.589 0-32.195-32.195-32.195-84.394 0-116.589 32.195-32.195 84.394-32.195 116.589 0" stroke="#fff" stroke-width="14.287" stroke-linecap="round" stroke-linejoin="round"/>
<path d="m656.781 464.679-32.833-19.585v-42.212" stroke="#fff" stroke-width="10.404" stroke-linecap="round" stroke-linejoin="round"/>
<circle r="20.398" transform="scale(-1 1) rotate(30 -646.113 -1210.493)" fill="#435ebe"/>
<circle r="9.174" transform="matrix(0 1 1 0 693.532 241.532)" fill="#E1E4E5"/>
<circle cx="245.851" cy="230.197" r="8.09" transform="rotate(-180 245.851 230.197)" fill="#E1E4E5"/>
<circle r="15.64" transform="matrix(1 0 0 -1 160.64 439.449)" fill="#E1E4E5"/>
<circle r="10.486" transform="scale(-1 1) rotate(30 -431.646 -802.637)" fill="#E1E4E5"/>
<ellipse cx="313.264" cy="150.379" rx="7.55" ry="8.09" fill="#435ebe"/>
<circle cx="723.694" cy="350.056" r="23.093" transform="rotate(-150 723.694 350.056)" fill="#435ebe"/>
<circle cx="195.418" cy="313.172" r="10.386" transform="rotate(-150 195.418 313.172)" fill="#435ebe"/>
<circle r="8.09" transform="matrix(-1 0 0 1 229.672 372.574)" fill="#E1E4E5"/>
<circle r="6.098" transform="scale(1 -1) rotate(-30 -242.658 -1433.434)" fill="#E1E4E5"/>
<ellipse cx="184.909" cy="178.423" rx="17.258" ry="16.719" fill="#E1E4E5"/>
<circle cx="541.96" cy="523.112" r="11.185" transform="rotate(180 541.96 523.112)" fill="#E1E4E5"/>
<defs>
<linearGradient id="a" x1="399.792" y1="-136.538" x2="539.674" y2="905.854" gradientUnits="userSpaceOnUse">
<stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/>
</linearGradient><linearGradient id="b" x1="635.21" y1="247.263" x2="607.306" y2="653.393" gradientUnits="userSpaceOnUse">
<stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient>
<linearGradient id="c" x1="216.733" y1="88.317" x2="238.708" y2="537.921" gradientUnits="userSpaceOnUse">
<stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient>
</defs>
</svg>`;

const mySVG_404 = `<svg width="900" height="500" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="transparent" d="M0 0h900v600H0z"/><path d="M368.925 74.138v67.707m180.553-67.707v67.707m-282.112 92.304h383.673m11.283-13.313v191.837c0 67.707-33.853 112.845-112.845 112.845H368.925c-78.991 0-112.845-45.138-112.845-112.845V220.836c0-67.707 33.854-112.845 112.845-112.845h180.552c78.992 0 112.845 45.138 112.845 112.845z" stroke="#E1E4E5" stroke-width="24" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M542.587 338.2h.203m-.203 67.707h.203M459.1 338.2h.203m-.203 67.707h.203M375.569 338.2h.202m-.202 67.707h.202" stroke="#E1E4E5" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/><path d="m239.015 144.656-57.1 21.473C168.756 171.066 158 186.682 158 200.805v85.314c0 13.55 8.926 31.347 19.796 39.5L227 362.477c16.135 12.172 42.682 12.172 58.816 0l49.204-36.858c10.871-8.153 19.796-25.95 19.796-39.5v-85.314c0-14.123-10.756-29.739-23.915-34.676l-57.1-21.473c-9.726-3.559-25.288-3.559-34.786 0z" fill="#666AF6"/><path d="M256.26 300.849c-27.781 0-50.301-22.521-50.301-50.301 0-27.781 22.52-50.301 50.301-50.301 27.78 0 50.301 22.52 50.301 50.301 0 27.78-22.521 50.301-50.301 50.301z" stroke="#fff" stroke-width="11" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M253.117 234.829v11.695c0 4.401 2.264 8.551 6.162 10.815l9.557 5.784" stroke="#fff" stroke-width="11" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M222.635 120.378c15.96 7.917 37.144-2.263 37.144-2.263s-4.708-23.011-20.677-30.917c-15.96-7.917-37.135 2.251-37.135 2.251s4.708 23.012 20.668 30.929z" fill="url(#a)"/><circle r="11.515" transform="matrix(1 0 0 -1 209.879 461.175)" fill="#666AF6"/><circle r="17.718" transform="matrix(1 0 0 -1 668.35 91.494)" fill="#666AF6"/><circle cx="718.423" cy="237.046" r="11.51" fill="#666AF6"/><circle cx="726.197" cy="349.344" r="16.268" fill="#E1E4E5"/><circle cx="695.878" cy="494.907" r="14.09" fill="#E1E4E5"/><ellipse cx="197.861" cy="387.348" rx="8.543" ry="7.035" fill="#E1E4E5"/><circle cx="246.606" cy="535.089" r="10.05" transform="rotate(90 246.606 535.089)" fill="#E1E4E5"/><defs><linearGradient id="a" x1="283.924" y1="145.073" x2="152.284" y2="40.946" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient></defs></svg>`;

const mySVG_404_1 = `<svg width="900" height="500" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="transparent" d="M0 0h900v600H0z"/><path d="M812.538 276.782c-25.082 12.442-58.372-3.557-58.372-3.557s7.398-36.163 32.494-48.588c25.082-12.442 58.359 3.539 58.359 3.539s-7.399 36.163-32.481 48.606z" fill="url(#a)"/><path d="M100.08 367.715c32.772 19.642 79.791 1.484 79.791 1.484s-6.148-49.996-38.941-69.616c-32.772-19.642-79.77-1.507-79.77-1.507s6.147 49.997 38.92 69.639z" fill="url(#b)"/><circle cx="763.187" cy="193.409" r="13.695" transform="rotate(180 763.187 193.409)" fill="#666AF6"/><circle cx="726.407" cy="280.407" r="15.407" transform="rotate(180 726.407 280.407)" fill="#666AF6"/><circle r="12.839" transform="matrix(-1 0 0 1 144.141 180.425)" fill="#666AF6"/><circle r="5.992" transform="matrix(-1 0 0 1 645.732 247.189)" fill="#666AF6"/><circle r="7.704" transform="matrix(-1 0 0 1 680.311 514.546)" fill="#E1E4E5"/><circle r="11.127" transform="matrix(-1 0 0 1 141.844 434.555)" fill="#E1E4E5"/><circle r="8.469" transform="matrix(-1 0 0 1 270.527 150.239)" fill="#E1E4E5"/><circle r="9.416" transform="matrix(-1 0 0 1 681.696 151.81)" fill="#E1E4E5"/><circle r="8.455" transform="scale(1 -1) rotate(-75 -84.875 -238.371)" fill="#E1E4E5"/><circle r="11.248" transform="matrix(-1 0 0 1 382.042 79.19)" fill="#E1E4E5"/><ellipse rx="8.652" ry="6.922" transform="matrix(-1 0 0 1 740.744 366.706)" fill="#E1E4E5"/><circle r="17.597" transform="matrix(0 1 1 0 174.551 100.552)" fill="#E1E4E5"/><path d="M806.36 318.9h.226c1.34 18.991 15.464 19.283 15.464 19.283s-15.574.304-15.574 22.248c0-21.944-15.575-22.248-15.575-22.248s14.118-.292 15.459-19.283zM237.473 503.525h.201c1.189 17.188 13.722 17.453 13.722 17.453s-13.82.275-13.82 20.135c0-19.86-13.819-20.135-13.819-20.135s12.527-.265 13.716-17.453z" fill="#E1E4E5"/><path d="M607.661 76.5H286.94c-30.805 0-55.777 24.972-55.777 55.777v278.888m251.003-222.607H314.834m167.332 68.886H314.834m167.332 69H314.834" stroke="#666AF6" stroke-width="31" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M607.664 61c31.664 0 57.333 25.669 57.333 57.333v69.722c0 23.963-19.426 43.389-43.389 43.389h-40.277v30.133a131.029 131.029 0 0 0-31 15.48V118.333C550.331 86.669 576 61 607.664 61zm-60.237 431.918c-4.369 8.493-13.221 14.301-23.429 14.301-14.544 0-26.333-11.789-26.333-26.333v-41.833c0-23.963-19.426-43.388-43.389-43.388H175.389c-23.963 0-43.389 19.425-43.389 43.388v27.889c0 39.365 31.912 71.277 71.277 71.277h320.721c21.897 0 40.927-12.275 50.584-30.321a131.198 131.198 0 0 1-27.155-14.98zm33.904-374.585v82.111h40.277c6.842 0 12.389-5.547 12.389-12.389v-69.722c0-14.543-11.79-26.333-26.333-26.333-14.544 0-26.333 11.79-26.333 26.333zM203.277 507.219h269.779c-4.084-7.885-6.391-16.839-6.391-26.333v-41.833c0-6.842-5.547-12.388-12.389-12.388H175.389c-6.842 0-12.389 5.546-12.389 12.388v27.889c0 22.245 18.033 40.277 40.277 40.277z" fill="#666AF6"/><circle r="91.475" transform="matrix(-1 0 0 1 629.975 386.975)" stroke="#666AF6" stroke-width="31" stroke-linecap="round" stroke-linejoin="round"/><path d="m712.193 447.954 48.948 44.418a20.585 20.585 0 0 1-9.492 34.913 20.586 20.586 0 0 1-20.08-6.31l-41.9-49.504" stroke="#666AF6" stroke-width="31" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="a" x1="716.22" y1="315.592" x2="923.098" y2="151.951" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient><linearGradient id="b" x1="226.901" y1="430.941" x2="-36.799" y2="185.929" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient></defs></svg>`;

const myCALL_ = `< div class = "calandarclock-block" >
    <div class = "signboard outer" >
    <
    div class = "signboard front inner anim04c" >
    <
    ul >
    <
    li class = "year anim04c" >
    <
    span > < /span> <
    /li> <
    li >
    <
    ul class = "calendarMain anim04c" >
    <
    li class = "month anim04c" >
    <
    span > < /span> <
    /li> <
    li class = "date anim04c" >
    <
    span > < /span> <
    /li> <
    li class = "day anim04c" >
    <
    span > < /span> <
    /li> <
    /ul> <
    /li> <
    li class = "clock minute anim04c" >
    <
    span > < /span> <
    /li> <
    li class = "calendarNormal date2 anim04c" >
    <
    span > < /span> <
    /li> <
    /ul> <
    /div>

    <
    div class = "signboard left inner anim04c" >
    <
    ul >
    <
    li class = "clock hour anim04c" >
    <
    span > < /span> <
    /li> <
    li class = "calendarNormal day2 anim04c" >
    <
    span > < /span> <
    /li> <
    /ul> <
    /div>

    <
    div class = "signboard right inner anim04c" >
    <
    ul >
    <
    li class = "clock second anim04c" >
    <
    span > < /span> <
    /li> <
    li class = "calendarNormal month2 anim04c" >
    <
    span > < /span> <
    /li> <
    /ul> <
    /div>

    <
    /div> <
    /div>`;