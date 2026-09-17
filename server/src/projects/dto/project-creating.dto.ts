import { IComment } from 'src/types/comments.type'

export class ProjectCreatingDto {
  declare readonly name: string;

  declare readonly description: string;

  declare readonly category: string;
	
	declare readonly comments: IComment[]
}
