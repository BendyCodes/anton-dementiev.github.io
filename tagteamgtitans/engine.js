window.addEventListener("load", init, false);
window.onresize = function() {
    onResize();
}
window.addEventListener('scroll', function () {
    if (document.activeElement === document.body && window.scrollY > 0) {
        document.body.scrollTop = 0;
        onResize();
    }
}, true);
window.addEventListener('mousedown', function (e) {
    window.focus();
    if (e != null) {
        e.preventDefault();
        e.stopPropagation();
    }
}, false);

var spriteSheetData = [];
var visibilityState = true;
var soundState = true;
var soundMusic;
var soundMusicState = false;
var currAudioFormat;
var soundData = [];
var renderer;
var stage;
var loader;
var numToLoadCount = 0;
var progressLoadCount = 0;
var stageCreated = false;
var globalWidth = 600;
var globalHeight = 400;
var globalScale = 1;
var realW = window.innerWidth;
var realH = window.innerHeight;

var stats;

var allContainer = new PIXI.Container();
var guiContainer = new PIXI.Container();

var gafFileData = "plain";
var gafBundle_instance;
var gafBundle_instance_nesting;

var debugScale = false;


function init() 
{
	setTimeout(main, 0);
}

function play_fx(stp, loop, vol)
{
    vol *= 0.01;
    if (soundState && visibilityState && soundData[stp] != undefined) {

        if (stp.indexOf("tt_music") > -1) {
            soundMusic = soundData[stp];
        }
        soundData[stp].loop(loop > 0);
        soundData[stp].volume(vol);
        soundData[stp].play();
    }
}

function stop_fx(snd)
{
    if (soundData[snd] != undefined) soundData[snd].stop();
}

function fade_fx(stp)
{
    stop_fx(stp);
}

var preload_imageBitmap;

function main()
{
    var preload_image = document.createElement("img");
    preload_image.src = "assets/loading_screen.jpg";
    preload_image.onload = function() {
        preload_imageBitmap = new PIXI.Sprite.fromImage(preload_image.src);

        renderer = PIXI.autoDetectRenderer(globalWidth, globalHeight, { antialias: false, transparent: false });
        document.body.appendChild(renderer.view);
        stage = new PIXI.Container();

        stage.addChild(preload_imageBitmap);

        stats = new Stats();
        stats.showPanel( 0 );

        document.body.appendChild( stats.dom );
        
        onResize();
        update();

        onPreloaderLoaded();
    };
}

