import * as types from './types.js'
import axios from 'axios'

export default{
    showloader:({commit})=>{
        commit(types.SHOWLOADING)
    },
    hideloader:({commit})=>{
        commit(types.HIDELOADING)
    },
    getData:({commit,state})=>{
        axios.get('').then(function(res){

        }).catch(function(err){

        })
    }
}