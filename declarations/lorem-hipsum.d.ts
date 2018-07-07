declare module "lorem-hipsum" {

    //Function params
    export interface Params {
        count?: number,                                      // Number of words, sentences, or paragraphs to generate.
        units?: 'sentences' | 'words' | 'paragraphs',       // Generate words, sentences, or paragraphs.
        sentenceLowerBound?: number,                        // Minimum words per sentence.
        sentenceUpperBound?: number,                        // Maximum words per sentence.
        paragraphLowerBound?: number,                       // Minimum sentences per paragraph.
        paragraphUpperBound?: number,                       // Maximum sentences per paragraph.
        format?: 'plain' | 'html',                          // Plain text or html
        words?: string[],                                   // Custom word dictionary. Uses dictionary.words (in lib/dictionary.js) by default.,
        random?: Function,                                  // A PRNG function. Uses Math.random by default
    }

    //Function
    export default function loremHipsum(p?: Params): string;
}