var allSounds = (['tt_contact_hit_human','tt_enemy_hit1','tt_enemy_hit2','tt_titan_swap_whoosh','tt_fall',
    'tt_robin_melee','tt_raven_melee','tt_cyborg_melee','tt_beastboy_melee','tt_starfire_melee',
    'tt_robin_boomerang','tt_robin_boomerang_flying','tt_jump','tt_raven_object_drop','tt_raven_object_lift',
    'tt_raven_object_setdown','tt_raven_object_smash','tt_raven_hum_whistle','tt_raven_diamond',
    'tt_cyborg_cannon_charge_loop','tt_cyborg_cannon_fires','tt_cyborg_cannon_align','tt_starfire_eyebeams',
    'tt_beastboy_transform_back','tt_beastboy_transform','tt_beastboy_trex','tt_beastboy_ram','tt_beastboy_bat',
    'tt_music_bg1','tt_music_bg2','tt_music_bg3','tt_complete_level','tt_music_defeat','tt_lives_lost',
    'tt_health_full','tt_health_up','tt_energy_full','tt_player_1up','tt_points_collection','tt_beetrooper_lasers',
    'tt_cyborgclones_cannon','tt_turrets_lasers','tt_miss','RAVEN_ATTACK','RAVEN_VICTORY','RAVEN_START',
    'RAVEN_SPECIAL','RAVEN_HIT','RAVEN_DEFEAT','RAVEN_BOSS3','RAVEN_BOSS2','RAVEN_BOSS1','ROBIN_ATTACK',
    'ROBIN_VICTORY','ROBIN_START','ROBIN_SPECIAL','ROBIN_HIT','ROBIN_DEFEAT','ROBIN_BOSS3','ROBIN_BOSS2',
    'ROBIN_BOSS1','BEASTBOY_ATTACK','BEASTBOY_VICTORY','BEASTBOY_START','BEASTBOY_SPECIAL','BEASTBOY_HIT',
    'BEASTBOY_DEFEAT','BEASTBOY_BOSS3','BEASTBOY_BOSS2','BEASTBOY_BOSS1','CYBORG_ATTACK','CYBORG_VICTORY',
    'CYBORG_START','CYBORG_SPECIAL','CYBORG_HIT','CYBORG_DEFEAT','CYBORG_BOSS3','CYBORG_BOSS2','CYBORG_BOSS1',
    'STARFIRE_ATTACK','STARFIRE_VICTORY','STARFIRE_START','STARFIRE_SPECIAL','STARFIRE_HIT','STARFIRE_DEFEAT',
    'STARFIRE_BOSS3','STARFIRE_BOSS2','STARFIRE_BOSS1','tt_gen_mouserollover','tt_gen_mousedown','tt_gen_mouseneg',
    'tt_music_maintheme','tt_music_cutscene_bg','tt_music_bg4','tt_brotherblood_electronicpush',
    'tt_brotherblood_groundpound','tt_jinx_spincast','tt_mammoth_groundsmash','tt_gizmo_bomb_explosion',
    'tt_aqualad_waterattack','tt_speedy_archer','tt_bumblebee_b_stingers','tt_masymenos_rocktogether','dead_enemy1',
    'dead_enemy2','ram_hit','ram_run','boss_die','blood_die','sub','bounce','unlock','tt_music_victory']);

function onPreloaderLoaded()
{
    var murl = "m_p_3/";
    if (Howler.codecs("ogg")) {
        currAudioFormat = "ogg";
        murl = "o_g_g/";
    }
    else currAudioFormat = "mp3";

    var soundPreloadData = [];
    for (var s = 0; s < allSounds.length; s++) {
        soundPreloadData.push({name:allSounds[s].toLowerCase(), url:"sounds/" + murl + allSounds[s].toLowerCase() + "." + currAudioFormat});
    }
    var soundPreloadNum = soundPreloadData.length;

    for (var s = 0; s < soundPreloadData.length; s++) {
        var _loop = false;
        if (soundPreloadData[s].name.indexOf("music") > -1) _loop = true;

        soundData[soundPreloadData[s].name] = new Howl({
            urls: [soundPreloadData[s].url],
            loop: _loop,
            onload: function() {
                var percentValue = ((soundPreloadData.length - soundPreloadNum) / soundPreloadData.length) / 2;

                soundPreloadNum--;
                if (soundPreloadNum == 0) onSoundLoaded();
            }
        });
    }
}

var enemies_list = ["patrol_health=3&cyborg_clone_health=7&white_robot_health=5&fish_health=3&bee_health=2&tentacle_health=4&hoody_health=6&boss1_health=40&boss2_health=75&boss3_health=100&patrol_damage=30&cyborg_clone_damage=70&white_robot_damage=50&fish_damage=30&bee_damage=30&tentacle_damage=40&hoody_damage=60&jinx_damage=20&gismo_damage=30&mammoth_damage=40&aqualad_damage=30&speedy_damage=40&masy_menos_damage=50&bumble_bee_damage=40&brother_blood_damage=80&patrol_score=100&cyborg_clone_score=400&white_robot_score=200&fish_score=125&bee_score=50&tentacle_score=150&hoody_score=300&patrol_score=100&cyborg_clone_score=400&white_robot_score=200&fish_score=125&bee_score=50&tentacle_score=150&hoody_score=300&boss1_score=2000&boss2_score=4000&boss3_score=10000&star2=120000&star3=80000&star4=40000&extra_life_score=100&health_up_score=20&health_full_score=50&energy_full_score=50"];
var map_list = [0,1,2,10,11,12,13,14,20,21,22,23,24,30,31,32,33,34,35,40,50,51,52,53,54,60,61,62,63,64,70,71,72,73,74,75,76,80,81,82,83,84,85,90,100,101,102,103,110,111,112,113,114,120,121,122,123,124,125,130,131,132,133,140];
var boss_maps = [40,90,140];

