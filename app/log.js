const config = require('config');
const {createLogger, format, transports} = require('winston');

module.exports = module => {
  const log = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.label({label: module.filename.split('/').slice(-2).join('/')}),
          format.timestamp(),
          format.printf(info => {
            return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
          })
        ),
        level: config.get('logger.level')
      })
    ]
  });

  return log;
};
