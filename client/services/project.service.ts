import {
  IComment,
  IProject,
  IProjectsResponse,
} from '@/types/project.type'

import { api } from './api'

export const projectService = {
  async getProjects(
    page: number,
    limit: number,
  ): Promise<IProjectsResponse> {
    const response = await api.get<IProjectsResponse>(
      '/projects',
      {
        params: {
          page,
          limit,
        },
      },
    )

    return response.data
  },

  async getProjectById(
    id: string,
  ): Promise<IProject> {
    const response = await api.get<IProject>(
      `/projects/${id}`,
    )

    return response.data
  },

  async createProject(
    formData: FormData,
  ): Promise<IProject> {
    const response = await api.post<IProject>(
      '/projects',
      formData,
    )

    return response.data
  },

  async deleteProject(id: string): Promise<void> {
    const response = await api.delete(
      `/projects/${id}`,
    )

    return response.data
  },

  async searchProjects(
    query: string,
  ): Promise<IProject[]> {
    const response = await api.get<IProject[]>(
      '/projects/search',
      {
        params: {
          query,
        },
      },
    )

    return response.data
  },

  async addComment(
    projectId: string,
    text: string,
  ): Promise<IComment> {
    const response = await api.post<IComment>(
      `/projects/comments/${projectId}`,
      {
        text,
      },
    )

    return response.data
  },
}