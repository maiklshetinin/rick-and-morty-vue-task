import axios from "axios";
import { ICharacterData, ILocation, ILocationData } from "../types/api.ts";
import { ElNotification } from "element-plus";
import { useStore } from "../store/index.ts";

const instance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic API wrapper with error handling
const api = async <T>(
  endpoint: string,
  method: "get" | "post" | "put" | "delete" = "get",
  params: Record<string, any> = {}
): Promise<T> => {
  //STORES
  const store = useStore();
  //ACTIONS
  const { stopLoading, startLoading } = store;

  try {
    startLoading("Loading ...");

    const response = await instance.request<T>({
      url: endpoint,
      method,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error in ${method.toUpperCase()} request to ${endpoint}:`,
      error
    );

    const errorMessage =
      (error as Error).message || "An unknown error occurred.";

    ElNotification({
      title: "Error",
      message: errorMessage,
      type: "error",
      duration: 2000,
    });
    throw error;
  } finally {
    stopLoading();
  }
};

// Get all characters
export const getAllCharacters = async (
  pageUrl: string | null = null,
  filters: { name?: string; locationId?: string } = {}
): Promise<{ results: ICharacterData[]; info: any }> => {
  const endpoint = pageUrl || "/character";
  const params: Record<string, string> = { ...filters };
  return api<{ results: ICharacterData[]; info: any }>(endpoint, "get", params);
};

// Get characters by location ID
export const getCharactersByLocationId = async (
  locationId: number,
  page: number = 1,
  limit: number = 20
): Promise<ICharacterData[]> => {
  const locationData = await api<{ residents: string[] }>(
    `/location/${locationId}`
  );
  const { residents } = locationData;

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedResidents = residents.slice(start, end);

  const characterRequests = paginatedResidents.map((url: string) =>
    api<ICharacterData>(url)
  );
  const charactersResponses = await Promise.all(characterRequests);

  return charactersResponses;
};

// Get character by ID
export const getCharacterById = async (id: number): Promise<ICharacterData> => {
  return api<ICharacterData>(`/character/${id}`);
};

// Get locations
export const getLocations = async (): Promise<ILocation[]> => {
  const response = await api<{ results: ILocationData[] }>("/location");

  const result = response.results.map((location) => ({
    id: location.id,
    name: location.name,
    type: location.type,
    dimension: location.dimension,
  }));

  return result;
};
