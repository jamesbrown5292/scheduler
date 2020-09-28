import React from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions";

export default function Button(props) {
   let buttonClass = "button";

   if (props.confirm) {
      buttonClass += " button--confirm"
   }

   if (props.danger) {
      buttonClass += " button--danger"
   }



   return (
      <button 
         className={buttonClass} 
         onClick={action("button-clicked")}
         disabled = {props.disabled}
      >
                        
         {props.children}
         
      </button>
   );
}


//Change the component in here to render a button.
// It should use props.children value as the button text. 