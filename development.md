## Build & Run

```
nvm use 20
npm i --force
npm start
```

## Open an Example

Current designer demo includes next dependencies
```
@libreforge/librepackage-security-oauth2-google
@libreforge/librepackage-payment-stripe
```

which allows us to open any of 3 available project templates

- [demo_dashboard.json](https://github.com/getlibreforge/libreforge-templates/blob/main/demo_dashboard.json)
- [demo_invoices.json](https://github.com/getlibreforge/libreforge-templates/blob/main/demo_invoices.json)
- [demo_quote_auto.json](https://github.com/getlibreforge/libreforge-templates/blob/main/demo_quote_auto.json)

To do so 
- clone current https://github.com/getlibreforge/libreforge-general-designer-demo project
- clone the https://github.com/getlibreforge/libreforge-templates project
- build and run current project
- open http://localhost:3000/
- go to `Editor` menu item, then `Import Project` and choose any of templates

Inspect the pages, components, their configurations... toggle `Design Mode` to switch between Designer & the End Portal experience.
