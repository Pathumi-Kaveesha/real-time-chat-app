import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

//type for user object returned by backend
export interface AuthUser {
    _id: string;
    fullName: string;
    email: string;
    profilePic?: string;
}

//type for the Zustand store
interface AuthStore {
    authUser: AuthUser | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    checkAuth: () => Promise<void>;
    signup: (data: { fullName: string; email: string; password: string }) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get):AuthStore => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        try {
            set({ isSigningUp: true });
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in signup:", error);
        } finally {
            set({ isSigningUp: false });
        }
    }  
}));
