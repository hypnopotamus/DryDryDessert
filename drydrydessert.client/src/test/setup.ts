import '@testing-library/jest-dom/vitest';
import * as rtlDom from '@testing-library/dom';
import * as rtl from '@testing-library/react';
import userEvent from '@testing-library/user-event';

global = Object.assign(global, rtlDom);
global = Object.assign(global, rtl);
global = Object.assign(global, { userEvent });