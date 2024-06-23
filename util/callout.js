
async function patch(site, endpoint, body) {
    try {
        const res = await axios.patch(
            `${API_BASES[site]}${endpoint}`,
            body,
            {
                headers: REQUEST_HEADERS[site]
            }
        );
        return res.data;
    } catch(err) {
        fatal('patch()', err.message);
    }
}

async function post(site, endpoint, body) {
    try {
        const res = await axios.post(
            `${API_BASES[site]}${endpoint}`,
            body,
            {
                headers: REQUEST_HEADERS[site]
            }
        );
        return res.data;
    } catch(err) {
        fatal('post()', err.message);
    }
}

async function put(site, endpoint, body) {
    try {
        const res = await axios.put(
            `${API_BASES[site]}${endpoint}`,
            body,
            {
                headers: REQUEST_HEADERS[site]
            }
        )
        return res.data;
    } catch(err) {
        fatal('put()', err.message);
    }
}

module.exports = {
    patch,
    post,
    put
}