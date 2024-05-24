import { ECurrentTab } from "@/types/common";
import { atom } from "jotai";

export const CurrentTabAtom = atom<ECurrentTab>(ECurrentTab.TRANSFER);
export const IsLoadingAtom = atom<boolean>(false);
