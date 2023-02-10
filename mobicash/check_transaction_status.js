const js2xmlparser = require("js2xmlparser");
const fetch = require("node-fetch");
const convert = require('xml-js');
const { generateAuthHeader } = require('./auth');

const BASE_URL = process.env.BASE_URL;
const URL = BASE_URL + "/Live_402_GabonTelOnlineMerchantPaymentAPI/rest/v1/checktrans";

module.exports = {

    async checkTransactionStatus(
        externalReference) {

        const request = {
            "@": {
                type: "CHECK_TRANS",
            },
            externalReference
        }
        const xmlRequest = js2xmlparser.parse('request', request);

        const res = await fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/xml",
                "Authorization": await generateAuthHeader()
            },
            body: xmlRequest
        });

        const response = await res.text();
        if (res.status == 200) {
            return {
                code: 200,
                data: convert.xml2json(response, { compact: true, ignoreDoctype: true })
            }
        } else if (res.status == 401) {
            return {
                code: 401,
                data: convert.xml2json(response, { compact: true, ignoreDoctype: true })
            }
        } else {
            return {
                code: res.status,
                data: response
            }
        }
    }
}
