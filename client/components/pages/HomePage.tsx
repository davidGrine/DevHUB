'use client'

import Image from 'next/image'

import styles from '../../styles/HomePage.module.scss'

import { ProjectCardForHomePage } from '../ProjectCardForHomePage/ProjectCardForHomePage'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import { fetchProjects } from '@/store/slices/project.slice'

export default function HomePageComponent() {
	const router = useRouter() 
	const dispatch = useAppDispatch()

	const {projects, loading, error} = useAppSelector(state => state.projects)

	const page = 1
	const limit = 3
	
	useEffect(() => {
		dispatch(fetchProjects({
			page,
			limit
		}))
	}, [])

	const handleRedirectToAllProjects = () => {
		router.push('/projects')
	}

	const handleRedirectToCreateProject = () => {
		router.push('/upload-project')
	}

	if (loading) {
		return <div>Loading projects...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<div className={styles.wrapper__home__page}>
			<div className={styles.wrapper}>
				<div className={styles.section__1__image}>
					<Image
						src="/site_for_home_page.jpg"
						alt="site for home page"
						width={200}
						height={300}
						priority
					/>
				</div>

				<div className={styles.section__2__info}>
					<div className={styles.section__1__title}>
						<h1>Add you own projects!</h1>
					</div>

					<div className={styles.section__2__description}>
						<div className={styles.section__1__buttons}>
							<button className={styles.upload__project__redirect} onClick={handleRedirectToCreateProject}>
								Upload project
							</button>

							<button className={styles.explore__projects__redirect} onClick={handleRedirectToAllProjects}>
								Explore projects
							</button>
						</div>

						<div className={styles.section__2__text}>
							<h3>
								Share your creations with a community of passionate developers
								and designers. Show off your work, collect feedback, and inspire
								others on DevHUB.
							</h3>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.projects__wrapper}>
				{projects.length === 0 ? (
					<div>No projects found</div>
				) : (
					projects.map(project => (
						<ProjectCardForHomePage
							key={project._id}
							project={project}
						/>
					))
				)}
			</div>
		</div>
	)
}
