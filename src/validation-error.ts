import FieldErrors from './field-errors'

class ValidationError<T extends Record<string, any>> extends Error {
	fieldErrors: FieldErrors<T>
	constructor (message: string, fieldErrors: FieldErrors<T>) {
		super(message)
		this.fieldErrors = Object.assign({}, fieldErrors)
	}
}
