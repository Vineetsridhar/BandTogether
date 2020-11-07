import * as React from "react";
import * as ReactDOM from "react-dom";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

import { Content } from "./Content";

initializeIcons();

ReactDOM.render(<Content />, document.getElementById("content"));