var vars = {};
var maps;

function onSoundLoaded()
{
    loader = PIXI.loader;

    for (var ml = 0; ml < map_list.length; ml++) {
        loader.add("maps/map" + map_list[ml].toString() + ".txt");
    }
    
    loader.add("assets/tiles/tiles1.json");
    loader.add("assets/tiles/tiles2.json");
    loader.add("assets/tiles/tiles3.json");
    loader.add("assets/tiles/tiles4.json");
    loader.add("assets/tiles/tiles7.json");

    loader.once('complete', handleLoaderComplete);
    loader.load();
}

function handleLoaderComplete()
{
    initSpriteSheet("assets/tiles/tiles1.json");
    initSpriteSheet("assets/tiles/tiles2.json");
    initSpriteSheet("assets/tiles/tiles3.json");
    initSpriteSheet("assets/tiles/tiles4.json");
    initSpriteSheet("assets/tiles/tiles7.json");

    createStage();
}

function initSpriteSheet(name)
{
    var json = loader.resources[name].data;
    var frames = json.frames;
    var data = loader.resources[name].textures;
    if (data && frames)
    for (var namePng in frames) {
        var index = namePng.indexOf(".png");
        var nameFrame = namePng;
        if (index > 1) nameFrame = namePng.slice(0, index);
        spriteSheetData[nameFrame] = data[namePng];
    }
}

function createStage()
{
    if (stageCreated) return;
    stageCreated = true;

    allContainer.pivot.set(globalWidth/2, globalHeight/2);
    stage.addChild(allContainer);
    stage.addChild(guiContainer);

    initGameEngine();
}

function initGameEngine()
{
    onResize();

    soundMusic = soundData['music'];

    if (soundState && visibilityState)
    {
        if (soundMusic != undefined && soundMusic != null)
        if (!soundMusicState)
        {
            soundMusicState = true;
            soundMusic.play();
        }
    }

    var converter_gaf = new GAF.ZipToGAFAssetConverter();
    converter_gaf.convert("assets/" + gafFileData + "/" + gafFileData + ".gaf");
    converter_gaf.on(GAF.GAFEvent.COMPLETE, converter_gaf_complete);
    function converter_gaf_complete(pEvent)
    {
        gafBundle_instance = pEvent;

        var converter_gaf_robin = new GAF.ZipToGAFAssetConverter();
        converter_gaf_robin.convert("assets/nesting/nesting.gaf");
        converter_gaf_robin.on(GAF.GAFEvent.COMPLETE, converter_gaf_complete_nesting);
        function converter_gaf_complete_nesting(pEvent)
        {
            gafBundle_instance_nesting = pEvent;

            stage.removeChild(preload_imageBitmap);
            preload_imageBitmap = undefined;

            document.addEventListener('keydown', onKeyDown);
            document.addEventListener('keyup', onKeyUp);

            load_all();
        }
        
    }
}

