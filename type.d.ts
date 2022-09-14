type SUB_MENU = {
  className?: string;
  root?: string | boolean;
  items?: MENU_ITEM[];
  model?: MENU_ITEM[];
  onMenuItemClick?: MENU_CLICK;
  layoutColorMode?: string;
  role?: string;
};

type MENU_CLICK = (p: {
  item: MENU_ITEM;
  originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
}) => void;

type MENU_ITEM = {
  target?: string;
  url?: string;
  badgeStyleClass?: string;
  to: string;
  badge?: JSX.Element;
  onMenuItemClick?: () => void;
  command: (p: {
    item: MENU_ITEM;
    originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  }) => void;
  disabled?: boolean;
  label: string;
  items: MENU_ITEM[];
  icon?: string | undefined;
};

type USER = {
  avatar: string;
  buttons: Array<string>;
  code: number;
  deptId: number;
  introduction: string;
  name: string;
  permissions: Array<string>;
  roles: Array<string>;
  userId: number;
  userName: string;
};

interface LIST_ITEM {
  key: string;
  data: LIST_ITEM_DATA;
  children?: LIST_ITEM[];
}

type LIST_ITEM_DATA = {
  id: string;
  executor: string;
  missionName: string;
  department: string;
  startingTime: string;
  endTime: string;
  status: string;
};

type CHART_ITEM = {
  id: string;
  processName: string;
  timeConsuming: string;
  problem: string;
  scheduleDate: string;
};

type SCHEDULING_ITEM = {
  id: string;
  executionDate: string;
  taskClassification: string;
  missionName: string;
  minutesOfTheMeeting: string;
  questionList: string;
  missionProgress: string;
  missionStatus: string;
};

type MENU = {
  label: string;
  icon?: string;
  to?: string;
  items?: MENU[];
};
type LOGIN_FORM = { username: string; password: string; code: string };

type CAPTCHA = {
  code: number;
  data: string;
  id: string;
  msg: string;
  requestId: string;
};
