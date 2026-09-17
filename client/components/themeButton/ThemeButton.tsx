'use client'

import { useEffect, useState } from 'react'
import styles from '../../styles/ThemeButton.module.scss'

export default function ThemeButton() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)

      document.documentElement.setAttribute(
        'data-theme',
        savedTheme
      )
    }
  }, [])

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    document.documentElement.setAttribute(
      'data-theme',
      newTheme
    )

    setTheme(newTheme)

    localStorage.setItem('theme', newTheme)
  }

  return (
    <button onClick={handleThemeChange} className={styles.theme__button}>
      <i className="bi bi-circle-half"></i>
      <span> Change theme</span>
    </button>
  )
}