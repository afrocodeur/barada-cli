import UserStore from './UserStore';

import PasswordResetStore from './PasswordResetStore';

import RoleStore from './RoleStore';

import UserRoleStore from './UserRoleStore';

import CommandStore from './CommandStore';

import ProductStore from './ProductStore';

import Table7Store from './Table7Store';

import AppStore from './AppStore';


export default {
    userStore: new UserStore(),
    passwordResetStore: new PasswordResetStore(),
    roleStore: new RoleStore(),
    userRoleStore: new UserRoleStore(),
    commandStore: new CommandStore(),
    productStore: new ProductStore(),
    table7Store: new Table7Store(),
    appStore: new AppStore(),
};