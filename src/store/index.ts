// store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // chỉ lưu auth thôi
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // redux-persist có non-serializable data
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
