const domainGenerator = require('./generator');
const childProcess = require('child_process');

const allowedChars = [
    'a', 'e', 'i', 'o', 'u' // Let's take care with number of requests
];

function init() {
    const domains = domainGenerator.generateAndVerifyDomains(allowedChars);
    childProcess.exec( 'echo ' + domains + ' >> free_domains.txt' );
}

init();