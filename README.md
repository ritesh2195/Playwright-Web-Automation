# Amazon Automation — Playwright + TypeScript

## Overview

End-to-end test automation framework for [Amazon India](https://amazon.in) using **Playwright Test** and **TypeScript**. Covers login, address management, product search, and cart workflows using a Page Object Model with fixture-based dependency injection and multi-environment support.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Playwright Test](https://playwright.dev) | ^1.57.0 | Test runner & browser automation |
| TypeScript | ^5.x | Language |
| Allure | 2.9.2 | Test reporting |
| BrowserStack | SDK | Cross-browser cloud execution |
| cross-env | ^7.0.3 | Multi-environment variable injection |
| dotenv | ^17.x | `.env` file loading |

---

## Folder Structure

```
├── playwright.config.ts         # Playwright configuration
├── browserstack.yml             # BrowserStack configuration
├── azure-pipelines.yml          # CI/CD pipeline
├── .env.dev / .env.qa / .env.uat / .env.prod  # Environment-specific variables
│
├── src/
│   ├── config/
│   │   └── env.ts               # Credential access from environment variables
│   ├── fixtures/
│   │   └── page-fixtures.ts     # Playwright fixture DI (test.extend with page objects)
│   ├── pages/                   # Page Object Model classes
│   │   ├── base-page.ts         # Shared base class
│   │   ├── login-page.ts
│   │   ├── home-page.ts
│   │   ├── header-page.ts
│   │   ├── account-page.ts
│   │   ├── your-address-page.ts
│   │   ├── add-address-page.ts
│   │   ├── search-result-page.ts
│   │   ├── product-details-page.ts
│   │   ├── cart-page.ts
│   │   └── product-review-page.ts
│   ├── test-data/               # JSON test data per scenario
│   │   ├── login.json
│   │   ├── address.json
│   │   ├── search-product.json
│   │   └── review.json
│   ├── types/                   # Shared TypeScript types
│   │   ├── index.ts             # Barrel export
│   │   └── page-types.ts        # NamePrice, LoginAlert interfaces
│   └── utils/
│       └── excel-reader-util.ts # Excel data reader (XLSX)
│
└── tests/                       # Test spec files
    ├── login-test.spec.ts
    ├── address-test.spec.ts
    ├── search-product-test.spec.ts
    └── review-product-test.spec.ts
```

---

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9

---

## Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd amazon-playwright-e2e

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

---

## Environment Configuration

Credentials and base URL are loaded from environment-specific `.env` files. Copy the relevant file and fill in real values:

```
.env.dev   — development
.env.qa    — QA / staging
.env.uat   — user acceptance testing
.env.prod  — production
```

Each file follows this structure:

```env
BASE_URL=https://amazon.in
LOGIN_EMAIL=your_email@example.com
LOGIN_PASSWORD=your_password
LOGIN_NAME=Your Name
```

> **Never commit credentials.** All `.env.*` files are git-ignored.

---

## Running Tests

### Run all tests in a specific environment

```bash
npm run test:dev    # uses .env.dev
npm run test:qa     # uses .env.qa
npm run test:uat    # uses .env.uat
npm run test:prod   # uses .env.prod
```

### Run individual test suites

```bash
npm run login       # Login tests
npm run address     # Address management tests
npm run search      # Product search tests
```

### Run directly with Playwright

```bash
npx playwright test                                          # all tests
npx playwright test tests/login-test.spec.ts                # single spec
npx playwright test --project chromium                      # specific browser
npx playwright test --headed                                 # headed mode
npx playwright test --ui                                     # Playwright UI mode
```

---

## Reporting

### Allure Report

```bash
npm run generate-report   # generates report from allure-results/
npm run open-report       # opens the report in browser
```

### Playwright HTML Report

```bash
npx playwright show-report
```

---

## BrowserStack Execution

```bash
npm run browserstack
```

Configure target browsers and OS in `browserstack.yml`.

---

## Test Data

All test data lives in `src/test-data/` as JSON files:

| File | Used by |
|---|---|
| `login.json` | `login-test.spec.ts` |
| `address.json` | `address-test.spec.ts` |
| `search-product.json` | `search-product-test.spec.ts` |
| `review.json` | `review-product-test.spec.ts` |

Credentials are **not** stored in test-data files — they are injected via `src/config/env.ts` from environment variables.

