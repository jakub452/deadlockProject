import styles from './LoadingScreen.module.css'
const LoadingScreen = ({ isLoading }) => {
  if(!isLoading){
    return
  }
  return (
    <div className={styles.LoadingScreen}>LoadingScreen</div>
  )
}

export default LoadingScreen