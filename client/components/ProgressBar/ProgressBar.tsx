import React from 'react'
import styles from '../../styles/ProgressBar.module.scss'

interface ProgressBarProps {
	currentStep: number
	children: React.ReactNode
}

const steps = [
	'Upload image', 
	'Add name and description', 
	'Choose category'
]

export function ProgressBar({
	currentStep,
	children
}: ProgressBarProps) {
	return (
		<div className={styles.progress__bar}>
			<nav>
				{steps.map((step: string, index: number) => {
					const isCompleted = index < currentStep

					return (
						<div key={step}>
							<div className={isCompleted ? styles.completed : styles.step__number}>{isCompleted ? '✓' : index + 1}</div>

							<span>{step}</span>
						</div>
					)
				})}
			</nav>

			<div>{children}</div>
		</div>
	)
}
