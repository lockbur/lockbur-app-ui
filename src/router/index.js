import Vue from 'vue'
import Router from 'vue-router'
// Demo
import Demo from '@/components/Demo'
// App
import Dashboard from '@/components/Dashboard'
import Wallpaper from '@/components/Wallpaper'
// Basic
import Top from '@/components/wallpapers/Top'
import Discover from '@/components/wallpapers/Discover'
import Latest from '@/components/wallpapers/Latest'
import Random from '@/components/wallpapers/Random'
import More from '@/components/wallpapers/More'
import Search from '@/components/wallpapers/Search'
// Post
import Forums from '@/components/forums/Forums'
import Boards from '@/components/forums/Boards'
import Post from '@/components/forums/Post'
import NewPost from '@/components/forums/NewPost'
// Login
import Login from '@/views/Login'
import Forget from '@/components/Forget'
import Reset from '@/components/Reset'
// User
import User from '@/components/user/User'
import Overview from '@/components/user/Overview'
import Uploads from '@/components/user/Uploads'
import Favorite from '@/components/user/Favorite'
import Stars from '@/components/user/Stars'
import Followers from '@/components/user/Followers'
import Following from '@/components/user/Following'
// Account
import Settings from '@/components/settings/Settings'
import Account from '@/components/settings/Account'
import Profile from '@/components/settings/Profile'
import About from '@/components/settings/About'
import Browsing from '@/components/settings/Browsing'
import Oauth2 from '@/components/settings/Oauth2'
import Password from '@/components/settings/Password'
import Danger from '@/components/settings/Danger'
// Oauth2
import GitHub from '@/components/oauth2/GitHub'
// tags
import Tags from '@/components/tags/Tags'

Vue.use(Router)
export default new Router({
  routes: [
    {path: '/demo', component: Demo},
    {path: '/login', component: Login},
    {
      path: '/register',
      component: () => import('@/views/Register')
    },
    {path: '/forget', component: Forget},
    {path: '/reset', component: Reset},
    {
      path: '/',
      component: Dashboard,
      children: [
        {path: '', component: Top},
        {path: '/top', component: Top},
        {path: '/discover', component: Discover},
        {path: '/latest', component: Latest},
        {path: '/random', component: Random},
        {path: '/more', component: More},
        {path: '/search', component: Search},
        {
          path: '/user/:username',
          component: User,
          children: [
            {path: '/user/:username/overview', component: Overview},
            {path: '/user/:username/uploads', component: Uploads},
            {path: '/user/:username/favorite', component: Favorite},
            {path: '/user/:username/stars', component: Stars},
            {path: '/user/:username/followers', component: Followers},
            {path: '/user/:username/following', component: Following}
          ]
        },
        {
          path: '/settings',
          component: Settings,
          children: [
            {path: '', component: About},
            {path: 'about', component: About},
            {path: 'profile', component: Profile},
            {path: 'account', component: Account},
            {path: 'browsing', component: Browsing},
            {path: 'oauth2', component: Oauth2},
            {path: 'password', component: Password},
            {path: 'danger', component: Danger}
          ]
        }
      ]
    },
    {
      path: '/tags',
      component: Tags
    },
    {
      path: '/wallpaper/:wallpaperId',
      component: Wallpaper
    },
    {path: '/forums', component: Forums},
    {path: '/forums/boards/:boardId', component: Boards},
    {path: '/forums/boards/:boardId/post/new', component: NewPost},
    {path: '/forums/post/:id', component: Post},
    {
      path: '/oauth2/github',
      component: GitHub
    }
  ]
})
