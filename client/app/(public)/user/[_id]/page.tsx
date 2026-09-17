import { UserProfilePage } from '@/components/pages/UserProfilePage'

interface UserProfilePageProps {
	params: Promise <{
		_id: string
	}>
}

export default async function UserProfile({ params }: UserProfilePageProps) {

	const { _id } = await params
	
	return <UserProfilePage id={_id}/>
}
