/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Recursively modifies an object.
 *
 * @param original The original object to modify.
 * @param modified The new data to apply.
 */
function recursiveModify(original: any, modified: any): object {
    // Loop through the modified object.
    for (const key in modified) {
        // Check if the key exists.
        if (original[key] !== undefined) {
            // Check if the value is an object.
            if (typeof original[key] == "object") {
                // Recursively modify the object.
                original[key] = recursiveModify(original[key], modified[key]);
            } else {
                // Set the value.
                original[key] = modified[key];
            }
        }
    }

    return original;
}

export default class Storage {
    /**
     * Sets the data for a key.
     * Allows for modifying existing data, or setting new data.
     *
     * @param key The key to set the data for.
     * @param data The data to modify/set.
     * @param override Should the data be directly set?
     */
    public static set(
        key: string, data: object, override: boolean = false
    ): void {
        // Check if the item exists.
        if (override || localStorage.getItem(key) == undefined) {
            localStorage.setItem(key, JSON.stringify(data));
        } else {
            // Get the existing data.
            const existing = JSON.parse(localStorage.getItem(key) ?? "{}");
            // Set the data.
            const merged = recursiveModify(existing, data);
            localStorage.setItem(key, JSON.stringify(merged));
        }
    }

    /**
     * Fetches a value from storage.
     * If the value does not exist, the default value is returned.
     *
     * @param key The key to fetch the value for.
     * @param defaultValue The default value to return if the value does not exist.
     */
    public static get<T>(
        key: string, defaultValue: T | undefined = undefined
    ): T | undefined {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    }
}
