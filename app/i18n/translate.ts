import i18n from "i18n-js"
import { TxKeyPath } from "./i18n"

export function translate(key: TxKeyPath, options?: i18n.TranslateOptions) {
  return i18n.t(key, options)
}