function update()
{
    stats.begin();
    
    if (player_loaded && allContainer.children[0] != undefined)
    {
        for (var a in all.pieces)
        {
            var currPiece = all.pieces[a];

            if (currPiece != undefined)
            {
                if (currPiece.type == 'patrol')
                {
                    patrol_path(currPiece);
                    patrol_movement_ai(currPiece);
                    patrol_animation(currPiece);
                }

                if (currPiece.type == 'bee')
                {
                    bee_path(currPiece);
                    bee_movement_ai(currPiece);
                    bee_animation(currPiece);
                }

                if (currPiece.type == 'white_robot')
                {
                    white_robot_path(currPiece);
                    white_robot_movement_ai(currPiece);
                    white_robot_animation(currPiece);
                }

                if (currPiece.type == 'hoody')
                {
                    hoody_path(currPiece);
                    hoody_movement_ai(currPiece);
                    hoody_animation(currPiece);
                }

                if (currPiece.type == 'cyborg_clone')
                {
                    cyborg_clone_path(currPiece);
                    cyborg_clone_movement_ai(currPiece);
                    cyborg_clone_animation(currPiece);
                }

               if (currPiece.type == 'tentacle')
                {
                    tentacle_path(currPiece);
                    tentacle_movement_ai(currPiece);
                    tentacle_animation(currPiece);
                }

                if (currPiece.type == 'fish')
                {
                    fish_path(currPiece);
                    fish_movement_ai(currPiece);
                    fish_animation(currPiece);
                }

                if (currPiece.id == "enemy")
                {
                    currPiece.mc.x = currPiece._x;
                    currPiece.mc.y = currPiece._y;
                }
            }
        }

        for (var a=0; a < moving_shelf_data.length; a++)
        {
            shelf_mover(moving_shelf_data[a]);
        }
        
        tile_mover();
        player_physics();
        controls();

        if (titan.mc != null)
        {
            if (debugScale)
            {
                allContainer.x = -titan._x+realW / 2 + globalWidth/2;
                allContainer.y = -titan._y+realH / 2 + globalHeight/2;
            }
            else
            {
                if (the_crate != undefined && false)
                {
                    allContainer.x = -the_crate._x+titan_centre_x*2;
                    allContainer.y = -the_crate._y+440;
                }
                else
                {
                    camera_val += (-80 * camera_ref - camera_val) * camera_glide;
                    camera_val *= !distance_fix;

                    allContainer.x = -distance_x + titan_centre_x - camera_val + cxdiff;
                    allContainer.y = -distance_y + titan_centre_y - 30;
                }
            }
            
            titan.mc.x = titan_x;
            titan.mc.y = titan_y + half_tile;

            if (dead && titan.dead_fx != undefined && titan.dead_fx.mc != undefined)
            {
                titan.dead_fx.mc.x = titan.mc.x;
                titan.dead_fx.mc.y = titan.mc.y;
            }

            if (titan.swap_fx != undefined && titan.swap_fx.mc != undefined)
            {
                titan.swap_fx.mc.x = titan.mc.x;
                titan.swap_fx.mc.y = titan.mc.y;
            }

            if (titan.raven_blackswirl_left != undefined && titan.raven_blackswirl_left.mc != undefined)
            {
                titan.raven_blackswirl_left.mc.x = titan.mc.x + 95;
                titan.raven_blackswirl_left.mc.y = titan.mc.y - 125;
            }

            if (titan.raven_blackswirl_right != undefined && titan.raven_blackswirl_right.mc != undefined)
            {
                titan.raven_blackswirl_right.mc.x = titan.mc.x - 94;
                titan.raven_blackswirl_right.mc.y = titan.mc.y - 126;
            }

            if (cyborg_special_gun_effect != undefined && special)
            {
                if (cyborg_diff_pos[pose+" "+titan_direction] != undefined)
                {
                    cyborg_special_gun_effect.x = titan_x + cyborg_diff_pos[pose+" "+titan_direction][0] - 35.5;
                    cyborg_special_gun_effect.y = titan_y + cyborg_diff_pos[pose+" "+titan_direction][1] - 30;
                }
            }  
        }
    }

    renderer.render(stage);

 stats.end();

    requestAnimationFrame(update);
}

