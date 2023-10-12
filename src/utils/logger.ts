import { DateTime } from 'luxon';

export enum ErrorLevel {
    Warn,
    Error,
}

/**
 * Log a message into the console.
 * @param message The message to log.
 * @param errorLevel The error level of this log.
 */
export function log(message: string, errorLevel?: ErrorLevel): void {
    const time = DateTime.utc().toFormat('LLL dd | HH:mm:ss');
    const output = `[${time}] ${message}`;

    if (errorLevel === undefined) console.log(output);
    else if (errorLevel === ErrorLevel.Warn) console.warn(output);
    else if (errorLevel === ErrorLevel.Error) console.error(output);
}
