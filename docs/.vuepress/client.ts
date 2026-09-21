import { defineClientConfig } from 'vuepress/client'
import './styles/index.css'

import HomeAbout from './components/HomeAbout.vue'
import HomeSkill from './components/HomeSkill.vue'
import HomeSiteInfo from './components/HomeSiteInfo.vue'
import HomeFriends from './components/HomeFriends.vue'
import Layout from './layouts/Layout.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('HomeAbout', HomeAbout)
    app.component('HomeSkill', HomeSkill)
    app.component('HomeSiteInfo', HomeSiteInfo)
    app.component('HomeFriends', HomeFriends)
  },
  layouts: {
    Layout,
  },
})
