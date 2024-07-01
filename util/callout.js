const axios = require('axios');

const { API_BASES, REQUEST_HEADERS } = require('../config');
const { fatal } = require('./error.js');

async function get({site, endpoint, fullUrl}) {
    try {
        const res = await axios.get(
            fullUrl ? fullUrl : `${API_BASES[site]}${endpoint}`,
            {
                headers: REQUEST_HEADERS[site]
            },
        );
        return res.data;
    } catch(err) {
        fatal('get()', err.message);
    }
}

function generateRequest(site, endpoint, body) {
    let request;
    if(body) {
        request = [
            `${API_BASES[site]}${endpoint}`,
            body,
            {headers: REQUEST_HEADERS[site]}
        ];
    } else {
        request = [
            `${API_BASES[site]}${endpoint}`,
            {headers: REQUEST_HEADERS[site]}
        ]
    }
    return request;
}

async function patch(site, endpoint, body) {
    try {
        const res = await axios.patch(...generateRequest(site, endpoint, body));
        return res.data;
    } catch(err) {
        fatal('patch()', err.message);
    }
}

async function post(site, endpoint, body) {
    try {
        const res = await axios.post(...generateRequest(site, endpoint, body));
        return res.data;
    } catch(err) {
        fatal('post()', err.message);
    }
}

async function put(site, endpoint, body) {
    try {
        const res = await axios.put(...generateRequest(site, endpoint, body));
        return res.data;
    } catch(err) {
        fatal('put()', err.message);
    }
}

async function doDelete(site, endpoint) {
    try {
        const req = [...generateRequest(site, endpoint)];
        process.stdout.write(`doDelete req ${req}\n`);
        const res = await axios.delete(req);
        return res.data;
    } catch(err) {
        fatal('doDelete()', err.message);
    }
}

module.exports = {
    doDelete,
    get,
    patch,
    post,
    put
}