'use client'

import styles from '../../styles/UploadPagesStyles/UploadNameAndDescription.module.scss'

interface UploadNameDescriptionPageProps {
	name: string
	description: string
	setName: (value: string) => void
	setDescription: (value: string) => void
}

export default function UploadNameDescriptionPage({
	name,
	description,
	setName,
	setDescription,
}: UploadNameDescriptionPageProps) {
	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={event =>
					event.preventDefault()
				}
			>
				<input
					type="text"
					name="name"
					className={styles.name__input}
					placeholder="Name..."
					value={name}
					onChange={event =>
						setName(event.target.value)
					}
				/>

				<textarea
					name="description"
					className={
						styles.description__input
					}
					rows={5}
					placeholder="Description...(255 characters max)"
					value={description}
					onChange={event =>
						setDescription(
							event.target.value,
						)
					}
				/>
			</form>
		</div>
	)
}