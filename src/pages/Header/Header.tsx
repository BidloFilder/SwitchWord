import Navigation from '../../components/Navigation';
import NavStyles from '../../components styles/Navigation.module.scss';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { RiHome2Line } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import styles from './Header.module.scss'
import { logoAnimation, headerAnimation } from './HeaderAnimations'


const Header = () => {
    return (
        <motion.div
            variants={headerAnimation}
            initial="initial"
            animate="animate"
            className={styles['top-box']}
        >
            <motion.span
                className={styles['logo']}
                variants={logoAnimation}
                initial="initial"
                animate="animate"
            ></motion.span>
            <Navigation
                icon={<RiHome2Line />}
                style={NavStyles['home']}
                navigateTo={'/'}
            />
            <Navigation
                icon={<AiOutlineUnorderedList />}
                style={NavStyles['list']}
                navigateTo={'list'}
            />
            <Navigation
                icon={<AiOutlineInfoCircle />}
                style={NavStyles['about']}
                navigateTo={'about'}
            />
        </motion.div>
    )
}

export default Header;