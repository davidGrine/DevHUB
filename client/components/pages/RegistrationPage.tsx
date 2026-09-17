'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from '../../styles/RegistrationPage.module.scss'

import { registrationUser } from '@/store/slices/auth.slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

import { FileUpload } from '../FileUpload'

export default function RegistrationPage() {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const { loading, error } = useAppSelector(state => state.auth)

  const [inputType, setInputType] = useState('password')
  const [inputRepeatType, setInputRepeatType] = useState('password')

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [description, setDescription] = useState('')

  const [avatar, setAvatar] = useState<File | null>(null)

  const [formErrors, setFormErrors] = useState<{
    name?: string
    username?: string
    email?: string
    password?: string
    repeatPassword?: string
  }>({})

  const [serverError, setServerError] = useState('')

  const handlePasswordType = () => {
    setInputType(
      inputType === 'password' ? 'text' : 'password'
    )
  }

  const handleRepeatPasswordType = () => {
    setInputRepeatType(
      inputRepeatType === 'password' ? 'text' : 'password'
    )
  }

  const validateForm = () => {
    const errors: typeof formErrors = {}

    if (!name.trim()) {
      errors.name = 'Please enter your name'
    } else if (name.trim().length < 2) {
      errors.name = 'Name must contain at least 2 characters'
    }

    if (!username.trim()) {
      errors.username = 'Please enter your username'
    } else if (username.trim().length < 3) {
      errors.username =
        'Username must contain at least 3 characters'
    }

    if (!email.trim()) {
      errors.email = 'Please enter your email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!password) {
      errors.password = 'Please enter your password'
    } else if (password.length < 6) {
      errors.password =
        'Password must contain at least 6 characters'
    }

    if (!repeatPassword) {
      errors.repeatPassword = 'Please repeat your password'
    } else if (password !== repeatPassword) {
      errors.repeatPassword = 'Passwords do not match'
    }

    setFormErrors(errors)

    return Object.keys(errors).length === 0
  }

  const getServerErrorMessage = (error: unknown) => {
    if (!error) {
      return 'Something went wrong. Please try again.'
    }

    const message =
      typeof error === 'string'
        ? error
        : JSON.stringify(error)

    const lowerMessage = message.toLowerCase()

    if (
      lowerMessage.includes('email') &&
      (lowerMessage.includes('exist') ||
        lowerMessage.includes('unique') ||
        lowerMessage.includes('already'))
    ) {
      return 'This email is already registered'
    }

    if (
      lowerMessage.includes('username') &&
      (lowerMessage.includes('exist') ||
        lowerMessage.includes('unique') ||
        lowerMessage.includes('already'))
    ) {
      return 'This username is already taken'
    }

    if (lowerMessage.includes('password')) {
      return 'The password does not meet the requirements'
    }

    if (lowerMessage.includes('email')) {
      return 'The email address is invalid'
    }

    return 'Registration failed. Please check your information and try again.'
  }

  const handleSubmit = async () => {
    setServerError('')

    const isValid = validateForm()

    if (!isValid) {
      return
    }

    try {
      await dispatch(
        registrationUser({
          name: name.trim(),
          username: username.trim(),
          email: email.trim(),
          password,
          description: description.trim(),
          avatar,
        })
      ).unwrap()

      router.push('/')
    } catch (error) {
      console.error(error)

      setServerError(getServerErrorMessage(error))
    }
  }

  const handleSkip = async () => {
		const response = await fetch('no_avatar_image.jpg')
		const blob = await response.blob()

		const file = new File([blob], 'no_avatar_image.jpg', {
			type: blob.type
		})

		setAvatar(file)
	}

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Registration</h1>

        <span>
          Already have an account?{' '}
          <Link href="/login">Sign In</Link>
        </span>
      </div>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={event => {
            setName(event.target.value)

            setFormErrors(prev => ({
              ...prev,
              name: '',
            }))
          }}
        />

        {formErrors.name && (
          <span className={styles.error}>
            {formErrors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={event => {
            setUsername(event.target.value)

            setFormErrors(prev => ({
              ...prev,
              username: '',
            }))
          }}
        />

        {formErrors.username && (
          <span className={styles.error}>
            {formErrors.username}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={event => {
            setEmail(event.target.value)

            setFormErrors(prev => ({
              ...prev,
              email: '',
            }))
          }}
        />

        {formErrors.email && (
          <span className={styles.error}>
            {formErrors.email}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.password}>
          <input
            type={inputType}
            placeholder="Enter your password..."
            value={password}
            onChange={event => {
              setPassword(event.target.value)

              setFormErrors(prev => ({
                ...prev,
                password: '',
              }))
            }}
          />

          <button
            type="button"
            onClick={handlePasswordType}
          >
            {inputType === 'password' ? (
              <i className="bi bi-eye-fill" />
            ) : (
              <i className="bi bi-eye-slash-fill" />
            )}
          </button>
        </div>

        {formErrors.password && (
          <span className={styles.error}>
            {formErrors.password}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.repeat__password}>
          <input
            type={inputRepeatType}
            placeholder="Repeat your password..."
            value={repeatPassword}
            onChange={event => {
              setRepeatPassword(event.target.value)

              setFormErrors(prev => ({
                ...prev,
                repeatPassword: '',
              }))
            }}
          />

          <button
            type="button"
            onClick={handleRepeatPasswordType}
          >
            {inputRepeatType === 'password' ? (
              <i className="bi bi-eye-fill" />
            ) : (
              <i className="bi bi-eye-slash-fill" />
            )}
          </button>
        </div>

        {formErrors.repeatPassword && (
          <span className={styles.error}>
            {formErrors.repeatPassword}
          </span>
        )}
      </div>

      <textarea
        placeholder="Enter your bio..."
        value={description}
        onChange={event =>
          setDescription(event.target.value)
        }
      />

      <div className={styles.add_avatar}>
        <FileUpload setFile={setAvatar}>
          <button
            type="button"
            className={styles.add__avatar__btn}
          >
            {avatar ? 'Change avatar' : 'Add avatar'}
          </button>
        </FileUpload>

        <button
          type="button"
          className={styles.skip__image__btn}
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>

      {(serverError || error) && (
        <div className={styles.server__error}>
          {serverError || getServerErrorMessage(error)}
        </div>
      )}

      <button
        className={styles.submit__btn}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  )
}
