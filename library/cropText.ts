/**
 * Crops a long text to shorter ended with '(...)' if too long
 * @param {string} longString Text to crop
 * @param {number} maxLength Max length of given text
 * @return {string}
 */
export default function cropText(longString: string, maxLength: number): string {
    //Size ok
    if (longString.length <= maxLength) return longString;

    //Separate words by space
    const words = longString.split(' ');

    //Creating short ver
    let shorString = '';
    for (let i = 0; i < words.length; i++) {
        if (shorString.length + words[i].length <= maxLength)
            shorString += words[i] + ' ';
        else if (i !== 0) return `${shorString}(...)`;
        else return `${words[i].substring(0, maxLength)}(...)`;
    }
    return shorString; //Emergency case
}