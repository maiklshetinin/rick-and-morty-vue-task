import { defineStore } from "pinia";
import { ElLoading } from "element-plus";

import {
  getAllCharacters,
  getCharactersByLocationId,
  getLocations,
} from "../api";
import { LoadingInstance } from "element-plus/es/components/loading/src/loading.mjs";
import { ICharacterData, ILocation } from "src/types/api";

export interface State {
  characters: ICharacterData[];
  locations: ILocation[];
  nextPageUrl: string | null;
  loadingInstance: any | null;
}

export const useStore = defineStore("store", {
  state: (): State => ({
    characters: [],
    locations: [],
    nextPageUrl: "",
    loadingInstance: null,
  }),

  actions: {
    async startLoading(text = "Loading...") {
      if (!this.loadingInstance) {
        this.loadingInstance = ElLoading.service({
          lock: true,
          text,
          background: "rgba(0, 0, 0, 0.7)",
        }) as unknown as LoadingInstance;
      }
    },

    stopLoading() {
      if (this.loadingInstance) {
        this.loadingInstance.close();
        this.loadingInstance = null;
      }
    },

    async getCharacters(
      pageUrl: string | null,
      filter: { name?: string; locationId?: number } = {},
      page: number = 1
    ) {
      if (filter.locationId) {
        const charactersFromLocation = await getCharactersByLocationId(
          filter.locationId,
          page
        );
        this.characters = [...this.characters, ...charactersFromLocation];

        if (charactersFromLocation.length === 20) {
          this.nextPageUrl = "next";
        } else {
          this.nextPageUrl = null;
        }
      } else {
        const response = await getAllCharacters(pageUrl, {
          name: filter?.name || "",
        });
        this.characters = [...this.characters, ...response.results];
        this.nextPageUrl = response.info.next;
      }
    },

    async getLocations() {
      this.locations = await getLocations();
    },
  },
});
