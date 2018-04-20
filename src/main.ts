import * as m from 'mithril'
import User, {userErrorMessage} from './user'
import FieldErrors from './field-errors'

// App State stuff ////////////////////////////////////////////////////

// Will be a valid User
let user: User | undefined
// Field errors dictionary
let fieldErrors = FieldErrors<User>()
// Form submit state
let submitOk: boolean | undefined

/** Does form validation against our User type */
function submitForm (form: HTMLFormElement) {
	// Extract form input values into an object to validate.
	// Performs a bit of prep on the data...
	const data: Record<string, any> = {
		id: form.userid.value.trim() === ''
			? null : Number.parseFloat(form.userid.value), // Intentionally weak parse
		username: form.username.value.trim(),
		email: form.email.value.trim() || null
	}
	// Validate!
	User.decode(data).fold(
		e => {
			submitOk = false
			fieldErrors = FieldErrors.fromValidationErrors(e, userErrorMessage)
			user = undefined
		},
		u => {
			submitOk = true
			fieldErrors = FieldErrors<User>()
			user = u
		}
	)
}

// Mithril Components /////////////////////////////////////////////////

interface ErrorsAttrs {
	errors: FieldErrors<User>
}

const ErrorsComponent: m.Component<ErrorsAttrs> = {
	view ({attrs: {errors}}) {
		return m('.errors',
			m('h3', 'Errors:'),
			m('ul', Object.keys(errors).map(field =>
				m('li', errors[field as keyof User])
			))
		)
	}
}

interface FormAttrs {
	errors: FieldErrors<User>
}

const FormComponent: m.Component<FormAttrs> = {
	view ({attrs: {errors}}) {
		return m('form',
			{
				onsubmit(e: Event) {
					e.preventDefault()
					submitForm(e.currentTarget as HTMLFormElement)
				}
			},
			m('table',
				m('tr',
					m('td', 'ID*:'),
					m('td',
						m('input', {
							type: 'text', name: 'userid',
							class: 'id' in errors ? 'error' : ''
						})
					)
				),
				m('tr',
					m('td', 'Username*:'),
					m('td',
						m('input', {
							type: 'text', name: 'username',
							class: 'username' in errors ? 'error' : ''
						})
					)
				),
				m('tr',
					m('td', 'Email:'),
					m('td',
						m('input', {
							type: 'text', name: 'email',
							class: 'email' in errors ? 'error' : ''
						})
					)
				),
			),
			m('p',
				m('input', {type: 'submit'}, 'Submit')
			)
		)
	}
}

const App = {
	view() {
		return m('.app',
			submitOk === true ? m('h3.success', 'Submit OK!')
			: submitOk === false ? m(ErrorsComponent, {errors: fieldErrors})
			: m('h3', 'Fill out and submit:'),
			m(FormComponent, {errors: fieldErrors})
		)
	}
}

m.mount(document.body, App)
