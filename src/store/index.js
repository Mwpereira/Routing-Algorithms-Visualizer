import {create} from "zustand";
import {devtools, persist} from 'zustand/middleware';

const initialStoreState = {
    dijkstraResult: {},
    distanceVectorResult: {},
};

const useStore = create()(
    devtools(
        persist(
            (set) => ({
                setDijkstraResult: (result) => set((state) => ({
                    ...state,
                    dijkstraResult: {...result}
                })),
                setDistanceVectorResult: (result) => set((state) => ({
                    ...state,
                    distanceVectorResult: {...result}
                })),
                ...initialStoreState
            }),
            {
                name: 'routing-algorithms-store'
            }
        )
    )
);

export default useStore;
