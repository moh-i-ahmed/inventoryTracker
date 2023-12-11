import { useEffect, useCallback  } from 'react';
import { useNavigate } from "react-router-dom";

// Custom hook to set a page title
export const setTitle = ({ title }) => {
    useEffect(() => {
        document.title = title;
    });
}

// Custom hook to navigate to a given path
export const useNavigateToPath = () => {
    let navigate = useNavigate();

    return useCallback((newPath) => {
        navigate(newPath);
    }, [navigate]);
}