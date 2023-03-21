import { IClientState } from "@/types";
import { StateCreator } from "zustand";

export interface IPeerState {
  displayName: string;
  setDisplayName: (displayName: string) => void;
}

const createPeerSlice: StateCreator<IClientState, [], [], IPeerState> = (
  set,
  get
) => ({
  displayName: "",

  setDisplayName: (displayName) => {
    set(() => ({ displayName }));
  },
});

export default createPeerSlice;
