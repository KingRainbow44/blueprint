export default class Logger {
    /**
     * Sets overrides for the console.
     */
    public static override(): void {
        console.info = Logger.log;
    }

    /**
     * Logs an info message to the console.
     *
     * @param message The message to log.
     */
    public static log(message: string): void {
        console.log(`[Blueprint] (INFO) ${message}`);
    }

    /**
     * Logs an error message to the console.
     *
     * @param message The message to log.
     */
    public static error(message: string): void {
        console.error(`[Blueprint] (ERROR) ${message}`);
    }
}
