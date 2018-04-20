# io-ts Form Validation Example

This is a minimalist example of using [io-ts](https://github.com/gcanti/io-ts) for form validation.

See a [live demo here](https://stackblitz.com/edit/typescript-b9fxb4).

(Note that Stackblitz's types may not be as good as browsing sources locally in VSCode.)

Validation objects and corresponding TypeScript types are declared in `user.ts`.

`field-errors.ts` contains some helpers to convert an io-ts validation error result into a dictionary having `{fieldName: errorString}` entries. The `FieldErrors` type is generic so that it can have key types matching the type of the object being validated.

Friendly error messages are built by passing the (invalid) value of a field to its corresponding error message function. These error message functions are in `user.ts`.

`index.ts` contains a very barebones [Mithril](https://gitub.com/MithrilJS/mithril.js) app. There is no fancy state management; this example focuses on the exercise of converting validation errors into user-friendly messages.

## Install

	npm install

## Develop

	npm start

Then go to `http://localhost:3000/` in your browser.
