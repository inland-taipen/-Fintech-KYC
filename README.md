# Fintech KYC & Onboarding Form

A robust KYC (Know Your Customer) and onboarding form engine built with React, TypeScript, and modern web technologies.

## Features

- **Multi-Step Wizard**: 3-step flow (Identity Verification → Bank Details → Review)
- **Resilient State Management**: localStorage persistence - data survives page refreshes
- **Complex Validation**: 
  - Indian PAN Card format validation (Regex: `[A-Z]{5}[0-9]{4}[A-Z]{1}`)
  - Async username availability check
- **UX Enhancements**:
  - "Save & Resume Later" functionality
  - Beforeunload warning for unsaved changes
- **Comprehensive Testing**: Vitest test suite with PAN Card regex and required field validation

## Tech Stack

- React + TypeScript (Vite)
- Zod (Strict schema validation)
- React Hook Form
- Tailwind CSS
- Vitest (Unit testing)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm test
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
  ├── components/        # React components (Wizard, Form Steps)
  ├── schemas/          # Zod validation schemas
  ├── utils/            # Utilities (storage, validation)
  └── test/             # Test setup files
```
