
export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}
interface StaticRequire {
  default: StaticImageData;
}
declare type StaticImport = StaticRequire | StaticImageData;


export interface MenuBarItem {
  id: number;
  title: string;
  url?: string;
  isMain?: boolean;
  isActive?: boolean;
  subMenu?: Array<MenuBarItem>;
  logo?: string | StaticImport;
}