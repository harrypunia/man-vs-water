let facts = document.getElementsByClassName('facts'),
    leakStat = 1.1264;

setInterval(() => {
    if (leakStat < 1000) {
        facts[0].getElementsByTagName('h2')[0].innerHTML = Math.round(leakStat * 100) / 100 + '<span>ml</span>';
    } else {
        facts[0].getElementsByTagName('h2')[0].innerHTML = Math.round(leakStat) / 100 + '<span>L</span>';
    }
    leakStat += 1.1264;
}, 1000)
