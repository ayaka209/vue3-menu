import { defineComponent, ref } from 'vue'

export type Style = Partial<CSSStyleDeclaration>

export interface MenuStyle {
    menubar: Style
    menu: Style
    separator: Style
    active: Style
    disabled: Style
    animation: boolean
}

export const MENU_STYLE_KEY = '@hscmap/vue-menu/menuStyle'

export const StyleFactory = (menuStyle: MenuStyle) => {
    return defineComponent({
        setup() {
            // for backward compatibility
            if (menuStyle && menuStyle?.animation == undefined) {
                menuStyle.animation = true
            }
            return { [MENU_STYLE_KEY]: menuStyle }
        },
        render() {
            return this.$slots.default ? this.$slots.default() : null
        }
    })
}

export const StyleBlack = StyleFactory({
    menu: {
        backgroundColor: 'rgba(31, 31, 31, 0.9)',
        color: 'white',
        boxShadow: '0 0 4pt rgba(255, 255, 255, 0.25)'
    },
    menubar: {
        backgroundColor: 'rgba(31, 31, 31, 0.9)',
        color: 'white',
        boxShadow: '0 0 4pt rgba(255, 255, 255, 0.25)'
    },
    separator: { backgroundColor: 'rgba(127, 127, 127, 0.5)' },
    active: { backgroundColor: 'rgba(127, 127, 127, 0.75)' },
    disabled: { opacity: '0.5' },
    animation: true
})

export const StyleWhite = StyleFactory({
    menu: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: 'black',
        boxShadow: '0 2pt 6pt rgba(0, 0, 0, 0.5)'
    },
    menubar: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: 'black',
        boxShadow: '0 2pt 6pt rgba(0, 0, 0, 0.5)'
    },
    separator: { backgroundColor: 'rgba(127, 127, 127, 0.5)' },
    active: { backgroundColor: 'rgba(127, 127, 127, 0.75)', color: '#fff' },
    disabled: { opacity: '0.5' },
    animation: true
})

export const StyleMetal = StyleFactory({
    menubar: {
        background: 'linear-gradient(to bottom, rgb(215, 215, 215), rgb(191, 191, 191))',
        color: 'black',
        boxShadow: '0 2pt 6pt rgba(0, 0, 0, 0.5)'
    },
    menu: {
        backgroundColor: 'rgb(215, 215, 215)',
        color: 'black',
        boxShadow: '0 2pt 6pt rgba(0, 0, 0, 0.5)'
    },
    separator: { backgroundColor: 'rgba(127, 127, 127, 0.5)' },
    active: { backgroundColor: 'rgba(127, 127, 127, 0.75)', color: '#fff' },
    disabled: { opacity: '0.5' },
    animation: true
})
