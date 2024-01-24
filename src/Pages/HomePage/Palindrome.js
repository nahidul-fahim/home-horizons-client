function isPalindrome(input) {
    const lowerCaseInput = input.toLowerCase();
    return lowerCaseInput === lowerCaseInput.split('').reverse().join('');
}

isPalindrome("level")