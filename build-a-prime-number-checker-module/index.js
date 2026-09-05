function isPrime(num){
    
    if (num < 2) {
        return false
    }
    
    let divider = 2;
    while (divider < num){
        if (num % divider === 0) {
            return false
        }
        divider++;
    }
    return true
}

module.exports = {
    isPrime
};