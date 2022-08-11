import log4js from 'log4js';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

log4js.configure({
    appenders: {
        consola: {type: 'console'},
        warnFile: {type: 'file', filename:'./log/warn.log'},
        errorFile: {type: 'file', filename:'./log/error.log'},
        loggerInfo: {type: 'logLevelFilter', appender: 'consola', level: 'info'},
        loggerWarn: {type: 'logLevelFilter', appender: 'warnFile', level: 'warn'},
        loggerError: {type: 'logLevelFilter', appender: 'errorFile', level: 'error'}
    },
    categories: {
        default: {appenders: ['consola', 'loggerWarn', 'loggerError'], level: 'info'},
        prod:{
            appenders:['loggerWarn','loggerError'],level:'all'
        }
    }
})

const logger = log4js.getLogger();

export default logger;