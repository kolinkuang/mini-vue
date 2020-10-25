import Vue from './vue.js';

const App = {
    // 视图模板
    template: `
    <input v-model="message"/>
    <button @click="click">{{message}}</button>
    `,

    //数据模型
    data() {
        return {
            message: 'Hello Vue 3!!'
        };
    },

    // 行为函数
    methods: {
        click() {
            this.message = this.message.split('').reverse().join('');
        }
    }
};

const {
    createApp
} = Vue;

createApp(App).mount('#app');