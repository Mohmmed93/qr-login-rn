import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authUserName: types.optional(types.string, ""),
    authEmail: types.optional(types.string, ""),
    authPassword: types.optional(types.string, ""),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationErrors() {
      return {
        authUserName: (function () {
          if (store.authUserName.length === 0) return "can't be blank"
          if (store.authUserName.length < 4) return "must be at least 4 characters"
          return ""
        })(),
        authEmail: (function () {
          if (store.authEmail.length === 0) return "can't be blank"
          if (store.authEmail.length < 6) return "must be at least 6 characters"
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
            return "must be a valid email address"
          return ""
        })(),
        authPassword: (function () {
          if (store.authPassword.length === 0) return "can't be blank"
          if (store.authPassword.length < 6) return "must be at least 6 characters"
          return ""
        })(),
      }
    },
  }))
  .actions((store) => ({
    setScannedData(value?: string) {
      if (value === undefined) { 
        store.authUserName = ""
        store.authEmail = ""
        store.authPassword = ""
        return
      }
      const rawScannedData = value?.split('\n');
      if (rawScannedData?.length <= 2) {
        return
      }

      store.authUserName = rawScannedData[0]
      store.authEmail = rawScannedData[1]
      store.authPassword = rawScannedData[2]
    },
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setAuthPassword(value: string) {
      store.authPassword = value.replace(/ /g, "")
    },
    setAuthUsername(value: string) {
      store.authUserName = value.replace(/ /g, "")
    },
  }))
  .views((self) => ({
    get getUserDetails() {
      return `logged in as ${self.authUserName} \nEmail: ${self.authEmail}` 
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
