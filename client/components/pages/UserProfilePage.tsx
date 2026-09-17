'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchUser } from '@/store/slices/user.slice'
import styles from '@/styles/UserProfilePage.module.scss'

import Link from 'next/link'

interface UserProfilePageProps {
	id: string
}

export function UserProfilePage({ id }: UserProfilePageProps) {
	const dispatch = useAppDispatch()
	
	const {
		user,
		loading,
		error,
	} = useAppSelector(state => state.user)
	
	useEffect(() => {
		dispatch(fetchUser(id))
	}, [dispatch, id])
	
	if (!user) {
		return <div>User not found</div>
	}
	
	const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${user.avatar}`

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.section__1__image}>
					<img
						src={imageUrl}
						alt={user.name}
						width={500}
						height={750}
					/>
				</div>

				<div className={styles.section__2__info}>
					<h1>{user.name}</h1>

					<p className={styles.username}>
						@{user.username}
					</p>

					<p>{user.description}</p>
				</div>
			</div>

			<div className={styles.section__3__projects}>
				{user.projects.length === 0 ? (
					<div>No projects found</div>
				) : (
					user.projects.map(project => (
						<div
							key={project._id}
							className={styles.project}
						>
							<Link href={`/project/${project._id}`}>
								{project.name}
							</Link>

							<p>{project.description}</p>
						</div>
					))
				)}
			</div>
		</div>
	)
}

