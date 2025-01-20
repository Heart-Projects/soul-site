export interface AppMenuItem {
  label: string
  icon: string
  path: string
  children?: AppMenuItem[]
} 