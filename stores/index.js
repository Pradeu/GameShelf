import { defineStore } from "pinia";
export const userStore = defineStore('userStore', {
    state: () => ({ 
            authenticated: false
        }),
        
    actions: {
        async setAuth(state){
            this.authenticated = state
        }
        }
    }
)
