import Sell from './components/Sell.vue'
import Basic from './components/Basic.vue'
import Loan from './components/Loan.vue'
import BasicOne from './components/BasicOne.vue'
import BasicTwo from './components/BasicTwo.vue'
import User from './components/User.vue'
import UserDetail from './components/UserDetail.vue'

const routes=[
    {path:'/sell',component:Sell},
    {
        path:'/basic',
        component:Basic,
        children:[
            {path:'basicOne', component:BasicOne},
            {path:'basicTwo',component:BasicTwo},
            {path:'/',redirect:'basicOne'}   //注意二级路由重定向用'/'
        ]
    },
    {path:'/loan',component:Loan},
    {
        path:'/user',
        component:User,
        children:[
            {path:':username/address/:address',component:UserDetail}
        ]
    },
    {path:'*',redirect:'/sell'}   //注意一级路由重定向用'*'
]

export default{
    routes
}