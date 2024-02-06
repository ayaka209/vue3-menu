import { ref, defineComponent, h } from 'vue';
import { Menuitem } from "../../components";

class Entry {
    constructor(readonly label: string) {}
    readonly children: { [label: string]: Entry | undefined } = {};
}

const root = new Entry('#root');
const fileList: string = `a.txt\nb.txt\nc.txt\nd.txt`;
const paths = fileList.split('\n').filter((path) => path.length > 0);

for (const path of paths) {
    const route = path.split('/').slice(1);
    let entry = root;
    for (const name of route) {
        if (entry.children[name]) entry = entry.children[name]!;
        else entry = entry.children[name] = new Entry(name);
    }
}
export default defineComponent({
    setup() {
        const menuitem:any = (entry: Entry) => {
            return Object.keys(entry.children).length > 0
                ? h(
                    Menuitem,
                    { label: entry.label },
                    Object.keys(entry.children)
                        .sort()
                        .map((name) => menuitem(entry.children[name]!))
                )
                : h(Menuitem, { label: entry.label });
        };

        return {
            root,
            menuitem,
        };
    },
    render() {
        return h('div', Object.keys(this.root.children).map((k) => this.menuitem(this.root.children[k]!)));
    },
});
