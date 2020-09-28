import React from "react";

import "components/Button.scss";

export default function Button(props) {
   return (
     <button className="Button">{props.children}</button> 
   );
}


//Change the component in here to render a button.
// It should use props.children value as the button text. 