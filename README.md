# DryDryDessert

a fake ecommerce site built to illustrate DRY principles applied to React

see [frontend](./drydrydessert.client/README.md) for the DRY lunch and learn content

## Tools

- dotnet 9+ SDK, asp runtime
- node + npm
   - recommended v22.19.0, v10.9.3
- any web browser

### recommended

- visual studio
- vscode
   - playwright plugin (microsoft)
   - vitest plugin (vitest)
- ollama (v0.11.10+)

#### end to end test

also recommended to have hardware that can run llama3.1:8b well with some extra overhead space.

My laptop specs:
- LG Gram
   - intel i7-1260P
   - 32GB ram
   - Intel Iris XE
      - integrated GPU
      - no dedicated vram, dynamically allocated from system ram

## running

from CLI:
1. `dotnet run --project .\DryDryDessert.AppHost\DryDryDessert.AppHost.csproj`
   - this might take a hot minute the first time, it *should* install playwright browsers and pull llama3.1:8b for end to end tests
      - if these don't go off and you want to run the E2E tests `npm run install-browsers` and `npm run install-test-user`
1. open your browser to the Aspire dashboard link
1. click the link for "client" to see the frontend

from visual studio:
1. open the solution
1. set DryDryDessert.AppHost as the startup project
1. start and wait for the browser to open
1. click the link for "client" to see the frontend

### running tests

#### frontend unit tests

from `./drydrydessert.client` run `npm t`
or open `./drydrydessert.client` with vscode and use the vitest plugin

#### backend unit tests

there are none, the backend only exists to provide data to the front end through a ReST API for demonstration purposes in the front end

#### end to end test

if ollama is not running start it (`ollama serve`), it should be listening on the default port (11434)

with the aspire host running:
- click the play button for "end-to-end" in the aspire dashboard
- from `./DryDryDessert.EndToEndTest` run `npm t`
   - run `npm run test-ui` if you want the playwright UI to open
- with `./DryDryDessert.EndToEndTest` open in vscode use the playwright plugin to run tests

note: running all the tests together some might timeout, even with the generous 30s default / 90s for the AI enabled test timeouts, depending on system performance