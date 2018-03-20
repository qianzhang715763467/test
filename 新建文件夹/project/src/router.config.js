import Risk from './components/Risk.vue'
import Check from './components/Check.vue'
import Monitor from './components/Monitor.vue'

const routes=[
    {path:'/risk',component:Risk},
    {path:'/check',component:Check},
    {path:'/monitor',component:Monitor},
    {path:'*',redirect:'/risk'}
];

export default{
    routes
}
