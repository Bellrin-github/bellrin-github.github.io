// global
const WINDOW_SIZE_W = 192;
const WINDOW_SIZE_H = 320;
const FPS = 30;

// font関連
const DEFAULT_FONT_SIZE = 13;
const DEFAULT_FONT_COLER = "rgb(0, 0, 0)";
const DEFAULT_FOMT_FAMILY = DEFAULT_FONT_SIZE + "px 'ＭＳ ゴシック' ";

// スプライト
const SPRITE_SW = 16;
const SPRITE_SH = 16;
const SPRITE_MW = 32;
const SPRITE_MH = 32;
const SPRITE_LW = 64;
const SPRITE_LH = 64;

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

// images
const IMG_KUMA = './img/kuma.png';
const IMG_BOARD = './img/board.png';
const IMG_MAP = './img/map.png';

const IMG_LIST = [
    IMG_KUMA,
    IMG_BOARD,
    IMG_MAP,
];

const IMAGE_FRAME_BOARD_BG_1 = 1;
const IMAGE_FRAME_BOARD_BG_2 = 2;
const IMAGE_FRAME_BOARD_DROP_RED = 10;
const IMAGE_FRAME_BOARD_DROP_BLUE = 11;
const IMAGE_FRAME_BOARD_DROP_GREEN = 12;
const IMAGE_FRAME_BOARD_DROP_YELLOW = 13;
const IMAGE_FRAME_BOARD_DROP_PURPLE = 14;
const IMAGE_FRAME_BOARD_DROP_PINK = 15;

// 向き定数
const D_RIGHT = 0;
const D_UP = 1;
const D_DOWN = 2;
const D_LEFT = 3;

// 試験用固定背景
const BG_ARRAY = [
    [27, 27, 27, 27, 27, 27, 27],
    [27, 27, 27, 27, 27, 27, 27],
    [27, 27, 27, 27, 27, 27, 27],
    [ 1,  1,  1,  1,  1,  1,  1],
    [10, 10, 10, 10, 10, 10, 10],
];