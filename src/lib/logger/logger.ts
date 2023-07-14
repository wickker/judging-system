import winston from 'winston'

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize({ message: true }),
				winston.format.errors({ stack: true })
			),
		}),
	],
})

export default logger
