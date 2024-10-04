

export const validateAlphabetic = (input) => {
    const regex = /^[\p{L}\s]*$/u;
    return regex.test(input);
}

