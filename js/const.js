// global
const WINDOW_SIZE_W = 192;
const WINDOW_SIZE_H = 320;
const FPS = 30;

// font関連
const DEFAULT_FONT_SIZE = 13;
const DEFAULT_FONT_COLER = "rgb(0, 0, 0)";
const DEFAULT_FOMT_FAMILY = DEFAULT_FONT_SIZE + "px 'ＭＳ ゴシック' ";

// スプライト
const SPRITE_SSW = 8;
const SPRITE_SSH = 8;
const SPRITE_SW = 16;
const SPRITE_SH = 16;
const SPRITE_MW = 32;
const SPRITE_MH = 32;
const SPRITE_LW = 64;
const SPRITE_LH = 64;

const ACTION_AREA_WIDTH_COUNT = 6;
const ACTION_AREA_HEIGHT_COUNT = 5;
const ACTION_AREA_WIDTH = 6 * SPRITE_MW;
const ACTION_AREA_HEIGHT = 5 * SPRITE_MH;

const BOARD_CELL_WIDTH_COUNT = 6;
const BOARD_CELL_HEIGHT_COUNT = 5;
const BOARD_CELL_WIDTH = 6 * SPRITE_MW;
const BOARD_CELL_HEIGHT = 5 * SPRITE_MH;

const MAIN_TASK_WAIT = 1; // ドロップ持ち上げ待ち
const MAIN_TASK_LIFT = 2; // ドロップ持ち上げ中
const MAIN_TASK_MOVE = 3; // ドロップ移動中
const MAIN_TASK_CHECK = 4; // ドロップが消えるかチェック
const MAIN_TASK_COMBO = 5; // ドロップを消す
const MAIN_TASK_REFLESH = 6; // ドロップを補充
const MAIN_TASK_FALL = 7; // ドロップ落下
const MAIN_TASK_POWER_UP = 8; // パワーアップ演出

// 共通部品の種類分けよう
const _KUMA = 1;
const _ENEMY = 2;

// クマの行動
const KUMA_TASK_INIT = 1;
const KUMA_TASK_MOVE = 2;
const KUMA_TASK_STOP = 3;
const KUMA_TASK_WAIT = 4;
const KUMA_TASK_ATTACK = 5;
const KUMA_TASK_DAMAGE_INIT = 6;
const KUMA_TASK_DAMAGE = 7;

// 敵の行動
const ENEMY_TASK_INIT = 1;
const ENEMY_TASK_MOVE = 2;
const ENEMY_TASK_WAIT = 3;
const ENEMY_TASK_ATTACK = 4;
const ENEMY_TASK_DAMAGE_INIT = 5;
const ENEMY_TASK_DAMAGE = 6;
const ENEMY_TASK_DESTROY_INIT = 7;
const ENEMY_TASK_DESTROY = 8;

const MOVE_TIME_MAX = 150;

// images
const IMG_KUMA = './img/kuma.png';
const IMG_BOARD = './img/board.png';
const IMG_MAP = './img/map.png';
const IMG_NUMBER = './img/number.png';
const IMG_FONT2 = './img/font2.png';
const IMG_SMALL_ICON = './img/small_icon.png';
const IMG_MONSTER_BUT = './img/monster/but.gif';

const IMG_LIST = [
	IMG_KUMA,
	IMG_BOARD,
	IMG_MAP,
	IMG_NUMBER,
	IMG_FONT2,
	IMG_SMALL_ICON,
	IMG_MONSTER_BUT,
];

const IMAGE_FRAME_BOARD_BG_1 = 1;
const IMAGE_FRAME_BOARD_BG_2 = 2;
const IMAGE_FRAME_BOARD_DROP_RED = 10;
const IMAGE_FRAME_BOARD_DROP_BLUE = 11;
const IMAGE_FRAME_BOARD_DROP_GREEN = 12;
const IMAGE_FRAME_BOARD_DROP_YELLOW = 13;
const IMAGE_FRAME_BOARD_DROP_PURPLE = 14;
const IMAGE_FRAME_BOARD_DROP_PINK = 15;

// スモールアイコン画像のframeリスト
const SMALL_IMAGE_FRAME_LIST = {
	'red_icon': 0,
	'blue_icon': 1,
	'green_icon': 2,
	'yellow_icon': 3,
	'black_icon': 4,
	'pink_icon': 5,
};

// 向き定数
const D_RIGHT = 0;
const D_UP = 1;
const D_DOWN = 2;
const D_LEFT = 3;

// 属性定数
const ELEMENT_NONE = 0;
const ELEMENT_RED = 1;
const ELEMENT_BLUE = 2;
const ELEMENT_GREEN = 3;
const ELEMENT_YELLOW = 4;
const ELEMENT_BLACK = 5;

// 試験用固定背景
const BG_ARRAY = [
	[27, 27, 27, 27, 27, 27, 27],
	[27, 27, 27, 27, 27, 27, 27],
	[27, 27, 27, 27, 27, 27, 27],
	[ 1,  1,  1,  1,  1,  1,  1],
	[10, 10, 10, 10, 10, 10, 10],
];

// 文字列テクスチャのframe変換表
const TEXT_TEXTURE_FRAME_LIST = {
	"0": 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
};

// ダメージ文字列テクスチャのframe変換表
const DAMAGE_TEXT_TEXTURE_FRAME_LIST = {
	"0": 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
};
const DAMAGE_TEXT_COLOR_WHITE = 0;
const DAMAGE_TEXT_COLOR_RED = 1;
const DAMAGE_TEXT_COLOR_GREEN = 2;
const DAMAGE_TEXT_COLOR_BLUE = 3;
