import { Page } from "@playwright/test";
import { ToolFunction } from "../user";

export const typeText: ToolFunction = {
    function: {
        name: 'typeText',
        description: "use the keyboard to type text",
        parameters: {
            type: "object",
            required: ["text"],
            properties: {
                text: { type: "string", description: "the text to type" }
            }
        }
    },
    type: 'function',
    handler: async (page: Page, { text }: { text: string }) =>
        page.keyboard.type(text)
};