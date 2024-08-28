import ReactDOM from "react-dom/client";
import { Widget } from "./components/Widget";
import { normalizeAttribute } from "./utils/utils";

interface Props {
  [key: string]: string;
}

// Custom web component
class WidgetWebComponent extends HTMLElement {
  constructor() {
    // Calls super() constructor to initialize custom element and attaches a ShddowDOM with mode "open"
    // This allows the element to encapsulate its styles and markups.
    super();
    this.attachShadow({ mode: "open" });
  }

  // Lifecycle callback method that gets called when the element is added to the DOM
  connectedCallback() {
    // Retrieve the element's attributes and converts it into proper strings
    const props = this.getPropsFromAttributes();

    // Creates a React root on the shadow DOM and renders the Widget component
    if (this.shadowRoot) {
      const root = ReactDOM.createRoot(this.shadowRoot as ShadowRoot);
      root.render(<Widget {...props} />);
    } else {
      console.error("ShadowRoot is not available");
    }
  }

  // Iterates over the element's attributes, normalizes their name using custom util function "normalizeAttribute"
  // "normalizeAttribute" -> convert kekab case to camelCase
  // then returns an object that can be used as props for the React component
  getPropsFromAttributes(): Props {
    const props: Props = {};
    for (const { name, value } of this.attributes) {
      props[normalizeAttribute(name)] = value;
    }
    return props;
  }
}

export default WidgetWebComponent;
