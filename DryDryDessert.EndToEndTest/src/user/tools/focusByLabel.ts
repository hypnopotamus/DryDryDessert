import { Page } from "@playwright/test";
import { ToolFunction } from "../user";

export const focusByLabel: ToolFunction = {
    function: {
        name: 'focusByLabel',
        description: "find an element in the page by label and put focus on it",
        parameters: {
            type: "object",
            required: ["label", "text"],
            properties: {
                label: { type: "string", description: "the label of an element to find and focus on" }
            }
        }
    },
    type: 'function',
    handler: async (page: Page, { label }: { label: string }) =>
        page.getByLabel(label, { exact: true }).click()
};