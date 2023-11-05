
'use client'
import { useContext } from 'react';
import { AppContext } from 'contexts';

export const useAppContext = (key: any) => {
  const { store, updateStore } = useContext(AppContext);
  return {
    data: store[key],
    setData: (data: any) => {
      updateStore(key, data);
    },
  };
};

