import { useState, useEffect } from "react";

import { log } from "@utils/index";
import axios from "axios";

export const useApiGet = (callback: () => void) => {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAPIData = async () => {
    setLoading(true);
    try {
      callback();
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return [getAPIData, error, loading];
};
