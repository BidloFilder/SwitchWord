import { useState } from 'react';
// @ts-ignore
import { useNavigate } from 'react-router-dom';

interface Props {
  icon: any;
  style: string;
  navigateTo: string;
}

const Navigation = (props: Props) => {
  const [showWord] = useState(props.icon);
  let navigate = useNavigate();

  return (
    <button
      className={props.style}
      onClick={() => {
        navigate(props.navigateTo);
      }}
    >
      {showWord}
    </button>
  );
};

export default Navigation;
