const domainVerifier = require('./verifier');

function genThreeCharsDomain( allowedChars ) {

    var domains = [];
    var i, j, k;

    for(i = 0; i < allowedChars.length; i++) {
        for(j=0; j < allowedChars.length; j++) {
            for(k=0; k < allowedChars.length; k++) {
                var domain = allowedChars[i] + allowedChars[j] + allowedChars[k];
                domains.push(domain);
            }
        }
    }

    return domains;

}

function generateAndVerifyDomains( allowedChars ) {

    var domainsToCheck = genThreeCharsDomain( allowedChars );
    var freeDomains = [];
    domainsToCheck.map((domain, index) => {
        const isFree = domainVerifier.verifyUkDomain(domain);
        if( isFree ) {
            freeDomains.push(domain);
        }
        const currentVerif = index + 1;
        console.log( 'Verified ' + currentVerif + ' from ' + domainsToCheck.length );
    });

    return freeDomains;

}

exports.genThreeCharsDomain = genThreeCharsDomain;
exports.generateAndVerifyDomains = generateAndVerifyDomains;