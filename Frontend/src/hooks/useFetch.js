import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export function useFetch() {
    const [loading, setLoading] = useState(false);

    const fetchDataBackend = async (url, data = null, method = "GET", headers = {}) => {
        const loadingToast = toast.loading("Procesando solicitud...");
        setLoading(true);
        
        try {
            const token = localStorage.getItem("token");
            const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

            const response = await axios({
                method,
                url: `${import.meta.env.VITE_BACKEND_URL}${url}`,
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders,
                    ...headers,
                },
                data,
            });

            toast.dismiss(loadingToast);
            toast.success(response?.data?.message || response?.data?.msg || "Operación exitosa");
            return response?.data;

        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error(error.response?.data?.error || error.response?.data?.message || "Ocurrió un error inesperado");
            console.error(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { fetchDataBackend, loading };
}