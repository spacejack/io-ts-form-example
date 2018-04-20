import * as t from 'io-ts'

// Types:

// ID
export const ID = t.refinement(
	t.Integer, i => i > 0, 'ID'
)
export type ID = t.TypeOf<typeof ID>

// Username
const rxUsername = /^[a-z0-9]{1,16}$/
export const Username = t.refinement(
	t.string, s => rxUsername.test(s)
)
export type Username = t.TypeOf<typeof Username>

// Email
const rxEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
export const Email = t.refinement(
	t.string, s => rxEmail.test(s), 'Email'
)
export type Email = t.TypeOf<typeof Email>

// User
const User = t.interface({
	id: ID,
	username: Username,
	email: t.union([Email, t.null])
})
interface User extends t.TypeOf<typeof User> {}
export default User

/**
 * Takes a field name and value and returns an error message.
 * Assumes the value failed validation.
 */
export function userErrorMessage (field: keyof User, value: any) {
	return userErrorMessages[field](value)
}

/**
 * Error message functions.
 * Note that the following functions assume there is an error, so any nullish
 * or empty values received will be considered as missing 'required' values.
 * If the field is not required, then validation should pass and the error
 * message function should not be called.
 */
const userErrorMessages: Record<keyof User, (value: any) => string> = {
	id: v => v == null || String(v).trim() === '' ? "A User ID is required."
		: "Invalid User ID. Must be an integer greater than 0.",
	username: v => v == null || String(v).trim() === '' ? "A Username is required."
		: "Invalid Username. Can only contain the letters a-z or numbers 0-9.",
	email: v => v == null || String(v).trim() === '' ? "A valid email address is required."
		: "The email address not valid."
}
