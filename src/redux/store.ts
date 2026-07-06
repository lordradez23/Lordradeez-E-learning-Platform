import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/features/cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
    key: "cart",
    storage,
};
const persistedReducer = persistReducer(persistConfig, cartReducer);

const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(Store);

export default Store;
export type RootState = ReturnType<(typeof Store)["getState"]>;
export type AppDispatch = (typeof Store)["dispatch"];
