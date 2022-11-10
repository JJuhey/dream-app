import React from 'react';

type PropsType = {
  children: React.ReactNode
  onClick(): void
}

const Button = ({ children, onClick }: PropsType) => {
  return (
    <div
      style={{
        display: 'inline-block',
        borderRadius: '3px', backgroundColor: '#8b3fb5', color: 'white',
        padding: '10px', paddingRight: '20px', paddingLeft: '20px',
        margin: '10px',
        cursor: 'pointer',
      }}
      onClick={onClick}>{children}
    </div>
  );
}

export default Button;
