import { defaultConfig } from '@formkit/vue'
import { rootClasses } from '@/formkit.theme.ts'
import { createAutoAnimatePlugin } from '@formkit/addons'

export default defaultConfig({
  config: {
    rootClasses
  },
  plugins: [createAutoAnimatePlugin()]
})
