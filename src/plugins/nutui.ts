import type { App } from 'vue';
import {Button, Dialog, Cell, Progress, Switch, Icon, Picker, Popup, OverLay} from '@nutui/nutui-taro';

/** 定制化主题必须使用 scss */
import '@nutui/nutui-taro/dist/styles/themes/default.scss';

export default function setupNutui(app: App<Element>) {
  app.use(Button).use(Cell).use(Dialog).use(Progress).use(Switch).use(Icon).use(Picker).use(Popup).use(OverLay);
}
