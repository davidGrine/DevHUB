import styles from '../../styles/CommentModalOpenBtn.module.scss'

interface CommentModalOpenBtnProps {
  onClick: () => void
}

export default function CommentModalOpenBtn({
  onClick,
}: CommentModalOpenBtnProps) {
  return (
    <button
      onClick={onClick}
      className={styles.button}
    >
      Add Comment
    </button>
  )
}