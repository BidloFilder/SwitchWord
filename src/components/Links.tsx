import { motion } from 'framer-motion';

interface Props {
    icon: any;
    link: string;
    linksStyles: string;
}
const Links = (props: Props) => {
    return (
        <motion.a
            href={props.link}
            target="_blank"
            whileHover={{ scale: 1.1, color: '#ffffff' }}
            transition={{ duration: .1 }}
            className={props.linksStyles}>
            {props.icon}
        </motion.a>
    )
}

export default Links;