let facts = document.getElementsByClassName('facts'),
    leakStat = 1.1264,
    flushStat = 0,
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
