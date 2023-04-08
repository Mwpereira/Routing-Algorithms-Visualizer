import 'bulma/css/bulma.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./views/home";
import {DIJKSTRAS_ALGORITHM_ROUTE, DISTANCE_VECTOR_ALGORITHM_ROUTE, HOME_ROUTE} from "./constants/routes";
import DijkstrasAlgorithm from "./views/dijkstras-algorithm";
import DistanceVectorAlgorithm from "./views/distance-vector-algorithm";
import {DIJKSTRAS_ALGORITHM_PAGE, DISTANCE_VECTOR_ALGORITHM_PAGE} from "./constants/pages";
import {ScrollToTop} from "./utilities/scroll-top-top";
import Default from "./layouts/default";

function App() {
  return (
      <BrowserRouter>
        <ScrollToTop>
            <Routes>
                <Route element={<Navigate to={HOME_ROUTE} />} path="*" />
                <Route element={<Default />} path={HOME_ROUTE}>
                    <Route element={<Home />} path={HOME_ROUTE} />
                    <Route element={<DijkstrasAlgorithm />} path={DIJKSTRAS_ALGORITHM_ROUTE} />
                    <Route element={<DistanceVectorAlgorithm />} path={DISTANCE_VECTOR_ALGORITHM_ROUTE} />
                </Route>
            </Routes>
        </ScrollToTop>
      </BrowserRouter>
  );
}

export default App;
