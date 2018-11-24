let facts = document.getElementsByClassName('facts'),
    leakStat = 1.1264,
    flushStat = 0,
    skullCount = 0,
    inc = .1,
    flushStatInterval;


setInterval(() => {
    if (leakStat < 1000) {
        facts[0].getElementsByTagName('h2')[0].innerHTML = Math.round(leakStat * 100) / 100 + '<span>ml</span>';
    } else {
        facts[0].getElementsByTagName('h2')[0].innerHTML = Math.round(leakStat) / 1000 + '<span>L</span>';
    }
    leakStat += 1.1264;
}, 1000);

setInterval(() => {
    skullCount++;
    if (skullCount < 100) {
        let skull = document.createElement('IMG');
        skull.src = "assets/img/SVG/dead.svg";
        skull.alt = 'skull';
        skull.className = 'fatality__skull';
        document.getElementsByClassName('fatality')[0].appendChild(skull);
    } else if (skullCount == 100) {
        let countText = document.createElement("P");
        countText.innerHTML = ' x' + skullCount;
        countText.className = 'multiplier'
        document.getElementsByClassName('fatality')[0].appendChild(countText);
        once = false;
    } else {
        document.getElementsByClassName('multiplier')[0].innerHTML = ' x' + skullCount;
    }
}, 374);

const showFlushStat = () => {
    inc -= .00007;
    if (flushStat < 71.2) {
        flushStat += inc;
        facts[1].getElementsByTagName('h2')[0].innerHTML = Math.round(flushStat * 100) / 100 + '<span>L</span>'
    } else {
        flushStat = 71.2;
        clearInterval(flushStatInterval);
    }
}

const startFlushStat = () => {
    flushStatInterval = setInterval(showFlushStat);
}

startFlushStat();
