'use client'

import { fetchCurrentUser } from '@/store/slices/user.slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'

export default function AuthInitializer() {
  const dispatch = useAppDispatch()

  const { isAuthenticated } = useAppSelector(
    state => state.auth,
  )

  const { user } = useAppSelector(
    state => state.user,
  )

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchCurrentUser())
    }
  }, [
    isAuthenticated,
    user,
    dispatch,
  ])

  return null
}