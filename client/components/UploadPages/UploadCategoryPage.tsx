'use client'

import clsx from 'clsx'

import styles from '../../styles/UploadPagesStyles/UploadCategory.module.scss'
import { useState } from 'react'

interface UploadCategoryPageProps {
	category: string
	setCategory: (category: string) => void
}

export default function UploadCategoryPage({
	category,
	setCategory,
}: UploadCategoryPageProps) {
	const [isOpen, setIsOpen] = useState('none')

	const handleSetCategory = (
		categoryName: string,
	) => {
		setCategory(categoryName)
		setIsOpen('none')
	}

	const handleToggle = () => {
		setIsOpen(prev =>
			prev === 'none' ? 'flex' : 'none',
		)
	}

	const categories = ['Site', 'Design']

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.box}>
					<input
						type="text"
						className={
							styles.choose__category
						}
						placeholder="Choose category..."
						value={category}
						readOnly
					/>

					<button
						type="button"
						className={
							styles.choose__category__btn
						}
						onClick={handleToggle}
					>
						<i className="bi bi-caret-down-fill"></i>
					</button>
				</div>

				<div
					className={clsx(
						styles.categories,
					)}
					style={{
						display: isOpen,
					}}
				>
					{categories.map(
						categoryName => (
							<span
								key={
									categoryName
								}
								className={
									styles.category__name
								}
								onClick={() =>
									handleSetCategory(
										categoryName,
									)
								}
							>
								{categoryName}
							</span>
						),
					)}
				</div>
			</div>
		</div>
	)
}