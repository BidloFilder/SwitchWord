import styles from './ErrorPage.module.scss';
import { motion } from 'framer-motion';
import errorPageAnimation from './ErrorPageAnimaitons';

const ErrorPage = () => {
  return <motion.div
    variants={errorPageAnimation}
    initial="initial"
    animate="animate"
    className={styles['error-page']}>
    Page Does Not Exist
  </motion.div>;
};

export default ErrorPage;
