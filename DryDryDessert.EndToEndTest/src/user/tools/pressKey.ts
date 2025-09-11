import { Page } from "@playwright/test";
import { ToolFunction } from "../user";

export const pressKey: ToolFunction = {
    function: {
        name: 'pressKey',
        description: "use the keyboard to press a key",
        parameters: {
            type: "object",
            required: ["key"],
            properties: {
                key: { type: "string", description: "the key to press" }
            }
        }
    },
    type: 'function',
    handler: async (page: Page, { key }: { key: string }) =>
        page.keyboard.press(key)
};