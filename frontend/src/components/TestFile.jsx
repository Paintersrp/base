import React from "react";
import { CSSTransition } from "react-transition-group";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
enter: {
opacity: 0,
transform: "scale(0.9)",
},
enterActive: {
opacity: 1,
transform: "scale(1)",
transition: "all 400ms ease-in-out",
},
exit: {
opacity: 1,
transform: "scale(1)",
},
exitActive: {
opacity: 0,
transform: "scale(0.9)",
transition: "all 400ms ease-in-out",
},
});

const FadeAndGrow = ({ children, in: inProp }) => {
const classes = useStyles();

return (
<CSSTransition
timeout={400}
classNames={{
enter: classes.enter,
enterActive: classes.enterActive,
exit: classes.exit,
exitActive: classes.exitActive,
}}
unmountOnExit
in={inProp}
>
{children}
</CSSTransition>
);
};

export default FadeAndGrow;

And here's how you can use the FadeAndGrow component in your code:

import React, { useState } from "react";
import FadeAndGrow from "./FadeAndGrow";

const CardBase = ({ plan }) => {
const [editing, setEditing] = useState(false);

return (
<div>
<button onClick={() => setEditing(!editing)}>
{editing ? "Close Edit" : "Edit"}
</button>
<FadeAndGrow in={editing}>
{editing ? <EditComponent /> : <StandardComponent />}
</FadeAndGrow>
</div>
);
};

export default CardBase;
