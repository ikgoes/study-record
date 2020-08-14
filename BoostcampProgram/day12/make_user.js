const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const words = [
    'remind', 'phenomenon', 'tune', 'meanwhile',
    'decorate', 'sculpture', 'import', 'take',
    'course', 'costume', 'stream', 'merge',
    'current', 'interaction', 'likewise', 'herdsman',
    'graze', 'cattle', 'crop', 'logger',
    'manufacture', 'timber', 'dump', 'toxic',
    'away', 'with', 'independently', 'maximize',
    'ultimately', 'renewable', 'yield', 'diminish',
    'vanish', 'trap', 'Medieval', 'stable',
    'urban', 'expel', 'altigether', 'barn',
    'English', 'despise', 'encyclopedia', 'adopt',
    'volume', 'physical', 'content', 'access',
    'subscription', 'extend', 'thus', 'transition',
    'prime', 'minister', 'aware', 'ingredient',
    'gaze', 'single', 'fraction', 'momentary',
    'regular', 'leak', 'minimize', 'revolving',
    'airtight', 'spin', 'state', 'anazing',
    'transformation', 'blossom', 'stem', 'shade',
    'container', 'bouquet', 'arrange', 'boarding',
    'reason', 'aircraft', 'reduce', 'fuel',
    'initially', 'intend', 'lasting', 'expand',
    'positive', 'carbon', 'dioxide', 'emission',
    'measure', 'output', 'official', 'mainly',
    'date', 'back', 'conference', 'transport',
    'vehicle', 'specialist', 'visible', 'once'
];

const getWord = () => {
    return words[parseInt(Math.random() * 100)];
}

const getAlpha = () => {
    let str = ""
    for (let i = 0; i < 3; i++)
        str += alphabet[parseInt(Math.random() * 26)];
    return str;
};

const getNum = () => {
    let num = ""
    for (let i = 0; i < 4; i++)
        num += parseInt(Math.random() * 10)
    return num;
};

const getMoney = () => {
    return parseInt(Math.random() * 10000000)/100;
}

function getDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime()-start.getTime()))
    return date.toISOString().slice(0,19)
}

let amount = parseInt(process.argv[2]);
if (!amount) {
    console.log('please put amount');
    process.exit(1);
} else {
    console.log("id,money,date");
    for (let i = 0; i < amount; i++)
        console.log(getWord() + '_' + getAlpha() + '_' + getNum()+','+ getMoney()+','+ getDate(new Date(2020, 6, 15,0,0,0), new Date(2020, 7, 15,23,59,59)));
}