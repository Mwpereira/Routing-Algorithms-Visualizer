import 'bulma/css/bulma.min.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DIJKSTRAS_ALGORITHM_ROUTE, DISTANCE_VECTOR_ALGORITHM_ROUTE, HOME_ROUTE } from './constants/routes'
import Default from './layouts/default'
import { ScrollToTop } from './utilities/scroll-top-top'
import DijkstrasAlgorithm from './views/dijkstras-algorithm'
import DistanceVectorAlgorithm from './views/distance-vector-algorithm'
import Home from './views/home'

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
            <ToastContainer
                autoClose={2500}
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
    )
}

export default App
