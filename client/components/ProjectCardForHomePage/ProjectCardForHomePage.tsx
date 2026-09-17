'use client'

import { IProject } from '@/types/project.type'
import styles from '../../styles/ProjectCardForHomePage.module.scss'
import { useRouter } from 'next/navigation'

interface ProjectCardForHomePageProps {
  project: IProject
}

export function ProjectCardForHomePage({
  project,
}: ProjectCardForHomePageProps) {
  const router = useRouter()

  const handleRedirectToProject = () => {
    router.push(`/project/${project._id}`)
  }

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${project.image}`}
          alt={project.name}
          width={200}
          height={300}
        />
      </div>

      <div className={styles.info}>
        <h2>{project.name}</h2>

        <p className={styles.description}>
          {project.description}
        </p>

        <div className={styles.stats}>
          <span>
            <i className="bi bi-heart"></i>{' '}
            {project.likes}
          </span>

          <span>
            <i className="bi bi-chat-square-text-fill"></i>{' '}
            {project.comments.length}
          </span>
        </div>

        <button
          className={styles.button}
          onClick={handleRedirectToProject}
        >
          View project
        </button>
      </div>
    </article>
  )
}