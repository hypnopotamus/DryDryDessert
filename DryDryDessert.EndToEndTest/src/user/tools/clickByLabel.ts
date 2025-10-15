import { Page } from "@playwright/test";
import { ToolFunction } from "../user";

export const clickByLabel: ToolFunction = {
    function: {
        name: 'clickByLabel',
        description: "find an element in the page by label then click it",
        parameters: {
            type: "object",
            required: ["label"],
            properties: {
                label: { type: "string", description: "the label to search the page for" }
            }
        }
    },
    type: 'function',
    handler: async (page: Page, { label }: { label: string }) =>
        page.getByLabel(label, { exact: true }).click()
};