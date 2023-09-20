/**
 * Fetches a resource from the Canvas API.
 * Uses the cache if possible.
 *
 * @param resource The resource to fetch.
 * @param fetcher The function to fetch the resource.
 * @private
 */
export async function fetch<T>(
    resource: string, fetcher: () => Promise<T>
) {
    // Check if the resource is cached.
    const data = localStorage.getItem(resource);
    if (data) {
        const parsed = JSON.parse(data) as { _ttl?: number; };

        // Check if the resource is expired.
        if (parsed._ttl && parsed._ttl > Date.now()) {
            delete parsed._ttl;
            return parsed as T;
        }
    }

    // Fetch the resource.
    const fetched = await fetcher();
    // Cache the resource.
    localStorage.setItem(resource, JSON.stringify({
        _ttl: Date.now() + 1000 * 60 * 60 * 24, // 1 day
        ...fetched
    }));

    return fetched;
}

/**
 * Gets the color of a string.
 *
 * @param string The string to get the color of.
 */
export function colorOf(string: string): string {
    let hash = 0;
    string.split("").forEach(char => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
    });

    let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        color += value.toString(16).padStart(2, "0")
    }

    return color;
}
