import { Transition  } from 'react-transition-group';
import { useRef } from 'react';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  position: 'fixed',
  top: '35%',
  left: '40px',
  //   right: '40px',
  //   bottom: '40px',
  // border: '1px solid #ccc',
  width: '80%',
  background: 'rgb(255 255 255)',
  color: '#ffffff',
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '8px',
  outline: 'none',
  padding: '10px'
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0, pointerEvents: 'none' },
  exited: { opacity: 0, pointerEvents: 'none' },
};

function Modal({ inProp, children }: any) {
  const nodeRef = useRef(null);
  return (
    <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle,
            // @ts-ignore
            ...transitionStyles[state]
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
}

export default Modal;
