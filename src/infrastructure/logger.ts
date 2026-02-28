export type Logger = {
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
};

export const consoleLogger: Logger = {
  info: (message, context) => {
    console.info(`[TrackDiscovery] ${message}`, context ?? {});
  },
  warn: (message, context) => {
    console.warn(`[TrackDiscovery] ${message}`, context ?? {});
  },
  error: (message, context) => {
    console.error(`[TrackDiscovery] ${message}`, context ?? {});
  },
};
