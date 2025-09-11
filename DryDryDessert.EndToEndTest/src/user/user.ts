import type { Page } from '@playwright/test';
import type { Message, Tool } from 'ollama';
import ollama from 'ollama';
import { clickByText } from './tools/clickByText';
import { focusByLabel } from './tools/focusByLabel';
import { pressKey } from './tools/pressKey';
import { typeText } from './tools/typeText';
import { test } from '@playwright/test';

const testerModel = "llama3.1:8b";
export type ToolFunction = Tool & { handler: (page: Page, params: any) => Promise<any | void> | void }

export const user = (page: Page): (command: string) => Promise<void> => {
    test.slow();

    //https://github.com/microsoft/playwright/tree/main/packages/playwright/src/mcp/browser/tools has the mcp server tools, for inspiration
    const functions: ToolFunction[] = [
        clickByText,
        focusByLabel,
        pressKey,
        typeText
    ];

    return async command => {
        const messages: Message[] = [{ role: 'user', content: command,  }];

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
                        tool_name: tool.function.name,
                        content: output?.toString(),
                    });
                }
            }

            if (response.done) break;
            response = await next();
        }
    };
};