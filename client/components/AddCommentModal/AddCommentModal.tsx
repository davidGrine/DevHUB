'use client'

import { useAppDispatch } from '@/store/hooks'
import { addComment } from '@/store/slices/project.slice'
import { useState } from 'react'
import styles from '../../styles/AddCommentModal.module.scss'

interface Props {
	projectId: string
	onClose: () => void
}

export function AddCommentModal({ projectId, onClose }: Props) {
	const dispatch = useAppDispatch()

	const [text, setText] = useState('')

	const [formErrors, setFormErrors] = useState<{
		text?: string
	}>({})

	const [serverError, setServerError] = useState('')

	const validateForm = () => {
		const errors: typeof formErrors = {}

		if (!text.trim()) {
			errors.text = 'Please enter your comment'
		}

		setFormErrors(errors)

		return Object.keys(errors).length === 0
	}

	const getServerErrorMessage = (error: unknown) => {
		if (!error) {
			return 'Something went wrong. Please try again.'
		}

		const message = typeof error === 'string' ? error : JSON.stringify(error)

		const lowerMessage = message.toLowerCase()

		if (lowerMessage.includes('text')) {
			return 'The comment is too short'
		}

		return 'Comment failed. Please check your information and try again.'
	}

	const handleSubmit = async () => {
		setServerError('')

		if (!validateForm()) {
			return
		}

		try {
			await dispatch(
				addComment({
					projectId,
					text: text.trim()
				})
			).unwrap()

			setText('')
			setFormErrors({})

			onClose()
		} catch (error) {
			console.log('ADD COMMENT ERROR:', error)
			console.log('ADD COMMENT ERROR JSON:', JSON.stringify(error))

			setServerError(getServerErrorMessage(error))
		}
	}

	return (
		<div
			data-modal
			data-state="closed"
			className={styles.add__comment__modal__wrapper}
		>
			<div className={styles.add__comment__modal}>
				<h1>Add Comment</h1>

				<textarea
					placeholder="Enter your comment..."
					value={text}
					onChange={e => {
						setText(e.target.value)

						if (formErrors.text) {
							setFormErrors({})
						}

						if (serverError) {
							setServerError('')
						}
					}}
				/>

				{formErrors.text && <p>{formErrors.text}</p>}

				{serverError && <p>{serverError}</p>}

				<button onClick={handleSubmit}>Add</button>
			</div>
		</div>
	)
}
