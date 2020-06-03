const childProcess = require('child_process');

function constructCommand(domain, tld) {
    const command = 'whois';
    return command + ' ' + domain + '.' + tld;
}

function systemSync(cmd) {
    try {
        return childProcess.execSync(cmd).toString();
    } 
    catch (error) {
        // Stack Overflow always saving my life
        // I'll keep the answer here as future reference

        // CODE SNIPPET FROM lance.dolan //
        //
        // error.status;  // Might be 127 in the example.
        // error.message; // Holds the message you typically want.
        // error.stderr;  // Holds the stderr output. Use `.toString()`.
        // error.stdout;  // Holds the stdout output. Use `.toString()`.
        //
        // END OF 3RD-PARTY CODE //

        return error.stdout;
    }
};

function isDomainFree(cmdOutput) {

    // Yep, I know it's a terrible pattern, but who cares?
    // It's just for personal use anyway
    
    var pos = cmdOutput.search('No whois information found.');
    if(pos < 0) {
        return false;
    } else {
        return true;
    }

}

function verifyDomain(domain, tld) {
    const inputCmd = constructCommand(domain, tld);
    const outputCmd = systemSync(inputCmd);
    return isDomainFree(outputCmd);
}

function verifyUkDomain(domain) {
    return verifyDomain(domain, 'uk');
}

exports.verifyDomain = verifyDomain;
exports.verifyUkDomain = verifyUkDomain;