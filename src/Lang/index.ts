import { createI18n } from 'vue-i18n' //引入vue-i18n组件

//引入同级目录下文件
const modules = import.meta.globEager('./Langs/*')

//假设你还有其他目录下的语言文件 它的路径是 src/home/locales/en-US.ts
//那么你就可以 使用 :lower:（小写） :upper:（大写） 来引入文件
const viewModules = import.meta.globEager(
  './Langs/**/[[:lower:]][[:lower:]]-[[:upper:]][[:upper:]].ts',
)

function getLangAll(): any {
  let message: any = {}
  getLangFiles(modules, message)
  getLangFiles(viewModules, message)
  return message
}
/**
 * 获取所有语言文件
 * @param {Object} mList
 */
function getLangFiles(mList: any, msg: any) {
  for (let path in mList) {
    if (mList[path].default) {
      //  获取文件名
      let pathName = path.substr(path.lastIndexOf('/') + 1, 10).replace('.ts', '')
      if (msg[pathName]) {
        msg[pathName] = {
          ...mList[pathName],
          ...mList[path].default,
        }
      } else {
        msg[pathName] = mList[path].default
      }
    }
  }
}
console.log(getLangAll())

const i18n = createI18n({
  legacy: false, // composition API
  locale: 'English',
  messages: getLangAll(),
})

export default i18n
