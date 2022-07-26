import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import 'tailwindcss/tailwind.css'
import PainterIcon from '@mui/icons-material/FormatPaint'
import Toolbar from '@mui/material/Toolbar'
import * as React from 'react'

const Register = () => {
	const { register } = useAuth({
		middleware: 'guest',
		redirectIfAuthenticated: '/dashboard',
	})

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const [errors, setErrors] = useState([])
	const [invitationId, setInvitationId] = useState('')

	console.log('register - errors: ', errors)
	console.log('register - errors.length: ', errors.length)
	const submitForm = event => {
		event.preventDefault()

		register({ name, email, password, password_confirmation: passwordConfirmation, setErrors, invitationId })
	}


	return (
		<GuestLayout>
			<AuthCard
				logo={
					<Link href='/'>
						<a>
							<PainterIcon sx={{ md: 'flex', mr: '4px', fontSize: 66, color: 'gray'}} />
						</a>
					</Link>
				}>
				{/* Validation Errors */}
				<AuthValidationErrors className='mb-4' errors={errors} />

				<form onSubmit={submitForm}>
					{/* Name */}
					<div>
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							type='text'
							value={name}
							className='block mt-1 w-full'
							onChange={event => setName(event.target.value)}
							required
							autoFocus
						/>
					</div>

					{/* Email Address */}
					<div className='mt-4'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							value={email}
							className='block mt-1 w-full'
							onChange={event => setEmail(event.target.value)}
							required
						/>
					</div>

					{/* Password */}
					<div className='mt-4'>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							type='password'
							value={password}
							className='block mt-1 w-full'
							onChange={event => setPassword(event.target.value)}
							required
							autoComplete='new-password'
						/>
					</div>

					{/* Confirm Password */}
					<div className='mt-4'>
						<Label htmlFor='passwordConfirmation'>Confirm Password</Label>
						<Input
							id='passwordConfirmation'
							type='password'
							value={passwordConfirmation}
							className='block mt-1 w-full'
							onChange={event =>
								setPasswordConfirmation(event.target.value)
							}
							required
						/>
					</div>

					<div className='flex items-center justify-end mt-4'>
						<Link href='/login'>
							<a className='underline text-sm text-gray-600 hover:text-gray-900'>
								Already registered?
							</a>
						</Link>

						<Button className='ml-4'>Register</Button>
					</div>
				</form>
			</AuthCard>
		</GuestLayout>
	)
}

export default Register
