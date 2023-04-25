import { createStore } from 'vuex';
import config from '@/store/config';
import { API } from '@/API';

export default createStore({
    state () {
        return {
            user: false,
        }
    },

    actions: {
        async create(context: any, payload: any){
            return await API.POST(`${config.getters.getPath}/api/v1/polls`, payload);
        },
    }
})