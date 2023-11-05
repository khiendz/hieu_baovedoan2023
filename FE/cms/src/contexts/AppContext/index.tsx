'use client'
import React, { createContext, useState, ReactNode } from 'react';

interface StoreType {
    [key: string]: any;
}

interface AppContextType {
    store: StoreType;
    updateStore: (key: string, payload: any) => void;
}

const initialValues: StoreType = {};

export const AppContext = createContext<AppContextType>({
    store: initialValues,
    updateStore: () => {},
});

interface AppProviderProps {
    children: ReactNode;
    initialValues?: StoreType;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, initialValues }) => {
    const [store, setStore] = useState<StoreType>(initialValues || {});

    const updateStore = (key: string, payload: any) => {
        setStore((prevStore) => ({
            ...prevStore,
            [key]: payload,
        }));
    };

    const value: AppContextType = {
        store,
        updateStore,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
