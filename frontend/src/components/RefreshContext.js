// RefreshContext.js
import React, { createContext, useContext, useState } from 'react';

const RefreshContext = createContext();

export const useRefresh = () => {
    return useContext(RefreshContext);
};

export const RefreshProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = () => setRefresh(true);
    const resetRefresh = () => setRefresh(false);

    return (
        <RefreshContext.Provider value={{ refresh, triggerRefresh, resetRefresh }}>
            {children}
        </RefreshContext.Provider>
    );
};
