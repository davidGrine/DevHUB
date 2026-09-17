export interface IComment {
	_id: string
	name?: string
	text: string
}

export interface IProject {
	_id: string
	name: string
	description: string
	image: string
	category: string
	likes: number
	comments: IComment[]
	userId: string
}

export interface IProjectsResponse { 
	projects: IProject[] 
	total: number 
	page: number 
	limit: number 
	totalPages: number 
}