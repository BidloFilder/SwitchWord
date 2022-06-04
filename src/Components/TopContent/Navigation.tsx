import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  icon: any;
  style: string;
  navigateTo: string;
}

const Navigation = (props: Props) => {
  const [showWord] = useState(props.icon);
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
      {showWord}
    </motion.button>
  );
};

export default Navigation;
