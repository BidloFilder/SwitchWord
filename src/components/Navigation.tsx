import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  icon: any;
  style: string;
  navigateTo: string;
}

const Navigation = (props: Props) => {
  let navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.1, color: '#ffffff' }}
      transition={{ duration: 0.01 }}
      className={props.style}
      onClick={() => {
        navigate(props.navigateTo);
      }}
    >
      {props.icon}
    </motion.button>
  );
};

export default Navigation;
