import {Vue} from "vue-facing-decorator";
import mitt from 'mitt';
export class EventVue extends Vue {
    emitter = mitt()

    $on(event: string, handler: (...args: any[]) => void) {
        this.emitter.on(event, handler)
    }
    $off(event: string, handler: (...args: any[]) => void) {
        this.emitter.off(event, handler)
    }
    $emitLegacy(event: string, ...args: any[]) {
        // @ts-ignore
        this.emitter.emit(event, ...args)
        this.$emit(event, ...args);
    }
$once(event: string, handler: (...args: any[]) => void) {
        const off = () => {
            this.emitter.off(event, handler)
            this.emitter.off(event, off)
        }
        this.emitter.on(event, handler)
        this.emitter.on(event, off)
    }

}