'use client'

import styles from '../../styles/UploadPagesStyles/UploadImage.module.scss'

import { FileUpload } from '../FileUpload'

interface UploadImagePageProps {
	image: File | null
	setImage: (file: File | null) => void
	setCurrentStep: (step: number) => void
}

export default function UploadImagePage({
	image,
	setImage,
	setCurrentStep
}: UploadImagePageProps) {
	const handleSkip = async () => {
		const response = await fetch('no_image_for_projects.jpg')
		const blob = await response.blob()

		const file = new File([blob], 'no_image_for_projects.jpg', {
			type: blob.type
		})

		setImage(file)
		setCurrentStep(1)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.upload__buttons}>
					<FileUpload setFile={setImage}>
						<button
							type="button"
							className={styles.upload__image__btn}
						>
							{image ? 'Change image' : 'Add image'}
						</button>
					</FileUpload>

					<button
						type="button"
						className={styles.skip__image__btn}
						onClick={handleSkip}
					>
						Skip
					</button>
				</div>
			</div>
		</div>
	)
}
