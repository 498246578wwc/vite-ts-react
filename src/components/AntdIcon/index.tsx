import {
  ApartmentOutlined,
  BookOutlined,
  CodeOutlined,
  DatabaseOutlined,
  FileImageOutlined,
  FileOutlined,
  FolderOutlined,
  HomeFilled,
  KeyOutlined,
  LinkOutlined,
  MenuOutlined,
  MonitorOutlined,
  SettingFilled,
  SmileTwoTone,
  ToolOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import * as AllIcons from '@ant-design/icons'
const iconMap = {
  home: HomeFilled,
  user: UserOutlined,
  setting: SettingFilled,
  menu: MenuOutlined,
  link: LinkOutlined,
  folder: FolderOutlined,
  tool: ToolOutlined,
  fileImage: FileImageOutlined,
  file: FileOutlined,
  apartment: ApartmentOutlined,
  book: BookOutlined,
  smile: SmileTwoTone,
  userGroup: UsergroupAddOutlined,
  monitor: MonitorOutlined,
  userSwitch: UserSwitchOutlined,
  dataBase: DatabaseOutlined,
  key: KeyOutlined,
  code: CodeOutlined,
  // 添加更多图标...
}

type IconType = keyof typeof AllIcons

const getAntdIcon = (iconName: string): React.ReactElement | null => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const IconComponent = iconMap[iconName.toLowerCase()]
  return IconComponent ? <IconComponent /> : null
}

export const getDynamicAntdIcon = (iconName: string, theme: 'Outlined' | 'Filled' | 'TwoTone' = 'Outlined') => {
  const formattedName = `${iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')}${theme}` as IconType

  const IconComponent = AllIcons[formattedName]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return IconComponent ? <IconComponent /> : <AllIcons.QuestionCircleOutlined />
}
export default getAntdIcon
