import ProjectPage from '@/components/pages/ProjectPage'
import { Suspense } from 'react'


export default function Projects() {
	return <Suspense fallback={<div>Loading...</div>}>
		<ProjectPage />
	</Suspense>
}
