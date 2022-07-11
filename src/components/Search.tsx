import styles from '../components styles/Search.module.scss'
import { motion } from 'framer-motion'
import searchAnimation from '../components animations/SearchAnimation'

interface Props {
    filterWords: any;
}

const Search = (props: Props) => {
    return (
        <motion.input
            variants={searchAnimation}
            initial="initial"
            animate="animate"
            placeholder="Search"
            onChange={props.filterWords}
            className={styles['search']}
        />
    )
}

export default Search;