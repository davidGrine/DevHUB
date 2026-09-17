'use client'

import RoleGuard from '@/components/RoleGuard/RoleGuard'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { fetchProjects } from '@/store/slices/project.slice'
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks'
import { useEffect } from 'react'
import styles from '../../styles/AdminProject.module.scss'

export default function AdminProjectsComponent() {
  const dispatch = useAppDispatch()

  const {
    projects,
    loading,
    error,
  } = useAppSelector(state => state.projects)

  useEffect(() => {
    dispatch(
      fetchProjects({
        page: 1,
        limit: 10,
      }),
    )
  }, [dispatch])

  return (
    <RoleGuard allowedRoles={['ADMIN']}>
      <main className={styles.main}>
        <h1 className={styles.title}>Projects</h1>

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
          <div className={styles.projects}>
            {projects.map(project => (
              <ProjectCard
                key={project._id}
                project={project}
              />
            ))}
          </div>
        )}
      </main>
    </RoleGuard>
  )
}