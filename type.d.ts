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

interface LIST_ITEM_OLD {
  key: string;
  data: LIST_ITEM_DATA_OLD;
  children?: LIST_ITEM_OLD[];
}

type LIST_ITEM_DATA_OLD = {
  id: string;
  executor: string;
  missionName: string;
  department: string;
  startingTime: string;
  endTime: string;
  status: string;
};

type LIST_ITEM_DATA = {
  id: number;
  step_no: string;
  father_no: string;
  step_name: string;
  step_type: string;
  duty_org: string;
  duty_post: string;
  duty_user: string;
  duty_user_name: string;
  state: string;
  real_start_time: string;
  real_end_time: string;
  plan_end_time: string;
  msg_send_time: string;
  msg_call_time: string;
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
  img?: string;
  url?: string;
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
