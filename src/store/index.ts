// store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authSlice";

// 🔹 1. Cấu hình persist riêng cho auth
// SECURITY: accessToken is NOT persisted - it exists only in RAM (Redux state)
// This prevents XSS attacks. Token is lost on page reload and must be refreshed.
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"], // Only persist user info and auth flag
  // accessToken and isLoading are explicitly excluded - they're in-memory only
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
