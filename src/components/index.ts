import { createApp } from 'vue';

import MenuBar from "./menubar/index.vue"
import MenuBarItem from "./menubaritem/index.vue"
import ContextMenu from "./contextmenu.vue"
import ButtonMenu from './buttonmenu.vue'
import Menu from "./menu/index.vue"
import MenuItem from "./menuitem/index.vue"
import Separator from "./separator.vue"
import { MenubarType } from "./menubar/script"
import { MenuType } from "./menu/script"
import { MenuitemType } from "./menuitem/script"
import type { MenuStyle } from "./style"
import { StyleFactory, StyleWhite, StyleBlack, StyleMetal } from "./style"

const components:any = {
    MenuBar,
    MenuBarItem ,
    ContextMenu,
    ButtonMenu,
    Menu,
    MenuItem,
    Separator,
}

const install = (app: any, options = { prefix: 'hsc-menu' }) => {
    const { prefix } = options;

    Object.keys(components).forEach(key => {
        let component:any = components[key];
        console.log(component);
        function convertToHyphenCase(inputString:string) {
            return inputString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }

        let s = convertToHyphenCase(key).replace(/^menu-/,"");
        let componentKey = `${prefix}-${s}`;
        console.log("========",componentKey)
        app.component(componentKey, component);
    });

    // Register other components, types, and styles here
};

// Export components and types
export {
    MenuBar,
    Menu,
    MenuBarItem,
    ContextMenu,
    ButtonMenu,
    MenuItem,
    Separator,
    MenubarType,
    MenuType,
    MenuitemType,
    MenuStyle,
    StyleFactory,
    StyleBlack,
    StyleWhite,
    StyleMetal,
}

export {
    install,
};
