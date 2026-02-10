
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function computeHCF(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((acc, val) => gcd(acc, val));
}

module.exports = computeHCF;
