import { Page } from "@playwright/test";
import { ToolFunction } from "../user";

export const clickByText: ToolFunction = {
    function: {
        name: 'clickByText',
        description: "find an element in the page by text then click it",
        parameters: {
            type: "object",
            required: ["text"],
            properties: {
                text: { type: "string", description: "the text to search the page for" },
            }
        }
    },
    type: 'function',
    handler: async (page: Page, { text }: { text: string }) =>
        page.getByText(text, { exact: true }).click()
};