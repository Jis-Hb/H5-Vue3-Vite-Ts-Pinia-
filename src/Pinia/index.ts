import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persistedstate'

const Pinia = createPinia()
Pinia.use(piniaPluginPersist)

export default Pinia
