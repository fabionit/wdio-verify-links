const expect = require('chai').expect;
const fetch = require('node-fetch');

describe('broken link test', function() {
    it('should check the page for broken links', async function () {

        browser.url('/status_codes/30000')
        // get all the links on the page
        const links = $$('a');
        console.log('links: ' + links);
        const urls = links.map(link => link.getAttribute('href'));
        console.log('urls: ' + urls);
        const requests = urls.map(url => fetch(url));
        console.log('requests: ' + requests);
        const responses = await Promise.all(requests);
        console.log('responses: ' + responses);
        const statusCodes = responses.map(response => response.status);
        console.log('statusCodes: ' + statusCodes);
        statusCodes.forEach(statusCode => {
        expect(statusCode).to.be.below(400);
        })
    });
});