import Vue from 'vue'

Vue.filter('currency',function(input){
    return '$'+input+'.00';
});

Vue.filter('height',function(input){
    return input+' cm';
});
