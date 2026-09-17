'use client'

import { useEffect, useState } from 'react'

import UploadImagePage from '../UploadPages/UploadImagePage'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import UploadNameDescriptionPage from '../UploadPages/UploadNameDescriptionPage'
import UploadCategoryPage from '../UploadPages/UploadCategoryPage'

import styles from '../../styles/UploadProject.module.scss'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { createProject } from '@/store/slices/project.slice'
import { useRouter } from 'next/navigation'
import { fetchCurrentUser } from '@/store/slices/user.slice'

export default function UploadProject() {
	const router = useRouter()

	const dispatch = useAppDispatch()

	const creating = useAppSelector(state => state.projects.creating)

	const { 
		isAuthenticated
	 } = useAppSelector(state => state.auth)

	 const {
		user
	 } = useAppSelector(state => state.user)

	const [currentStep, setCurrentStep] = useState(0)

	const [image, setImage] = useState<File | null>(null)

	const [name, setName] = useState('')

	const [description, setDescription] = useState('')

	const [category, setCategory] = useState('')

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')

		if (!accessToken) {
			router.replace('/registration')
			return
		}

		dispatch(fetchCurrentUser())
	}, [dispatch, isAuthenticated])

	const handlePrevStep = () => {
		setCurrentStep(prev => prev - 1)
	}

	const handleNextStep = () => {
		setCurrentStep(prev => prev + 1)
	}

	const handlePublish = async () => {
		if (!name.trim()) {
			alert('Enter project name')

			return
		}

		if (!description.trim()) {
			alert('Enter project description')

			return
		}

		if (!category) {
			alert('Choose project category')

			return
		}

		if (!image) {
			alert('Choose project image')

			return
		}

		const formData = new FormData()

		formData.append('name', name)
		formData.append('description', description)
		formData.append('category', category)
		formData.append('image', image)

		try {
			await dispatch(createProject(formData)).unwrap()

			alert('Project successfully created')

			router.push('/projects')

			setImage(null)
			setName('')
			setDescription('')
			setCategory('')
		} catch (error) {
			console.error('Failed to create project:', error)

			alert('Failed to create project')
		}
	}

	return (
		<div className={styles.wrapper__upload__project}>
			<ProgressBar currentStep={currentStep}>
				{currentStep === 0 && (
					<UploadImagePage
						image={image}
						setImage={setImage}
						setCurrentStep={setCurrentStep}
					/>
				)}

				{currentStep === 1 && (
					<UploadNameDescriptionPage
						name={name}
						description={description}
						setName={setName}
						setDescription={setDescription}
					/>
				)}

				{currentStep === 2 && (
					<UploadCategoryPage
						category={category}
						setCategory={setCategory}
					/>
				)}
			</ProgressBar>

			<div className={styles.next__prev__btns}>
				<button
					className={styles.prev__step__btn}
					onClick={handlePrevStep}
					disabled={currentStep === 0}
				>
					Prev
				</button>

				{currentStep === 2 ? (
					<button
						className={styles.publish__btn}
						onClick={handlePublish}
						disabled={creating}
					>
						{creating ? 'Publishing...' : 'Publish'}
					</button>
				) : (
					<button
						className={styles.next__step__btn}
						onClick={handleNextStep}
					>
						Next
					</button>
				)}
			</div>
		</div>
	)
}
