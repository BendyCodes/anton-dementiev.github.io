    GodStep.Const = function() {
        var mark = GodStep.MARK = '[Mejdu] ';
        var err = 'ERROR: ';


        GodStep.ERR_DIV_NF = mark + err + 'Div Element Not Found!';
        GodStep.ERR_AUDIO_SUPPORT = mark + err + 'Your browser do not support audio API';
        GodStep.ERR_AUDIO_DECODE = mark + err + 'Decoding file';
        GodStep.ERR_MVK_CONNECT = mark + err + 'VK Api not initialized';
        GodStep.ERR_FILEAPI = mark + err + 'File Api not supported';

        GodStep.TRACK_LOADED = mark + 'Track Loaded';
        GodStep.TRACK_DECODED = mark + 'Track Decoded';
        GodStep.MVK_CONNECT = mark + 'VK API Connected';
        GodStep.MVK_DATA = mark + 'VK API data';

        GodStep.LOOP_FINISH = mark + 'Loop Finish';

        GodStep.EVENT_START = mark + 'Event Start';
        GodStep.EVENT_END = mark + 'Event End';

        GodStep.KEYUP = mark + 'Key Up';
        GodStep.KEYPRESS = mark + 'Key Press';
        GodStep.KEYDOWN = mark + 'Key Down';

        GodStep.IMAGE_LOADED = mark + 'Image Loaded';
        GodStep.FRAME_MOVE = mark + 'Frame Move';
        GodStep.FRAME_RDOWN = mark + 'Frame Right Down';
        GodStep.FRAME_RUP = mark + 'Frame Right Up';
        GodStep.FRAME_DOWN = mark + 'Frame Down';
        GodStep.FRAME_UP = mark + 'Frame Up';
        GodStep.FRAME_OUT = mark + 'Frame Out';
        GodStep.FRAME_OVER = mark + 'Frame Over';
        GodStep.FRAME_OUTSIDE = mark + 'Frame OutSide';

        GodStep.FRAME_CHANGED = mark + 'Frame Changed';
        GodStep.DATA_LOADED = mark + 'Data Loaded';
        GodStep.DOWN = 'down';

        GodStep.COLOR_STAGE = 0x444444;
        GodStep.MAX_INT = 9007199254740992;

        GodStep.GOLD = 0.6180339887;
        GodStep.IGOLD = 1 - GodStep.GOLD;
        GodStep.WHITE = 0xffffff;
        GodStep.BLACK = 0x000000;
        GodStep.RED = 0xff0000;
        GodStep.GREEN = 0x00ff00;
        GodStep.BLUE = 0x0000ff;
    };

    new GodStep.Const();