const chalk = require('chalk')

const logEndpoints = (req, res, next) => {
 const start = process.hrtime();
  const { method, originalUrl, ip } = req;

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const duration = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(3);
    const statusCode = res.statusCode;

    let statusColor = chalk.bgGreen;
    if (statusCode >= 500) statusColor = chalk.bgRed;
    else if (statusCode >= 400) statusColor = chalk.bgYellow;
    else if (statusCode >= 300) statusColor = chalk.bgCyan;

    let statusColorBg = chalk.green;
    if (statusCode >= 500) statusColorBg = chalk.red;
    else if (statusCode >= 400) statusColorBg = chalk.yellow;
    else if (statusCode >= 300) statusColorBg = chalk.cyan;

    let methodColor = chalk.green;
    if (method >= 'POST') methodColor = chalk.green;
    else if (method >= 'PATCH') methodColor = chalk.yellow;
    else if (method >= 'GET') methodColor = chalk.cyan;
    else if (method >= 'DELETE') methodColor = chalk.red;
    else if (method >= 'PUT') methodColor = chalk.magenta;

    const logLine = [
      chalk.gray('[' + new Date().toISOString() + ']'),
      methodColor(method),
      originalUrl,
      statusColorBg(statusCode.toString()),
      chalk.magenta(duration + 'ms'),
      chalk.gray('-'),
      chalk.green(ip)
    ].join(' ');

    // Add a 20% color bar to the log line, matching the status code color
    const colorBarLength = Math.floor(logLine.length * 0.14);
    const colorBar = statusColor(' '.repeat(colorBarLength));

    console.log(logLine + " " + colorBar);
  });

  next();
};

module.exports = logEndpoints
