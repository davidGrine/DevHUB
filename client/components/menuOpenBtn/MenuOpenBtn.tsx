'use client'

import { useEffect, useState } from 'react'
import styles from '../../styles/Header.module.scss'

export default function MenuOpenBtn() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  useEffect(() => {
    const sidebar = document.querySelector(
      '[data-sidebar]'
    ) as HTMLElement | null

    if (!sidebar) return

    sidebar.style.transform = isOpen
      ? 'translateX(0)'
      : 'translateX(-250px)'

    sidebar.setAttribute(
      'data-state',
      isOpen ? 'open' : 'closed'
    )
  }, [isOpen])

  return (
    <button
      className={styles.menu__open__btn}
      onClick={handleToggle}
    >
      <i
        className={
          isOpen
            ? 'bi bi-x-lg'
            : 'bi bi-list'
        }
      ></i>
    </button>
  )
}