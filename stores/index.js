import { defineStore } from "pinia";
export const userStore = defineStore('userStore', {
    state: () => ({ 
            authenticated: false,
            user: {}
        }),
        
    actions: {
        async setAuth(state){
            this.authenticated = state
        },
        async setUser(data){
            this.user = data
        },
        }
    }
)
