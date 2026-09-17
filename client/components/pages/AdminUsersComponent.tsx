'use client'

import RoleGuard from '@/components/RoleGuard/RoleGuard'
import { fetchAllUsers } from '@/store/slices/user.slice'
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks'
import { useEffect } from 'react'
import Link from 'next/link'
import styles from '../../styles/AdminUsers.module.scss'

export default function AdminUsersComponent() {
  const dispatch = useAppDispatch()

  const {
    users,
    loading,
    error,
  } = useAppSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <RoleGuard allowedRoles={['ADMIN']}>
      <main className={styles.main}>
        <h1 className={styles.title}>Users</h1>

        {loading && (
          <p className={styles.loading}>
            Loading...
          </p>
        )}

        {error && (
          <p className={styles.error}>
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className={styles.users}>
            {users.map(user => {
              const imageUrl = user.avatar
                ? `${process.env.NEXT_PUBLIC_API_URL}/${user.avatar}`
                : null

              return (
                <article
                  key={user._id}
                  className={styles.user}
                >
                  <div className={styles.avatarWrapper}>
                    {imageUrl ? (
                      <img
                        className={styles.avatar}
                        src={imageUrl}
                        alt={user.username}
                        width={60}
                        height={60}
                      />
                    ) : (
                      <div className={styles.noAvatar}>
                        No avatar
                      </div>
                    )}
                  </div>

                  <div className={styles.info}>
                    <h2 className={styles.name}>
                      {user.name}
                    </h2>

                    <p className={styles.username}>
                      @{user.username}
                    </p>

                    <p className={styles.roles}>
                      {user.roles.map(role => (
                        <span key={role._id}>
                          {role.role}
                        </span>
                      ))}
                    </p>

                    <Link
                      href={`/user/${user._id}`}
                      className={styles.profileLink}
                    >
                      Open profile
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>
    </RoleGuard>
  )
}