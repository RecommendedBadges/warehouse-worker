const Honeybadger = require("@honeybadger-io/js");
Honeybadger.configure({
  apiKey: process.env.HONEYBADGER_API_KEY,
  environment: "production"
});

async function fatal(origin, err) {
    let errorMessage = `Error in ${origin}: ${err}\n`;
    process.stderr.write(errorMessage);
    await Honeybadger.notifyAsync(errorMessage);
    process.exit(1);
}

module.exports = {
    fatal
};