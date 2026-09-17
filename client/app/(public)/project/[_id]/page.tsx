import { ChoseProjectPageComponent } from '@/components/pages/ChoseProjectPageComponent'

interface ChoseProjectPageProps {
	params: Promise<{
		_id: string
	}>
}

export default async function ChoseProjectPage({
	params
}: ChoseProjectPageProps) {
	const { _id } = await params

	return <ChoseProjectPageComponent id={_id} />
}