function onResize()
{
    if (!renderer) return;

    var gdpi = window.devicePixelRatio;
    gdpi = 1;

    realW = window.innerWidth*gdpi;
    realH = window.innerHeight*gdpi;

    globalScale = Math.min(realW / globalWidth, realH / globalHeight);

    if (debugScale)
    {
        renderer.resize(realW, realH);
        renderer.view.style.position = 'absolute';
        renderer.view.style.width = realW/gdpi + 'px';
        renderer.view.style.height = realH/gdpi + 'px';
    }
    else
    {
        renderer.resize(globalWidth/1, globalHeight/1);
        renderer.view.style.width = globalWidth/gdpi * globalScale + 'px';
        renderer.view.style.height = globalHeight/gdpi * globalScale+ 'px';

        renderer.view.style.position = 'absolute';
        renderer.view.style.left = (realW / 2 - globalWidth * globalScale / 2) + 'px';
        renderer.view.style.top = (realH / 2 - globalHeight * globalScale / 2) + 'px';
    }
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

function shuffle(a, finish)
{
    if (finish == undefined) finish = a.length;
    var j, x, i;
    for (i = finish; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function addGAFMovieClip(name, nesting)
{
    if (nesting) return new GAF.GAFMovieClip(gafBundle_instance_nesting.target.gafBundle.getGAFTimeline("nesting", name));
    return new GAF.GAFMovieClip(gafBundle_instance.target.gafBundle.getGAFTimeline(gafFileData, name));
}

function pixiGetSprite(imgName, sclX, sclY)
{
    if (imgName == "defaultname")
    return new PIXI.Sprite(loader.resources[imgName].texture);
    else return new PIXI.Sprite(spriteSheetData[imgName]);
}

function pixiGetTexture(imgName)
{
    return new PIXI.Texture(spriteSheetData[imgName], spriteSheetData[imgName].frame);
}

var fix_lev = 0;
var fixer = {};
function fix(timer,func)
{
    fix_lev++;
    fixer.createEmptyMovieClip = function(name) {
        fixer[name] = {};
    }
    fixer.createEmptyMovieClip('fix'+fix_lev,fix_lev);

    fixer['fix'+fix_lev].func = func;
    fixer['fix'+fix_lev].the_time = timer;
    fixer['fix'+fix_lev].timer = 0;
    fixer['fix'+fix_lev].onEnterFrame = function(){
        var ths = this.substr(3, this.indexOf(".")-3);
        var this_ = fixer['fix'+ths];
        this_.timer++;
        if(this_.timer == this_.the_time){
            window[this_.func[0]](this_.func[1][0]);
            removeCustomEfFunc('fix' + ths + '.onEnterFrame');
        }
    }
    addCustomEfFunc('fix' + fix_lev + '.onEnterFrame',  fixer['fix'+fix_lev].onEnterFrame);
}

Visibility.change(function (e, state)
{
    if (state == "hidden")
    {
        visibilityState = false;

        if (soundMusic != undefined && soundMusic != null)
        {
            soundMusicState = false;
            soundMusic.mute();
        }
    }
    else
    {
        visibilityState = true;

        if (soundMusic != undefined && soundMusic != null)
        if (soundState)
        {
            if (!soundMusicState)
            {
                soundMusicState = true;
                soundMusic.unmute();
            }
        }
    }
});

function isLocalStorageAvailable()
{
    var checkKey = "test", storage = window.sessionStorage;
    try
    {
        storage.setItem(checkKey, "test");
        storage.removeItem(checkKey);
        return true;
    }
    catch (error)
    {
        return false;
    }
}

function loadGameProcess()
{
    if (isLocalStorageAvailable()) {
        if (window.localStorage.getItem("game_data") != undefined)
            return saved_locally = JSON.parse(window.localStorage.getItem("game_data"));
        else return undefined;
    }
}

function saveGameProcess()
{
    if (isLocalStorageAvailable()) {
        window.localStorage.setItem("game_data", JSON.stringify(saved_locally));
    }
}