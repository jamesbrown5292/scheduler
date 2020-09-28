import React from "react";
import "components/Button.scss";
import { action } from "@storybook/addon-actions";
import classNames from "classnames";

export default function Button(props) {
   const buttonClass = classNames('button', {
      'button--confirm': props.confirm,
      'button--danger': props.danger
   });
   


   return (
      <button 
         className={buttonClass} 
         onClick={props.onClick}
         disabled = {props.disabled}
      >
                        
         {props.children}

      </button>
   );
}


//Change the component in here to render a button.
// It should use props.children value as the button text. 