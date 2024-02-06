import Sample1 from './sample1.vue'
import Sample2 from './sample2/index.vue'
import Sample3 from './sample3.vue'
import Sample4 from './sample4.vue'
import Sample5 from './sample5.vue'
import Sample6 from './sample6.vue'
import Sample7 from './sample7.vue'
import Sample8 from './sample8.vue'
import {install as hscMenu} from "../components"
import {createApp} from "vue";



const Sample: any = ({
    Sample1,
    Sample2,
    Sample3,
    Sample4,
    Sample5,
    Sample6,
    Sample7,
    Sample8,
} as any)[location.search.substr(1)] || Sample1
let app = createApp(Sample);
app.mount("#app");
app.use(hscMenu)
export default app