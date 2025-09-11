import type { Page } from '@playwright/test';
import ollama, { Tool } from 'ollama'

const testerModel = "llama3.1:8b";
type ToolFunction = Tool & { handler: (page: Page, params: any) => Promise<any | void> | void }

export const user = (page: Page): (command: string) => Promise<void> => {
    //https://github.com/microsoft/playwright/tree/main/packages/playwright/src/mcp/browser/tools has the mcp server defaults
    const functions: ToolFunction[] = [{
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
    }];

    return async command => {
        const messages = [{ role: 'user', content: command }];

        const next = () => ollama.chat({
            model: testerModel,
            messages,
            tools: functions
        });
        let response = await next();
        while (response.message.tool_calls) {
            for (const tool of response.message.tool_calls) {
                const f = functions.find(f => f.function.name === tool.function.name);
                if (f) {
                    const output = await f.handler(page, tool.function.arguments);
                    messages.push(response.message);
                    messages.push({
                        role: 'tool',
                        content: output?.toString(),
                    });
                }
            }

            if (response.done) break;
            response = await next();
        }
    };
};