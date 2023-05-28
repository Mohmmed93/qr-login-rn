import { getRoot, IStateTreeNode } from "mobx-state-tree"
import { RootStore, RootStoreModel } from "../RootStore"

export const getRootStore = (self: IStateTreeNode): RootStore => {
  return getRoot<typeof RootStoreModel>(self)
}
