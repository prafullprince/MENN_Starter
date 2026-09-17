import type { AppStore } from "./store";

let storeRef: AppStore | null = null;

export const setStoreRef = (store: AppStore) => {
  storeRef = store;
};

export const getStoreRef = (): AppStore => {
  if (!storeRef) {
    throw new Error("Store has not been initialized yet");
  }
  return storeRef;
};
