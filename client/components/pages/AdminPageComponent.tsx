'use client'

import Link from 'next/link'
import RoleGuard from '@/components/RoleGuard/RoleGuard'
import styles from '../../styles/AdminPage.module.scss'

export default function AdminPage() {
  return (
    <RoleGuard allowedRoles={['ADMIN']}>
      <main className={styles.main}>
        <h1 className={styles.title}>Admin panel</h1>

        <div className={styles.links}>
          <Link
            href="/admin/users"
            className={styles.link}
          >
            Users
          </Link>

          <Link
            href="/admin/projects"
            className={styles.link}
          >
            Projects
          </Link>
        </div>
      </main>
    </RoleGuard>
  )
}