import { useCallback, useEffect, useState } from "react";
import { getServers } from "../services/serverService";
import type { Server } from "../types/Server";

export function useServers() {
  const [servers, setServers] = useState<Server[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadServers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getServers();
      setServers(data);
    } catch (error) {
      console.error("Failed to load servers:", error);
      setError("Unable to load server data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadServers();
  }, [loadServers]);

  return {
    servers,
    isLoading,
    error,
    reload: loadServers,
  };
}