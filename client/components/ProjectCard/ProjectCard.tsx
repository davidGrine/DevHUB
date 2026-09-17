import { IProject } from '@/types/project.type'

import styles from '../../styles/ProjectPage.module.scss'
import { useRouter } from 'next/navigation'

interface IProjectCard {
  project: IProject
}

export default function ProjectCard({ project }: IProjectCard) {
  const router = useRouter()

  const handleRedirectToProject = () => {
    router.push(`/project/${project._id}`)
  }
  
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${project.image}`

  const comments = Array.isArray(project.comments)
    ? project.comments
    : []

  return (
    <div className={styles.wrapper}>
      <div className={styles.section__1__image}>
        <img
          src={imageUrl}
          alt={project.name}
          width={200}
          height={300}
        />
      </div>

      <div className={styles.section__2__info}>
        <div className={styles.section__1__title}>
          <h1>{project.name}</h1>
        </div>

        <div className={styles.section__2__description}>
          <div className={styles.section__1__text}>
            <h3>{project.description}</h3>
          </div>

          <div className={styles.section__2__lc}>
            <div className={styles.left__section}>
              <button className={styles.like__btn}>
                <i className="bi bi-heart"></i>
                {project.likes}
              </button>

              {comments.length > 0 ? (
                <button className={styles.comments__btn}>
                  <i className="bi bi-chat-square-text-fill"></i>
                  {comments.length}
                </button>
              ) : (
                <span className={styles.comments__btn}>
                  Have no comments
                </span>
              )}
            </div>

            <div className={styles.right__section}>
              <button className={styles.view__project__btn} onClick={handleRedirectToProject}>
                View project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}