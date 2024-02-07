import { Component, Vue, Prop } from "vue-facing-decorator"
import Menu from "./menu/index.vue"
import { MenuType } from "./menu/script"
import type {  Direction  } from "./menu/script"
import { once } from "./event"
import { MENUBARITEM_KEY } from "./menubaritem/script";

export const openedRootlessMenus: RootlessMenu[] = []

function closeOthres() {
    while (openedRootlessMenus.length > 0) {
        openedRootlessMenus.pop()!.close()
    }
}

@Component({
    components: { XMenu: Menu },
    provide() { return { [MENUBARITEM_KEY]: undefined } },
})
export class RootlessMenu extends Vue {
    @Prop({ type: Function })
    position!: (e: MouseEvent) => { x: number, y: number, direction: Direction }

    @Prop({ type: Number })
    menuZIndex?: number

    get menuStyle(): Partial<CSSStyleDeclaration> {
        return this.menuZIndex == undefined ? {} : { zIndex: String(this.menuZIndex) }
    }

    private cancelMouseup?: () => void
    private cancelMousedown?: () => void

    private menu() {
        return this.$refs.menu as MenuType
    }

    beforeDestroy() {
        this.clearCancellers()
    }

    openMenu(mousedown: MouseEvent) {
        mousedown.preventDefault()
        closeOthres()
        openedRootlessMenus.push(this)
        this.clearCancellers()

        if (this.menu().isOpen) {
            return this.close()
        }

        this.cancelMouseup = once(document, 'mouseup', mouseup => {
            this.cancelMouseup = undefined
            if (mouseup.timeStamp - mousedown.timeStamp >= 500)
                this.close()
            else {
                this.cancelMousedown = once(document, 'mousedown', (e: MouseEvent) => {
                    this.cancelMousedown = undefined
                    if (!isContextmenu(e))
                        this.close()
                })
            }
        })

        const position = this.position(mousedown)
        this.menu().open(position.x, position.y, position.direction)
    }

    close() {
        this.clearCancellers()
        const menu = this.menu()
        menu && menu.close(true)
    }

    private clearCancellers() {
        this.cancelMouseup && this.cancelMouseup()
        this.cancelMousedown && this.cancelMousedown()
    }

    mounted() {
        this.$watch(() => this.menu().isOpen, isOpen => {
            this.$emitLegacy(isOpen ? 'open' : 'close')
        })
    }
}


function isContextmenu(e: MouseEvent) {
    return e.button == 2 || e.ctrlKey
}