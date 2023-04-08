import {create} from "zustand";
import {devtools, persist} from 'zustand/middleware';

const initialStoreState = {
    admin: false,
};

const useStore = create()(
    devtools(
        persist(
            (set) => ({
                emptyShoppingCart: () => set((state) => ({
                    ...state,
                    admin: false
                })),
                ...initialStoreState
            }),
            {
                name: 'routing-algorithms-school-store'
            }
        )
    )
);

export default useStore;
