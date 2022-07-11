import { MdOutlineDeleteSweep } from 'react-icons/md';
import styles from '../components styles/DeleteAll.module.scss'
import { motion } from 'framer-motion'
import deleteAllAnimation from '../components animations/DeleteAllAnimations'

interface Props {
    deleteAll: (event: any) => void;
}

const DeleteAll = (props: Props) => {
    return (
        <motion.button
            variants={deleteAllAnimation}
            initial="initial"
            animate="animate"
            onClick={props.deleteAll}
            className={styles['delete-all']}>
            <MdOutlineDeleteSweep />
        </motion.button>
    )
}

export default DeleteAll;