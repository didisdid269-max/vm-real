import { MiniBrowser } from "../browser/MiniBrowser";
import "./BrowserApp.css";

export function BrowserApp() {
  return (
    <div className="browser-app">
      <MiniBrowser initialUrl="https://duckduckgo.com/" />
    </div>
  );
}
