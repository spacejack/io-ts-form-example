import * as t from 'io-ts'

type FieldErrors<T> = Partial<Record<keyof T, string>>

/** Creates an empty FieldErrors object for the specified entity type. */
function FieldErrors<T = Record<string, any>>() {
	return {} as FieldErrors<T>
}

// Helpers
namespace FieldErrors {
	/**
	 * Creates a FieldErrors object from an io-ts ValidationError array.
	 * Provide the record type that the field error keys should match.
	 * @param errors The array of errors
	 * @param formatter An optional callback that returns an error message.
	 */
	export function fromValidationErrors<T = Record<string, any>>(
		errors: t.ValidationError[],
		formatter?: (field: keyof T, value: any) => string
	): FieldErrors<T> {
		return errors.map(
			e => [validationErrorKey<T>(e), e.value] as [keyof T, any]
		).reduce((fieldErrors, [key, value]) => {
			fieldErrors[key] = formatter
				? formatter(key, value)
				: `Invalid ${key}.` // value: '${value}'`
			return fieldErrors
		}, FieldErrors<T>())
	}
}

// Single merged export
export default FieldErrors

/** Helper function returns the field name from the ValidationError */
export function validationErrorKey<T> (error: t.ValidationError) {
	// Assumes the first non-empty key is the field name
	return error.context.find(c => c.key.length > 0)!.key as keyof T
}
