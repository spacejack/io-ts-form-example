// Example reporter (no longer used)

import * as t from 'io-ts'

function formatValidationError (error: t.ValidationError) {
	console.log(error.context)
	const field = error.context.find(c => c.key.length > 0)!
	return [field.key, `Invalid ${field.key}`]
}

export function reporter<T>(validation: t.Validation<T>) {
	return validation.fold(
		errors => errors.map(formatValidationError),
		() => [] // we are throwing away the valid User in this example
	).reduce((errs, [field, message]) => {
		errs[field] = message
		return errs
	}, {} as Record<string, string>)
}

export function errorsToDict (errors: t.ValidationError[]) {
	return errors.map(formatValidationError).reduce((errs, [field, message]) => {
		errs[field] = message
		return errs
	}, {} as Record<string, string>)
}
