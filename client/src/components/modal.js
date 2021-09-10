import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      onClick={(e) => {
        if (e.target.classList.contains('dismiss')) {
          props.onDismiss();
        }
      }}
      className="dismiss h-screen w-screen bg-black bg-opacity-80 flex justify-center items-center absolute inset-0"
    >
      <div
        className="
        p-3
        bg-gray-200 
        shadow 
        w-96 
        h-52 
        flex 
        flex-col
        justify-between
        items-center"
      >
        <h3 className="header text-2xl self-start">{props.title}</h3>
        <p className="content text-center ">{props.content}</p>
        {props.actions}
      </div>
    </div>,
    document.querySelector('#modal')
  );
};
export default Modal;
