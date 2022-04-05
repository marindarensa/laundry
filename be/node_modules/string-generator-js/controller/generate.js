function randomArrayShuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

module.exports = (options) => {
    options = options || {};
    options.length = options.length || 10;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var numbers = '01234567890123456789012345678901234567890123456789';
    var allUnits = [];
    if (options.type === 'numbers') {
        allUnits = numbers.split('');
    } else if (options.type === 'alphabets') {
        allUnits = characters.split('');
    } else {
        allUnits = [...characters.split(''), ...numbers.split('')];
    };
    allUnits = randomArrayShuffle(allUnits);
    allUnits = allUnits.join('');
    var charactersLength = allUnits.length;
    for (var i = 0; i < options.length; i++) {
        result += allUnits.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}