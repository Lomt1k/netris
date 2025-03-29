import './Container.scss';
import { FC, ReactNode } from 'react';

type ContainerProps = {
  children?: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className='container'>
      {children}
    </div>
  )
}

export default Container;