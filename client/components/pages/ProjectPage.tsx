'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import ProjectCard from '../ProjectCard/ProjectCard'
import { fetchProjects } from '@/store/slices/project.slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

import styles from '../../styles/ProjectPage.module.scss'

export default function ProjectPage() {
  const dispatch = useAppDispatch()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 5

  const { projects, loading, error, totalPages } = useAppSelector(
    state => state.projects
  )

  useEffect(() => {
    dispatch(
      fetchProjects({
        page,
        limit
      })
    )
  }, [dispatch, page, limit])

  const changePage = (newPage: number) => {
    router.push(`${pathname}?page=${newPage}&limit=${limit}`)
  }

  if (loading) {
    return <div>Loading projects...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (projects.length === 0) {
    return <div>No projects found</div>
  }

  return (
    <div className={styles.projects__container}>
      <div className={styles.projects__list}>
        {projects.map(project => (
          <ProjectCard
            key={project._id}
            project={project}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
        >
          Previous
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map(pageNumber => (
          <button
            key={pageNumber}
            disabled={page === pageNumber}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => changePage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}