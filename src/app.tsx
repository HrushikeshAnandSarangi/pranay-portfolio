import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Lightbox } from "./components/Lightbox";
import Loader from "./components/Loader";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Loader />
          <Suspense>{props.children}</Suspense>
          <Lightbox />
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
