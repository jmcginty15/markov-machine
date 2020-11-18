const { MarkovMachine } = require('./markov');
const fs = require('fs');
const process = require('process');

let machine = null;
beforeAll(function () {
    const text = fs.readFileSync('eggs.txt', 'utf8', function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });

    machine = new MarkovMachine(text);
});

describe('Markov machine tests', function () {
    test('test for string output', function () {
        const randText = machine.makeText();
        expect(randText).toEqual(expect.any(String));
    });

    test('test length of output', function () {
        let randText = machine.makeText(5);
        let randTextArray = randText.split(/[ \r\n]+/);
        expect(randTextArray.length).toBeLessThanOrEqual(5);

        randText = machine.makeText(25);
        randTextArray = randText.split(/[ \r\n]+/);
        expect(randTextArray.length).toBeLessThanOrEqual(25);
    });

    test('check that all words are in the original text', function () {
        const randText = machine.makeText();
        const randTextArray = randText.split(/[ \r\n]+/);
        for (let word of randTextArray) {
            expect(machine.words).toContain(word);
        }
    });
});