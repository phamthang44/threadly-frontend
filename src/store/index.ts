// store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authSlice";

// 🔹 1. Cấu hình persist riêng cho auth
const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "isAuthenticated"], // chỉ lưu thông tin user & flag
};

// 🔹 2. Tạo persisted reducer cho auth
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// 🔹 3. Combine toàn bộ reducers
const rootReducer = combineReducers({
    auth: persistedAuthReducer,
});

// 🔹 4. Tạo store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // bỏ check do redux-persist chứa non-serializable
        }),
});

// 🔹 5. Persistor để dùng với <PersistGate>
export const persistor = persistStore(store);

// 🔹 6. Type helpers (TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
