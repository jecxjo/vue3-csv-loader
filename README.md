# vue3-csv-loader

A vue3 / nuxt plugin to load csv files as javascript objects.


**Code**
```js
import people from './data/people.csv'

console.log(people[0].name); // "John"
```

**vite.config.ts**
```ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import csvLoader from 'vue3-csv-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), csvLoader({ firstLineAsHeader: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```
