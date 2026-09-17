'use client'

import { fetchCurrentUser } from '@/store/slices/user.slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: string[]
}

export default function RoleGuard({
  children,
  allowedRoles,
}: RoleGuardProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { user, loading, error } = useAppSelector(
    state => state.user,
  )

  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      router.replace('/registration')
      return
    }

    if (!user) {
      dispatch(fetchCurrentUser())
    } else {
      setAuthChecked(true)
    }
  }, [dispatch, router, user])

  useEffect(() => {
    if (!loading && user) {
      setAuthChecked(true)
    }
  }, [loading, user])

  useEffect(() => {
    if (!authChecked) {
      return
    }

    if (error && !user) {
      localStorage.removeItem('accessToken')

      router.replace('/registration')
      return
    }

    if (!user) {
      return
    }

    const hasAccess = user.roles.some(role =>
      allowedRoles.includes(role.role),
    )

    if (!hasAccess) {
      router.replace('/')
    }
  }, [
    authChecked,
    loading,
    error,
    user,
    allowedRoles,
    router,
  ])

  if (!authChecked || loading || !user) {
    return null
  }

  const hasAccess = user.roles.some(role =>
    allowedRoles.includes(role.role),
  )

  if (!hasAccess) {
    return null
  }

  return children
}