// global
const WINDOW_SIZE_W = 32 * 12;
const WINDOW_SIZE_H = 32 * 12;
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

// ゲームメインのタスク
const GAME_MAIN_TASK_ACTION = 1;
const GAME_MAIN_TASK_GAMEOVER = 2;

// 箱のグラフィック番号
const CUBE_IMG_FRAME_NORMAL = 0;
const CUBE_IMG_FRAME_NORMAL_SHADOW = 1;
const CUBE_IMG_FRAME_HANGING = 2;
const CUBE_IMG_FRAME_HANGING_SHADOW = 3;

// マップのタスク
const MAP_TASK_INPUT_INIT = 0; // 初期化
const MAP_TASK_INPUT_WAIT = 1; // 入力待ち
const MAP_TASK_CUBE_MOVE = 2; // ブロックを押す・引く
const MAP_TASK_CUBE_FALL_CHECK = 3; // ブロックが落下するかチェック
const MAP_TASK_CUBE_FALL = 4; // ブロックが落下処理
const MAP_TASK_CHARACTER_FALL_CHECK = 5; // キャラクターが落下するかチェック
const MAP_TASK_CHARACTER_FALL = 6; // キャラクターが落下処理

// images
const IMG_CUBE_NORMAL = './img/cube_normal.png';
const IMG_CHARACTER = './img/character.png';

const IMG_LIST = [
	IMG_CUBE_NORMAL,
	IMG_CHARACTER
];

// 向き定数
const D_RIGHT = 0;
const D_DOWN = 1;
const D_LEFT = 2;
const D_TOP = 3;

// マップ関連
const MAP_X_MAX = 10;
const MAP_Y_MAX = 10;
const MAP_Z_MAX = 10;

// キャラクターの状態
const CHARACTER_STATUS_NORMAL = 1;
const CHARACTER_STATUS_HANGING = 2;

// キャラクターのアクション
const CHARACTER_ACTION_WAIT = 0; // 待機
const CHARACTER_ACTION_MOVE = 1; // 移動
const CHARACTER_ACTION_ROTATE = 2; // 向き変え
const CHARACTER_ACTION_PUSH = 3; // 押した
const CHARACTER_ACTION_PULL = 4; // 引いた
const CHARACTER_ACTION_HANGING_MOVE = 5; // ぶら下がり移動
const CHARACTER_ACTION_HANGING_FALL = 6; // ぶら下がり落下
const CHARACTER_ACTION_HANGING_UP = 7; // ぶら下がり上り
