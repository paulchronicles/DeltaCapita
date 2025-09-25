# Test Automation

End-to-end test automation framework for hotel booking system using Playwright and TypeScript.

## Quick Start

```bash
npm install
npm run test:install
npm test
```

## Test Coverage

- **Booking Flow**: Navigate → Select room → Choose dates → Reserve → Confirm
- **Form Validation**: Required field validation and error handling
- **UI Interactions**: Calendar selection, scrolling, form filling

## Commands

```bash
npm test              # Run all tests
npm run test:headed   # Run with browser UI
npm run test:debug    # Debug mode
npm run test:ui       # Interactive UI mode
npm run test:report   # View test report
```

## Structure

```
├── tests/specs/           # Test specifications
├── page-objects/locators/ # Page object models
├── utils/                 # Test utilities & data generators
├── base/                  # Base page class
└── playwright.config.ts   # Playwright configuration
```

## Features

- Page Object Model pattern
- Test data generation with Faker.js
- Custom test helpers for common actions
- Environment configuration support