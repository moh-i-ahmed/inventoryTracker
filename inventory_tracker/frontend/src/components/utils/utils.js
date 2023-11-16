import { useEffect } from 'react';

export const setTitle = ({ title }) => {
    useEffect(() => {
        document.title = title;
    });
}

