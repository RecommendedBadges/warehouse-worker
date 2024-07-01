const REQUEST_HEADERS = {
    github: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-Github-Api-Version': '2022-11-28'
    },
    heroku: {
        'Accept': 'application/vnd.heroku+json; version=3',
        'Authorization': `Bearer ${process.env.WAREHOUSE_WORKER_TOKEN}`
    },
    warehouse: {
        'Accept': 'application/vnd.heroku+json; version=3',
        'Token': `${process.env.WAREHOUSE_WORKER_TOKEN}`
    }
};

const API_BASES = {
    github: process.env.GITHUB_API_BASE,
    heroku: process.env.WAREHOUSE_WORKER_API_BASE,
    warehouse: process.env.WAREHOUSE_API_ENDPOINT
};

module.exports = {
    API_BASES,
    REQUEST_HEADERS 
};