// All data stored is related to the user.

import Storage from "@backend/storage.ts";
import type { Module } from "@backend/canvas.ts";

export default class User {
    /**
     * Returns the collapsed state of a module.
     * Can also set the collapsed state of a module.
     *
     * @param data The data to use.
     */
    public static collapseModule(data: {
        module: Module;
        collapse?: boolean | undefined;
    }): boolean {
        const { id } = data.module;

        if (data.collapse !== undefined) {
            // Set the collapsed state.
            Storage.set(`userModule_${id}`, {
                collapsed: data.collapse
            });

            return data.collapse;
        } else {
            const data = Storage.get(`userModule_${id}`, { collapsed: false });
            return data?.collapsed ?? false;
        }
    }
}
