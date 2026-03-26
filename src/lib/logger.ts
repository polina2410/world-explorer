type LogLevel = 'info' | 'warn' | 'error';
type Meta = Record<string, unknown>;

function log(level: LogLevel, message: string, meta?: Meta) {
  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };

  if (process.env.NODE_ENV === 'development') {
    const color = level === 'error' ? '\x1b[31m' : level === 'warn' ? '\x1b[33m' : '\x1b[36m';
    console[level](`${color}[${level.toUpperCase()}]\x1b[0m ${message}`, meta ?? '');
  } else {
    console[level](JSON.stringify(entry));
  }
}

export const logger = {
  info: (message: string, meta?: Meta) => log('info', message, meta),
  warn: (message: string, meta?: Meta) => log('warn', message, meta),
  error: (message: string, meta?: Meta) => log('error', message, meta),
};