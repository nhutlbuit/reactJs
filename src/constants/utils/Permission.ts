import {PropsWithChildren, ReactElement} from "react";

type PermissionProp = {
    hasAnyPermission?: any,
    hasAllPermission?: any
}

export const Permission = (props : PropsWithChildren<PermissionProp>) => {
    if (!props.hasAllPermission && !props.hasAnyPermission) return null
    if (props.hasAnyPermission) {
        if (!Permission.hasAnyPermission(props.hasAnyPermission)) return null;
    } else {
        if (!Permission.hasAllPermission(props.hasAllPermission)) return null;
    }
    return props.children as ReactElement;
}

const objPermission = window.parent.$.accessControlPermission;

Permission.hasAnyPermission = (permission : Array<string>) => {
    const listPermission = objPermission && Object.keys(objPermission).filter(key => objPermission[key]) || [];
    return permission.length ? permission.filter(item => listPermission && listPermission.includes(item)).length > 0 : true;
}

Permission.hasAllPermission = (permission: Array<string>) => {
    const listPermission = objPermission && Object.keys(objPermission).filter(key => objPermission()[key]) || [];
    return permission.length ? permission.filter(item => listPermission && listPermission.includes(item)).length == permission.length : true;
}

export default Permission
