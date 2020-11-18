/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require('./markov');
const fs = require('fs');
const axios = require('axios');
const stripHtml = require('string-strip-html');
const process = require('process');

async function makeText() {
    const sources = process.argv.slice(2);
    let text = '';

    while (sources.length > 1) {
        const source = sources[0];
        const path = sources[1];
        if (source === 'file') {
            const newText = fs.readFileSync(path, 'utf8', function (err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            });
            text += stripHtml(newText).result;
        } else if (source === 'url') {
            try {
                const res = await axios.get(path);
                const newText = res.data;
                text += stripHtml(newText).result;
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        }
        sources.splice(0, 2);
    }

    const machine = new MarkovMachine(text);
    const randText = machine.makeText();
    console.log(randText);
}

makeText();
