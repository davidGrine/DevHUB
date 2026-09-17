'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from '../../styles/LoginPage.module.scss'

import {
  loginUser,
} from '@/store/slices/auth.slice'

import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    loading,
    error,
  } = useAppSelector(state => state.auth)

  const [inputType, setInputType] =
    useState('password')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const handlePasswordType = () => {
    setInputType(
      inputType === 'password'
        ? 'text'
        : 'password'
    )
  }

  const handleSubmit = async () => {
    try {
      await dispatch(
        loginUser({
          email,
          password,
        })
      ).unwrap()

      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Login</h1>

        <span>
          Doesn&apos;t have an account?{' '}

          <Link href="/registration">
            Sign Up
          </Link>
        </span>
      </div>

      <input
        type="email"
        placeholder="Enter your email..."
        value={email}
        onChange={event =>
          setEmail(event.target.value)
        }
      />

      <div className={styles.password}>
        <input
          type={inputType}
          placeholder="Enter your password..."
          value={password}
          onChange={event =>
            setPassword(event.target.value)
          }
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

      {error && (
        <div>
          {error}
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