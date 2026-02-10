
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcmTwo(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}

function computeLCM(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((acc, val) => lcmTwo(acc, val));
}

module.exports = computeLCM;
