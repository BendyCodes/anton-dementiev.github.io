////////////////////////////////////////////////////////////////////
////      ////      /////  ////       ////    ////       //////////
////  ////////  ///  ////  //////  //////  //  ///  ///  /////////
////     /////  ////  ///  //////  /////  ///  ///     //////////
////  ////////  ///  ////  //////  /////  //  ////  //  ////////
////      ////      /////  //////  //////    /////  ///  //////
//////////////////////////////////////////////////////////////

include('lq/input/Keyboard');
include('lq/editor/Slider');
include('lq/editor/FrameView');
include('lq/editor/Memory');
include('lq/editor/DotView');
include('lq/editor/WayView');
include('lq/editor/WaysEditor');
include('lq/editor/TimelineEditor');
include('lq/editor/FrameBrowser');
include('lq/video/IconButton');
include('lq/editor/EventView');

GodStep.Editor = function (soul){
    this.TRANSPARENT = true;
    this.ALWAYSONTOP = true;
    this.FULLPAGE = true;
    this.CANVAS = true;
    this.soul = soul; soul.editor = this;
    this.keyboard = new GodStep.Keyboard(); this.keyboard.editor = this;

    addCSS('css/editor');

    GodStep.addEvent(this.keyboard, GodStep.KEYPRESS, this.h_keyboard);
    GodStep.addEvent(soul, GodStep.DATA_LOADED, this.h_dataLoaded);
    GodStep.Mejdu.call(this, 'Editor');
    this.setPositionAs(soul);

};
var pro = GodStep.Editor.prototype = Object.create(GodStep.Mejdu.prototype);

pro.start = function() {
    this.stage.addChild(this.g = new PIXI.Graphics());
    this.g.beginFill(0, .5);
    this.g.drawRect(0, 0, this.W, this.H);

    this.frameBrowser = this.addFrame(new GodStep.FrameBrowser(this.soul));
    this.timelineEditor = this.addFrame(new GodStep.TimelineEditor(this));
    this.waysEditor = this.addFrame(new GodStep.WaysEditor(this));
    this.memory = this.addFrame(new GodStep.Memory(this.soul));
};

pro.closeAllTabs = function() {
    this.frameBrowser.visible = false;
    this.timelineEditor.visible = false;
    this.waysEditor.visible = false;
    this.memory.hide();
};
pro.h_dataLoaded = function(e) {
    e.content.t.editor.frameBrowser.setSoul(e.content.t, true);
};
pro.h_keyboard = function(e) {
    var editor = e.t.editor;

    switch (e.data) {
        case GodStep.KEY_CONSOLE:
            editor.visible = !editor.visible;
            if(!editor.visible) {
                editor.memory.hide();
            }
            break;
        case GodStep.KEY_1:
            editor.closeAllTabs();
            editor.frameBrowser.setSoul(editor.soul);
            break;
        case GodStep.KEY_2:
            editor.closeAllTabs();
            if(editor.timelineEditor.frame){
                editor.timelineEditor.visible = true;
            }
            break;
        case GodStep.KEY_3:
            editor.closeAllTabs();
            editor.waysEditor.visible = true;
            //editor.waysEditor.switchView();
            editor.waysEditor.setFrame();
            break;
        case GodStep.KEY_4:
            editor.closeAllTabs();
            editor.memory.show();
            break;
    }
};



