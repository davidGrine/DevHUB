'use client'

import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProjectById } from '@/store/slices/project.slice'

import styles from '@/styles/ChoseProjectPage.module.scss'

import CommentModalOpenBtn from '../CommentModalOpenBtn/CommentModalOpenBtn'
import { AddCommentModal } from '../AddCommentModal/AddCommentModal'

interface ChoseProjectPageComponentProps {
  id: string
}

export function ChoseProjectPageComponent({
  id,
}: ChoseProjectPageComponentProps) {
  const dispatch = useAppDispatch()

  const [isAddCommentModalOpen, setIsAddCommentModalOpen] =
    useState(false)

  const {
    project,
    loading,
    error,
  } = useAppSelector(state => state.projects)

  useEffect(() => {
    dispatch(fetchProjectById(id))
  }, [dispatch, id])

  if (loading) {
    return <div>Loading project...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${project.image}`

  const comments = Array.isArray(project.comments)
    ? project.comments
    : []

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.section__1__image}>
          <img
            src={imageUrl}
            alt={project.name}
            width={500}
            height={750}
          />
        </div>

        <div className={styles.section__2__info}>
          <h1>{project.name}</h1>

          <p>{project.description}</p>
        </div>
      </div>

      <div className={styles.likes}>
        {project.likes}
      </div>

      <CommentModalOpenBtn
        onClick={() => setIsAddCommentModalOpen(true)}
      />

      {isAddCommentModalOpen && (
        <AddCommentModal
          projectId={project._id}
          onClose={() => setIsAddCommentModalOpen(false)}
        />
      )}

      <div className={styles.section__3__comments}>
        {comments.length === 0 ? (
          <div>
            No comments found
          </div>
        ) : (
          comments.map(comment => (
            <div
              key={comment._id}
              className={styles.comment}
            >
              <p>{comment.name}</p>
              <p>{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}