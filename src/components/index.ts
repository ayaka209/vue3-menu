import { createApp } from 'vue';

import Menubar from "./menubar/index.vue"
import Menubaritem from "./menubaritem/index.vue"
import Contextmenu from "./contextmenu.vue"
import Buttonmenu from './buttonmenu.vue'
import Menu from "./menu/index.vue"
import Menuitem from "./menuitem/index.vue"
import Separator from "./separator.vue"
import { MenubarType } from "./menubar/script"
import { MenuType } from "./menu/script"
import { MenuitemType } from "./menuitem/script"
import type { MenuStyle } from "./style"
import { StyleFactory, StyleWhite, StyleBlack, StyleMetal } from "./style"

const components = [
    Menubar,
    Menubaritem,
    Contextmenu,
    Buttonmenu,
    Menu,
    Menuitem,
    Separator,
]

const install = (app: any, options = { prefix: 'hsc-menu' }) => {
    const { prefix } = options;

    components.forEach(component => {
        app.component(`${prefix}-${component.name}`, component);
    });

    // Register other components, types, and styles here
};

// Export components and types
export {
    Menubar,
    Menu,
    Menubaritem,
    Contextmenu,
    Buttonmenu,
    Menuitem,
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
