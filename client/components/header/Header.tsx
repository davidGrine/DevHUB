'use client'

import { HEADER_LINKS } from '@/constants/header.constants'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import styles from '../../styles/Header.module.scss'
import MenuOpenBtn from '../menuOpenBtn/MenuOpenBtn'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import { fetchCurrentUser } from '@/store/slices/user.slice'

export default function Header() {
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const { user } = useAppSelector(state => state.user)
  const { isAuthenticated } = useAppSelector(state => state.auth)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      return
    }

    dispatch(fetchCurrentUser())
  }, [dispatch, isAuthenticated])

  return (
    <div className={styles.header__wrapper}>
      <MenuOpenBtn />

      <header className={styles.header}>
        <div className={styles.header__section__1__logo}>
          <Link href="/" className="cursor-pointer">
            DevHUB
          </Link>
        </div>

        <div className={styles.header__section__2__menu}>
          <ul className={styles.main__menu}>
            {HEADER_LINKS.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={clsx(
                    pathname === link.href
                      ? styles.active
                      : styles.menu__item
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.header__section__3__my__account}>
          {user ? (
            <Link
              href={`/user/${user._id}`}
              className={styles.profile__link}
            >
              <div className={styles.avatar__wrapper}>
                <img
                  src={
                    user.avatar
                      ? `${process.env.NEXT_PUBLIC_API_URL}/${user.avatar}`
                      : '/no_avatar_image.jpg'
                  }
                  width={75}
                  height={75}
                  alt={user.username}
                  className={styles.avatar}
                />
              </div>
            </Link>
          ) : (
            <Link
              href="/registration"
              className={styles.registration__button}
            >
              Registration
            </Link>
          )}
        </div>
      </header>
    </div>
  )
}