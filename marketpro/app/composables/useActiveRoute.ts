export interface Badge {
  text: string;
  class: string;
}

export interface SubMenuItem {
  label: string;
  to?: string;
  href?: string;
}

export interface MenuItem {
  label: string;
  to?: string;
  href?: string;
  submenu?: SubMenuItem[];
  badge?: Badge;
}

export function useActiveRoute() {
  const route = useRoute();

  const isActive = (path?: string): boolean => {
    if (!path) return false;
    const currentPath = route.path.replace(/\/$/, "");
    const targetPath = path.replace(/\/$/, "");
    return currentPath === targetPath;
  };

  const isActiveParent = (item: MenuItem): boolean => {
    if (item.to && isActive(item.to)) return true;
    if (item.submenu) {
      return item.submenu.some(subItem => isActive(subItem.to || subItem.href));
    }
    return false;
  };

  return { isActive, isActiveParent };
}
