import type { render, act, renderHook } from '@testing-library/react';
import type { waitFor } from '@testing-library/dom';
import type userEvent from '@testing-library/user-event';

declare global {
    const render: typeof render;
    const act: typeof act;
    const renderHook: typeof renderHook;
    const waitFor: typeof waitFor;
    const userEvent: typeof userEvent;
}