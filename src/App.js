import 'bulma/css/bulma.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from "./views/home";
import {DIJKSTRAS_ALGORITHM_ROUTE, DISTANCE_VECTOR_ALGORITHM_ROUTE, HOME_ROUTE} from "./constants/routes";
import DijkstrasAlgorithm from "./views/dijkstras-algorithm";
import DistanceVectorAlgorithm from "./views/distance-vector-algorithm";
import {DIJKSTRAS_ALGORITHM_PAGE, DISTANCE_VECTOR_ALGORITHM_PAGE} from "./constants/pages";
import {ScrollToTop} from "./utilities/scroll-top-top";
import Default from "./layouts/default";
import {Slide, ToastContainer} from "react-toastify";
import {distanceVectorAlgorithm} from "./algorithms/distance-vector-algorithm";
import {dijkstra} from "./algorithms/dijkstra-algorithm";

function App() {
    // Example usage

    const graph1 = {
        A: { B: 5, C: 1 },
        B: { A: 5, C: 2, D: 1 },
        C: { A: 1, B: 2, D: 4 },
        D: { B: 1, C: 4 },
    };


    const graph = {
        X: { Y: 1, Z: 5 },
        Y: { X: 1, Z: 2 },
        Z: { X: 5, Y: 2 }
    };

    console.log("STARTED");
    console.table(distanceVectorAlgorithm(graph))
    console.log("ENDED")

    //dijkstra(graph1, "A")

    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    <Route element={<Navigate to={HOME_ROUTE}/>} path="*"/>
                    <Route element={<Default/>} path={HOME_ROUTE}>
                        <Route element={<Home/>} path={HOME_ROUTE}/>
                        <Route element={<DijkstrasAlgorithm/>} path={DIJKSTRAS_ALGORITHM_ROUTE}/>
                        <Route element={<DistanceVectorAlgorithm/>} path={DISTANCE_VECTOR_ALGORITHM_ROUTE}/>
                    </Route>
                </Routes>
            </ScrollToTop>
            <ToastContainer
                autoClose={3000}
                closeOnClick
                draggable
                hideProgressBar={false}
                limit={3}
                newestOnTop={true}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                position="bottom-right"
                rtl={false}
                theme="light"
                transition={Slide}
            />
        </BrowserRouter>
    );
}

export default App;
