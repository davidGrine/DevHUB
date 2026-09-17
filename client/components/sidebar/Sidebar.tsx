'use client'

import {
	SIDEBAR_LINKS_ADMIN,
	SIDEBAR_LINKS_BOTTOM,
	SIDEBAR_LINKS_TOP_WITH_AUTH,
	SIDEBAR_LINKS_TOP_WITHOUT_AUTH
} from '@/constants/sidebar.constants'

import Link from 'next/link'
import ThemeButton from '../themeButton/ThemeButton'
import styles from '../../styles/Sidebar.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import { clearUser, fetchCurrentUser } from '@/store/slices/user.slice'
import { logoutUser } from '@/store/slices/auth.slice'

export default function Sidebar() {
	const dispatch = useAppDispatch()

	const { user } = useAppSelector(state => state.user)

	const isAdmin = user?.roles?.some(role => role.role === 'ADMIN')

	const { isAuthenticated } = useAppSelector(state => state.auth)

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')

		if (!accessToken) {
			return
		}

		dispatch(fetchCurrentUser())
	}, [dispatch, isAuthenticated])

	const handleLogout = async () => {
		try {
			await dispatch(logoutUser()).unwrap()

			dispatch(clearUser())
		} catch (error) {
			return
		}
	}

	return (
		<div className={styles.sidebar__wrapper}>
			<nav
				className={styles.sidebar}
				data-sidebar
				data-state="closed"
			>
				<div className={styles.nav__section__1__menu}>
					<h1>MENU</h1>

					<ul className={styles.nav__links}>
						{!user
							? SIDEBAR_LINKS_TOP_WITHOUT_AUTH.map((link, index) => (
									<li key={index}>
										<Link
											href={link.href}
											className={styles.nav__links__link}
										>
											<i className={link.icon}></i>

											<span>{link.name}</span>
										</Link>
									</li>
								))
							: SIDEBAR_LINKS_TOP_WITH_AUTH.map((link, index) => (
									<li key={index}>
										<button onClick={handleLogout}>
											<i className={link.icon}></i> <span>{link.name}</span>
										</button>
									</li>
								))}

						{isAdmin && (
							<div className={styles.admin__links}>
								{SIDEBAR_LINKS_ADMIN.map(link => (
									<Link
										key={link.href}
										href={link.href}
									>
										{link.name}
									</Link>
								))}
							</div>
						)}

						<li>
							<div className={styles.nav__links__link}>
								<ThemeButton />
							</div>
						</li>
					</ul>
				</div>

				<div className={styles.nav__section__2__links}>
					<span className={styles.links__letter}>L</span>

					<ul className={styles.nav__contacts}>
						{SIDEBAR_LINKS_BOTTOM.map((link, index) => (
							<li key={index}>
								<a href={link.href}>{link.name}</a>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</div>
	)
}
