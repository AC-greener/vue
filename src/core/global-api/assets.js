/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  //注册方法
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
  
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id 
          definition = this.options._base.extend(definition)  //吧该组件转换成一个构造器 this.options._base===Vue
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        this.options[type + 's'][id] = definition  //定义这个组件
        return definition
      }
    }
  })
}
