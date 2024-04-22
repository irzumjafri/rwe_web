import { useState, useEffect } from "react";
import Loading from "./Loading";
import CoordinateGridMapper from "./CoordinateGridMapper";

const DataTable = ({ sessionData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Check if sessionData is a Promise and if it is pending
    if (sessionData instanceof Promise && isLoading) {
      // If sessionData is a Promise and isLoading is true, show loading component
      sessionData.then((resolvedData) => {
        setData(resolvedData);
        setIsLoading(false); // Set isLoading to false when the promise is fulfilled
      });
    }
  }, [sessionData, isLoading]);

  if (isLoading && data) {
    // If isLoading is true, render loading component
    return <Loading />;
  } else {
    // If isLoading is false, render the table with the fetched data
    return <CoordinateGridMapper sessionData={data} />;
  }
};

export default DataTable;
