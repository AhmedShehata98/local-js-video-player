import { Routes as DomRoutes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import { Root } from "../Pages/Root/Root";

const Routes = () => {
  return (
    <DomRoutes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
      </Route>
    </DomRoutes>
  );
};

export default Routes;
