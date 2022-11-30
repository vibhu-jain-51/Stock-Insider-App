import React, { createContext, useContext, useEffect, useState } from "react";

const defaultContextValue = {
  tableColumn: [],
  tableValues: [],
  dupTableValues: [],
  setTableColumn: () => {},
  setDupTableValues: () => {},
  setTableValues: () => {},
};

const ApplicationContext = createContext(defaultContextValue);

export const ApplicationContextProvider = ({ children }) => {
  const [tableColumn, setTableColumn] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const [dupTableValues, setDupTableValues] = useState([]);

  useEffect(() => {
    setDupTableValues(tableValues);
  }, [tableValues]);

  const value = {
    tableColumn,
    tableValues,
    dupTableValues,
    setTableColumn,
    setDupTableValues,
    setTableValues,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  return useContext(ApplicationContext);
};
