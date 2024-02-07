import { Component, Vue, Prop, Inject } from "vue-facing-decorator"
import {  MenubarType } from "../menubar/script"
import { MenuType } from "../menu/script"
import Menu from "../menu/index.vue"
import { sync } from "../global"
import { MenubaritemActivateEvent, MenuCloseEvent, MenubarDactivateEvent } from "../event"
import {  MENU_STYLE_KEY } from "../style"
import type { MenuStyle } from '../style'
import {EventVue} from "@/components/eventClass";

export const MENUBAR_KEY = '@hscmap/vue-menu/menubar'

export const MENUBARITEM_KEY = '@hscmap/vue-menu/menubaritem'


@Component({
    components: { XMenu: Menu },
    provide() { return { [MENUBARITEM_KEY]: this } }
})
export class MenubaritemType extends EventVue {
    @Prop({ type: String, required: true })
    private label!: string

    @Inject({from:MENUBAR_KEY})
    private menubar!: MenubarType

    @Inject({from:MENU_STYLE_KEY})
    private menuStyle!: MenuStyle

    private hover = false
    private isOpen = false

    mounted() {
        this.menu()?.$on(MenuCloseEvent.type, (e: MenuCloseEvent) => {
            this.isOpen = false
            e.fromChild && this.menubar.deactivate()
        })
        this.menubar?.$on(MenubaritemActivateEvent.type, (e: MenubaritemActivateEvent) => {
            if (this != e.menubaritem) {
                const menu = this.menu()
                menu && menu.close(false)
            }
        })
        this.menubar.$on(MenubarDactivateEvent.type, (e: MenubarDactivateEvent) => {
            const menu = this.menu()
            menu && menu.close(true)
        })
    }

    onMenuiatemFired() {
        setTimeout(() => {
            this.hover = false
        }, 200)
    }

    get style() {
        return this.active ? this.menuStyle?.active : {}
    }

    get paddingTop() {
        return `${this.menubar.paddingTop}px`
    }

    private menu() {
        return this.$refs.menu as MenuType
    }

    private activate() {
        const rect = this.$el.getBoundingClientRect()
        this.menu().open(rect.left, rect.bottom)
        this.menubar.$emitLegacy(MenubaritemActivateEvent.type, new MenubaritemActivateEvent(this))
        this.isOpen = true
    }

    private mousedown() {
        sync.lock(async () => {
            this.activate()
        })
    }

    private mouseenter() {
        sync.lock(async () => {
            this.hover = true
            this.menubar.active && this.activate()
        })
    }

    private mouseleave() {
        sync.lock(async () => {
            this.hover = false
        })
    }

    get active() {
        return this.hover || this.isOpen
    }
}