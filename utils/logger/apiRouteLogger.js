const logger = require("../logger/logger")

module.exports=(req, res, next) => {
		logger.info(`http://localhost:5050${req.originalUrl} - ${req.method} METHOD `)
		next()
	}



