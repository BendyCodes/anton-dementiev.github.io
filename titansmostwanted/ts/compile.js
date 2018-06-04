var com;
(function (com) {
    var md;
    (function (md) {
        class MochiDigits {
            constructor(digit = 0, index = 0) {
                this.Encoder = 0;
                this.setValue(digit, index);
            }
            get value() {
                return Number(this.toString());
            }
            set value(v) {
                this.setValue(v);
            }
            addValue(inc) {
                this.value += inc;
            }
            setValue(digit = 0, index = 0) {
                var s = digit.toString();
                this.Fragment = s.charCodeAt(index++) ^ this.Encoder;
                if (index < s.length)
                    this.Sibling = new MochiDigits(digit, index);
                else
                    this.Sibling = null;
            }
            toString() {
                var s = String.fromCharCode(this.Fragment ^ this.Encoder);
                if (this.Sibling != null)
                    s += this.Sibling.toString();
                return s;
            }
        }
        md.MochiDigits = MochiDigits;
    })(md = com.md || (com.md = {}));
})(com || (com = {}));
var MochiDigits = com.md.MochiDigits;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class Unit {
                constructor() {
                    this.id = 0;
                    this.label = "";
                    this.description = "";
                    this.villainInfoLabel = "";
                    this.frameLabel = "";
                    this.prevLevel = 1;
                    this.level = 1;
                    this.prevXP = 0;
                    this.XP = 0;
                    this.levelPointsLeftToSpend = 0;
                    this.HPBonus = 0;
                    this.movementSpeed = 4;
                    this.flys = false;
                    this.unitActions = [new battleTactics.EndTurnAction];
                    this.retaliationAction = 1;
                    this.aiControllerClass = battleTactics.AIController;
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("RobinAttackAnims");
                }
                init() {
                }
                initUnlockedActions(unlockAll = false) {
                    this.unlockedActions = [];
                    this.unlockedActions[0] = true;
                    this.unlockedActions[1] = true;
                    this.usedActions = [];
                    this.usedActions[0] = true;
                    this.usedActions[1] = false;
                    for (var i = 2; i < this.unitActions.length; i++) {
                        this.unlockedActions[i] = unlockAll;
                        this.usedActions[i] = false;
                    }
                }
                performAction(actionID, map, unitInPlay, targetX, targetY) {
                    var paramObj = {};
                    console.log("performAction", unitInPlay.unit.label);
                    switch (actionID) {
                        case 0:
                            return true;
                        default:
                            paramObj["map"] = map;
                            paramObj["targetX"] = targetX;
                            paramObj["targetY"] = targetY;
                            paramObj["unit"] = unitInPlay;
                            break;
                    }
                    return this.unitActions[actionID].perform(paramObj);
                }
                increaseXP(xpUp, theUnit = null) {
                    if (xpUp > 0) {
                        this.prevXP = this.XP;
                        this.XP += xpUp;
                        this.prevLevel = this.level;
                        if (this.XP > battleTactics.Config.XPTOLEVELUP[battleTactics.Config.XPTOLEVELUP.length - 1]) {
                            this.XP = battleTactics.Config.XPTOLEVELUP[battleTactics.Config.XPTOLEVELUP.length - 1];
                        }
                        while (this.level < 10 && this.XP >= battleTactics.Config.XPTOLEVELUP[this.level - 1]) {
                            this.level++;
                            this.levelPointsLeftToSpend++;
                        }
                    }
                }
                increaseHP() {
                    if (this.levelPointsLeftToSpend > 0) {
                        this.HPBonus++;
                        this.levelPointsLeftToSpend--;
                    }
                }
                unlockAction() {
                    if (this.levelPointsLeftToSpend > 0) {
                        for (var i = 2; i < this.unlockedActions.length; i++) {
                            if (this.unlockedActions[i] == false) {
                                this.unlockedActions[i] = true;
                                this.levelPointsLeftToSpend--;
                                break;
                            }
                        }
                    }
                }
                beforeMoveFunction(unitInPlay, map) {
                }
                afterMoveFunction(unitInPlay, map) {
                }
                startOfTeamsTurnFunction(unitInPlay, map) {
                    unitInPlay.attackable = true;
                    unitInPlay.evadeAttackCount = 0;
                    if (unitInPlay.poisonTurns > 0) {
                        unitInPlay.currentHP -= Math.floor(unitInPlay.poisonPower);
                        unitInPlay.poisonTurns--;
                        battleTactics.BattleController.showDamageRiser(unitInPlay.poisonPower, unitInPlay, true);
                        if (unitInPlay.currentHP <= 0) {
                            unitInPlay.state = battleTactics.UnitInPlay.KO;
                            unitInPlay.actioned = true;
                        }
                        if (unitInPlay.poisonTurns <= 0) {
                            unitInPlay.poisonPower = 0;
                        }
                    }
                }
                endOfTeamsTurnFunction(unitInPlay, map) {
                }
                noHPLeftFunction(unitInPlay, map) {
                }
                getSaveData() {
                    var saveDataObject = {};
                    saveDataObject.prevLevel = this.prevLevel;
                    saveDataObject.prevXP = this.prevXP;
                    saveDataObject.level = this.level;
                    saveDataObject.XP = this.XP;
                    saveDataObject.levelPointsLeftToSpend = this.levelPointsLeftToSpend;
                    saveDataObject.unlockedActions = [];
                    for (var i = 0; i < this.unlockedActions.length; i++) {
                        saveDataObject.unlockedActions[i] = this.unlockedActions[i];
                    }
                    saveDataObject.usedActions = [];
                    for (var i = 0; i < this.usedActions.length; i++) {
                        saveDataObject.usedActions[i] = this.usedActions[i];
                    }
                    saveDataObject.HPBonus = this.HPBonus;
                    return saveDataObject;
                }
                restoreFromSaveData(saveDataObject) {
                    this.prevLevel = saveDataObject.prevLevel;
                    this.prevXP = saveDataObject.prevXP;
                    this.level = saveDataObject.level;
                    this.XP = saveDataObject.XP;
                    this.levelPointsLeftToSpend = saveDataObject.levelPointsLeftToSpend;
                    for (var i = 0; i < this.unlockedActions.length; i++) {
                        this.unlockedActions[i] = saveDataObject.unlockedActions[i];
                    }
                    for (var i = 0; i < this.usedActions.length; i++) {
                        this.usedActions[i] = saveDataObject.usedActions[i];
                    }
                    this.HPBonus = saveDataObject.HPBonus;
                }
            }
            battleTactics.Unit = Unit;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Unit = com.ussgames.battleTactics.Unit;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class Robin extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Robin";
                    this.description = "Leader of the Teen Titans, a good all rounder";
                    this.frameLabel = "robin";
                    this.HP = 6;
                    this.MP = 3;
                    this.movementSpeed = 8;
                    this.movementCosts = [1, 1, 3, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("RobinPlaceHolder");
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("RobinAttackAnims");
                    this.unitActions.push(new teenTitansBattleQuest.RobinSlap, new teenTitansBattleQuest.RobinKick, new teenTitansBattleQuest.RobinStaffAttack, new teenTitansBattleQuest.RobinBaterang);
                }
            }
            teenTitansBattleQuest.Robin = Robin;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Robin = com.ussgames.teenTitansBattleQuest.Robin;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class Cyborg extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Cyborg";
                    this.description = "Part man, part robot, Cyborg has superhuman strength";
                    this.frameLabel = "cyborg";
                    this.HP = 8;
                    this.MP = 3;
                    this.movementSpeed = 8;
                    this.movementCosts = [1, 1, 0, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("CyborgPlaceHolder");
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("CyborgAttackAnims");
                    this.unitActions.push(new teenTitansBattleQuest.CyborgFistSmash, new teenTitansBattleQuest.CyborgGroundPound, new teenTitansBattleQuest.CyborgLaserArm, new teenTitansBattleQuest.CyborgDashAttack);
                }
            }
            teenTitansBattleQuest.Cyborg = Cyborg;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Cyborg = com.ussgames.teenTitansBattleQuest.Cyborg;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BeastBoy extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Beast Boy";
                    this.description = "Loves burritos, turns into animals to attack and evade";
                    this.frameLabel = "beastboy";
                    this.HP = 6;
                    this.MP = 3;
                    this.movementSpeed = 8;
                    this.movementCosts = [1, 1, 1, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("BeastBoyPlaceHolder");
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("BeastBoyAttackAnims");
                    this.unitActions.push(new teenTitansBattleQuest.BeastBoyGorillaPunch, new teenTitansBattleQuest.BeastBoyCatHide, new teenTitansBattleQuest.BeastBoyMoquito, new teenTitansBattleQuest.BeastBoyCheetahDash);
                }
            }
            teenTitansBattleQuest.BeastBoy = BeastBoy;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BeastBoy = com.ussgames.teenTitansBattleQuest.BeastBoy;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class Raven extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Raven";
                    this.description = "Part Demon, has range attack and magical abilites";
                    this.frameLabel = "raven";
                    this.MP = 2;
                    this.HP = 5;
                    this.movementSpeed = 4;
                    this.flys = true;
                    this.movementCosts = [1, 1, 1, 1, 0];
                    this.movieClipClass = Main.addGAFMovieClip("RavenPlaceHolder");
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("RavenAttackAnims");
                    this.unitActions.push(new teenTitansBattleQuest.RavenWandBlast, new teenTitansBattleQuest.RavenHeal, new teenTitansBattleQuest.RavenTeleport, new teenTitansBattleQuest.RavenBlackHole);
                }
            }
            teenTitansBattleQuest.Raven = Raven;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Raven = com.ussgames.teenTitansBattleQuest.Raven;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class Starfire extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Starfire";
                    this.description = "Friendly alien princess, quick with long range attacks";
                    this.frameLabel = "starfire";
                    this.MP = 3;
                    this.HP = 4;
                    this.movementSpeed = 8;
                    this.movementCosts = [1, 1, 1, 1, 1];
                    this.flys = true;
                    this.movieClipClass = Main.addGAFMovieClip("StarfirePlaceHolder");
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("StarfireAttackAnims");
                    this.unitActions.push(new teenTitansBattleQuest.StarfireLaserFist, new teenTitansBattleQuest.StarfireLaserEyes, new teenTitansBattleQuest.StarfireEvade, new teenTitansBattleQuest.StarfireMegaFist);
                }
            }
            teenTitansBattleQuest.Starfire = Starfire;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Starfire = com.ussgames.teenTitansBattleQuest.Starfire;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BankRobber extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Thug";
                    this.MP = 2;
                    this.HP = 3;
                    this.movementCosts = [1, 1, 2, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("BaddiePlaceHolder");
                    this.unitActions.push(new teenTitansBattleQuest.BankRobberAttack);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("Thug1AttackAnims");
                    this.villainInfoLabel = "Thug";
                }
            }
            teenTitansBattleQuest.BankRobber = BankRobber;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BankRobber = com.ussgames.teenTitansBattleQuest.BankRobber;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class OldMotherMaeEye extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Mother Mae-Eye";
                    this.MP = 3;
                    this.HP = 10;
                    this.movementCosts = [1, 1, 2, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("MotherMayEye");
                    this.unitActions.push(new teenTitansBattleQuest.MaeEyeAttack);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("MaeEyeAttackAnims");
                    this.villainInfoLabel = "Mother";
                }
                /*override*/ beforeMoveFunction(unitInPlay, map) {
                    if ((unitInPlay.mapX != unitInPlay.movedFromX || unitInPlay.mapY != unitInPlay.movedFromY)) {
                        var newUnit = new teenTitansBattleQuest.KamikazePie;
                        newUnit.init();
                        newUnit.initUnlockedActions(true);
                        newUnit.id = Config.unitConfigs.indexOf(teenTitansBattleQuest.KamikazePie);
                        var newUnitInPlay = new UnitInPlay();
                        newUnitInPlay.init(newUnit, unitInPlay.movedFromX, unitInPlay.movedFromY, unitInPlay.team, unitInPlay.ai);
                        newUnitInPlay.actioned = true;
                        map.unitsInPlay.push(newUnitInPlay);
                        map.addUnitToView(newUnitInPlay);
                    }
                }
                /*override*/ noHPLeftFunction(unitInPlay, map) {
                    for (var i = 0; i < map.unitsInPlay.length; i++) {
                        if (map.unitsInPlay[i].unit instanceof teenTitansBattleQuest.KamikazePie) {
                            map.unitsInPlay[i].currentHP = 0;
                            Main.changeText(map.unitsInPlay[i].clip.hp, ["0"]);
                        }
                    }
                }
            }
            teenTitansBattleQuest.OldMotherMaeEye = OldMotherMaeEye;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var OldMotherMaeEye = com.ussgames.teenTitansBattleQuest.OldMotherMaeEye;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class Plasmus extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Plasmus";
                    this.MP = 1;
                    this.HP = 20;
                    this.movementCosts = [1, 1, 1, 1, 0];
                    this.movieClipClass = Main.addGAFMovieClip("PlasmusClip");
                    this.unitActions.push(new teenTitansBattleQuest.PlasmusAttack);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("PlasmusAttackAnims");
                    this.villainInfoLabel = "Plasmus";
                }
            }
            teenTitansBattleQuest.Plasmus = Plasmus;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Plasmus = com.ussgames.teenTitansBattleQuest.Plasmus;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class DrLightBeam extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Dr. Lightbeam";
                    this.MP = 2;
                    this.HP = 6;
                    this.movementSpeed = 4;
                    this.movementCosts = [1, 1, 2, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("LightbeamAnims");
                    this.unitActions.push(new teenTitansBattleQuest.DrLightBeamBlast);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("DrLightAttackAnims");
                    this.villainInfoLabel = "DrLight";
                }
            }
            teenTitansBattleQuest.DrLightBeam = DrLightBeam;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var DrLightBeam = com.ussgames.teenTitansBattleQuest.DrLightBeam;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BillyNumerous extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Billy Numerous";
                    this.MP = 1;
                    this.HP = 6;
                    this.movementCosts = [1, 1, 1, 1, 0];
                    this.movieClipClass = Main.addGAFMovieClip("BillyNumerousAnims");
                    this.unitActions.push(new teenTitansBattleQuest.BillyNumerousKick);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("NumerousAttackAnims");
                    this.villainInfoLabel = "Bill";
                }
                /*override*/ beforeMoveFunction(unitInPlay, map) {
                    if (!BillyNumerous.duplicated && (unitInPlay.mapX != unitInPlay.movedFromX || unitInPlay.mapY != unitInPlay.movedFromY)) {
                        var newUnit = new BillyNumerous;
                        newUnit.init();
                        newUnit.initUnlockedActions(true);
                        newUnit.id = Config.unitConfigs.indexOf(BillyNumerous);
                        var newUnitInPlay = new UnitInPlay();
                        newUnitInPlay.init(newUnit, unitInPlay.movedFromX, unitInPlay.movedFromY, unitInPlay.team, unitInPlay.ai);
                        newUnitInPlay.actioned = true;
                        map.unitsInPlay.push(newUnitInPlay);
                        map.addUnitToView(newUnitInPlay);
                        BillyNumerous.duplicated = true;
                    }
                }
                /*override*/ startOfTeamsTurnFunction(unitInPlay, map) {
                    BillyNumerous.duplicated = false;
                }
            }
            BillyNumerous.duplicated = false;
            teenTitansBattleQuest.BillyNumerous = BillyNumerous;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BillyNumerous = com.ussgames.teenTitansBattleQuest.BillyNumerous;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class Trigon extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Trigon";
                    this.MP = 2;
                    this.HP = 40;
                    this.movementCosts = [1, 1, 1, 1, 0];
                    this.movieClipClass = Main.addGAFMovieClip("TrigonAnims");
                    this.unitActions.push(new teenTitansBattleQuest.TrigonAttack1, new teenTitansBattleQuest.TrigonAttack2);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("TrigonAttackAnims");
                    this.villainInfoLabel = "Trigon";
                }
            }
            teenTitansBattleQuest.Trigon = Trigon;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Trigon = com.ussgames.teenTitansBattleQuest.Trigon;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class Jinx extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Jinx";
                    this.MP = 3;
                    this.HP = 10;
                    this.movementCosts = [1, 1, 2, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("JinxAnims");
                    this.unitActions.push(new teenTitansBattleQuest.JinxKick, new teenTitansBattleQuest.JinxHex);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("JinxAttackAnims");
                    this.villainInfoLabel = "Jinx";
                }
            }
            teenTitansBattleQuest.Jinx = Jinx;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Jinx = com.ussgames.teenTitansBattleQuest.Jinx;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class Mammoth extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Mammoth";
                    this.MP = 2;
                    this.HP = 20;
                    this.movementCosts = [1, 1, 2, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("MammothAnims");
                    this.unitActions.push(new teenTitansBattleQuest.MammothAttack);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("MammothAttackAnims");
                    this.villainInfoLabel = "Mammoth";
                }
            }
            teenTitansBattleQuest.Mammoth = Mammoth;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Mammoth = com.ussgames.teenTitansBattleQuest.Mammoth;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class Gizmo extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Gizmo";
                    this.MP = 3;
                    this.HP = 10;
                    this.movementSpeed = 8;
                    this.movementCosts = [1, 1, 1, 1, 1];
                    this.flys = true;
                    this.movieClipClass = Main.addGAFMovieClip("GizmoAnims");
                    this.unitActions.push(new teenTitansBattleQuest.GizmoAttack);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("GizmoAttackAnims");
                    this.villainInfoLabel = "Gizmo";
                }
            }
            teenTitansBattleQuest.Gizmo = Gizmo;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Gizmo = com.ussgames.teenTitansBattleQuest.Gizmo;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class SeeMore extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "See More";
                    this.MP = 2;
                    this.HP = 8;
                    this.movementSpeed = 4;
                    this.movementCosts = [1, 1, 2, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("SeeMoreAnims");
                    this.unitActions.push(new teenTitansBattleQuest.SeeMoreEyeBeam);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("SeeMoreAttackAnims");
                    this.villainInfoLabel = "See-More";
                }
            }
            teenTitansBattleQuest.SeeMore = SeeMore;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var SeeMore = com.ussgames.teenTitansBattleQuest.SeeMore;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BankRobberLongRange extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Catapult Thug";
                    this.MP = 2;
                    this.HP = 4;
                    this.movementCosts = [1, 1, 2, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("LongRangeThug");
                    this.unitActions.push(new teenTitansBattleQuest.BankRobberLongRngeAttack);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("Thug2AttackAnims");
                    this.villainInfoLabel = "ThugRange";
                }
            }
            teenTitansBattleQuest.BankRobberLongRange = BankRobberLongRange;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BankRobberLongRange = com.ussgames.teenTitansBattleQuest.BankRobberLongRange;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class KamikazePie extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Magic Pie";
                    this.MP = 0;
                    this.HP = 1;
                    this.movementCosts = [1, 1, 1, 1, 0];
                    this.movieClipClass = Main.addGAFMovieClip("KamikazePieAnims");
                    this.unitActions.push(new teenTitansBattleQuest.KamikazePieAttack);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("PieAttackAnims");
                    this.villainInfoLabel = "Pie";
                }
            }
            teenTitansBattleQuest.KamikazePie = KamikazePie;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var KamikazePie = com.ussgames.teenTitansBattleQuest.KamikazePie;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class DrLightBeamHolo extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Holo Dr. Lightbeam";
                    this.MP = 2;
                    this.HP = 3;
                    this.movementSpeed = 4;
                    this.movementCosts = [1, 1, 2, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("LightbeamAnims_holo");
                    this.unitActions.push(new teenTitansBattleQuest.DrLightBeamBlastHolo);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("DrLightHoloAttackAnims");
                    this.villainInfoLabel = "Hologram";
                }
            }
            teenTitansBattleQuest.DrLightBeamHolo = DrLightBeamHolo;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var DrLightBeamHolo = com.ussgames.teenTitansBattleQuest.DrLightBeamHolo;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class Demon extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Demon";
                    this.MP = 3;
                    this.HP = 5;
                    this.flys = true;
                    this.movementCosts = [1, 1, 1, 1, 0];
                    this.movieClipClass = Main.addGAFMovieClip("DemonBaddieClip");
                    this.unitActions.push(new teenTitansBattleQuest.DemonScare);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("DemonAttackAnims");
                    this.villainInfoLabel = "Demon";
                }
            }
            teenTitansBattleQuest.Demon = Demon;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Demon = com.ussgames.teenTitansBattleQuest.Demon;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class RobotArmy extends Unit {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.label = "Robot";
                    this.MP = 2;
                    this.HP = 6;
                    this.movementCosts = [1, 1, 2, 2, 0];
                    this.movieClipClass = Main.addGAFMovieClip("RobotAnims");
                    this.unitActions.push(new teenTitansBattleQuest.RobotAttack);
                    this.useNewAttackAnim = true;
                    this.newAttackAnimClipClass = Main.addGAFMovieClip("RobotAttackAnims");
                    this.villainInfoLabel = "RobotSoldier";
                }
            }
            teenTitansBattleQuest.RobotArmy = RobotArmy;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var RobotArmy = com.ussgames.teenTitansBattleQuest.RobotArmy;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class CustomMovieClip extends PIXI.Sprite {
                constructor(mc) {
                    super();
                    this.instanceClip = mc;
                }
                gotoAndPlay(frameLabel) {
                    this.instanceClip.gotoAndPlay(frameLabel);
                }
                gotoAndStop(frameLabel) {
                    this.instanceClip.gotoAndStop(frameLabel);
                }
                play() {
                    this.instanceClip.play();
                }
                addEventListener(type, arg1, arg2 = null, arg3 = null) {
                    this.interactive = true;
                    if (arg3 != undefined)
                        arg2.on(type, arg1.bind(arg3));
                    else
                        arg2.on(type, arg1);
                }
            }
            buttons.CustomMovieClip = CustomMovieClip;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var CustomMovieClip = com.ussgames.buttons.CustomMovieClip;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var game;
        (function (game) {
            class Controller {
                static setRoot(rootTimeline) {
                    Controller.root = rootTimeline;
                    this.flags = {};
                    this.flags.infoPanels = {};
                    this.flags.infoPanels.actionSelectorPanel = false;
                    this.flags.infoPanels.enemyInfoPanel = false;
                }
                static init(mainClass, transitionClip) {
                    Controller.main = mainClass;
                    Controller.transitioner = transitionClip;
                    Transitioner.setRoot(Controller.root);
                    if (Controller.sharedObjectData == null) {
                        Controller.loadSharedObject();
                        SoundController.updateSoundButtons();
                    }
                }
                static startGame() {
                    Controller.main.startGame();
                }
                static stopGame() {
                    Controller.main.stopGame();
                }
                static selectLevel(level = 1) {
                    console.log("run level", level);
                    game.Main.level.setValue(level);
                    Controller.unlockLevel(level);
                    Controller.transitioner.goto("theGame", "Controller.saveSharedObject");
                    Controller.startLevel();
                    Controller.root.infoPanels.levelNumberPanel.gotoAndStop(Controller.getLevelNumber());
                    Controller.root.infoPanels.levelNumberPanel.visible = false;
                    Controller.root.tut.visible = false;
                    if (!Controller.psbtn) {
                        Controller.psbtn = true;
                        new PauseButton(Controller.root.pauseBtnGame, "theGame");
                    }
                }
                static getLevelNumber() {
                    return game.Main.level.value;
                }
                static startLevel() {
                    game.Main.startClearAssetCache();
                    if (!game.Main.inGamePanel)
                        game.Main.inGamePanel = new GamePanel(Controller.root.inGamePanel);
                    ;
                    Controller.main.initGame();
                    Controller.startGame();
                    SoundController.playMusic("tune2");
                    game.Main.stopClearAssetCache();
                }
                static newGame() {
                    game.Main.gamePaused = false;
                    GamePanel.panelOpen = false;
                    Controller.transitioner.goto("levelSelect");
                    Controller.main.resetGame();
                }
                static quitGame() {
                    Controller.stopGame();
                    Controller.transitioner.goto("levelSelect", "Controller.main.cleanUp");
                }
                static gameComplete() {
                    Controller.stopGame();
                    Controller.transitioner.goto("complete");
                }
                static showGameHelp() {
                    Controller.transitioner.goto("help");
                }
                static showMainMenu() {
                    Controller.transitioner.goto("menu");
                }
                static loadSharedObject() {
                    var mySo = Controller.main.loadGameProcess();
                    if (mySo != undefined) {
                        Controller.sharedObjectData = mySo;
                        SoundController.soundOn = Controller.sharedObjectData.soundOn;
                        SoundController.musicOn = Controller.sharedObjectData.musicOn;
                        BattleController.initPersistentUnits(Controller.sharedObjectData.unitData);
                    }
                    else {
                        Controller.sharedObjectData = {};
                        Controller.sharedObjectData.soundOn = true;
                        Controller.sharedObjectData.musicOn = true;
                        Controller.sharedObjectData.levelsUnlocked = new Array();
                        Controller.sharedObjectData.levelsUnlocked[0] = true;
                        Controller.sharedObjectData.levelScores = new Array();
                        Controller.sharedObjectData.levelScores[0] = 0;
                        Controller.sharedObjectData.levelMedals = new Array();
                        Controller.sharedObjectData.levelMedals[0] = 0;
                        for (var i = 1; i < game.Config.NUMBEROFLEVELS; i++) {
                            Controller.sharedObjectData.levelsUnlocked[i] = false;
                            Controller.sharedObjectData.levelScores[i] = 0;
                            Controller.sharedObjectData.levelMedals[i] = 0;
                        }
                        BattleController.initPersistentUnits();
                        Controller.saveSharedObject();
                    }
                    console.log("loadSharedObject", Controller.sharedObjectData);
                }
                static saveSoundSettings() {
                    Controller.sharedObjectData.soundOn = SoundController.soundOn;
                    Controller.sharedObjectData.musicOn = SoundController.musicOn;
                    Controller.saveSharedObject();
                }
                static saveSharedObject() {
                    Controller.sharedObjectData.unitData = BattleController.getPersistendUnitData();
                    Controller.main.saveGameProcess();
                    console.log("saveSharedObject", Controller.sharedObjectData);
                }
                static isLevelUnlocked(theLevel) {
                    return Controller.sharedObjectData.levelsUnlocked[theLevel - 1];
                }
                static setLevelScore(theLevel, theScore) {
                    if (theScore > Controller.sharedObjectData.levelScores[theLevel - 1]) {
                        Controller.sharedObjectData.levelScores[theLevel - 1] = theScore;
                    }
                    Controller.saveSharedObject();
                }
                static resetLevelScores() {
                    for (var i = 0; i < game.Config.NUMBEROFLEVELS; i++) {
                        Controller.sharedObjectData.levelScores[i] = 0;
                        Controller.sharedObjectData.levelAllRainbows[i] = false;
                    }
                    Controller.saveSharedObject();
                }
                static getLevelScore(levelNum) {
                    return Controller.sharedObjectData.levelScores[levelNum - 1];
                }
                static get_levelMedal(levelNum) {
                    return Controller.sharedObjectData.levelMedals[levelNum - 1];
                }
                static set_levelMedal(levelNum, medal) {
                    if (Controller.sharedObjectData.levelMedals[levelNum - 1] < medal) {
                        Controller.sharedObjectData.levelMedals[levelNum - 1] = medal;
                    }
                    Controller.saveSharedObject();
                }
                static getGameEnding() {
                    var gameEnd = 4;
                    for (var i = 0; i < game.Config.NUMBEROFLEVELS; i++) {
                        if (Controller.sharedObjectData.levelScores[i] == 0) {
                            gameEnd = 1;
                        }
                        if (Controller.sharedObjectData.levelMedals[i] + 1 < gameEnd) {
                            gameEnd = Controller.sharedObjectData.levelMedals[i] + 1;
                        }
                    }
                    return gameEnd;
                }
                static getTotalScore() {
                    var currentScore = 0;
                    for (var i = 0; i < game.Config.NUMBEROFLEVELS; i++) {
                        currentScore += Controller.sharedObjectData.levelScores[i];
                    }
                    return currentScore;
                }
                static unlockLevel(theLevel) {
                    Controller.sharedObjectData.levelsUnlocked[theLevel - 1] = true;
                    Controller.saveSharedObject();
                }
                static unlockAllLevels() {
                    for (var i = 0; i < game.Config.NUMBEROFLEVELS; i++) {
                        Controller.sharedObjectData.levelsUnlocked[i] = true;
                    }
                    Controller.saveSharedObject();
                }
                static resetLevelLocks() {
                    Controller.sharedObjectData.levelsUnlocked[0] = true;
                    for (var i = 1; i < game.Config.NUMBEROFLEVELS; i++) {
                        Controller.sharedObjectData.levelsUnlocked[i] = false;
                    }
                    Controller.saveSharedObject();
                }
                static playInGameMusic() {
                    SoundController.playMusic("tune" + Controller.currentInGameMusic);
                    Controller.currentInGameMusic++;
                    if (Controller.currentInGameMusic > 3)
                        Controller.currentInGameMusic = 2;
                }
            }
            Controller.psbtn = false;
            Controller.currentInGameMusic = 2;
            game.Controller = Controller;
        })(game = ussgames.game || (ussgames.game = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Controller = com.ussgames.game.Controller;
var Rectangle = PIXI.Rectangle;
var Point = PIXI.Point;
var Sprite = PIXI.Sprite;
var ColorMatrixFilter = PIXI.filters.ColorMatrixFilter;
window.onresize = function () {
    Main.onResize();
};
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var game;
        (function (game) {
            class Main {
                constructor() {
                    this.numToLoadCount = 0;
                    this.progressLoadCount = 0;
                    this.stageCreated = false;
                    this.allSounds = (["badHP", "buyUpgrade", "goodHP", "levelup", "lose", "select", "tune1", "tune2", "tune3", "upgrades", "win"]);
                    if (Main.inited)
                        return;
                    Main.inited = true;
                    this.loader = PIXI.loader;
                    this.loader.add("localisedtext.xml");
                    this.loader.once('complete', function () {
                        this.onPreloaderLoaded();
                    }.bind(this));
                    this.loader.load();
                }
                onPreloaderLoaded() {
                    var currAudioFormat = "ogg";
                    if (Howler.codecs("mp3")) {
                        currAudioFormat = "mp3";
                    }
                    var soundPreloadData = [];
                    for (var s = 0; s < this.allSounds.length; s++) {
                        soundPreloadData.push({ name: this.allSounds[s].toLowerCase(), url: "sounds/" + this.allSounds[s].toLowerCase() + "." + currAudioFormat });
                    }
                    var soundPreloadNum = soundPreloadData.length;
                    for (var s = 0; s < soundPreloadData.length; s++) {
                        var _loop = false;
                        if (soundPreloadData[s].name.indexOf("tune") > -1)
                            _loop = true;
                        Main.soundData[soundPreloadData[s].name] = new Howl({
                            urls: [soundPreloadData[s].url],
                            loop: _loop,
                            onload: function () {
                                //var percentValue = ((soundPreloadData.length - soundPreloadNum) / soundPreloadData.length) / 2;
                                soundPreloadNum--;
                                if (soundPreloadNum == 0)
                                    Main.initialization();
                            }
                        });
                    }
                }
                static initialization() {
                    Main.score = new MochiDigits();
                    Main.lives = new MochiDigits();
                    Main.level = new MochiDigits();
                    Main.stats = new Stats();
                    Main.updateRender();
                    Main.preload_image = document.createElement("img");
                    Main.preload_image.src = "loading_splash.png";
                    Main.preload_image.onload = function () {
                        Main.preload_imageBitmap = PIXI.Sprite.fromImage(Main.preload_image.src);
                        Main.renderer = PIXI.autoDetectRenderer(Main.globalWidth, Main.globalHeight, { antialias: false, transparent: true });
                        document.body.appendChild(Main.renderer.view);
                        Main.stage = new PIXI.Container();
                        Main.preload_imageBitmap.scale.x = 2;
                        Main.preload_imageBitmap.scale.y = 2;
                        Main.stage.addChild(Main.preload_imageBitmap);
                        Main.onResize();
                        Main.stats.showPanel(0);
                        document.body.appendChild(Main.stats.dom);
                        var converter_gaf = new GAF.ZipToGAFAssetConverter();
                        converter_gaf.convert("././././tmw/tmw.gaf");
                        converter_gaf.on(GAF.GAFEvent.PROGRESS, converter_gaf_progress);
                        function converter_gaf_progress(pEvent) {
                            //console.log("main load", pEvent.progress);
                        }
                        converter_gaf.on(GAF.GAFEvent.COMPLETE, converter_gaf_complete);
                        function converter_gaf_complete(pEvent) {
                            console.log("gaf assets", pEvent);
                            Main.gafBundle_instance_nesting = pEvent;
                            Main.stage.removeChild(Main.preload_imageBitmap);
                            Main.preload_imageBitmap = undefined;
                            Localizer.startLocalizer();
                            var rootGafTimeline = Main.addGAFMovieClip("rootTimeline", true, true);
                            rootGafTimeline.scale.x = 2;
                            rootGafTimeline.scale.y = 2;
                            Main.stage.addChild(rootGafTimeline);
                            //var tempClip = Main.addGAFMovieClip("dots1");
                            //tempClip.x = 300;
                            //tempClip.y = 300;
                            //tempClip.gotoAndStop(5);
                            //Main.changeText(tempClip.hpDown, " -299");
                            //tempClip.cacheAsBitmap = true;
                            //Main.stage.addChild(tempClip);
                            var gameMain = new BattleQuestMain();
                            new TitansCinematicInitialiser().init();
                            game.Controller.setRoot(rootGafTimeline);
                            var transition = new Transitioner(Main.gafBundle_instance_nesting.target.gafBundle.getGAFTimeline("tmw", "rootTimeline"));
                            Transitioner.setRoot(rootGafTimeline);
                            game.Controller.init(gameMain, transition);
                            //Transitioner.theRoot.transition.gotoAndStop(7);
                            //Transitioner.theRoot.loader.bar.gotoAndPlay(2);
                            Transitioner.theRoot.loader.gotoAndStop(9);
                            Transitioner.theRoot.loader.cn.visible = false;
                            Transitioner.theRoot.loader.cn.gotoAndStop(1);
                            setTimeout(function () {
                                Transitioner.theRoot.loader.cn.visible = true;
                                Transitioner.theRoot.loader.cn.gotoAndPlay(1);
                            }, 100);
                            Main.addCustomEfFunc('cn.onEnterFrame', function () {
                                if (Transitioner.theRoot.loader.cn.currentFrame == 42) {
                                    Main.removeCustomEfFunc("cn.onEnterFrame");
                                    new PlayButton(rootGafTimeline.titleScreen.PlayButton, "menu");
                                    new CreditsButton(rootGafTimeline.titleScreen.CreditsButton, "menu");
                                    new SoundButton(game.Controller.root.soundBtn);
                                    new MusicButton(game.Controller.root.musicBtn);
                                    SoundController.playMusic("tune1");
                                    setTimeout(function () {
                                        Transitioner.theRoot.gotoAndStop("menu");
                                    }, 0);
                                }
                            });
                        }
                    };
                }
                static updateRender() {
                    Main.stats.begin();
                    if (Main.gameLoopEnabled) {
                        BattleController.update();
                    }
                    if (Main.renderer != undefined)
                        Main.renderer.render(Main.stage);
                    Main.stats.end();
                    requestAnimationFrame(this.updateRender.bind(this));
                }
                resetGame() {
                    Main.score.setValue();
                    Main.lives.setValue(com.ussgames.game.Config.STARTLIVES);
                }
                nextLevel() {
                    this.stopGame();
                    if (Main.level.value < com.ussgames.game.Config.NUMBEROFLEVELS) {
                        Main.level.addValue(1);
                        if (com.ussgames.game.Config.RESETLIVESEVERYLEVEL) {
                            Main.lives.setValue(com.ussgames.game.Config.STARTLIVES);
                        }
                        game.Controller.unlockLevel(Main.level.value);
                        this.resetLevel();
                    }
                    else {
                        game.Controller.gameComplete();
                    }
                }
                levelComplete() {
                    if (game.Controller.getLevelNumber() == 1) {
                        Main.inGamePanel.openPanel("complete", "levelComplete_levelUp");
                    }
                    else {
                        Main.inGamePanel.openPanel("complete", "levelComplete_levelOver");
                    }
                }
                retryLevel() {
                    this.stopGame();
                    game.Controller.transitioner.goto("theGame", "Controller.main.resetLevel");
                }
                resetLevel() {
                    if (Main.lives.value == 0) {
                        this.resetGame();
                    }
                    game.Controller.main.cleanUp();
                    game.Controller.startLevel();
                    Main.gamePaused = false;
                }
                gameOver() {
                    Main.inGamePanel.openPanel("gameover");
                }
                startGame() {
                    Main.gameLoopEnabled = true;
                }
                stopGame() {
                    Main.gameLoopEnabled = false;
                }
                static pauseGame() {
                    if (!com.ussgames.general.GamePanel.panelOpen) {
                        Main.gamePaused = true;
                        Main.inGamePanel.openPanel("paused", "Main.gamePaused = false");
                    }
                }
                static inGameHelp() {
                    if (!com.ussgames.general.GamePanel.panelOpen) {
                        Main.inGamePanel.openPanel("help");
                    }
                }
                gameLoop(e) {
                    if (!Main.gamePaused) {
                        BattleController.update();
                    }
                }
                loseLife() {
                    Main.lives.addValue(-1);
                    if (Main.lives.value > 0) {
                        this.reactToDeath();
                    }
                    else {
                        this.gameOver();
                    }
                }
                reactToDeath() {
                    Main.inGamePanel.openPanel("loselife", "Main.retryLevel");
                }
                initGame() {
                }
                cleanUp() {
                }
                static getCurrentLabel(mc) {
                    var res = undefined;
                    var cufe = mc.currentFrame;
                    for (var sa = 0; sa < mc._gafTimeline._config._animationSequences._sequences.length; sa++) {
                        var currfr = mc._gafTimeline._config._animationSequences._sequences[sa];
                        if (currfr._startFrameNo <= cufe && currfr._endFrameNo >= cufe) {
                            return currfr._id;
                        }
                    }
                    return res;
                }
                static startClearAssetCache() {
                    Main.cacheAssets = true;
                    for (var m in this.mcInitedArrayClips) {
                        for (var e = 0; e < this.mcInitedArrayClips[m].length; e++) {
                            //console.log("set stop", m, this.mcInitedArrayClips[m][e][1]);
                            if (this.mcInitedArrayClips[m][e][1] == true) {
                                this.mcInitedArrayClips[m][e][1] = false;
                            }
                        }
                    }
                }
                static stopClearAssetCache() {
                    Main.cacheAssets = false;
                    //console.log("stopClearAssetCache", this.mcInitedArrayClips);
                }
                static addGAFMovieClip(name, playClip = false, localis = false, maxInstance = 1) {
                    //console.log("addGAFMovieClip", name);
                    //localis = false;
                    function setLocalisedText(clip_text) {
                        if (localis) {
                            //clip_text.textField.text = "test";
                            if (clip_text.textField != undefined && clip_text.textField.text != undefined)
                                Main.changeText(clip_text, Localizer.getlocalisedText(clip_text.textField.text));
                            //clip_text.textField.text = Localizer.getlocalisedText(clip_text.textField.text)[0];
                        }
                    }
                    var clp;
                    var notCached = ["rootTimeline", "NewBattleAnimHolder"];
                    notCached = ["rootTimeline"];
                    if (notCached.indexOf(name) == -1) {
                        var useUsed = false;
                        if (this.mcInitedArrayClips[name] == undefined) {
                            this.mcInitedArrayClips[name] = [];
                            this.mcInitedArrayClips[name].push([new GAF.GAFMovieClip(Main.gafBundle_instance_nesting.target.gafBundle.getGAFTimeline("tmw", name)), true]);
                        }
                        else {
                            if (Main.cacheAssets) {
                                for (var p = 0; p < this.mcInitedArrayClips[name].length; p++) {
                                    if (!this.mcInitedArrayClips[name][p][1]) {
                                        clp = this.mcInitedArrayClips[name][p][0];
                                        this.mcInitedArrayClips[name][p][1] = true;
                                        useUsed = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (!useUsed) {
                            clp = new GAF.GAFMovieClip(Main.gafBundle_instance_nesting.target.gafBundle.getGAFTimeline("tmw", name));
                            this.mcInitedArrayClips[name].push([clp, true]);
                        }
                    }
                    else
                        clp = new GAF.GAFMovieClip(Main.gafBundle_instance_nesting.target.gafBundle.getGAFTimeline("tmw", name));
                    //if (false)
                    if (playClip)
                        for (var a in clp) {
                            if (clp[a] != undefined)
                                if (clp[a].children != undefined)
                                    if (clp[a].pluginName == undefined && clp[a].textField == undefined)
                                        if (clp[a].name == a) {
                                            clp[a].play();
                                        }
                        }
                    var deepClip = clp;
                    var showText = false;
                    if (localis)
                        for (var clipa in deepClip) {
                            if (deepClip[clipa] != undefined) {
                                if (deepClip[clipa].textField != undefined && deepClip[clipa].name.indexOf("localisedText") > -1) {
                                    if (showText)
                                        console.log("check1", clipa.length, clipa, deepClip[clipa].textField.text);
                                    setLocalisedText(clipa);
                                }
                                for (var ca in deepClip[clipa]) {
                                    var currClp_0 = deepClip[clipa][ca];
                                    if (currClp_0 != undefined) {
                                        if (currClp_0.textField != undefined && currClp_0.name != undefined && currClp_0.name.indexOf("localisedText") > -1) {
                                            if (showText)
                                                console.log("check2", currClp_0.textField.text);
                                            setLocalisedText(currClp_0);
                                        }
                                        for (var ba in currClp_0) {
                                            var currClp_1 = currClp_0[ba];
                                            if (currClp_1 != undefined) {
                                                if (currClp_1.textField != undefined && currClp_1.name != undefined && currClp_1.name.indexOf("localisedText") > -1) {
                                                    if (showText)
                                                        console.log("check3", currClp_1.textField.text);
                                                    setLocalisedText(currClp_1);
                                                }
                                                for (var fa in currClp_1) {
                                                    var currClp_2 = currClp_1[fa];
                                                    if (currClp_2 != undefined) {
                                                        if (currClp_2.textField != undefined && currClp_2.name != undefined && currClp_2.name.indexOf("localisedText") > -1) {
                                                            if (showText)
                                                                console.log("check4", currClp_2.textField.text);
                                                            setLocalisedText(currClp_2);
                                                        }
                                                        for (var ia in currClp_2) {
                                                            var currClp_3 = currClp_2[ia];
                                                            if (currClp_3 != undefined) {
                                                                if (currClp_3.textField != undefined && currClp_3.name != undefined && currClp_3.name.indexOf("localisedText") > -1) {
                                                                    if (showText)
                                                                        console.log("check5", currClp_3.textField.text);
                                                                    setLocalisedText(currClp_3);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    return clp;
                }
                static onResize() {
                    if (!Main.renderer)
                        return;
                    var gdpi = window.devicePixelRatio;
                    gdpi = 1;
                    Main.realW = window.innerWidth * gdpi;
                    Main.realH = window.innerHeight * gdpi;
                    Main.globalScale = Math.min(Main.realW / Main.globalWidth, Main.realH / Main.globalHeight);
                    Main.renderer.resize(Main.globalWidth / 1, Main.globalHeight / 1);
                    Main.renderer.view.style.width = Main.globalWidth / gdpi * Main.globalScale + 'px';
                    Main.renderer.view.style.height = Main.globalHeight / gdpi * Main.globalScale + 'px';
                    Main.renderer.view.style.position = 'absolute';
                    Main.renderer.view.style.left = (Main.realW / 2 - Main.globalWidth * Main.globalScale / 2) + 'px';
                    Main.renderer.view.style.top = (Main.realH / 2 - Main.globalHeight * Main.globalScale / 2) + 'px';
                }
                static removeCustomEfFunc(name) {
                    //console.log("remove CustomEfFunc", name, customEfFunc[name]);
                    PIXI.ticker.shared.remove(Main.customEfFunc[name], name);
                    Main.customEfFunc[name] = undefined;
                }
                static addCustomEfFunc(name, func) {
                    if (name != undefined && func != undefined) {
                        this.removeCustomEfFunc(name);
                        Main.customEfFunc[name] = func;
                        PIXI.ticker.shared.add(Main.customEfFunc[name], name);
                        //console.log("add CustomEfFunc", name, Main.customEfFunc[name]);
                    }
                    else
                        console.log("custom func error: func is null", name, func);
                }
                static changeText(clip_, text_, shadowType = "null", addedText = false) {
                    //console.log("change text", text_, clip_);
                    if (addedText)
                        clip_.textField.text = clip_.textField.text + text_[0];
                    else
                        clip_.textField.text = text_[0];
                    //clip_.textField.style.fontFamily = "Lobster";
                    clip_.textField.style.fontFamily = "Baloo Paaji";
                    if (shadowType != "null") {
                        if (shadowType == "hp" || shadowType == "speech" || shadowType == "xp") {
                            clip_.textField.style.stroke = "white";
                            clip_.textField.style.strokeThickness = 5;
                            //clip_.textField.style.dropShadow = true;
                            //clip_.textField.style.dropShadowBlur = 5;
                            //clip_.textField.style.dropShadowDistance = 0;
                        }
                        else if (shadowType == "hpDown") {
                            clip_.textField.style.stroke = "#CC0033";
                            clip_.textField.style.strokeThickness = 8;
                        }
                    }
                    else {
                        //clip_.textField.style.stroke = "white";
                        clip_.textField.style.strokeThickness = 2;
                        //clip_.textField.style.dropShadow = true;
                        //clip_.textField.style.dropShadowBlur = 5;
                        //clip_.textField.style.dropShadowDistance = 0;
                    }
                    if (text_.length > 1) {
                        var fontRes = clip_.textField.style.fontSize;
                        if (text_[1].indexOf("+") == 0)
                            fontRes += Number(text_[1]);
                        else if (text_[1].indexOf("-") == 0)
                            fontRes -= Math.abs(Number(text_[1]));
                        else
                            fontRes = Number(text_[1]);
                        if (fontRes < 1)
                            fontRes = 1;
                        clip_.textField.style.fontSize = fontRes;
                    }
                }
                /*
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
                        */
                isLocalStorageAvailable() {
                    var checkKey = "test", storage = window.sessionStorage;
                    try {
                        storage.setItem(checkKey, "test");
                        storage.removeItem(checkKey);
                        return true;
                    }
                    catch (error) {
                        return false;
                    }
                }
                loadGameProcess() {
                    if (this.isLocalStorageAvailable()) {
                        if (window.localStorage.getItem(game.Config.SONAME) != undefined)
                            return game.Controller.sharedObjectData = JSON.parse(window.localStorage.getItem(game.Config.SONAME));
                        else
                            return undefined;
                    }
                }
                saveGameProcess() {
                    if (this.isLocalStorageAvailable()) {
                        window.localStorage.setItem(game.Config.SONAME, JSON.stringify(game.Controller.sharedObjectData));
                    }
                }
                static convertToPixiGlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout) {
                    //distance, outerStrength, innerStrength, color, quality
                    return new PIXI.filters.GlowFilter(blurX * strength, strength, inner ? strength : 0, color, quality);
                }
            }
            Main.gamePaused = false;
            Main.inited = false;
            Main.visibilityState = true;
            Main.soundMusicState = false;
            Main.soundData = [];
            Main.globalWidth = 640 * 2;
            Main.globalHeight = 480 * 2;
            Main.globalScale = 1;
            Main.realW = window.innerWidth;
            Main.realH = window.innerHeight;
            Main.customEfFunc = {};
            Main.gameLoopEnabled = false;
            Main.mcInitedArrayClips = [];
            Main.cacheAssets = false;
            game.Main = Main;
        })(game = ussgames.game || (ussgames.game = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Main = com.ussgames.game.Main;
var com;
(function (com) {
    var yyztom;
    (function (yyztom) {
        var pathfinding;
        (function (pathfinding) {
            var astar;
            (function (astar) {
                class AStar {
                    constructor(grid) {
                        this._touched = new Array();
                        this._grid = grid;
                    }
                    get evaluatedTiles() {
                        return this._touched;
                    }
                    search(start, end) {
                        if (this._openHeap) {
                            var k = this._touched.length - 1;
                            while (k > -1) {
                                this._touched[k].f = 0;
                                this._touched[k].g = 0;
                                this._touched[k].h = 0;
                                this._touched[k].closed = false;
                                this._touched[k].visited = false;
                                this._touched[k].debug = "";
                                this._touched[k].parent = null;
                                k--;
                            }
                            this._touched = new Array();
                            this._openHeap.reset();
                        }
                        else {
                            this._openHeap = new astar.BinaryHeap(function (node) { return node.f; });
                        }
                        this._openHeap.push(start);
                        while (this._openHeap.size > 0) {
                            var currentNode = this._openHeap.pop();
                            if (currentNode.position.x == end.position.x && currentNode.position.y == end.position.y) {
                                var curr = currentNode;
                                var ret = new Array();
                                while (curr.parent) {
                                    ret.push(curr);
                                    curr = curr.parent;
                                }
                                return ret.reverse();
                            }
                            currentNode.closed = true;
                            this._touched.push(currentNode);
                            var neighbors = this.neighborsFunc(this._grid, currentNode);
                            var il = neighbors.length;
                            for (var i = 0; i < il; i++) {
                                var neighbor = neighbors[i];
                                if (neighbor == undefined)
                                    continue;
                                if (neighbor.closed || neighbor.isWall) {
                                    continue;
                                }
                                var gScore = currentNode.g + 1;
                                var beenVisited = neighbor.visited;
                                if (!beenVisited) {
                                    this._touched.push(neighbor);
                                }
                                if (beenVisited == false || gScore < neighbor.g) {
                                    neighbor.visited = true;
                                    neighbor.parent = currentNode;
                                    neighbor.h = neighbor.h || this.manhattan(neighbor.position, end.position);
                                    neighbor.g = gScore;
                                    neighbor.f = neighbor.g + neighbor.h;
                                    if (!beenVisited) {
                                        this._openHeap.push(neighbor);
                                    }
                                    else {
                                        this._openHeap.rescoreElement(neighbor);
                                    }
                                }
                            }
                        }
                        return new Array();
                    }
                    neighborsFunc(grid, node, allowDiagonal = true) {
                        var ret = new Array();
                        var x = node.position.x;
                        var y = node.position.y;
                        try {
                            if (grid[x - 1] && grid[x - 1][y]) {
                                ret.push(grid[x - 1][y]);
                            }
                        }
                        catch (e) { }
                        try {
                            if (grid[x + 1] && grid[x + 1][y]) {
                                ret.push(grid[x + 1][y]);
                            }
                        }
                        catch (e) { }
                        try {
                            if (grid[x] && grid[x][y - 1]) {
                                ret.push(grid[x][y - 1]);
                            }
                        }
                        catch (e) { }
                        try {
                            if (grid[x] && grid[x][y + 1]) {
                                ret.push(grid[x][y + 1]);
                            }
                        }
                        catch (e) { }
                        if (allowDiagonal) {
                            try {
                                if (!grid[x][y - 1].isWall || !grid[x + 1][y].isWall) {
                                    ret.push(grid[x + 1][y - 1]);
                                }
                            }
                            catch (e) { }
                            try {
                                if (!grid[x + 1][y].isWall || !grid[x][y + 1].isWall) {
                                    ret.push(grid[x + 1][y + 1]);
                                }
                            }
                            catch (e) { }
                            try {
                                if (!grid[x - 1][y].isWall || !grid[x][y + 1].isWall) {
                                    ret.push(grid[x - 1][y + 1]);
                                }
                            }
                            catch (e) { }
                            try {
                                if (!grid[x - 1][y].isWall || !grid[x][y - 1].isWall) {
                                    ret.push(grid[x - 1][y - 1]);
                                }
                            }
                            catch (e) { }
                        }
                        return ret;
                    }
                    manhattan(pos0, pos1) {
                        var d1 = Math.abs(pos1.x - pos0.x);
                        var d2 = Math.abs(pos1.y - pos0.y);
                        return d1 + d2;
                    }
                }
                astar.AStar = AStar;
            })(astar = pathfinding.astar || (pathfinding.astar = {}));
        })(pathfinding = yyztom.pathfinding || (yyztom.pathfinding = {}));
    })(yyztom = com.yyztom || (com.yyztom = {}));
})(com || (com = {}));
var AStar = com.yyztom.pathfinding.astar.AStar;
var com;
(function (com) {
    var yyztom;
    (function (yyztom) {
        var pathfinding;
        (function (pathfinding) {
            var astar;
            (function (astar) {
                class AStarNodeVO {
                    constructor() {
                    }
                }
                astar.AStarNodeVO = AStarNodeVO;
            })(astar = pathfinding.astar || (pathfinding.astar = {}));
        })(pathfinding = yyztom.pathfinding || (yyztom.pathfinding = {}));
    })(yyztom = com.yyztom || (com.yyztom = {}));
})(com || (com = {}));
var AStarNodeVO = com.yyztom.pathfinding.astar.AStarNodeVO;
var com;
(function (com) {
    var yyztom;
    (function (yyztom) {
        var pathfinding;
        (function (pathfinding) {
            var astar;
            (function (astar) {
                class BinaryHeap {
                    constructor(scoreFunction) {
                        this._content = new Array();
                        this._scoreFunction = scoreFunction;
                    }
                    reset() {
                        this._content = new Array();
                    }
                    get content() {
                        return this._content;
                    }
                    push(element) {
                        this._content.push(element);
                        this.sinkDown(this._content.length - 1);
                    }
                    pop() {
                        var result = this._content[0];
                        var end = this._content.pop();
                        if (this._content.length > 0) {
                            this._content[0] = end;
                            this.bubbleUp(0);
                        }
                        return result;
                    }
                    remove(node) {
                        var i = this._content.indexOf(node);
                        var end = this._content.pop();
                        if (i != this._content.length - 1) {
                            this._content[i] = end;
                            if (this._scoreFunction(end) < this._scoreFunction(node)) {
                                this.sinkDown(i);
                            }
                            else {
                                this.bubbleUp(i);
                            }
                        }
                    }
                    get size() {
                        return this._content.length;
                    }
                    rescoreElement(node) {
                        this.sinkDown(this._content.indexOf(node));
                    }
                    sinkDown(n) {
                        var element = this._content[n];
                        while (n > 0) {
                            var parentN = this._content.indexOf(element.parent);
                            if (parentN == -1) {
                                parentN = 0;
                            }
                            var parent = this._content[parentN];
                            if (this._scoreFunction(element) < this._scoreFunction(parent)) {
                                this._content[parentN] = element;
                                this._content[n] = parent;
                                n = parentN;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    bubbleUp(n) {
                        var length = this._content.length;
                        var element = this._content[n];
                        var elemScore = this._scoreFunction(element);
                        while (true) {
                            var child2N = (n + 1) << 1;
                            var child1N = child2N - 1;
                            var swap = null;
                            if (child1N < length) {
                                var child1 = this._content[child1N];
                                var child1Score = this._scoreFunction(child1);
                                if (child1Score < elemScore)
                                    swap = child1N;
                            }
                            if (child2N < length) {
                                var child2 = this._content[child2N];
                                var child2Score = this._scoreFunction(child2);
                                if (child2Score < (swap == null ? elemScore : child1Score)) {
                                    swap = child2N;
                                }
                            }
                            if (swap != null) {
                                this._content[n] = this._content[swap];
                                this._content[swap] = element;
                                n = swap;
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
                astar.BinaryHeap = BinaryHeap;
            })(astar = pathfinding.astar || (pathfinding.astar = {}));
        })(pathfinding = yyztom.pathfinding || (yyztom.pathfinding = {}));
    })(yyztom = com.yyztom || (com.yyztom = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class SimpleButton extends buttons.CustomMovieClip {
                constructor(clip, loc = "", name = undefined) {
                    super(clip);
                    this.unlocked = true;
                    this.clickCount = 0;
                    this.checkAlpha = true;
                    this.name = name;
                    this.location = loc;
                    setInterval(function () {
                        this.clickCount = 0;
                    }.bind(this), 100);
                    this.init();
                }
                init() {
                    this.instanceClip.interactive = true;
                    this.addEventListener(com.CustomMouseEvent.MOUSE_OVER, this.over, this.instanceClip, this);
                    this.addEventListener(com.CustomMouseEvent.MOUSE_OUT, this.out, this.instanceClip, this);
                    this.addEventListener(com.CustomMouseEvent.CLICK, this.click, this.instanceClip, this);
                }
                disable() {
                    this.interactive = false;
                }
                enable() {
                    this.interactive = true;
                }
                over(e) {
                    if (Main.getCurrentLabel(Controller.root) != this.location)
                        return;
                    if (this.unlocked) {
                        this.instanceClip.gotoAndStop(2);
                    }
                }
                out(e) {
                    if (Main.getCurrentLabel(Controller.root) != this.location)
                        return;
                }
                down(e) {
                    if (Main.getCurrentLabel(Controller.root) != this.location)
                        return;
                    if (this.unlocked) {
                        this.instanceClip.gotoAndStop(3);
                    }
                }
                click(e) {
                    this.clickCount++;
                    if (this.clickCount > 1)
                        return;
                    if (this.location != "" && Main.getCurrentLabel(Controller.root) != this.location)
                        return;
                    if (this.checkAlpha && this.instanceClip.alpha == 0)
                        return;
                    if (this.unlocked) {
                        this.buttonAction();
                    }
                }
                buttonAction() {
                }
            }
            buttons.SimpleButton = SimpleButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var SimpleButton = com.ussgames.buttons.SimpleButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class ButtonButton extends buttons.SimpleButton {
                constructor(clip, loc = "") {
                    super(clip);
                    this.init();
                    this.location = loc;
                }
                init(arg0 = null) {
                    this.instanceClip.interactive = true;
                    this.addEventListener(com.CustomMouseEvent.CLICK, this.click, this.instanceClip, this);
                }
                click(e) {
                    this.clickCount++;
                    if (this.clickCount > 1)
                        return;
                    if (this.location != "" && Main.getCurrentLabel(Controller.root) != this.location)
                        return;
                    this.buttonAction();
                }
                buttonAction() {
                    super.buttonAction();
                }
            }
            buttons.ButtonButton = ButtonButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var ButtonButton = com.ussgames.buttons.ButtonButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class ClosePanelButton extends buttons.SimpleButton {
                /*override*/ init() {
                    super.init();
                }
                /*override*/ buttonAction() {
                    Main.inGamePanel.closePanel();
                }
            }
            buttons.ClosePanelButton = ClosePanelButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var ClosePanelButton = com.ussgames.buttons.ClosePanelButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class CreditsButton extends buttons.ButtonButton {
                constructor(mc, loc) {
                    super(mc, loc);
                }
                /*override*/ buttonAction() {
                    Controller.transitioner.goto("credits");
                    new buttons.MenuButton(Controller.root.toMenuFromCredits, "credits");
                }
            }
            buttons.CreditsButton = CreditsButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var CreditsButton = com.ussgames.buttons.CreditsButton;
var com;
(function (com) {
    class CustomMouseEvent {
        constructor() {
            this.buttonMode = false;
            this.useHandCursor = false;
            this.enabled = false;
        }
        gotoAndPlay(frameLabel) {
            this.instance.gotoAndPlay(frameLabel);
        }
        gotoAndStop(frameLabel) {
            this.instance.gotoAndStop(frameLabel);
        }
        play() {
            this.instance.play();
        }
    }
    CustomMouseEvent.MOUSE_OVER = "pointerover";
    CustomMouseEvent.MOUSE_OUT = "pointerout";
    CustomMouseEvent.MOUSE_DOWN = "pointerdown";
    CustomMouseEvent.MOUSE_UP = "pointerup";
    CustomMouseEvent.MOUSE_MOVE = "pointermove";
    CustomMouseEvent.CLICK = "pointertap";
    com.CustomMouseEvent = CustomMouseEvent;
})(com || (com = {}));
var CustomMouseEvent = com.CustomMouseEvent;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class LevelSelectButton extends buttons.SimpleButton {
                constructor(clip, loc = "", name = undefined) {
                    super(clip);
                    this.level = 0;
                    this.init();
                }
                /*override*/ init() {
                    super.init();
                    this.level = parseInt(this.instanceClip.name.substr(1));
                    Main.changeText(this.instanceClip["levelNumber"], [String(this.level)]);
                    this.addEventListener(com.CustomMouseEvent.MOUSE_OVER, this.over, this.instanceClip, this);
                    this.addEventListener(com.CustomMouseEvent.MOUSE_OUT, this.out, this.instanceClip, this);
                    this.addEventListener(com.CustomMouseEvent.CLICK, this.click, this.instanceClip, this);
                }
                /*override*/ buttonAction() {
                    if (Controller.isLevelUnlocked(this.level))
                        Controller.selectLevel(this.level);
                }
            }
            buttons.LevelSelectButton = LevelSelectButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var LevelSelectButton = com.ussgames.buttons.LevelSelectButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class MenuButton extends buttons.SimpleButton {
                /*override*/ init() {
                    super.init();
                }
                /*override*/ buttonAction() {
                    if (this.name == "yesNew") {
                        BattleController.initPersistentUnits();
                        Controller.resetLevelLocks();
                        Controller.selectLevel(1);
                    }
                    else if (this.name == "noNew") {
                        Controller.root.confirmNew.gotoAndStop(1);
                    }
                    else {
                        Controller.showMainMenu();
                    }
                }
            }
            buttons.MenuButton = MenuButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var MenuButton = com.ussgames.buttons.MenuButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class MenuButtonInGame extends buttons.SimpleButton {
                /*override*/ buttonAction() {
                    Main.inGamePanel.closePanel("Controller.quitGame");
                    com.ussgames.general.GamePanel.panelOpen = false;
                    Main.gamePaused = false;
                }
            }
            buttons.MenuButtonInGame = MenuButtonInGame;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var MenuButtonInGame = com.ussgames.buttons.MenuButtonInGame;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class MusicButton extends buttons.SimpleButton {
                /*override*/ init() {
                    super.init();
                    SoundController.musicButton = this;
                    this.update();
                }
                /*override*/ buttonAction() {
                    SoundController.toggleMusic();
                }
                update() {
                    Controller.root.musicBtn.onOffDisplay.visible = !SoundController.musicOn;
                }
            }
            buttons.MusicButton = MusicButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var MusicButton = com.ussgames.buttons.MusicButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class NextLevelButton extends buttons.ButtonButton {
                constructor(mc, loc) {
                    super(mc, loc);
                }
                /*override*/ buttonAction() {
                    console.log("NextLevelButton", this.instanceClip.name);
                    if (this.instanceClip.name == "nextLevel") {
                        if (Controller.getLevelNumber() < com.ussgames.game.Config.NUMBEROFLEVELS) {
                            Controller.selectLevel(Controller.getLevelNumber() + 1);
                        }
                        else {
                            Controller.gameComplete();
                        }
                    }
                    else if (this.instanceClip.name == "toLevelUp") {
                        Main.inGamePanel.closePanel();
                    }
                    else if (this.instanceClip.name == "toTutorial") {
                        //Main.inGamePanel.closePanel(BattleController.startTutorial);
                        Main.inGamePanel.closePanel("BattleController.startTutorial");
                    }
                    else if (this.instanceClip.name == "toTutorial1") {
                        Main.inGamePanel.closePanel();
                    }
                    else if (this.instanceClip.name == "newGame") {
                        Controller.root.confirmNew.gotoAndStop(2);
                        new buttons.MenuButton(Controller.root.confirmNew.yesNew, "levelSelect", "yesNew");
                        new buttons.MenuButton(Controller.root.confirmNew.noNew, "levelSelect", "noNew");
                    }
                    else if (this.instanceClip.name == "closeTutorial") {
                        Controller.root.tut2.gotoAndStop(1);
                    }
                }
            }
            buttons.NextLevelButton = NextLevelButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var NextLevelButton = com.ussgames.buttons.NextLevelButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class PauseButton extends buttons.SimpleButton {
                /*override*/ buttonAction() {
                    Main.pauseGame();
                }
            }
            buttons.PauseButton = PauseButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var PauseButton = com.ussgames.buttons.PauseButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class PlayButton extends buttons.SimpleButton {
                /*override*/ init() {
                    super.init();
                }
                /*override*/ buttonAction() {
                    Controller.newGame();
                }
            }
            buttons.PlayButton = PlayButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var PlayButton = com.ussgames.buttons.PlayButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class RetryLevelButton extends buttons.SimpleButton {
                constructor(mc) {
                    super(mc);
                }
                /*override*/ buttonAction() {
                    Main.inGamePanel.closePanel("Controller.main.retryLevel");
                }
                gotoRetry() {
                    Controller.main.retryLevel();
                }
            }
            buttons.RetryLevelButton = RetryLevelButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var RetryLevelButton = com.ussgames.buttons.RetryLevelButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var buttons;
        (function (buttons) {
            class SoundButton extends buttons.SimpleButton {
                /*override*/ init() {
                    super.init();
                    SoundController.soundButton = this;
                    this.update();
                }
                /*override*/ buttonAction() {
                    SoundController.toggleSound();
                }
                update() {
                    Controller.root.soundBtn.onOffDisplay.visible = !SoundController.soundOn;
                }
            }
            buttons.SoundButton = SoundButton;
        })(buttons = ussgames.buttons || (ussgames.buttons = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var SoundButton = com.ussgames.buttons.SoundButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var game;
        (function (game) {
            class Entity {
                constructor() {
                    this.topBuffer = 0;
                    this.live = false;
                    this.doUpdate = true;
                    this.teleportFromX = 0;
                }
                init(x, y, clip, topBuffer = 0) {
                    this.x = x;
                    this.y = y;
                    this.vx = 0;
                    this.vy = 0;
                    this.clip = clip;
                    this.topBuffer = topBuffer;
                    this.live = true;
                }
                update() {
                    this.updateClipPosition();
                    this.updateClipState();
                }
                updateClipPosition() {
                    this.clip.x = this.x;
                    this.clip.y = this.y;
                }
                updateClipState() {
                }
                removeClip() {
                    if (this.clip && this.clip.parent) {
                        this.clip.parent.removeChild(this.clip);
                    }
                    this.clip = null;
                }
                teleportTo(gx, gy, x, y) {
                }
            }
            game.Entity = Entity;
        })(game = ussgames.game || (ussgames.game = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Entity = com.ussgames.game.Entity;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        class MapSquare {
            constructor() {
                this.terrainID = 0;
            }
            init(type, height, mapX, mapY, clip = null, id = 0) {
                this.type = type;
                this.height = height;
                this.mapX = mapX;
                this.mapY = mapY;
                this.objectClip = clip;
                this.terrainID = id;
            }
            updateClipPosition() {
                this.objectClip.x = (this.mapX * Config.GRIDSIZEX) + (Config.GRIDSIZEX / 2);
                this.objectClip.y = (this.mapY * Config.GRIDSIZEY) + Config.GRIDSIZEY;
            }
        }
        MapSquare.OPEN = 0;
        MapSquare.COVER = 1;
        MapSquare.WATER = 2;
        MapSquare.HIGHGROUND = 3;
        MapSquare.NOACCESS = 4;
        MapSquare.TERRAINTYPELABELS = ["Open Space", "Cover", "Water", "High Ground", "Blocked"];
        ussgames.MapSquare = MapSquare;
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var MapSquare = com.ussgames.MapSquare;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class AIAction {
                constructor() {
                    this.actionID = 0;
                }
            }
            battleTactics.AIAction = AIAction;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class AIController {
                constructor() {
                    this.currentState = AIController.IDLE;
                }
                initialDecision(thisUnit, map) {
                    var i, j, a;
                    this.findPreferredUnitToAttack(thisUnit, map);
                    var safeSquaresAvailable = false;
                    map.calculateMovementGrid(thisUnit);
                    for (i = 0; i < map.movementGrid.length; i++) {
                        for (j = 0; j < map.movementGrid[i].length; j++) {
                            if (map.movementGrid[i][j] != -1) {
                                if (this.checkSquareSafety(i, j, thisUnit.team, map)) {
                                    safeSquaresAvailable = true;
                                    break;
                                }
                                map.calculateMovementGrid(thisUnit);
                            }
                        }
                    }
                    this.potentialActions = [];
                    for (a = 1; a < thisUnit.unit.unitActions.length; a++) {
                        if (thisUnit.coolDownCount[a] >= thisUnit.unit.unitActions[a].coolDown) {
                            for (i = 0; i < map.unitsInPlay.length; i++) {
                                if (map.unitsInPlay[i].team != thisUnit.team && map.unitsInPlay[i].attackable) {
                                    map.calculateMovementGrid(thisUnit);
                                    map.calculateUnitDangerArea_action(thisUnit, a);
                                    if (map.actionGrid[map.unitsInPlay[i].mapX][map.unitsInPlay[i].mapY] != -1) {
                                        var anAIAction = new battleTactics.AIAction;
                                        anAIAction.actionType = AIController.ATTACK;
                                        anAIAction.mapTargetX = map.unitsInPlay[i].mapX;
                                        anAIAction.mapTargetY = map.unitsInPlay[i].mapY;
                                        anAIAction.distance = Math.sqrt(((thisUnit.mapX - map.unitsInPlay[i].mapX) * (thisUnit.mapX - map.unitsInPlay[i].mapX)) + ((thisUnit.mapY - map.unitsInPlay[i].mapY) * (thisUnit.mapY - map.unitsInPlay[i].mapY)));
                                        anAIAction.otherUnit = map.unitsInPlay[i];
                                        anAIAction.actionID = a;
                                        var damageOtherUnitWillSustain = thisUnit.unit.unitActions[a].getStandardAttackPower(thisUnit, map.unitsInPlay[i], map);
                                        var retaliateDamage = map.unitsInPlay[i].unit.unitActions[map.unitsInPlay[i].unit.retaliationAction].getRetaliatePower(map.unitsInPlay[i], thisUnit, map, damageOtherUnitWillSustain);
                                        if (damageOtherUnitWillSustain >= map.unitsInPlay[i].currentHP) {
                                            retaliateDamage = -10;
                                        }
                                        var backUpDamageApplied = 0;
                                        var backUpRetaliateDamage = 0;
                                        for (j = 0; j < map.unitsInPlay.length; j++) {
                                            if (map.unitsInPlay[j] != thisUnit && map.unitsInPlay[j].team == thisUnit.team) {
                                                map.calculateMovementGrid(map.unitsInPlay[j]);
                                                map.calculateUnitDangerArea(map.unitsInPlay[j]);
                                                if (map.actionGrid[map.unitsInPlay[i].mapX][map.unitsInPlay[i].mapY] != -1) {
                                                    backUpDamageApplied += map.unitsInPlay[j].unit.unitActions[1].getStandardAttackPower(map.unitsInPlay[j], map.unitsInPlay[i], map);
                                                    if (damageOtherUnitWillSustain < map.unitsInPlay[i].currentHP) {
                                                        backUpRetaliateDamage += map.unitsInPlay[i].unit.unitActions[map.unitsInPlay[i].unit.retaliationAction].getRetaliatePower(map.unitsInPlay[i], map.unitsInPlay[j], map);
                                                    }
                                                }
                                            }
                                        }
                                        var theirBackUpDamageApplied = 0;
                                        for (j = 0; j < map.unitsInPlay.length; j++) {
                                            if (map.unitsInPlay[i] != map.unitsInPlay[j]) {
                                                map.calculateMovementGrid(map.unitsInPlay[j]);
                                                map.calculateUnitDangerArea(map.unitsInPlay[j]);
                                                if (map.actionGrid[thisUnit.mapX][thisUnit.mapY] != -1) {
                                                    theirBackUpDamageApplied += map.unitsInPlay[j].unit.unitActions[1].getStandardAttackPower(map.unitsInPlay[j], thisUnit, map);
                                                }
                                            }
                                        }
                                        var attackRating = ((retaliateDamage + theirBackUpDamageApplied) - backUpDamageApplied) - damageOtherUnitWillSustain;
                                        if (thisUnit.unit.unitActions[a].maxRange == 1 && map.unitsInPlay[i].unit.unitActions[map.unitsInPlay[i].unit.retaliationAction].minRange > 1) {
                                            attackRating -= 100;
                                        }
                                        if (thisUnit.unit.unitActions[a].minRange > 1 && map.unitsInPlay[i].unit.unitActions[map.unitsInPlay[i].unit.retaliationAction].maxRange == 1) {
                                            attackRating -= 100;
                                        }
                                        if (safeSquaresAvailable && retaliateDamage >= thisUnit.currentHP && damageOtherUnitWillSustain + backUpDamageApplied < map.unitsInPlay[i].currentHP) {
                                            attackRating += 10;
                                        }
                                        anAIAction.score = attackRating;
                                        this.potentialActions.push(anAIAction);
                                    }
                                }
                            }
                        }
                    }
                    if (this.potentialActions.length > 0) {
                        //this.potentialActions.sortOn("score", Array.NUMERIC);
                    }
                    else {
                        var defendAction = new battleTactics.AIAction;
                        defendAction.actionType = AIController.DEFEND;
                        this.potentialActions.push(defendAction);
                    }
                    if (thisUnit.clip.aiMode) {
                        thisUnit.clip.aiMode.gotoAndStop(this.potentialActions[0].actionType + 1);
                    }
                }
                reconsider(thisUnit, map) {
                    var i, j;
                    if (this.potentialActions.length > 0 && this.potentialActions[0].actionType == AIController.DEFEND) {
                        var aidID = -1;
                        var aidDistance = -1;
                        for (i = 0; i < map.unitsInPlay.length; i++) {
                            if (map.unitsInPlay[i] != thisUnit && map.unitsInPlay[i].team == thisUnit.team) {
                                if (map.unitsInPlay[i].aiController.potentialActions && map.unitsInPlay[i].aiController.potentialActions.length > 0 && map.unitsInPlay[i].aiController.potentialActions[0].actionType == AIController.ATTACK) {
                                    if (aidID == -1) {
                                        aidID = i;
                                        aidDistance = Math.sqrt(((thisUnit.mapX - map.unitsInPlay[i].mapX) * (thisUnit.mapX - map.unitsInPlay[i].mapX)) + ((thisUnit.mapY - map.unitsInPlay[i].mapY) * (thisUnit.mapY - map.unitsInPlay[i].mapY)));
                                    }
                                    else {
                                        var newAidDistance = Math.sqrt(((thisUnit.mapX - map.unitsInPlay[i].mapX) * (thisUnit.mapX - map.unitsInPlay[i].mapX)) + ((thisUnit.mapY - map.unitsInPlay[i].mapY) * (thisUnit.mapY - map.unitsInPlay[i].mapY)));
                                        if (newAidDistance < aidDistance) {
                                            aidID = i;
                                            aidDistance = newAidDistance;
                                        }
                                    }
                                }
                            }
                        }
                        if (aidID != -1) {
                            this.potentialActions[0].actionType = AIController.AID;
                            this.potentialActions[0].distance = aidDistance;
                            this.potentialActions[0].mapTargetX = map.unitsInPlay[aidID].mapX;
                            this.potentialActions[0].mapTargetY = map.unitsInPlay[aidID].mapY;
                            this.potentialActions[0].otherUnit = map.unitsInPlay[aidID];
                            this.potentialActions[0].score = 0;
                        }
                    }
                    if (thisUnit.clip.aiMode) {
                        thisUnit.clip.aiMode.gotoAndStop(this.potentialActions[0].actionType + 1);
                    }
                }
                setAction(thisUnit, map) {
                    var i, j, k;
                    var potentialSquare;
                    var unitDist = 0;
                    if (this.potentialActions.length > 0) {
                        switch (this.potentialActions[0].actionType) {
                            case AIController.ATTACK:
                                this.potentialSquares = [];
                                var beingAided = false;
                                for (k = 0; k < AIController.unitActionOrder.length; k++) {
                                    if (AIController.unitActionOrder[k].aiController.potentialActions[0].actionType == AIController.AID && AIController.unitActionOrder[k].aiController.potentialActions[0].otherUnit == thisUnit) {
                                        beingAided = true;
                                    }
                                }
                                map.calculateMovementGrid(thisUnit);
                                map.calculateUnitDangerArea(thisUnit);
                                for (i = 0; i < map.movementGrid.length; i++) {
                                    for (j = 0; j < map.movementGrid[i].length; j++) {
                                        if ((i != thisUnit.movedFromX || j != thisUnit.movedFromY || (i == thisUnit.mapX && j == thisUnit.mapY)) && (map.getUnitInSquare(i, j) == null || map.getUnitInSquare(i, j) == thisUnit) && map.movementGrid[i][j] != -1) {
                                            potentialSquare = new battleTactics.AIPotentialSquare();
                                            potentialSquare.mapX = i;
                                            potentialSquare.mapY = j;
                                            var unitMX = thisUnit.mapX;
                                            var unitMY = thisUnit.mapY;
                                            thisUnit.mapX = i;
                                            thisUnit.mapY = j;
                                            map.calculateActionGrid(thisUnit);
                                            thisUnit.mapX = unitMX;
                                            thisUnit.mapY = unitMY;
                                            if (map.actionGrid[this.potentialActions[0].otherUnit.mapX][this.potentialActions[0].otherUnit.mapY] >= thisUnit.unit.unitActions[1].minRange && map.actionGrid[this.potentialActions[0].otherUnit.mapX][this.potentialActions[0].otherUnit.mapY] <= thisUnit.unit.unitActions[1].maxRange) {
                                                potentialSquare.score = -20;
                                            }
                                            for (k = 0; k < map.unitsInPlay.length; k++) {
                                                if (map.unitsInPlay[k].team != thisUnit.team && map.unitsInPlay[k].attackable) {
                                                    map.calculateMovementGrid(map.unitsInPlay[k]);
                                                    map.calculateUnitDangerArea(map.unitsInPlay[k]);
                                                    if (map.actionGrid[i][j] == -1) {
                                                        potentialSquare.score -= 1;
                                                    }
                                                    else {
                                                        potentialSquare.score += map.unitsInPlay[k].unit.unitActions[map.unitsInPlay[k].unit.retaliationAction].getStandardAttackPower(map.unitsInPlay[k], thisUnit, map);
                                                    }
                                                }
                                            }
                                            unitDist = Math.ceil(Math.sqrt(((i - this.potentialActions[0].otherUnit.mapX) * (i - this.potentialActions[0].otherUnit.mapX)) + ((j - this.potentialActions[0].otherUnit.mapY) * (j - this.potentialActions[0].otherUnit.mapY))));
                                            potentialSquare.score -= unitDist;
                                            this.potentialSquares.push(potentialSquare);
                                            map.calculateMovementGrid(thisUnit);
                                            map.calculateUnitDangerArea(thisUnit);
                                        }
                                    }
                                }
                                if (this.potentialSquares.length > 0) {
                                    //this.potentialSquares.sortOn("score", Array.NUMERIC);
                                    this.mapTargetX = this.potentialSquares[0].mapX;
                                    this.mapTargetY = this.potentialSquares[0].mapY;
                                }
                                else {
                                    this.mapTargetX = thisUnit.mapX;
                                    this.mapTargetY = thisUnit.mapY;
                                }
                                break;
                            case AIController.AID:
                                this.potentialSquares = [];
                                map.calculateMovementGrid(thisUnit);
                                for (i = 0; i < map.movementGrid.length; i++) {
                                    for (j = 0; j < map.movementGrid[i].length; j++) {
                                        if ((i != thisUnit.movedFromX || j != thisUnit.movedFromY) && map.getUnitInSquare(i, j) == null && map.movementGrid[i][j] != -1) {
                                            potentialSquare = new battleTactics.AIPotentialSquare();
                                            potentialSquare.mapX = i;
                                            potentialSquare.mapY = j;
                                            for (k = 0; k < map.unitsInPlay.length; k++) {
                                                if (map.unitsInPlay[k].team != thisUnit.team && map.unitsInPlay[k].attackable) {
                                                    map.calculateMovementGrid(map.unitsInPlay[k]);
                                                    map.calculateUnitDangerArea(map.unitsInPlay[k]);
                                                    if (map.actionGrid[i][j] == -1) {
                                                        potentialSquare.score -= 5;
                                                    }
                                                }
                                            }
                                            unitDist = Math.ceil(Math.sqrt(((i - this.potentialActions[0].otherUnit.mapX) * (i - this.potentialActions[0].otherUnit.mapX)) + ((j - this.potentialActions[0].otherUnit.mapY) * (j - this.potentialActions[0].otherUnit.mapY))));
                                            potentialSquare.score += unitDist;
                                            var unitMX = thisUnit.mapX;
                                            var unitMY = thisUnit.mapY;
                                            thisUnit.mapX = i;
                                            thisUnit.mapY = j;
                                            map.calculateMovementGrid(thisUnit);
                                            map.calculateUnitDangerArea(thisUnit);
                                            thisUnit.mapX = unitMX;
                                            thisUnit.mapY = unitMY;
                                            for (k = 0; k < map.unitsInPlay.length; k++) {
                                                if (map.unitsInPlay[k].team != thisUnit.team) {
                                                    if (map.actionGrid[map.unitsInPlay[k].mapX][map.unitsInPlay[k].mapY] != -1) {
                                                        potentialSquare.score -= 10;
                                                    }
                                                }
                                            }
                                            this.potentialSquares.push(potentialSquare);
                                            map.calculateMovementGrid(thisUnit);
                                            map.calculateUnitDangerArea(thisUnit);
                                        }
                                    }
                                }
                                if (this.potentialSquares.length > 0) {
                                    //this.potentialSquares.sortOn("score", Array.NUMERIC);
                                    this.mapTargetX = this.potentialSquares[0].mapX;
                                    this.mapTargetY = this.potentialSquares[0].mapY;
                                }
                                else {
                                    this.mapTargetX = thisUnit.mapX;
                                    this.mapTargetY = thisUnit.mapY;
                                }
                                break;
                            case AIController.DEFEND:
                                this.potentialSquares = [];
                                map.calculateMovementGrid(thisUnit);
                                for (i = 0; i < map.movementGrid.length; i++) {
                                    for (j = 0; j < map.movementGrid[i].length; j++) {
                                        if ((i != thisUnit.movedFromX || j != thisUnit.movedFromY) && map.getUnitInSquare(i, j) == null && map.movementGrid[i][j] != -1) {
                                            potentialSquare = new battleTactics.AIPotentialSquare();
                                            potentialSquare.mapX = i;
                                            potentialSquare.mapY = j;
                                            var weakestEnemyHP = 1000;
                                            var weakestEnemyUnit;
                                            for (k = 0; k < map.unitsInPlay.length; k++) {
                                                if (map.unitsInPlay[k].team != thisUnit.team && map.unitsInPlay[k].attackable) {
                                                    map.calculateMovementGrid(map.unitsInPlay[k]);
                                                    map.calculateUnitDangerArea(map.unitsInPlay[k]);
                                                    if (map.actionGrid[i][j] == -1) {
                                                        potentialSquare.score -= 1;
                                                    }
                                                    if (map.unitsInPlay[k].currentHP < weakestEnemyHP) {
                                                        weakestEnemyUnit = map.unitsInPlay[k];
                                                    }
                                                    unitDist = Math.ceil(Math.sqrt(((i - this.preferredUnitToAttack.mapX) * (i - this.preferredUnitToAttack.mapX)) + ((j - this.preferredUnitToAttack.mapY) * (j - this.preferredUnitToAttack.mapY))));
                                                    potentialSquare.score += unitDist;
                                                }
                                            }
                                            if (this.preferredUnitToAttack) {
                                                if (this._aStarNodes && this._aStarPath) {
                                                    var nodeAtPos = this._aStarNodes[i][j];
                                                    if (this._aStarPath.indexOf(nodeAtPos) >= 0) {
                                                        potentialSquare.score -= 10;
                                                    }
                                                }
                                            }
                                            var unitMX = thisUnit.mapX;
                                            var unitMY = thisUnit.mapY;
                                            thisUnit.mapX = i;
                                            thisUnit.mapY = j;
                                            map.calculateMovementGrid(thisUnit);
                                            map.calculateUnitDangerArea(thisUnit);
                                            thisUnit.mapX = unitMX;
                                            thisUnit.mapY = unitMY;
                                            for (k = 0; k < map.unitsInPlay.length; k++) {
                                                if (map.unitsInPlay[k].team != thisUnit.team) {
                                                    if (map.actionGrid[map.unitsInPlay[k].mapX][map.unitsInPlay[k].mapY] != -1) {
                                                        potentialSquare.score -= 10;
                                                    }
                                                }
                                            }
                                            this.potentialSquares.push(potentialSquare);
                                            map.calculateMovementGrid(thisUnit);
                                            map.calculateUnitDangerArea(thisUnit);
                                        }
                                    }
                                }
                                if (this.potentialSquares.length > 0) {
                                    //this.potentialSquares.sortOn("score", Array.NUMERIC);
                                    this.mapTargetX = this.potentialSquares[0].mapX;
                                    this.mapTargetY = this.potentialSquares[0].mapY;
                                }
                                else {
                                    this.mapTargetX = thisUnit.mapX;
                                    this.mapTargetY = thisUnit.mapY;
                                }
                                break;
                        }
                    }
                    if (thisUnit.clip.aiMode) {
                        thisUnit.clip.aiMode.gotoAndStop(this.potentialActions[0].actionType + 1);
                    }
                }
                findPreferredUnitToAttack(thisUnit, map) {
                    var potentialAttackUnits = [];
                    for (var i = 0; i < map.unitsInPlay.length; i++) {
                        if (map.unitsInPlay[i].team != thisUnit.team && map.unitsInPlay[i].attackable) {
                            var newAIAction = new battleTactics.AIAction;
                            newAIAction.otherUnit = map.unitsInPlay[i];
                            newAIAction.score = newAIAction.otherUnit.currentHP;
                            if (thisUnit.unit.unitActions[1].minRange == 1 && thisUnit.unit.unitActions[1].maxRange == 1) {
                                if (newAIAction.otherUnit.unit.unitActions[newAIAction.otherUnit.unit.retaliationAction].maxRange > 1) {
                                    newAIAction.score -= 5;
                                }
                            }
                            else {
                                if (newAIAction.otherUnit.unit.unitActions[newAIAction.otherUnit.unit.retaliationAction].minRange == 1 && newAIAction.otherUnit.unit.unitActions[newAIAction.otherUnit.unit.retaliationAction].maxRange == 1) {
                                    newAIAction.score -= 5;
                                }
                            }
                            var attackDamage = thisUnit.unit.unitActions[1].getStandardAttackPower(thisUnit, newAIAction.otherUnit, map);
                            var retaliateDamage = 0;
                            if (attackDamage < newAIAction.otherUnit.currentHP) {
                                retaliateDamage = Math.floor(newAIAction.otherUnit.unit.unitActions[newAIAction.otherUnit.unit.retaliationAction].getRetaliatePower(newAIAction.otherUnit, thisUnit, map, attackDamage));
                            }
                            newAIAction.score -= attackDamage;
                            newAIAction.score += retaliateDamage;
                            newAIAction.score += Math.abs(thisUnit.mapX - newAIAction.otherUnit.mapX);
                            newAIAction.score += Math.abs(thisUnit.mapY - newAIAction.otherUnit.mapY);
                            potentialAttackUnits.push(newAIAction);
                        }
                    }
                    if (potentialAttackUnits.length > 0) {
                        //potentialAttackUnits.sortOn("score", Array.NUMERIC);
                        this.preferredUnitToAttack = potentialAttackUnits[0].otherUnit;
                        this.initNodesForAStar(thisUnit, map);
                        this._astar = new AStar(this._aStarNodes);
                        this._aStarPath = this._astar.search(this._aStarNodes[thisUnit.mapX][thisUnit.mapY], this._aStarNodes[this.preferredUnitToAttack.mapX][this.preferredUnitToAttack.mapY]);
                    }
                    else {
                        this.preferredUnitToAttack = null;
                    }
                }
                initNodesForAStar(thisUnit, map) {
                    this._aStarNodes = new Array();
                    var _previousNode;
                    var x = 0;
                    var z = 0;
                    while (x < map.mapGrid.length) {
                        this._aStarNodes[x] = new Array();
                        while (z < map.mapGrid[x].length) {
                            var node = new AStarNodeVO();
                            node.next = _previousNode;
                            node.h = 0;
                            node.f = 0;
                            node.g = 0;
                            node.visited = false;
                            node.parent = null;
                            node.closed = false;
                            node.isWall = (battleTactics.Config.mapSquareConfig[map.mapGrid[x][z].terrainID].type == ussgames.MapSquare.NOACCESS);
                            node.position = new Point(x, z);
                            this._aStarNodes[x][z] = node;
                            _previousNode = node;
                            z++;
                        }
                        z = 0;
                        x++;
                    }
                }
                checkForRandomAttack(thisUnit, map) {
                    var i, j, a;
                    var randomAttackArray = [];
                    for (a = 1; a < thisUnit.unit.unitActions.length; a++) {
                        if (thisUnit.coolDownCount[a] >= thisUnit.unit.unitActions[a].coolDown) {
                            thisUnit.selectedAction = a;
                            map.calculateActionGrid(thisUnit);
                            for (i = 0; i < map.actionGrid.length; i++) {
                                for (j = 0; j < map.actionGrid[i].length; j++) {
                                    if (map.actionGrid[i][j] >= thisUnit.unit.unitActions[a].minRange && map.actionGrid[i][j] <= thisUnit.unit.unitActions[a].maxRange) {
                                        var unitInSquare = map.getUnitInSquare(i, j);
                                        if (unitInSquare && unitInSquare.team != thisUnit.team && unitInSquare.attackable) {
                                            var newRandomAction = new battleTactics.AIAction;
                                            newRandomAction.score = unitInSquare.currentHP - thisUnit.unit.unitActions[1].getStandardAttackPower(thisUnit, unitInSquare, map);
                                            if (newRandomAction.score > 0) {
                                                newRandomAction.score += unitInSquare.unit.unitActions[unitInSquare.unit.retaliationAction].getRetaliatePower(unitInSquare, thisUnit, map);
                                            }
                                            newRandomAction.otherUnit = unitInSquare;
                                            newRandomAction.actionID = a;
                                            randomAttackArray.push(newRandomAction);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (randomAttackArray.length > 0) {
                        //randomAttackArray.sortOn("score", Array.NUMERIC);
                        this.potentialActions[0].actionType = AIController.ATTACK;
                        this.potentialActions[0].otherUnit = this.otherUnit = randomAttackArray[0].otherUnit;
                        this.potentialActions[0].actionID = randomAttackArray[0].actionID;
                    }
                }
                checkSquareSafety(mapX, mapY, team, map) {
                    for (var i = 0; i < map.unitsInPlay.length; i++) {
                        if (map.unitsInPlay[i].team != team && map.unitsInPlay[i].attackable) {
                            map.calculateMovementGrid(map.unitsInPlay[i]);
                            map.calculateUnitDangerArea(map.unitsInPlay[i]);
                            if (map.actionGrid[mapX][mapY] != -1) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                static chooseUnitOrder(unitsArray) {
                    var i;
                    AIController.unitActionOrder = [];
                    for (i = unitsArray.length - 1; i >= 0; i--) {
                        if (unitsArray[i].aiController.potentialActions.length > 0 && unitsArray[i].aiController.potentialActions[0].actionType == AIController.DEFEND && Math.random() > 0.5) {
                            AIController.unitActionOrder.push(unitsArray[i]);
                            unitsArray.splice(i, 1);
                        }
                    }
                    for (i = unitsArray.length - 1; i >= 0; i--) {
                        if (unitsArray[i].aiController.potentialActions.length > 0 && unitsArray[i].aiController.potentialActions[0].actionType == AIController.AID && Math.random() > 0.5) {
                            AIController.unitActionOrder.push(unitsArray[i]);
                            unitsArray.splice(i, 1);
                        }
                    }
                    var attackers = [];
                    for (i = unitsArray.length - 1; i >= 0; i--) {
                        if (unitsArray[i].aiController.potentialActions.length > 0) {
                            attackers.push(unitsArray[i]);
                            unitsArray.splice(i, 1);
                        }
                    }
                    if (attackers.length > 0) {
                        //attackers.sortOn("currentHP", Array.DESCENDING | Array.NUMERIC);
                        for (i = 0; i < attackers.length; i++) {
                            AIController.unitActionOrder.push(attackers[i]);
                        }
                    }
                }
            }
            AIController.IDLE = 0;
            AIController.ATTACK = 1;
            AIController.DEFEND = 2;
            AIController.AID = 3;
            battleTactics.AIController = AIController;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class AIPotentialSquare {
                constructor() {
                }
            }
            battleTactics.AIPotentialSquare = AIPotentialSquare;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class Action {
                constructor() {
                    this.label = "";
                    this.description = "";
                    this.supplementalInfo = "";
                    this.iconFrame = 1;
                    this.unlockTutorialFrame = 1;
                    this.forceAttackDisplay = false;
                    this.straightLineOnly = false;
                    this.attackMultipleUnits = false;
                    this.stopAtSurvivorUnit = false;
                    this.distanceAffectsPower = false;
                    this.canBeCountered = true;
                    this.friendlyFire = false;
                    this.dashAttack = false;
                    this.poisonTurns = 0;
                    this.poisonPower = 0;
                    this.unitAttackTargetDistance = 0;
                    this.actionPhase = Action.IDLE;
                    this.attackDamageDone = false;
                    this.retaliateDamageDone = false;
                    this.attackDamage = 0;
                    this.defendDamage = 0;
                    this.attackKO = false;
                    this.defendKO = false;
                    this.attackEvaded = false;
                    this.defendEvaded = false;
                    this.adjustBlastClipHeight = true;
                    this.placeBlastClipBehind = false;
                    this.longRange = false;
                    this.battleAnimOffset = 0;
                    this.mouseIconFrame = 2;
                    this.validSquareOccupied = true;
                    this.alwaysShowFullPower = false;
                    this.useStandardDamagePerc = true;
                    this.canAffectSelf = false;
                    this.init();
                }
                init() {
                }
                perform(paramObj = null) {
                    var map = paramObj.map;
                    var targetX = paramObj.targetX;
                    var targetY = paramObj.targetY;
                    var originatingUnit = paramObj.unit;
                    var targetUnit = map.getUnitInSquare(targetX, targetY);
                    map.calculateActionGrid(originatingUnit);
                    if (!this.attackMultipleUnits && !this.straightLineOnly && targetUnit && this.type == Action.ATTACK && targetUnit.attackable == false) {
                        return false;
                    }
                    if (this.attackMultipleUnits) {
                        map.calculateMultipleUnitAttackGrid(originatingUnit, targetUnit);
                        this.unitAttackTargetDistance = this.minRange;
                        targetUnit = this.findNextTargetUnit(originatingUnit, map);
                    }
                    this.attackDamageDone = false;
                    this.retaliateDamageDone = false;
                    this.attackDamage = 0;
                    this.defendDamage = 0;
                    this.attackKO = false;
                    this.defendKO = false;
                    this.attackEvaded = false;
                    this.defendEvaded = false;
                    if (map.actionGrid[targetX][targetY] >= this.minRange && map.actionGrid[targetX][targetY] <= this.maxRange && targetUnit && targetUnit.team != originatingUnit.team) {
                        this.actionTargetMapX = targetX;
                        this.actionTargetMapY = targetY;
                        this.actionTargetUnit = targetUnit;
                        this.actionPhase = Action.PERFORM;
                        this.longRange = false;
                        if (this.maxRange > 1 || this.attackMultipleUnits) {
                            this.longRange = true;
                        }
                        battleTactics.BattleAnimController.initBattleAnim(originatingUnit, targetUnit, this.longRange);
                        return true;
                    }
                    return false;
                }
                performSelfAction(thisUnit) {
                    return true;
                }
                performAreaAction(targetX, targetY) {
                    return true;
                }
                updateAction(map, thisUnit) {
                    if (battleTactics.BattleAnimController.battleStarted == false) {
                        return false;
                    }
                    switch (this.actionPhase) {
                        case Action.PERFORM:
                            if (!this.attackDamageDone) {
                                this.standardAttackAction(thisUnit, this.actionTargetUnit, map);
                                battleTactics.BattleAnimController.populateBattleHolder();
                            }
                            if (Main.getCurrentLabel(battleTactics.BattleAnimController.actionAnim) != battleTactics.BattleAnimController.newStyleActionLabel) {
                                /*console.log("label",
                                BattleAnimController.actionAnim.currentFrame,
                                BattleAnimController.newStyleActionLabel,
                                Main.getCurrentLabel(BattleAnimController.actionAnim),
                                BattleAnimController.actionAnim);*/
                                //console.log("label", BattleAnimController.battleAnimHolder);
                                if (battleTactics.BattleAnimController.battleAnimHolder.fader.currentFrame >= 1) {
                                    battleTactics.BattleAnimController.battleAnimHolder.fader.gotoAndPlay(3);
                                    this.actionPhase = Action.REACT1;
                                }
                            }
                            break;
                        case Action.REACT1:
                            console.log(">>>>>>>>>>>>>> fader react 1", battleTactics.BattleAnimController.battleAnimHolder.fader.currentFrame);
                            if (battleTactics.BattleAnimController.battleAnimHolder.fader.currentFrame >= 4 ||
                                battleTactics.BattleAnimController.battleAnimHolder.fader.currentFrame == 1) {
                                if (this.actionTargetUnit.currentHP > 0 && this.canBeCountered && this.actionTargetUnit.team != thisUnit.team) {
                                    this.actionPhase = Action.RETALIATE;
                                    this.actionTargetUnit.selectedAction = this.actionTargetUnit.unit.retaliationAction;
                                    map.calculateActionGrid(this.actionTargetUnit);
                                    if (map.actionGrid[thisUnit.mapX][thisUnit.mapY] >= this.actionTargetUnit.unit.unitActions[this.actionTargetUnit.unit.retaliationAction].minRange && map.actionGrid[thisUnit.mapX][thisUnit.mapY] <= this.actionTargetUnit.unit.unitActions[this.actionTargetUnit.unit.retaliationAction].maxRange) {
                                        battleTactics.BattleAnimController.populateBattleHolder();
                                    }
                                    else {
                                        this.endOfAttack(thisUnit, map);
                                    }
                                }
                                else {
                                    this.endOfAttack(thisUnit, map);
                                }
                            }
                            break;
                        case Action.RETALIATE:
                            if (!this.retaliateDamageDone) {
                                this.standardRetaliate(this.actionTargetUnit, thisUnit, map);
                                battleTactics.BattleAnimController.battleAnimHolder.counter.gotoAndPlay(2);
                            }
                            if (Main.getCurrentLabel(battleTactics.BattleAnimController.actionAnim) != battleTactics.BattleAnimController.newStyleActionLabel) {
                                console.log(">>>>>>>>>>>>>> fader 3", battleTactics.BattleAnimController.battleAnimHolder.fader.currentFrame);
                                if (battleTactics.BattleAnimController.battleAnimHolder.fader.currentFrame >= 1) {
                                    battleTactics.BattleAnimController.battleAnimHolder.fader.gotoAndPlay(2);
                                    this.actionPhase = Action.REACT2;
                                }
                            }
                            break;
                        case Action.REACT2:
                            console.log(">>>>>>>>>>>>>> fader 4", battleTactics.BattleAnimController.battleAnimHolder.fader.currentFrame);
                            if (battleTactics.BattleAnimController.battleAnimHolder.fader.currentFrame >= 4 ||
                                battleTactics.BattleAnimController.battleAnimHolder.fader.currentFrame == 1) {
                                this.endOfAttack(thisUnit, map);
                            }
                            break;
                    }
                    if (this.actionPhase == Action.IDLE) {
                        return battleTactics.BattleAnimController.openPanels();
                    }
                    else {
                        return false;
                    }
                }
                endOfAttack(thisUnit, map) {
                    console.log("endOfAttack");
                    this.lastTargetUnit = this.actionTargetUnit;
                    if (this.attackMultipleUnits && (!this.stopAtSurvivorUnit || this.actionTargetUnit.currentHP <= 0)) {
                        this.actionTargetUnit = this.findNextTargetUnit(thisUnit, map);
                        if (this.actionTargetUnit) {
                            this.attackDamageDone = false;
                            this.retaliateDamageDone = false;
                            this.attackDamage = 0;
                            this.defendDamage = 0;
                            this.actionPhase = Action.PERFORM;
                            console.log("set Action.PERFORM 2");
                        }
                        else {
                            this.actionPhase = Action.IDLE;
                            this.actionEnded(thisUnit, map);
                            battleTactics.BattleController.generalDelayCount = 10 * 2.4;
                            console.log("actionPhase 3", this.actionPhase);
                        }
                    }
                    else {
                        this.actionPhase = Action.IDLE;
                        this.actionEnded(thisUnit, map);
                        battleTactics.BattleController.generalDelayCount = 10 * 2.4;
                        console.log("actionPhase 4", this.actionPhase);
                    }
                }
                standardAttackAction(attackingUnit, targetUnit, map) {
                    var damage = Math.floor(this.getStandardAttackPower(attackingUnit, targetUnit, map));
                    if (damage >= targetUnit.currentHP) {
                        damage = Math.floor(targetUnit.currentHP);
                        this.attackKO = true;
                    }
                    if (targetUnit.evadeAttackCount > 0) {
                        this.attackEvaded = true;
                    }
                    this.applyDamage(damage, targetUnit, attackingUnit);
                    this.attackDamage = damage;
                    this.attackDamageDone = true;
                    this.actionExtraEffect(targetUnit, map);
                    if (this.newDamageClip) {
                        this.showDamageNew(this.newDamageClip);
                    }
                }
                getStandardAttackPower(attackingUnit, targetUnit, map) {
                    var attackPower = Math.ceil((0.5 + ((attackingUnit.currentHP / attackingUnit.unit.HP) / 2)) * this.power);
                    if (map.mapGrid[attackingUnit.mapX][attackingUnit.mapY].height > map.mapGrid[targetUnit.mapX][targetUnit.mapY].height) {
                        attackPower *= 1 + battleTactics.Config.HIGHGROUNDATTACKBONUS;
                    }
                    if (map.mapGrid[targetUnit.mapX][targetUnit.mapY].type == ussgames.MapSquare.COVER) {
                        attackPower *= battleTactics.Config.COVERDEFENCEBONUS;
                    }
                    if (map.mapGrid[attackingUnit.mapX][attackingUnit.mapY].height < map.mapGrid[targetUnit.mapX][targetUnit.mapY].height) {
                        attackPower *= battleTactics.Config.COVERDEFENCEBONUS;
                    }
                    if (this.distanceAffectsPower) {
                        var distPoint = new Point(Math.abs(attackingUnit.mapX - targetUnit.mapX), Math.abs(attackingUnit.mapY - targetUnit.mapY));
                        var distance = Math.sqrt(Math.pow((distPoint.x - 0), 2) + Math.pow((distPoint.y - 0), 2)) - this.minRange;
                        var distRange = (this.maxRange - this.minRange) + 1;
                        var distMult = 1 - (distance / distRange);
                        attackPower = Math.ceil(attackPower * distMult);
                    }
                    if (attackPower < 1 && this.power > 0) {
                        attackPower = 1;
                    }
                    return Math.floor(attackPower);
                }
                alternateDamageDisplay(attackingUnit, targetUnit, map) {
                    return "";
                }
                standardRetaliate(retaliatingUnit, targetUnit, map) {
                    if (retaliatingUnit.currentHP > 0) {
                        retaliatingUnit.selectedAction = retaliatingUnit.unit.retaliationAction;
                        map.calculateActionGrid(retaliatingUnit);
                        if (targetUnit.evadeAttackCount > 0) {
                            this.defendEvaded = true;
                        }
                        if (map.actionGrid[targetUnit.mapX][targetUnit.mapY] >= retaliatingUnit.unit.unitActions[retaliatingUnit.unit.retaliationAction].minRange && map.actionGrid[targetUnit.mapX][targetUnit.mapY] <= retaliatingUnit.unit.unitActions[retaliatingUnit.unit.retaliationAction].maxRange) {
                            var damage = this.getRetaliatePower(retaliatingUnit, targetUnit, map);
                            if (damage >= targetUnit.currentHP) {
                                damage = Math.floor(targetUnit.currentHP);
                                this.defendKO = true;
                            }
                            this.applyDamage(damage, targetUnit, retaliatingUnit);
                            this.defendDamage = damage;
                            this.retaliateDamageDone = true;
                        }
                        this.retaliateDamageDone = true;
                        if (this.newDamageClip) {
                            this.showDamageNew(this.newDamageClip);
                        }
                    }
                }
                getRetaliatePower(retaliatingUnit, targetUnit, map, hpOff = 0) {
                    var attackPower = Math.ceil((0.5 + (((retaliatingUnit.currentHP - hpOff) / retaliatingUnit.unit.HP) / 2)) * (retaliatingUnit.unit.unitActions[retaliatingUnit.unit.retaliationAction].power));
                    if (map.mapGrid[retaliatingUnit.mapX][retaliatingUnit.mapY].height > map.mapGrid[targetUnit.mapX][targetUnit.mapY].height) {
                        attackPower *= 1 + battleTactics.Config.HIGHGROUNDATTACKBONUS;
                    }
                    if (map.mapGrid[targetUnit.mapX][targetUnit.mapY].type == ussgames.MapSquare.COVER) {
                        attackPower *= battleTactics.Config.COVERDEFENCEBONUS;
                    }
                    if (map.mapGrid[retaliatingUnit.mapX][retaliatingUnit.mapY].height < map.mapGrid[targetUnit.mapX][targetUnit.mapY].height) {
                        attackPower *= battleTactics.Config.COVERDEFENCEBONUS;
                    }
                    if (attackPower < 1) {
                        attackPower = 1;
                    }
                    return attackPower;
                }
                applyDamage(damage, targetUnit, attackingUnit) {
                    if (targetUnit.evadeAttackCount > 0) {
                        targetUnit.evadeAttackCount--;
                        targetUnit.state = battleTactics.UnitInPlay.EVADE;
                        damage = 0;
                    }
                    else {
                        var xpInc = damage;
                        if (xpInc > targetUnit.currentHP) {
                            xpInc = targetUnit.currentHP;
                        }
                        damage = Math.floor(damage);
                        targetUnit.currentHP -= damage;
                        attackingUnit.awardXP(damage, battleTactics.UnitInPlay.DAMAGE);
                        if (targetUnit.currentHP > 0) {
                            targetUnit.state = battleTactics.UnitInPlay.HIT;
                        }
                        else {
                            targetUnit.state = battleTactics.UnitInPlay.KO;
                            attackingUnit.awardXP(battleTactics.Config.KOXP, battleTactics.UnitInPlay.KOS);
                            targetUnit.awardXP(battleTactics.Config.DIEXP, battleTactics.UnitInPlay.DIE);
                            targetUnit.unit.noHPLeftFunction(attackingUnit, battleTactics.BattleController.currentMap);
                        }
                        if (targetUnit == this.actionTargetUnit) {
                            if (this.poisonTurns > 0) {
                                targetUnit.poisonTurns = this.poisonTurns;
                                targetUnit.poisonPower = this.poisonPower;
                            }
                        }
                        var screenshake = damage;
                        ScreenShaker.shakeScreen(screenshake, 6);
                        if (targetUnit.team == 1) {
                            SoundController.playSound("badHP");
                        }
                        else {
                            SoundController.playSound("goodHP");
                        }
                    }
                }
                findNextTargetUnit(thisUnit, map) {
                    var i, j;
                    var targetUnit;
                    for (i = 0; i < map.mapGrid.length; i++) {
                        for (j = 0; j < map.mapGrid[i].length; j++) {
                            if (map.multipleUnitAttackGrid[i][j] == this.unitAttackTargetDistance) {
                                targetUnit = map.getUnitInSquare(i, j);
                                if (targetUnit) {
                                    map.multipleUnitAttackGrid[i][j] = 0;
                                    if (this.friendlyFire || targetUnit.team != thisUnit.team) {
                                        return targetUnit;
                                    }
                                }
                            }
                        }
                    }
                    if (this.unitAttackTargetDistance < this.maxRange && this.unitAttackTargetDistance < map.mapGrid.length) {
                        this.unitAttackTargetDistance++;
                        return this.findNextTargetUnit(thisUnit, map);
                    }
                    return null;
                }
                actionExtraEffect(targetUnit, map) {
                }
                actionEnded(thisUnit, map) {
                    if (this.dashAttack) {
                        if (this.lastTargetUnit.currentHP <= 0) {
                            thisUnit.mapX = this.lastTargetUnit.mapX;
                            thisUnit.mapY = this.lastTargetUnit.mapY;
                        }
                        else {
                            var dirX = 0;
                            var dirY = 0;
                            if (this.lastTargetUnit.mapX < thisUnit.mapX) {
                                dirX = -1;
                            }
                            else if (this.lastTargetUnit.mapX > thisUnit.mapX) {
                                dirX = 1;
                            }
                            else if (this.lastTargetUnit.mapY < thisUnit.mapY) {
                                dirY = -1;
                            }
                            else if (this.lastTargetUnit.mapY > thisUnit.mapY) {
                                dirY = 1;
                            }
                            if (dirX != 0 && dirY == 0) {
                                thisUnit.mapX = this.lastTargetUnit.mapX - dirX;
                                thisUnit.mapY = this.lastTargetUnit.mapY;
                            }
                            else if (dirX == 0 && dirY != 0) {
                                thisUnit.mapX = this.lastTargetUnit.mapX;
                                thisUnit.mapY = this.lastTargetUnit.mapY - dirY;
                            }
                        }
                        thisUnit.updateClipPosition(map);
                    }
                }
                showDamageNew(damageClip) {
                    this.newDamageClip = damageClip;
                    if (this.actionPhase == Action.PERFORM || this.actionPhase == Action.REACT1) {
                        if (this.attackDamageDone) {
                            if (this.poisonTurns > 0) {
                                damageClip.gotoAndStop(4);
                            }
                            else if (this.attackEvaded) {
                                damageClip.gotoAndStop(3);
                            }
                            else if (this.attackKO) {
                                damageClip.gotoAndStop(2);
                            }
                            else {
                                damageClip.gotoAndStop(1);
                                Main.changeText(damageClip.hpDown, ["-" + String(this.attackDamage)], "hpDown");
                            }
                            damageClip.visible = true;
                        }
                        else {
                            damageClip.gotoAndStop(1);
                            Main.changeText(damageClip.hpDown, [""], "hpDown");
                            damageClip.visible = false;
                        }
                    }
                    else if (this.actionPhase == Action.RETALIATE || this.actionPhase == Action.REACT2) {
                        if (this.retaliateDamageDone) {
                            if (this.defendEvaded) {
                                damageClip.gotoAndStop(3);
                            }
                            else if (this.defendKO) {
                                damageClip.gotoAndStop(2);
                            }
                            else {
                                damageClip.gotoAndStop(1);
                                Main.changeText(damageClip.hpDown, ["-" + String(this.attackDamage)], "hpDown");
                            }
                            damageClip.visible = true;
                        }
                        else {
                            damageClip.gotoAndStop(1);
                            Main.changeText(damageClip.hpDown, [""], "hpDown");
                            damageClip.visible = false;
                        }
                    }
                }
                showDefender(clip) {
                    if (this.actionPhase == Action.PERFORM || this.actionPhase == Action.REACT1) {
                        if ((this.actionTargetUnit.evadeAttackCount > 0 || this.attackEvaded)) {
                            clip.gotoAndStop(21);
                        }
                        else {
                            clip.gotoAndStop(this.actionTargetUnit.unit.id + 1);
                        }
                    }
                    else if (this.actionPhase == Action.RETALIATE || this.actionPhase == Action.REACT2) {
                        if ((battleTactics.BattleAnimController.attackingUnit.evadeAttackCount > 0 || this.defendEvaded)) {
                            clip.gotoAndStop(21);
                        }
                        else {
                            clip.gotoAndStop(battleTactics.BattleAnimController.attackingUnit.unit.id + 1);
                        }
                    }
                }
            }
            Action.DEFENCE = 0;
            Action.ATTACK = 1;
            Action.SELF = 2;
            Action.AREA = 3;
            Action.IDLE = 0;
            Action.PERFORM = 1;
            Action.REACT1 = 2;
            Action.RETALIATE = 3;
            Action.REACT2 = 4;
            battleTactics.Action = Action;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Action = com.ussgames.battleTactics.Action;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class ActionSelectorPanel extends CustomMovieClip {
                constructor(any) {
                    super(any);
                    this._titanID = -1;
                    this.showingActionInfo = false;
                    this.initedButtons = false;
                    this.actionButtonsInstance = [];
                    this.instanceClip["hpBar"] = new battleTactics.HPBar(this.instanceClip["hpBar"]);
                    this.instanceClip.y = 50;
                }
                update() {
                    if (battleTactics.BattleController.teamsTurn == 1 && (battleTactics.BattleController.selectedUnit || (battleTactics.BattleController.hoverUnit && battleTactics.BattleController.hoverUnit.ai == false))) {
                        if (this.instanceClip.x < ActionSelectorPanel.ONX - 1) {
                            this.instanceClip.x += (ActionSelectorPanel.ONX - this.instanceClip.x) / 2;
                            if (Controller.getLevelNumber() == 2 && Controller.root.tut.currentFrame != 18) {
                                Controller.root.tut.visible = false;
                            }
                            this.instanceClip.visible = true;
                        }
                        else {
                            if (Controller.getLevelNumber() == 2) {
                                Controller.root.tut.visible = true;
                            }
                        }
                    }
                    else {
                        if (this.instanceClip.x > ActionSelectorPanel.OFFX + 1) {
                            this.instanceClip.x += (ActionSelectorPanel.OFFX - this.instanceClip.x) / 2;
                            if (Controller.getLevelNumber() == 2 && Controller.root.tut.currentFrame != 18) {
                                Controller.root.tut.visible = false;
                            }
                            this.showingActionInfo = false;
                        }
                        else {
                            this._titanID = -1;
                            this._unitInPlay = null;
                            this.instanceClip.visible = false;
                        }
                    }
                    if (this._unitInPlay) {
                        this.updateInfo(this._unitInPlay);
                    }
                }
                init(unitInPlay) {
                    var titanID = unitInPlay.unit.id;
                    this._unitInPlay = unitInPlay;
                    if (ActionSelectorPanel.unvailableActionFilter == null) {
                        ActionSelectorPanel.generateUnvailableActionFilter();
                    }
                    if (!this.initedButtons)
                        for (var i = 1; i <= 4; i++) {
                            this.actionButtonsInstance[i] = new ActionButton(this.instanceClip["a" + String(i)]);
                            this.actionButtonsInstance[i].actionID = i;
                            for (var sa = 0; sa < this.instanceClip.children.length; sa++) {
                                var currfr;
                                if (this.instanceClip.children[sa]._config != null)
                                    currfr = this.instanceClip.children[sa]._config;
                                else
                                    continue;
                                if (this.instanceClip.children[sa]._config._linkage != null)
                                    currfr = this.instanceClip.children[sa]._config._linkage;
                                else
                                    continue;
                                if (currfr == "UndoActionButton")
                                    new UndoButton(this.instanceClip.children[sa]);
                                if (currfr == "EndTurnActionButton")
                                    new EndTurnButton(this.instanceClip.children[sa]);
                            }
                            this.initedButtons = true;
                        }
                    if (titanID != -1) {
                        this._titanID = titanID;
                        this.instanceClip.gotoAndStop(titanID + 1);
                        this.updateInfo(unitInPlay);
                        this.clearActionInfo();
                        this.initLocks();
                    }
                    if (battleTactics.BattleController.currentPhase != battleTactics.BattleController.ACTIONPHASE && battleTactics.BattleController.currentPhase != battleTactics.BattleController.PERFORMINGACTIONPHASE) {
                        this.initActionButtons();
                    }
                }
                initLocks() {
                    for (var i = 2; i <= 4; i++) {
                        if (battleTactics.BattleController.persistentTeamUnits[this._titanID].unlockedActions[i]) {
                            this.instanceClip["l" + String(i)].gotoAndStop("unlocked");
                        }
                        else {
                            this.instanceClip["l" + String(i)].gotoAndStop("locked");
                            //this.actionButtonsInstance[i].on(CustomMouseEvent.MOUSE_OVER, this.showLockedInfo);
                            //this.actionButtonsInstance[i].on(CustomMouseEvent.MOUSE_OUT, this.clearActionInfo);
                        }
                    }
                }
                static generateUnvailableActionFilter() {
                    ActionSelectorPanel.unvailableActionFilter = new ColorMatrixFilter();
                    ActionSelectorPanel.unvailableActionFilter.saturate(-1);
                }
                initActionButtons() {
                    var unit = battleTactics.BattleController.persistentTeamUnits[this._titanID];
                    var unitInPlay = battleTactics.BattleController.selectedUnit;
                    if (unitInPlay == null) {
                        unitInPlay = battleTactics.BattleController.hoverUnit;
                    }
                    if (unitInPlay == null) {
                        return;
                    }
                    for (var i = 1; i <= 4; i++) {
                        this.instanceClip["a" + String(i)].icon.gotoAndStop(unit.unitActions[i].iconFrame);
                        if (!unit.unlockedActions[i]) {
                            //this.instanceClip["a" + String(i)].disable();
                        }
                        else if (unit.unitActions[i].coolDown > unitInPlay.coolDownCount[i]) {
                            var coolDownPerc = unitInPlay.coolDownCount[i] / unit.unitActions[i].coolDown;
                            if (coolDownPerc > 1) {
                                coolDownPerc = 1;
                            }
                            this.instanceClip["a" + String(i)].cooler.gotoAndStop(Math.round(coolDownPerc * 100));
                            this.instanceClip["a" + String(i)]["cooler"].visible = true;
                            //this.instanceClip["a" + String(i)].enable();
                        }
                        else {
                            this.instanceClip["a" + String(i)]["cooler"].visible = false;
                            //this.instanceClip["a" + String(i)].enable();
                        }
                    }
                    this.hilightAction(0);
                }
                hilightAction(actionID) {
                    for (var i = 1; i <= 4; i++) {
                        if (i == actionID) {
                            this.instanceClip["a" + String(i)].filters = [ActionSelectorPanel.selectedActionFilter];
                        }
                        else {
                            this.instanceClip["a" + String(i)].filters = [];
                        }
                    }
                }
                updateInfo(unitInPlay) {
                    Main.changeText(this.instanceClip["titanName"], Localizer.getlocalisedText(battleTactics.BattleController.persistentTeamUnits[this._titanID].label));
                    this.instanceClip["hpBar"].showHP(unitInPlay.currentHP);
                    for (var i = 0; i < 4; i++) {
                        this.instanceClip["a" + String(i + 1)].gotoAndStop(battleTactics.BattleController.persistentTeamUnits[this._titanID].unitActions[i + 1].iconFrame);
                    }
                }
                clearActionInfo() {
                    if (battleTactics.BattleController.currentPhase == battleTactics.BattleController.ACTIONPHASE || battleTactics.BattleController.currentPhase == battleTactics.BattleController.PERFORMINGACTIONPHASE) {
                        Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText(battleTactics.BattleController.persistentTeamUnits[this._titanID].unitActions[battleTactics.BattleController.selectedUnit.selectedAction].label));
                        var powerPerc = battleTactics.BattleController.persistentTeamUnits[this._titanID].unitActions[battleTactics.BattleController.selectedUnit.selectedAction].power / 10;
                        if (powerPerc > 1 || battleTactics.BattleController.persistentTeamUnits[this._titanID].unitActions[battleTactics.BattleController.selectedUnit.selectedAction].alwaysShowFullPower) {
                            powerPerc = 1;
                        }
                        var dmg = Math.ceil(5 * powerPerc) + 1;
                        if (dmg < 1)
                            dmg = 1;
                        if (dmg > 6)
                            dmg = 6;
                        this.instanceClip["actionPower"].gotoAndStop(dmg);
                    }
                    else {
                        Main.changeText(this.instanceClip["attackDescription"], com.ussgames.general.Localizer.getlocalisedText("Roll over icons for info"));
                        this.instanceClip["actionPower"].gotoAndStop(1);
                    }
                    this.showingActionInfo = false;
                }
                showActionInfo(actionID) {
                    if (this._titanID >= 0 && actionID >= 1 && battleTactics.BattleController.persistentTeamUnits[this._titanID].unlockedActions[actionID] && battleTactics.BattleController.selectedUnit) {
                        if (battleTactics.BattleController.selectedUnit.coolDownCount[actionID] >= battleTactics.BattleController.selectedUnit.unit.unitActions[actionID].coolDown) {
                            Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText(battleTactics.BattleController.persistentTeamUnits[this._titanID].unitActions[actionID].label));
                        }
                        else {
                            var turnsCoolDown = battleTactics.BattleController.persistentTeamUnits[this._titanID].unitActions[actionID].coolDown - battleTactics.BattleController.selectedUnit.coolDownCount[actionID];
                            Main.changeText(this.instanceClip["attackDescription"], [Localizer.getlocalisedText("Available in ")[0] + String(turnsCoolDown) + com.ussgames.general.Localizer.getlocalisedText(" turn")]);
                            if (turnsCoolDown > 1) {
                                Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText("s"), "null", true);
                            }
                        }
                        var powerPerc = battleTactics.BattleController.persistentTeamUnits[this._titanID].unitActions[actionID].power / 10;
                        if (powerPerc > 1 || battleTactics.BattleController.persistentTeamUnits[this._titanID].unitActions[actionID].alwaysShowFullPower) {
                            powerPerc = 1;
                        }
                        var dmg = Math.ceil(5 * powerPerc) + 1;
                        if (dmg < 1)
                            dmg = 1;
                        if (dmg > 6)
                            dmg = 6;
                        this.instanceClip["actionPower"].gotoAndStop(dmg);
                        this.showingActionInfo = true;
                    }
                }
                showLockedInfo() {
                    Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText("Locked"));
                }
            }
            ActionSelectorPanel.OFFX = 30;
            ActionSelectorPanel.ONX = 400;
            ActionSelectorPanel.selectedActionFilter = Main.convertToPixiGlowFilter(0xffffff, 0.65, 20, 20, 2.25, 1, true, false);
            battleTactics.ActionSelectorPanel = ActionSelectorPanel;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var ActionSelectorPanel = com.ussgames.battleTactics.ActionSelectorPanel;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class BTMap {
                constructor() {
                    this.team1HighlightFilter = Main.convertToPixiGlowFilter(0x00003300, 1, 5, 5, 2, 1, false, false);
                    this.team2HighlightFilter = Main.convertToPixiGlowFilter(0x00330000, 1, 5, 5, 2, 1, false, false);
                    this.selectedUnitGlow = Main.convertToPixiGlowFilter(0x00ffffff, 1, 5, 5, 2, 1, false, false);
                }
                initMap(mapXMLString) {
                    var xmlData = xml2js(mapXMLString, { compact: true, spaces: 4 }).level_data;
                    for (var xd in xmlData) {
                        xmlData[xd] = xmlData[xd]["_attributes"];
                    }
                    var columnData;
                    var columnArray;
                    var mapSizeArray = xmlData["level_size"]["data"].split(",");
                    var mapWidth = mapSizeArray[0];
                    var mapHeight = mapSizeArray[1];
                    var i, j, mX, mY;
                    var newUnit;
                    var newUnitInPlay;
                    var mapSquare;
                    var mapBG = parseInt(xmlData["map_bg"]["data"]);
                    Controller.root.bgs.gotoAndStop(Controller.getLevelNumber());
                    battleTactics.BattleController.startSpeech = ["", "", "", "", "", ""];
                    battleTactics.BattleController.startSpeechCharacter = [1, 1, 1, 1, 1, 1];
                    battleTactics.BattleController.endSpeech = ["", "", "", "", "", ""];
                    battleTactics.BattleController.endSpeechCharacter = [1, 1, 1, 1, 1, 1];
                    for (var k = 0; k < battleTactics.BattleController.startSpeech.length; k++) {
                        if (xmlData["start_speech_" + String(k + 1)] != undefined && xmlData["start_speech_" + String(k + 1)].speech != undefined && xmlData["start_speech_" + String(k + 1)].char != undefined) {
                            battleTactics.BattleController.startSpeech[k] = String(xmlData["start_speech_" + String(k + 1)].speech);
                            battleTactics.BattleController.startSpeechCharacter[k] = parseInt(xmlData["start_speech_" + String(k + 1)].char);
                        }
                        if (xmlData["end_speech_" + String(k + 1)] != undefined && xmlData["end_speech_" + String(k + 1)].speech != undefined && xmlData["end_speech_" + String(k + 1)].char != undefined) {
                            battleTactics.BattleController.endSpeech[k] = String(xmlData["end_speech_" + String(k + 1)].speech);
                            battleTactics.BattleController.endSpeechCharacter[k] = parseInt(xmlData["end_speech_" + String(k + 1)].char);
                        }
                    }
                    this.unitsInPlay = [];
                    this.objectClipsInView = [];
                    this.mapGrid = [];
                    this.movementGrid = [];
                    this.actionGrid = [];
                    this.multipleUnitAttackGrid = [];
                    for (i = 0; i < battleTactics.Config.MAPWIDTH; i++) {
                        var mapColumn = [];
                        var movementColumn = [];
                        var actionColumn = [];
                        var multipleUnitAttackColumn = [];
                        if (mapWidth > i) {
                            columnData = xmlData["layer_0_" + String(i)].data;
                            columnArray = columnData.split(",");
                            for (j = 0; j < battleTactics.Config.MAPHEIGHT; j++) {
                                if (mapHeight > j) {
                                    mapSquare = new ussgames.MapSquare;
                                    var mapSquareClip = null;
                                    if (battleTactics.Config.mapSquareConfig[parseInt(columnArray[j])].clipClassName
                                        && battleTactics.Config.mapSquareConfig[parseInt(columnArray[j])].clipClassName != null) {
                                        mapSquareClip = Main.addGAFMovieClip(battleTactics.Config.mapSquareConfig[columnArray[j]].clipClassName, false, false, 100);
                                    }
                                    mapSquare.init(battleTactics.Config.mapSquareConfig[parseInt(columnArray[j])].type, battleTactics.Config.mapSquareConfig[parseInt(columnArray[j])].height, i, j, mapSquareClip, parseInt(columnArray[j]));
                                    mapColumn.push(mapSquare);
                                    movementColumn.push(-1);
                                    actionColumn.push(-1);
                                    multipleUnitAttackColumn.push(-1);
                                }
                                else {
                                    mapSquare = new ussgames.MapSquare;
                                    mapSquare.init(0, 0, i, j, null, 0);
                                    mapColumn.push(mapSquare);
                                    movementColumn.push(-1);
                                    actionColumn.push(-1);
                                    multipleUnitAttackColumn.push(-1);
                                }
                            }
                        }
                        else {
                            for (j = 0; j < battleTactics.Config.MAPHEIGHT; j++) {
                                mapSquare = new ussgames.MapSquare;
                                mapSquare.init(0, 0, i, j, null, 0);
                                mapColumn.push(mapSquare);
                                movementColumn.push(-1);
                                actionColumn.push(-1);
                                multipleUnitAttackColumn.push(-1);
                            }
                        }
                        this.mapGrid.push(mapColumn);
                        this.movementGrid.push(movementColumn);
                        this.actionGrid.push(actionColumn);
                        this.multipleUnitAttackGrid.push(multipleUnitAttackColumn);
                    }
                    for (i = 0; i < mapWidth; i++) {
                        columnData = xmlData["layer_1_" + String(i)].data;
                        columnArray = columnData.split(",");
                        for (j = 0; j < mapHeight; j++) {
                            if (parseInt(columnArray[j]) > 0) {
                                if (parseInt(columnArray[j]) > 5) {
                                    newUnit = new battleTactics.Config.unitConfigs[parseInt(columnArray[j]) - 1];
                                    newUnit.init();
                                    newUnit.initUnlockedActions(true);
                                    newUnit.id = parseInt(columnArray[j]) - 1;
                                }
                                else {
                                    newUnit = battleTactics.BattleController.persistentTeamUnits[parseInt(columnArray[j]) - 1];
                                }
                                var team_ = 1;
                                var ai_ = false;
                                if (columnArray[j] > 5) {
                                    team_ = 2;
                                    ai_ = true;
                                }
                                newUnitInPlay = new battleTactics.UnitInPlay();
                                newUnitInPlay.init(newUnit, i, j, team_, ai_);
                                newUnitInPlay.update();
                                this.unitsInPlay.push(newUnitInPlay);
                            }
                        }
                    }
                    var allHighlights = ["DefendHighlight", "UnitSquareHighlight", "MovementHighlight", "AttackHighlight"];
                    for (var ahh = 0; ahh < allHighlights.length; ahh++) {
                        for (var ix = 0; ix < mapWidth; ix++) {
                            for (var iy = 0; iy < mapWidth; iy++) {
                                var highlightClip_ = Main.addGAFMovieClip(allHighlights[ahh]);
                                highlightClip_.x = ix * battleTactics.Config.GRIDSIZEX;
                                highlightClip_.y = iy * battleTactics.Config.GRIDSIZEY;
                                highlightClip_.name = allHighlights[ahh] + "_" + ix + "_" + iy;
                                highlightClip_.visible = false;
                                this.gridHighlightClip.addChild(highlightClip_);
                            }
                        }
                    }
                    battleTactics.Cinematics.initCinematicUnits(this);
                }
                initMapLayers(mapContainer) {
                    this.gridLayerClip = new Sprite;
                    this.gridHighlightClip = new Sprite;
                    this.mapView = new Sprite;
                    this.unitsContainerClip = new Sprite;
                    this.objectsContainerClip = new Sprite;
                    this.viewContainer = mapContainer;
                    this.viewContainer.interactive = true;
                    this.mapView.y = 164;
                    this.viewContainer.addChild(this.mapView);
                    this.mapView.addChild(this.gridLayerClip);
                    this.mapView.addChild(this.gridHighlightClip);
                    this.mapView.addChild(this.objectsContainerClip);
                    this.objectsContainerClip.y = -5;
                    this.mapView.addChild(this.unitsContainerClip);
                }
                initView() {
                    var i, j;
                    this.generateUnHighlightedUnitFilter();
                    this.objectClipsInView = [];
                    for (i = 0; i < this.unitsInPlay.length; i++) {
                        this.unitsInPlay[i].updateClipPosition(this);
                        this.unitsContainerClip.addChild(this.unitsInPlay[i].clip);
                        this.objectClipsInView.push(this.unitsInPlay[i].clip);
                    }
                    for (i = 0; i < this.mapGrid.length; i++) {
                        for (j = 0; j < this.mapGrid[i].length; j++) {
                            if (this.mapGrid[i][j].objectClip != null) {
                                this.mapGrid[i][j].updateClipPosition();
                                this.objectsContainerClip.addChild(this.mapGrid[i][j].objectClip);
                            }
                        }
                    }
                }
                cleanUp() {
                    for (var i = 0; i < this.objectClipsInView.length; i++) {
                        if (this.objectClipsInView[i].parent) {
                            //console.log("remove object", this.objectClipsInView[i]._gafTimeline._config._linkage, this.objectClipsInView[i]);
                            this.objectClipsInView[i].filters = [];
                            this.objectClipsInView[i].parent.removeChild(this.objectClipsInView[i]);
                        }
                    }
                    while (this.objectsContainerClip.children[0]) {
                        this.objectsContainerClip.removeChildAt(0);
                    }
                    while (this.viewContainer.children[0]) {
                        this.viewContainer.removeChildAt(0);
                    }
                    this.mapGrid = null;
                    this.unitsInPlay = null;
                    this.movementGrid = null;
                    this.actionGrid = null;
                    this.multipleUnitAttackGrid = null;
                    this.viewContainer = null;
                    this.mapView = null;
                    this.gridLayerClip = null;
                    this.gridHighlightClip = null;
                    this.unitsContainerClip = null;
                    this.objectsContainerClip = null;
                }
                addUnitToView(unitInPlay) {
                    unitInPlay.updateClipPosition(this);
                    this.unitsContainerClip.addChild(unitInPlay.clip);
                    this.objectClipsInView.push(unitInPlay.clip);
                    this.depthSortView();
                }
                update() {
                }
                depthSortView() {
                    this.objectClipsInView.sort(function (b, a) {
                        return a.y - b.y;
                    });
                    for (var i = 0; i < this.objectClipsInView.length; i++) {
                        this.unitsContainerClip.setChildIndex(this.objectClipsInView[i], 0);
                    }
                }
                getUnitForID(unitID) {
                    for (var i = this.unitsInPlay.length - 1; i >= 0; i--) {
                        if (this.unitsInPlay[i].unit.id == unitID) {
                            return this.unitsInPlay[i];
                        }
                    }
                    return null;
                }
                getUnitInSquare(mapX, mapY) {
                    var unitInSquare;
                    for (var i = 0; i < this.unitsInPlay.length; i++) {
                        if (this.unitsInPlay[i].mapX == mapX && this.unitsInPlay[i].mapY == mapY) {
                            unitInSquare = this.unitsInPlay[i];
                            break;
                        }
                    }
                    return unitInSquare;
                }
                hilightUnitSquares(team) {
                    this.clearSquareHighlights();
                    this.clearUnitHighlights();
                    for (var i = 0; i < this.unitsInPlay.length; i++) {
                        if (this.unitsInPlay[i].team == team && this.unitsInPlay[i].actioned == false) {
                            if (!this.unitsInPlay[i].ai) {
                                this.highlightSquare(this.unitsInPlay[i].mapX, this.unitsInPlay[i].mapY, "UnitSquareHighlight");
                            }
                            this.unitsInPlay[i].clip.filters = [];
                            this.unitsInPlay[i].availableForOrder();
                        }
                        else {
                            this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter];
                        }
                    }
                }
                hilightThisUnitSquare(theUnit) {
                    this.clearSquareHighlights();
                    this.clearUnitHighlights();
                    for (var i = 0; i < this.unitsInPlay.length; i++) {
                        if (this.unitsInPlay[i] != theUnit) {
                            if (!this.unitsInPlay[i].actioned && this.unitsInPlay[i].team == theUnit.team) {
                                this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter_lite];
                            }
                        }
                        else {
                            theUnit.clip.filters = [this.selectedUnitGlow];
                            theUnit.availableForOrder();
                        }
                    }
                }
                generateUnHighlightedUnitFilter() {
                    this.unHighlightedUnitFilter = new ColorMatrixFilter();
                    this.unHighlightedUnitFilter.saturate(-1);
                    this.unHighlightedUnitFilter_lite = new ColorMatrixFilter();
                    this.unHighlightedUnitFilter_lite.saturate(-0.5);
                }
                hilightUnit(unitToHighlight, forceColour = false) {
                    for (var i = 0; i < this.unitsInPlay.length; i++) {
                        if (this.unitsInPlay[i] == unitToHighlight) {
                            if (!forceColour && (unitToHighlight.actioned || this.unitsInPlay[i].team != battleTactics.BattleController.teamsTurn)) {
                                this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter];
                            }
                            else {
                                this.unitsInPlay[i].clip.filters = [];
                                if (forceColour) {
                                    this.unitsInPlay[i].clip.gotoAndStop("breath");
                                }
                            }
                        }
                        else {
                            if (this.unitsInPlay[i].team == 1) {
                                if (this.unitsInPlay[i].team == battleTactics.BattleController.teamsTurn && this.unitsInPlay[i].actioned == false) {
                                    //this.unitsInPlay[i].clip.filters = [this.team1HighlightFilter];
                                }
                                else {
                                    this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter];
                                    //this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter, this.team1HighlightFilter];
                                }
                                this.unitsInPlay[i].clip.alpha = 0.4;
                            }
                            else {
                                if (this.unitsInPlay[i].team == battleTactics.BattleController.teamsTurn && this.unitsInPlay[i].actioned == false) {
                                    //this.unitsInPlay[i].clip.filters = [this.team2HighlightFilter];
                                    this.unitsInPlay[i].clip.filters = [];
                                }
                                else {
                                    //this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter, this.team2HighlightFilter];
                                    this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter];
                                }
                                this.unitsInPlay[i].clip.alpha = 0.4;
                            }
                        }
                    }
                }
                clearUnitHighlights(forceColour = false) {
                    for (var i = 0; i < this.unitsInPlay.length; i++) {
                        if (forceColour || (this.unitsInPlay[i].team == battleTactics.BattleController.teamsTurn && this.unitsInPlay[i].actioned == false)) {
                            this.unitsInPlay[i].clip.filters = [];
                        }
                        else {
                            this.unitsInPlay[i].clip.filters = [this.unHighlightedUnitFilter];
                        }
                        this.unitsInPlay[i].clip.alpha = 1;
                    }
                }
                getMapSquareUnderMouse() {
                    var mX = Math.floor(Main.renderer.plugins.interaction.mouse.global.x / (battleTactics.Config.GRIDSIZEX * 2));
                    var mY = Math.floor((Main.renderer.plugins.interaction.mouse.global.y - (164 * 2)) / (battleTactics.Config.GRIDSIZEY * 2));
                    if (mX >= 0 && mX < this.mapGrid.length && mY >= 0 && mY < this.mapGrid[0].length) {
                        return this.mapGrid[mX][mY];
                    }
                    return null;
                }
                countLiveUnits(team) {
                    var liveUnitCount = 0;
                    for (var i = 0; i < this.unitsInPlay.length; i++) {
                        if (this.unitsInPlay[i].team == team) {
                            liveUnitCount++;
                        }
                    }
                    return liveUnitCount;
                }
                clearSquareHighlights() {
                    var n = this.gridHighlightClip.children.length;
                    for (var i = 0; i < n; i++) {
                        this.gridHighlightClip.children[i].visible = false;
                    }
                    this.objectsContainerClip.alpha = 1;
                    Controller.root.infoPanels.attackRangeKey.visible = false;
                }
                highlightSquare(mapX, mapY, highlightClipStr, fullColour = true) {
                    var highlightClip = this.gridHighlightClip.getChildByName(highlightClipStr + "_" + mapX + "_" + mapY);
                    if (highlightClip != undefined) {
                        highlightClip.visible = true;
                    }
                    try {
                        highlightClip.children[0].play();
                    }
                    catch (e) { }
                    if (!fullColour) {
                        try {
                            highlightClip.filters = [this.unHighlightedUnitFilter];
                        }
                        catch (e) { }
                    }
                }
                clearMovementGrid() {
                    var i, j;
                    for (i = 0; i < this.movementGrid.length; i++) {
                        for (j = 0; j < this.movementGrid[i].length; j++) {
                            this.movementGrid[i][j] = -1;
                        }
                    }
                }
                calculateMovementGrid(unitInPlay, clearGrid = true, forDangerArea = false) {
                    var i, j;
                    if (clearGrid) {
                        this.clearMovementGrid();
                    }
                    this.movementGrid[unitInPlay.mapX][unitInPlay.mapY] = unitInPlay.unit.MP;
                    var moreSquares = true;
                    while (moreSquares) {
                        moreSquares = false;
                        for (i = 0; i < this.movementGrid.length; i++) {
                            for (j = 0; j < this.movementGrid[i].length; j++) {
                                if (this.movementGrid[i][j] > 0) {
                                    if (i > 0 && (unitInPlay.unit.flys || (this.mapGrid[i - 1][j].type != ussgames.MapSquare.NOACCESS && (this.getUnitInSquare(i - 1, j) == null || (this.getUnitInSquare(i - 1, j) != null && this.getUnitInSquare(i - 1, j).team == unitInPlay.team)))) && this.movementGrid[i - 1][j] == -1 && unitInPlay.unit.movementCosts[this.mapGrid[i - 1][j].type] != 0) {
                                        this.movementGrid[i - 1][j] = this.movementGrid[i][j] - unitInPlay.unit.movementCosts[this.mapGrid[i - 1][j].type];
                                        if (this.movementGrid[i - 1][j] > -1) {
                                            moreSquares = true;
                                        }
                                        else {
                                            this.movementGrid[i - 1][j] = -1;
                                        }
                                    }
                                    if (i < this.movementGrid.length - 1 && (unitInPlay.unit.flys || (this.mapGrid[i + 1][j].type != ussgames.MapSquare.NOACCESS && (this.getUnitInSquare(i + 1, j) == null || (this.getUnitInSquare(i + 1, j) != null && this.getUnitInSquare(i + 1, j).team == unitInPlay.team)))) && this.movementGrid[i + 1][j] == -1 && unitInPlay.unit.movementCosts[this.mapGrid[i + 1][j].type] != 0) {
                                        this.movementGrid[i + 1][j] = this.movementGrid[i][j] - unitInPlay.unit.movementCosts[this.mapGrid[i + 1][j].type];
                                        if (this.movementGrid[i + 1][j] > -1) {
                                            moreSquares = true;
                                        }
                                        else {
                                            this.movementGrid[i + 1][j] = -1;
                                        }
                                    }
                                    if (j > 0 && (unitInPlay.unit.flys || (this.mapGrid[i][j - 1].type != ussgames.MapSquare.NOACCESS && (this.getUnitInSquare(i, j - 1) == null || (this.getUnitInSquare(i, j - 1) != null && this.getUnitInSquare(i, j - 1).team == unitInPlay.team)))) && this.movementGrid[i][j - 1] == -1 && unitInPlay.unit.movementCosts[this.mapGrid[i][j - 1].type] != 0) {
                                        this.movementGrid[i][j - 1] = this.movementGrid[i][j] - unitInPlay.unit.movementCosts[this.mapGrid[i][j - 1].type];
                                        if (this.movementGrid[i][j - 1] > -1) {
                                            moreSquares = true;
                                        }
                                        else {
                                            this.movementGrid[i][j - 1] = -1;
                                        }
                                    }
                                    if (j < this.movementGrid[i].length - 1 && (unitInPlay.unit.flys || (this.mapGrid[i][j + 1].type != ussgames.MapSquare.NOACCESS && (this.getUnitInSquare(i, j + 1) == null || (this.getUnitInSquare(i, j + 1) != null && this.getUnitInSquare(i, j + 1).team == unitInPlay.team)))) && this.movementGrid[i][j + 1] == -1 && unitInPlay.unit.movementCosts[this.mapGrid[i][j + 1].type] != 0) {
                                        this.movementGrid[i][j + 1] = this.movementGrid[i][j] - unitInPlay.unit.movementCosts[this.mapGrid[i][j + 1].type];
                                        if (this.movementGrid[i][j + 1] > -1) {
                                            moreSquares = true;
                                        }
                                        else {
                                            this.movementGrid[i][j + 1] = -1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for (i = 0; i < this.movementGrid.length; i++) {
                        for (j = 0; j < this.movementGrid[i].length; j++) {
                            if (this.mapGrid[i][j].type == ussgames.MapSquare.NOACCESS || (!forDangerArea && this.getUnitInSquare(i, j) != null && this.getUnitInSquare(i, j) != unitInPlay)) {
                                this.movementGrid[i][j] = -1;
                            }
                        }
                    }
                }
                showMovementGrid(unitInPlay = null) {
                    var i, j;
                    for (i = 0; i < this.movementGrid.length; i++) {
                        for (j = 0; j < this.movementGrid[i].length; j++) {
                            if (this.movementGrid[i][j] >= 0) {
                                this.highlightSquare(i, j, "MovementHighlight");
                            }
                        }
                    }
                    this.objectsContainerClip.alpha = 0.4;
                }
                clearActionGrid() {
                    var i, j;
                    for (i = 0; i < this.actionGrid.length; i++) {
                        for (j = 0; j < this.actionGrid[i].length; j++) {
                            this.actionGrid[i][j] = -1;
                        }
                    }
                }
                calculateActionGrid(unitInPlay, clearGrid = true) {
                    var i, j, dirX, dirY;
                    var dashBlocked = false;
                    var targetUnit;
                    if (clearGrid) {
                        this.clearActionGrid();
                        this.actionGrid[unitInPlay.mapX][unitInPlay.mapY] = 0;
                    }
                    var moreSquares = true;
                    var thisPass = 0;
                    while (moreSquares) {
                        moreSquares = false;
                        for (i = 0; i < this.actionGrid.length; i++) {
                            for (j = 0; j < this.actionGrid[i].length; j++) {
                                if (this.actionGrid[i][j] == thisPass && this.actionGrid[i][j] < unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
                                    dashBlocked = false;
                                    if (unitInPlay.unit.unitActions[unitInPlay.selectedAction].dashAttack) {
                                        if (!unitInPlay.unit.flys && this.mapGrid[i][j].type == ussgames.MapSquare.NOACCESS) {
                                            this.actionGrid[i][j] = -1;
                                            dashBlocked = true;
                                        }
                                        targetUnit = this.getUnitInSquare(i, j);
                                        if (targetUnit && targetUnit != unitInPlay && targetUnit.team != unitInPlay.team) {
                                            if (this.getDamagePerc(unitInPlay, targetUnit) < 100) {
                                                dirX = 0;
                                                dirY = 0;
                                                if (targetUnit.mapX < unitInPlay.mapX) {
                                                    dirX = -1;
                                                }
                                                else if (targetUnit.mapX > unitInPlay.mapX) {
                                                    dirX = 1;
                                                }
                                                else if (targetUnit.mapY < unitInPlay.mapY) {
                                                    dirY = -1;
                                                }
                                                else if (targetUnit.mapY > unitInPlay.mapY) {
                                                    dirY = 1;
                                                }
                                                if (dirX != 0 && dirY == 0) {
                                                    if (i - dirX >= 0 && i - dirX < this.mapGrid.length && ((this.getUnitInSquare(i - dirX, j) != null && this.getUnitInSquare(i - dirX, j) != unitInPlay) || (this.mapGrid[i - dirX][j].type == ussgames.MapSquare.NOACCESS))) {
                                                        this.actionGrid[i][j] = -1;
                                                    }
                                                }
                                                else if (dirX == 0 && dirY != 0) {
                                                    if (j - dirY >= 0 && j - dirY < this.mapGrid[i].length && ((this.getUnitInSquare(i, j - dirY) != null && this.getUnitInSquare(i, j - dirY) != unitInPlay) || (this.mapGrid[i][j - dirY].type == ussgames.MapSquare.NOACCESS))) {
                                                        this.actionGrid[i][j] = -1;
                                                    }
                                                }
                                                dashBlocked = true;
                                            }
                                        }
                                    }
                                    if (!dashBlocked) {
                                        if (i > 0 && this.actionGrid[i - 1][j] == -1 && (!unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly || (unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly && j == unitInPlay.mapY))) {
                                            this.actionGrid[i - 1][j] = this.actionGrid[i][j] + 1;
                                            moreSquares = true;
                                        }
                                        if (i < this.actionGrid.length - 1 && this.actionGrid[i + 1][j] == -1 && (!unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly || (unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly && j == unitInPlay.mapY))) {
                                            this.actionGrid[i + 1][j] = this.actionGrid[i][j] + 1;
                                            moreSquares = true;
                                        }
                                        if (j > 0 && this.actionGrid[i][j - 1] == -1 && (!unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly || (unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly && i == unitInPlay.mapX))) {
                                            this.actionGrid[i][j - 1] = this.actionGrid[i][j] + 1;
                                            moreSquares = true;
                                        }
                                        if (j < this.actionGrid[i].length - 1 && this.actionGrid[i][j + 1] == -1 && (!unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly || (unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly && i == unitInPlay.mapX))) {
                                            this.actionGrid[i][j + 1] = this.actionGrid[i][j] + 1;
                                            moreSquares = true;
                                        }
                                    }
                                }
                            }
                        }
                        thisPass++;
                        if (thisPass < unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
                            moreSquares = true;
                        }
                    }
                    if (unitInPlay.unit.MP == 0) {
                        this.removeTooCloseAttackGrid(unitInPlay);
                    }
                }
                calculateActionGrid_straightOnly(unitInPlay, clearGrid = true) {
                    var i, j;
                    var dashBlocked = false;
                    if (clearGrid) {
                        this.clearActionGrid();
                        this.actionGrid[unitInPlay.mapX][unitInPlay.mapY] = 0;
                    }
                    var moreSquares = true;
                    var thisPass = 0;
                    var zeroActionSquareFound = false;
                    while (moreSquares) {
                        moreSquares = false;
                        for (i = 0; i < this.actionGrid.length; i++) {
                            zeroActionSquareFound = false;
                            for (j = 0; j < this.actionGrid[i].length; j++) {
                                if (this.actionGrid[i][j] == 0) {
                                    zeroActionSquareFound = true;
                                    break;
                                }
                            }
                            if (zeroActionSquareFound) {
                                for (j = 0; j < this.actionGrid[i].length; j++) {
                                    if (this.actionGrid[i][j] == thisPass && this.actionGrid[i][j] < unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
                                        dashBlocked = false;
                                        if (unitInPlay.unit.unitActions[unitInPlay.selectedAction].dashAttack) {
                                            if (!unitInPlay.unit.flys && this.mapGrid[i][j].type == ussgames.MapSquare.NOACCESS) {
                                                dashBlocked = true;
                                            }
                                        }
                                        if (!dashBlocked) {
                                            if (j > 0 && this.actionGrid[i][j - 1] == -1) {
                                                this.actionGrid[i][j - 1] = this.actionGrid[i][j] + 1;
                                                moreSquares = true;
                                            }
                                            if (j < this.actionGrid[i].length - 1 && this.actionGrid[i][j + 1] == -1) {
                                                this.actionGrid[i][j + 1] = this.actionGrid[i][j] + 1;
                                                moreSquares = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        for (j = 0; j < this.actionGrid[0].length; j++) {
                            zeroActionSquareFound = false;
                            for (i = 0; i < this.actionGrid.length; i++) {
                                if (this.actionGrid[i][j] == 0) {
                                    zeroActionSquareFound = true;
                                    break;
                                }
                            }
                            if (zeroActionSquareFound) {
                                for (i = 0; i < this.actionGrid.length; i++) {
                                    if (this.actionGrid[i][j] == thisPass && this.actionGrid[i][j] < unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
                                        dashBlocked = false;
                                        if (unitInPlay.unit.unitActions[unitInPlay.selectedAction].dashAttack) {
                                            if (!unitInPlay.unit.flys && this.mapGrid[i][j].type == ussgames.MapSquare.NOACCESS) {
                                                dashBlocked = true;
                                            }
                                        }
                                        if (!dashBlocked) {
                                            if (i > 0 && this.actionGrid[i - 1][j] == -1) {
                                                this.actionGrid[i - 1][j] = this.actionGrid[i][j] + 1;
                                                moreSquares = true;
                                            }
                                            if (i < this.actionGrid.length - 1 && this.actionGrid[i + 1][j] == -1) {
                                                this.actionGrid[i + 1][j] = this.actionGrid[i][j] + 1;
                                                moreSquares = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        thisPass++;
                        if (thisPass < unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
                            moreSquares = true;
                        }
                    }
                    if (unitInPlay.unit.MP == 0) {
                        this.removeTooCloseAttackGrid(unitInPlay);
                    }
                }
                removeTooCloseAttackGrid(unitInPlay) {
                    var i, j;
                    for (i = 0; i < this.actionGrid.length; i++) {
                        for (j = 0; j < this.actionGrid[i].length; j++) {
                            if (this.actionGrid[i][j] < unitInPlay.unit.unitActions[unitInPlay.selectedAction].minRange) {
                                this.actionGrid[i][j] = -1;
                            }
                        }
                    }
                }
                clearMultipleUnitAttackGrid() {
                    var i, j;
                    for (i = 0; i < this.multipleUnitAttackGrid.length; i++) {
                        for (j = 0; j < this.multipleUnitAttackGrid[i].length; j++) {
                            this.multipleUnitAttackGrid[i][j] = -1;
                        }
                    }
                }
                calculateMultipleUnitAttackGrid(unitInPlay, targetUnit, clearGrid = true) {
                    var i, j;
                    if (clearGrid) {
                        this.clearMultipleUnitAttackGrid();
                        this.multipleUnitAttackGrid[unitInPlay.mapX][unitInPlay.mapY] = 0;
                    }
                    if (unitInPlay.unit.unitActions[unitInPlay.selectedAction].straightLineOnly) {
                        var xDir = 0;
                        var yDir = 0;
                        if (targetUnit.mapX == unitInPlay.mapX) {
                            if (targetUnit.mapY < unitInPlay.mapY) {
                                yDir = -1;
                            }
                            else {
                                yDir = 1;
                            }
                        }
                        else {
                            if (targetUnit.mapX < unitInPlay.mapX) {
                                xDir = -1;
                            }
                            else {
                                xDir = 1;
                            }
                        }
                        i = unitInPlay.mapX + xDir;
                        j = unitInPlay.mapY + yDir;
                        while (i >= 0 && j >= 0 && i < this.multipleUnitAttackGrid.length && j < this.multipleUnitAttackGrid[i].length) {
                            this.multipleUnitAttackGrid[i][j] = this.multipleUnitAttackGrid[i - xDir][j - yDir] + 1;
                            i += xDir;
                            j += yDir;
                        }
                    }
                    else {
                        for (i = 0; i < this.multipleUnitAttackGrid.length; i++) {
                            for (j = 0; j < this.multipleUnitAttackGrid[i].length; j++) {
                                this.multipleUnitAttackGrid[i][j] = this.actionGrid[i][j];
                            }
                        }
                    }
                }
                calculateUnitDangerArea(unitInPlay, clearGrid = true) {
                    var i, j;
                    if (clearGrid) {
                        this.clearActionGrid();
                    }
                    for (i = 0; i < this.actionGrid.length; i++) {
                        for (j = 0; j < this.actionGrid[i].length; j++) {
                            if (this.movementGrid[i][j] != -1) {
                                this.actionGrid[i][j] = 0;
                            }
                        }
                    }
                    for (i = 0; i < unitInPlay.unit.unitActions.length; i++) {
                        if (unitInPlay.unit.unitActions[i].type == battleTactics.Action.ATTACK && unitInPlay.coolDownCount[i] >= unitInPlay.unit.unitActions[i].coolDown && unitInPlay.unit.unlockedActions[i]) {
                            unitInPlay.selectedAction = i;
                            if (unitInPlay.unit.unitActions[i].straightLineOnly) {
                                this.calculateActionGrid_straightOnly(unitInPlay, false);
                            }
                            else {
                                this.calculateActionGrid(unitInPlay, false);
                            }
                        }
                    }
                }
                calculateUnitDangerArea_action(unitInPlay, actionID, clearGrid = true) {
                    var i, j;
                    if (clearGrid) {
                        this.clearActionGrid();
                    }
                    for (i = 0; i < this.actionGrid.length; i++) {
                        for (j = 0; j < this.actionGrid[i].length; j++) {
                            if (this.movementGrid[i][j] != -1) {
                                this.actionGrid[i][j] = 0;
                            }
                        }
                    }
                    i = actionID;
                    if (unitInPlay.unit.unitActions[i].type == battleTactics.Action.ATTACK && unitInPlay.coolDownCount[i] >= unitInPlay.unit.unitActions[i].coolDown) {
                        unitInPlay.selectedAction = i;
                        if (unitInPlay.unit.unitActions[i].straightLineOnly) {
                            this.calculateActionGrid_straightOnly(unitInPlay, false);
                        }
                        else {
                            this.calculateActionGrid(unitInPlay, false);
                        }
                    }
                }
                showActionGrid(unitInPlay, forceShowingDangerArea = false, ignoreMinRange = true, friendlyFire = false, fullColour = true) {
                    var i, j;
                    for (i = 0; i < this.actionGrid.length; i++) {
                        for (j = 0; j < this.actionGrid[i].length; j++) {
                            if (this.mapGrid[i][j].type != ussgames.MapSquare.NOACCESS && this.actionGrid[i][j] != -1 && (this.actionGrid[i][j] >= unitInPlay.unit.unitActions[unitInPlay.selectedAction].minRange || (forceShowingDangerArea && ignoreMinRange)) && this.actionGrid[i][j] <= unitInPlay.unit.unitActions[unitInPlay.selectedAction].maxRange) {
                                if (forceShowingDangerArea || unitInPlay.unit.unitActions[unitInPlay.selectedAction].forceAttackDisplay || unitInPlay.unit.unitActions[unitInPlay.selectedAction].type == battleTactics.Action.ATTACK) {
                                    var unitInSquare = this.getUnitInSquare(i, j);
                                    this.highlightSquare(i, j, "AttackHighlight", fullColour);
                                    Controller.root.infoPanels.attackRangeKey.visible = true;
                                }
                                else {
                                    this.highlightSquare(i, j, "DefendHighlight", fullColour);
                                    Controller.root.infoPanels.attackRangeKey.visible = false;
                                }
                            }
                        }
                    }
                    this.objectsContainerClip.alpha = 0.4;
                }
                showActionUnits(selectedUnit, teamsTurn) {
                    battleTactics.BattleController.hideDamagePercClips();
                    for (var i = 0; i < this.unitsInPlay.length; i++) {
                        if (this.unitsInPlay[i] == selectedUnit) {
                            this.unitsInPlay[i].clip.filters = [];
                            this.unitsInPlay[i].validUnitForAction = true;
                            if (selectedUnit.unit.unitActions[selectedUnit.selectedAction].canAffectSelf) {
                                battleTactics.BattleController.displayDamagePerc(this.unitsInPlay[i]);
                            }
                        }
                        else {
                            if (this.unitsInPlay[i].team == selectedUnit.team) {
                                if (selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == battleTactics.Action.AREA || selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == battleTactics.Action.SELF || ((selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == battleTactics.Action.ATTACK && !selectedUnit.unit.unitActions[selectedUnit.selectedAction].friendlyFire) || this.actionGrid[this.unitsInPlay[i].mapX][this.unitsInPlay[i].mapY] < selectedUnit.unit.unitActions[selectedUnit.selectedAction].minRange || this.actionGrid[this.unitsInPlay[i].mapX][this.unitsInPlay[i].mapY] > selectedUnit.unit.unitActions[selectedUnit.selectedAction].maxRange)) {
                                    if (this.unitsInPlay[i].team == 1) {
                                        //this.unitsInPlay[i].clip.filters = [this.team1HighlightFilter];
                                        this.unitsInPlay[i].clip.filters = [];
                                    }
                                    else {
                                        this.unitsInPlay[i].clip.filters = [];
                                        //this.unitsInPlay[i].clip.filters = [this.team2HighlightFilter];
                                    }
                                    this.unitsInPlay[i].clip.alpha = 0.4;
                                    this.unitsInPlay[i].validUnitForAction = false;
                                }
                                else {
                                    this.unitsInPlay[i].clip.filters = [];
                                    battleTactics.BattleController.displayDamagePerc(this.unitsInPlay[i]);
                                    this.unitsInPlay[i].validUnitForAction = true;
                                }
                            }
                            else {
                                if (selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == battleTactics.Action.AREA || selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == battleTactics.Action.SELF || selectedUnit.unit.unitActions[selectedUnit.selectedAction].type == battleTactics.Action.DEFENCE || this.actionGrid[this.unitsInPlay[i].mapX][this.unitsInPlay[i].mapY] < selectedUnit.unit.unitActions[selectedUnit.selectedAction].minRange || this.actionGrid[this.unitsInPlay[i].mapX][this.unitsInPlay[i].mapY] > selectedUnit.unit.unitActions[selectedUnit.selectedAction].maxRange || this.unitsInPlay[i].attackable == false) {
                                    if (this.unitsInPlay[i].team == 1) {
                                        //this.unitsInPlay[i].clip.filters = [this.team1HighlightFilter];
                                        this.unitsInPlay[i].clip.filters = [];
                                    }
                                    else {
                                        //this.unitsInPlay[i].clip.filters = [this.team2HighlightFilter];
                                        this.unitsInPlay[i].clip.filters = [];
                                        this.unitsInPlay[i].clip.alpha = 0.4;
                                        this.unitsInPlay[i].validUnitForAction = false;
                                    }
                                }
                                else {
                                    this.unitsInPlay[i].clip.filters = [];
                                    battleTactics.BattleController.displayDamagePerc(this.unitsInPlay[i]);
                                    this.unitsInPlay[i].validUnitForAction = true;
                                }
                            }
                        }
                    }
                }
                getDamagePerc(attackingUnit, targetUnit) {
                    var damage = attackingUnit.unit.unitActions[attackingUnit.selectedAction].getStandardAttackPower(attackingUnit, targetUnit, this);
                    var damagePerc = Math.round((damage / targetUnit.currentHP) * 100);
                    return damagePerc;
                }
                removeDeadUnits() {
                    for (var i = this.unitsInPlay.length - 1; i >= 0; i--) {
                        if (this.unitsInPlay[i].currentHP <= 0) {
                            var viewArrEle = this.objectClipsInView.indexOf(this.unitsInPlay[i].clip);
                            this.objectClipsInView.splice(viewArrEle, 1);
                            this.unitsInPlay[i].removeFromPlay();
                            this.unitsInPlay.splice(i, 1);
                        }
                    }
                }
            }
            battleTactics.BTMap = BTMap;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BTMap = com.ussgames.battleTactics.BTMap;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class BattleAnimController {
                constructor() {
                }
                static initBattleAnim(attackingUnit_, defendingUnit_, longRange_ = false) {
                    this.attackingUnit = attackingUnit_;
                    this.defendingUnit = defendingUnit_;
                    if (this.battleAnimHolder != undefined) {
                        Controller.root.battleAnimContainer.removeChild(this.battleAnimHolder);
                    }
                    this.battleAnimHolder = Main.addGAFMovieClip("NewBattleAnimHolder");
                    this.battleAnimHolder.fader.gotoAndStop(1);
                    this.battleAnimHolder.counter.gotoAndStop(1);
                    this.battleAnimHolder.panel1.gotoAndStop(1);
                    this.battleAnimHolder.panel2.gotoAndStop(1);
                    this.longRange = false;
                    this.battleAnimHolder.x = 320;
                    this.battleAnimHolder.y = 240;
                    Controller.root.battleAnimContainer.addChild(this.battleAnimHolder);
                    this.battleStarted = false;
                    this.battleAnimHolder.panel1.gotoAndPlay(1);
                    this.battleAnimHolder.panel2.gotoAndPlay(1);
                    console.log("init battleAnimHolder", this.battleAnimHolder);
                    Main.addCustomEfFunc('BattleAnimController.battleAnimHolder.panel1.onEnterFrame', function () {
                        if (BattleAnimController.battleAnimHolder == undefined)
                            console.log("alarm battleAnimHolder undefined");
                        if (BattleAnimController.battleAnimHolder.panel1.currentFrame == 6) {
                            Main.removeCustomEfFunc("BattleAnimController.battleAnimHolder.panel1.onEnterFrame");
                            BattleAnimController.populateBattleHolder();
                        }
                    });
                }
                static scaleClips() {
                    this.attackingClip.scale.x = this.attackingClip.scale.y = this.defendingClip.scale.y = 3.5;
                    this.defendingClip.scale.x = -3.5;
                }
                static populateBattleHolder() {
                    if (this.battleAnimHolder.animHolder.children > 0) {
                        this.battleAnimHolder.animHolder.removeChildAt(0);
                    }
                    if (this.attackingUnit.unit.unitActions[this.attackingUnit.selectedAction].actionPhase == battleTactics.Action.PERFORM) {
                        console.log(">>1");
                        this.actionAnim = this.attackingUnit.unit.newAttackAnimClipClass;
                        this.newStyleActionLabel = "action" + String(this.attackingUnit.selectedAction);
                        for (var sa = 0; sa < this.actionAnim.children.length; sa++) {
                            var clcr = this.actionAnim.children[sa];
                            if (clcr.pluginName == undefined) {
                                if (clcr._totalFrames == 21)
                                    this.showDefender(clcr);
                                if (clcr._totalFrames == 4)
                                    this.showDamageNew(clcr);
                            }
                        }
                        this.actionAnim.gotoAndPlay(this.newStyleActionLabel);
                    }
                    else if (this.attackingUnit.unit.unitActions[this.attackingUnit.selectedAction].actionPhase == battleTactics.Action.RETALIATE) {
                        console.log(">>2");
                        this.actionAnim = this.defendingUnit.unit.newAttackAnimClipClass;
                        this.newStyleActionLabel = "action" + String(this.defendingUnit.unit.retaliationAction);
                        for (var sa = 0; sa < this.actionAnim.children.length; sa++) {
                            var clcr = this.actionAnim.children[sa];
                            if (clcr.pluginName == undefined) {
                                if (clcr._totalFrames == 21)
                                    this.showDefender(clcr);
                                if (clcr._totalFrames == 4)
                                    this.showDamageNew(clcr);
                            }
                        }
                        this.actionAnim.gotoAndPlay(this.newStyleActionLabel);
                    }
                    this.battleAnimHolder.animHolder.addChild(this.actionAnim);
                    this.battleStarted = true;
                }
                static gotoDefend() {
                    if (this.longRange) {
                        this.battleStarted = false;
                        this.battleAnimHolder.gotoAndPlay("defend");
                    }
                }
                static gotoDefend_multiple() {
                    if (this.longRange) {
                        this.battleStarted = false;
                        if (Main.getCurrentLabel(this.battleAnimHolder) == "defend") {
                            this.battleAnimHolder.gotoAndPlay("out3");
                        }
                        else {
                            this.battleAnimHolder.gotoAndPlay("out4");
                        }
                    }
                }
                static gotoRetaliate() {
                    this.battleAnimHolder.counter.gotoAndPlay(2);
                }
                static openPanels() {
                    console.log("OPEN PANELS f");
                    if (this.battleAnimHolder) {
                        this.battleAnimHolder.gotoAndPlay("out");
                        console.log("openPanels");
                        Main.addCustomEfFunc('BattleAnimController.battleAnimHolder.onEnterFrame', function () {
                            console.log("battleAnimHolder.currentFrame", BattleAnimController.battleAnimHolder.currentFrame, BattleAnimController.battleAnimHolder.totalFrames);
                            if (BattleAnimController.battleAnimHolder.currentFrame == 4 ||
                                BattleAnimController.battleAnimHolder.currentFrame == 1) {
                                console.log("removePanels");
                                Main.removeCustomEfFunc("BattleAnimController.battleAnimHolder.onEnterFrame");
                                BattleAnimController.removePanels();
                            }
                        });
                    }
                    return true;
                }
                static removePanels() {
                    console.log("removePanels f");
                    if (this.battleAnimHolder) {
                        Controller.root.battleAnimContainer.removeChild(this.battleAnimHolder);
                    }
                    this.battleAnimHolder = null;
                    this.attackingClip = null;
                    this.attackingUnit = null;
                    this.defendingClip = null;
                    this.defendingUnit = null;
                }
                static hideBattleGrid() {
                    Controller.root.infoPanels.visible = false;
                    Controller.root.gameContainer.visible = false;
                    Controller.root.bgs.visible = false;
                }
                static showBattleGrid() {
                    Controller.root.infoPanels.visible = true;
                    Controller.root.gameContainer.visible = true;
                    Controller.root.bgs.visible = true;
                }
                static showDamageNew(damageClip) {
                    this.attackingUnit.unit.unitActions[this.attackingUnit.selectedAction].showDamageNew(damageClip);
                }
                static showDefender(clip) {
                    this.attackingUnit.unit.unitActions[this.attackingUnit.selectedAction].showDefender(clip);
                }
                static hideFriendlyFireUnit(clip) {
                    if (this.attackingUnit.team == 1 && this.defendingUnit.team == 1) {
                        clip.visible = false;
                    }
                }
            }
            BattleAnimController.battleStarted = false;
            BattleAnimController.longRange = false;
            BattleAnimController.newStyleActionLabel = "";
            battleTactics.BattleAnimController = BattleAnimController;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class BattleController {
                constructor() {
                }
                static initBattle(map, ai1 = false, ai2 = true) {
                    BattleController.currentPhase = BattleController.SELECTUNITPHASE;
                    BattleController.teamPopShown = false;
                    BattleController.showingMovementsOrActions = false;
                    BattleController.aiCalculated = false;
                    BattleController.nextAIUnit = 0;
                    BattleController.phaseDelay = 0;
                    BattleController.currentMap = map;
                    BattleController.teamsTurn = 1;
                    BattleController.aiTeams[0] = ai1;
                    BattleController.aiTeams[1] = ai2;
                    BattleController.aiCalculated = false;
                    BattleController.mouseDown = false;
                    map.viewContainer.on(com.CustomMouseEvent.CLICK, BattleController.mouseClicked);
                    map.viewContainer.on(com.CustomMouseEvent.MOUSE_DOWN, BattleController.mouseDown_h);
                    map.viewContainer.on(com.CustomMouseEvent.MOUSE_UP, BattleController.mouseUp_h);
                    map.viewContainer.on(com.CustomMouseEvent.MOUSE_OUT, BattleController.mouseUp_h);
                    BattleController.hideAllInfoPanels();
                    BattleController.teamPopShown = false;
                    BattleController.resetSpecialActionFlags();
                    BattleController.runStartOfTeamsTurnFunctions();
                    BattleController.residualEffects = [];
                    BattleController.battleOver = false;
                    BattleController.battleOverCountDown = 60;
                    BattleController.yourTeamUnits = [];
                    for (var i = 0; i < map.unitsInPlay.length; i++) {
                        if (map.unitsInPlay[i].team == 1) {
                            BattleController.yourTeamUnits.push(map.unitsInPlay[i]);
                            map.unitsInPlay[i].update();
                        }
                    }
                    for (var j = 0; j < BattleController.persistentTeamUnits.length; j++) {
                        BattleController.persistentTeamUnits[j].prevXP = BattleController.persistentTeamUnits[j].XP;
                        BattleController.persistentTeamUnits[j].prevLevel = BattleController.persistentTeamUnits[j].level;
                    }
                    battleTactics.SpeechController.init();
                    for (var k = 0; k < BattleController.startSpeech.length; k++) {
                        if (BattleController.startSpeech[k] != "") {
                            var theUnit = BattleController.currentMap.getUnitForID(BattleController.startSpeechCharacter[k] - 1);
                            if (theUnit) {
                                battleTactics.SpeechController.addSpeech(BattleController.startSpeech[k], theUnit.clip);
                            }
                        }
                    }
                    BattleController.endSpeechClips = [];
                    for (var l = 0; l < BattleController.endSpeech.length; l++) {
                        if (BattleController.endSpeech[l] != "") {
                            theUnit = BattleController.currentMap.getUnitForID(BattleController.endSpeechCharacter[l] - 1);
                            if (theUnit) {
                                BattleController.endSpeechClips.push(theUnit);
                            }
                        }
                    }
                    BattleController.generalDelayCount = 0;
                    BattleController.tutorialDone = false;
                    Controller.root.infoPanels.actionSelectorPanel.showingActionInfo = false;
                    Controller.root.infoPanels.actionSelectorPanel.visible = false;
                    Controller.root.infoPanels.enemyInfoPanel.visible = false;
                    Controller.root.infoPanels.enemyInfoPanel.gotoAndStop(1);
                    Controller.root.tut.visible = true;
                    Controller.root.infoPanels.attackRangeKey.visible = false;
                    ScreenShaker.init(Controller.root.battleAnimContainer);
                    Controller.root.infoPanels.visible = true;
                    if (Controller.getLevelNumber() == 1) {
                        Main.inGamePanel.openPanel("tut1");
                    }
                }
                static initPersistentUnits(unitSavedDataArray = null) {
                    BattleController.persistentTeamUnits = [];
                    for (var i = 0; i < 5; i++) {
                        BattleController.persistentTeamUnits[i] = new battleTactics.Config.unitConfigs[i];
                        BattleController.persistentTeamUnits[i].init();
                        BattleController.persistentTeamUnits[i].initUnlockedActions();
                        BattleController.persistentTeamUnits[i].id = i;
                        if (unitSavedDataArray) {
                            BattleController.persistentTeamUnits[i].restoreFromSaveData(unitSavedDataArray[i]);
                        }
                    }
                }
                static getPersistendUnitData() {
                    var unitDataArray = [];
                    for (var i = 0; i < BattleController.persistentTeamUnits.length; i++) {
                        unitDataArray.push(BattleController.persistentTeamUnits[i].getSaveData());
                    }
                    return unitDataArray;
                }
                static resetSpecialActionFlags() {
                    JinxHex.hexedUnit = null;
                }
                static update() {
                    ScreenShaker.update();
                    if (!Controller.flags.infoPanels.actionSelectorPanel) {
                        Controller.flags.infoPanels.actionSelectorPanel = true;
                        Controller.root.infoPanels.actionSelectorPanel = new battleTactics.ActionSelectorPanel(Controller.root.infoPanels.actionSelectorPanel);
                    }
                    Controller.root.infoPanels.actionSelectorPanel.update();
                    if (!Controller.flags.infoPanels.enemyInfoPanel) {
                        Controller.flags.infoPanels.enemyInfoPanel = true;
                        Controller.root.infoPanels.enemyInfoPanel = new battleTactics.EnemyInfoPanel(Controller.root.infoPanels.enemyInfoPanel);
                    }
                    Controller.root.infoPanels.enemyInfoPanel.update();
                    if (GamePanel.panelOpen) {
                        return;
                    }
                    if (BattleController.generalDelayCount > 0) {
                        BattleController.generalDelayCount--;
                        return;
                    }
                    if (battleTactics.BattleAnimController.battleAnimHolder == null && battleTactics.SpeechController.running) {
                        battleTactics.SpeechController.update();
                        if (!battleTactics.SpeechController.running && !BattleController.tutorialDone) {
                            if (battleTactics.Config.tutorialIntroLevels[Controller.getLevelNumber() - 1]) {
                                Main.inGamePanel.openPanel("tut" + String(Controller.getLevelNumber()), "BattleController.startTutorial");
                            }
                            else if (battleTactics.Config.tutorialInteractiveLevels[Controller.getLevelNumber() - 1]) {
                                BattleController.startTutorial();
                            }
                            BattleController.tutorialDone = true;
                        }
                        return;
                    }
                    if (battleTactics.BattleAnimController.battleAnimHolder == null) {
                        for (var j = 0; j < BattleController.yourTeamUnits.length; j++) {
                            if (BattleController.yourTeamUnits[j].XPEarnedLastAttack > 0) {
                                BattleController.showXPRiser(BattleController.yourTeamUnits[j].XPEarnedLastAttack, BattleController.yourTeamUnits[j]);
                                BattleController.yourTeamUnits[j].XPEarnedLastAttack = 0;
                            }
                        }
                        if (BattleController.checkForWinner() == 1) {
                            if (BattleController.battleOver) {
                                BattleController.battleOverCountDown--;
                                if (BattleController.battleOverCountDown <= 0) {
                                    BattleController.awardSurvivalXP();
                                    BattleController.levelUpPersistentUnits();
                                    Controller.main.stopGame();
                                    Controller.main.levelComplete();
                                    return;
                                }
                            }
                            else {
                                BattleController.battleOver = true;
                            }
                        }
                        else if (BattleController.checkForWinner() == 2) {
                            if (BattleController.battleOver) {
                                BattleController.battleOverCountDown--;
                                if (BattleController.battleOverCountDown <= 0) {
                                    SoundController.stopMusic();
                                    SoundController.playSound("lose");
                                    Controller.main.stopGame();
                                    Controller.main.gameOver();
                                    return;
                                }
                            }
                            else {
                                BattleController.battleOver = true;
                            }
                        }
                        if (!BattleController.teamPopShown && !BattleController.battleOver) {
                            var teamPop = Main.addGAFMovieClip("TeamPop");
                            this.teamPopInc++;
                            Main.changeText(teamPop.children[0].teamName, Localizer.getlocalisedText(battleTactics.Config.TEAMNAMES[BattleController.teamsTurn - 1]));
                            teamPop.play();
                            teamPop.x = 320;
                            teamPop.y = 0;
                            Controller.root.gameContainer.addChild(teamPop);
                            BattleController.teamPopShown = true;
                            Main.addCustomEfFunc('teamPop.onEnterFrame' + this.teamPopInc, function (num, teamPop_) {
                                if (teamPop_.currentFrame == teamPop_.totalFrames) {
                                    Controller.root.gameContainer.removeChild(teamPop_);
                                    Main.removeCustomEfFunc("teamPop.onEnterFrame" + num);
                                }
                            }.bind(this, this.teamPopInc, teamPop));
                            if (BattleController.teamsTurn == 1) {
                                BattleController.currentMap.clearSquareHighlights();
                                BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
                            }
                        }
                    }
                    else if (battleTactics.BattleAnimController.battleAnimHolder.parent) {
                        if (battleTactics.BattleAnimController.battleAnimHolder.currentFrame == 20) {
                            Controller.root.infoPanels.actionSelectorPanel.x = battleTactics.ActionSelectorPanel.OFFX;
                            Controller.root.infoPanels.actionSelectorPanel._titanID = -1;
                            Controller.root.infoPanels.actionSelectorPanel._unitInPlay = null;
                            Controller.root.infoPanels.enemyInfoPanel.x = battleTactics.EnemyInfoPanel.OFFX;
                            if (Controller.getLevelNumber() == 2) {
                                Controller.root.tut.visible = false;
                            }
                        }
                        if (!battleTactics.SpeechController.running) {
                            BattleController.checkForWinner(false);
                        }
                    }
                    var i;
                    if (!BattleController.battleOver) {
                        if (BattleController.aiTeams[BattleController.teamsTurn - 1]) {
                            BattleController.currentMap.clearSquareHighlights();
                            if (!BattleController.aiCalculated) {
                                for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                                    if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn && BattleController.currentMap.unitsInPlay[i].ai && BattleController.currentMap.unitsInPlay[i].currentHP > 0 && !BattleController.currentMap.unitsInPlay[i].actioned) {
                                        BattleController.currentMap.unitsInPlay[i].aiController.initialDecision(BattleController.currentMap.unitsInPlay[i], BattleController.currentMap);
                                    }
                                }
                                for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                                    if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn && BattleController.currentMap.unitsInPlay[i].ai && BattleController.currentMap.unitsInPlay[i].currentHP > 0 && !BattleController.currentMap.unitsInPlay[i].actioned) {
                                        BattleController.currentMap.unitsInPlay[i].aiController.reconsider(BattleController.currentMap.unitsInPlay[i], BattleController.currentMap);
                                    }
                                }
                                var aiUnits = [];
                                for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                                    if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn && BattleController.currentMap.unitsInPlay[i].ai && BattleController.currentMap.unitsInPlay[i].currentHP > 0 && !BattleController.currentMap.unitsInPlay[i].actioned) {
                                        aiUnits.push(BattleController.currentMap.unitsInPlay[i]);
                                    }
                                }
                                battleTactics.AIController.chooseUnitOrder(aiUnits);
                                BattleController.nextAIUnit = 0;
                                BattleController.aiCalculated = true;
                                BattleController.phaseDelay = BattleController.AIPAUSEBETWEENPHASES;
                            }
                            else {
                                if (BattleController.phaseDelay > 0) {
                                    BattleController.phaseDelay--;
                                    return;
                                }
                                switch (BattleController.currentPhase) {
                                    case BattleController.SELECTUNITPHASE:
                                        BattleController.currentMap.clearSquareHighlights();
                                        BattleController.selectedUnit = battleTactics.AIController.unitActionOrder[BattleController.nextAIUnit];
                                        BattleController.currentPhase = BattleController.MOVEMENTPHASE;
                                        break;
                                    case BattleController.MOVEMENTPHASE:
                                        BattleController.selectedUnit.aiController.setAction(BattleController.selectedUnit, BattleController.currentMap);
                                        BattleController.selectedUnit.moveTo(battleTactics.AIController.unitActionOrder[BattleController.nextAIUnit].aiController.mapTargetX, battleTactics.AIController.unitActionOrder[BattleController.nextAIUnit].aiController.mapTargetY, BattleController.currentMap);
                                        BattleController.selectedUnit.aiController.checkForRandomAttack(BattleController.selectedUnit, BattleController.currentMap);
                                        BattleController.currentPhase = BattleController.MOVINGINTOPOSITION;
                                        break;
                                    case BattleController.MOVINGINTOPOSITION:
                                        if (BattleController.selectedUnit) {
                                            if (BattleController.selectedUnit.moveIntoPosition(BattleController.currentMap)) {
                                                BattleController.currentPhase = BattleController.SELECTACTIONPHASE;
                                                BattleController.phaseDelay = BattleController.AIPAUSEBETWEENPHASES;
                                            }
                                        }
                                        break;
                                    case BattleController.SELECTACTIONPHASE:
                                        BattleController.selectedUnit.selectAction(BattleController.selectedUnit.aiController.potentialActions[0].actionID);
                                        BattleController.currentPhase = BattleController.ACTIONPHASE;
                                        break;
                                    case BattleController.ACTIONPHASE:
                                        if (BattleController.selectedUnit.aiController.potentialActions[0].actionType == battleTactics.AIController.ATTACK) {
                                            console.log("performAction 1");
                                            //player action
                                            if (BattleController.selectedUnit.performAction(BattleController.currentMap, BattleController.selectedUnit.aiController.potentialActions[0].otherUnit.mapX, BattleController.selectedUnit.aiController.potentialActions[0].otherUnit.mapY)) {
                                                BattleController.currentPhase = BattleController.PERFORMINGACTIONPHASE;
                                                BattleController.phaseDelay = BattleController.AIPAUSEBETWEENPHASES;
                                            }
                                            else {
                                                BattleController.endTurn();
                                            }
                                        }
                                        else {
                                            BattleController.endTurn();
                                        }
                                        break;
                                    case BattleController.PERFORMINGACTIONPHASE:
                                        if (BattleController.selectedUnit.updateAction(BattleController.currentMap)) {
                                            BattleController.endTurn();
                                            BattleController.currentMap.removeDeadUnits();
                                            BattleController.currentMap.clearSquareHighlights();
                                        }
                                        break;
                                }
                            }
                        }
                        else {
                            BattleController.aiCalculated = false;
                            switch (BattleController.currentPhase) {
                                case BattleController.SELECTUNITPHASE:
                                case BattleController.MOVEMENTPHASE:
                                case BattleController.SELECTACTIONPHASE:
                                case BattleController.ACTIONPHASE:
                                    if (BattleController.currentPhase == BattleController.ACTIONPHASE || !Controller.root.infoPanels.actionSelectorPanel.showingActionInfo) {
                                        BattleController.hilightUnitUnderMouse();
                                    }
                                    break;
                                case BattleController.PERFORMINGACTIONPHASE:
                                    if (BattleController.selectedUnit.updateAction(BattleController.currentMap)) {
                                        BattleController.endTurn();
                                        BattleController.currentMap.removeDeadUnits();
                                        BattleController.currentMap.clearSquareHighlights();
                                        BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
                                    }
                                    break;
                                case BattleController.MOVINGINTOPOSITION:
                                    if (BattleController.selectedUnit) {
                                        if (BattleController.selectedUnit.moveIntoPosition(BattleController.currentMap)) {
                                            BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                                            BattleController.currentPhase = BattleController.SELECTACTIONPHASE;
                                        }
                                    }
                                    break;
                            }
                        }
                        BattleController.showMouseIcon();
                    }
                    BattleController.currentMap.depthSortView();
                    for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                        BattleController.currentMap.unitsInPlay[i].update();
                    }
                    for (i = BattleController.residualEffects.length - 1; i >= 0; i--) {
                        if (!BattleController.residualEffects[i].effectLive) {
                            BattleController.residualEffects.splice(i, 1);
                        }
                        else {
                            BattleController.residualEffects[i].update(BattleController.currentMap);
                        }
                    }
                    if (!BattleController.battleOver && BattleController.selectedUnit && BattleController.currentPhase != BattleController.SELECTACTIONPHASE) {
                        BattleController.displayTargetInfo();
                        if (BattleController.currentPhase == BattleController.ACTIONPHASE) {
                            var percDisplayed = false;
                            var mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
                            if (mapSquare && BattleController.currentMap.actionGrid[mapSquare.mapX][mapSquare.mapY] >= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].minRange && BattleController.currentMap.actionGrid[mapSquare.mapX][mapSquare.mapY] <= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].maxRange) {
                                var unitInSquare = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
                                if (unitInSquare && unitInSquare.team != BattleController.selectedUnit.team) {
                                    Controller.root.infoPanels.enemyInfoPanel.showUnitInfo(unitInSquare);
                                    percDisplayed = true;
                                }
                            }
                            if (!percDisplayed) {
                                Controller.root.infoPanels.enemyInfoPanel.closePanel();
                            }
                        }
                    }
                    if (!BattleController.battleOver && !BattleController.selectedUnit) {
                        BattleController.endTurn();
                    }
                }
                static cleanUp() {
                    //console.log("cleanUp BattleController.currentMap", BattleController.currentMap, Controller.root.gameContainer);
                    if (BattleController.currentMap != undefined) {
                        if (BattleController.currentMap.viewContainer != undefined) {
                            BattleController.currentMap.viewContainer.off(com.CustomMouseEvent.CLICK, BattleController.mouseClicked);
                            BattleController.currentMap.viewContainer.off(com.CustomMouseEvent.MOUSE_DOWN, BattleController.mouseDown_h);
                            BattleController.currentMap.viewContainer.off(com.CustomMouseEvent.MOUSE_UP, BattleController.mouseUp_h);
                            BattleController.currentMap.viewContainer.off(com.CustomMouseEvent.MOUSE_OUT, BattleController.mouseUp_h);
                        }
                        BattleController.currentMap.cleanUp();
                    }
                    BattleController.currentMap = null;
                    BattleController.selectedUnit = null;
                    BattleController.hoverUnit = null;
                }
                static undo(fromButton = false) {
                    if (BattleController.currentPhase == BattleController.MOVINGINTOPOSITION || BattleController.currentPhase == BattleController.PERFORMINGACTIONPHASE) {
                        return;
                    }
                    BattleController.hideDamagePercClips();
                    if (BattleController.currentPhase == BattleController.MOVINGINTOPOSITION || BattleController.currentPhase == BattleController.SELECTACTIONPHASE || BattleController.currentPhase == BattleController.ACTIONPHASE) {
                        BattleController.selectedUnit.undoMove(BattleController.currentMap);
                        BattleController.currentPhase = BattleController.MOVEMENTPHASE;
                        if (fromButton) {
                            SoundController.playSound("select");
                        }
                    }
                    else if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
                        BattleController.currentPhase = BattleController.SELECTUNITPHASE;
                        if (fromButton) {
                            SoundController.playSound("select");
                        }
                    }
                    BattleController.currentMap.clearUnitHighlights();
                    BattleController.currentMap.clearSquareHighlights();
                    if (BattleController.selectedUnit) {
                        BattleController.selectedUnit.selectedAction = 0;
                    }
                    if (BattleController.currentPhase == BattleController.SELECTUNITPHASE) {
                        BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
                        BattleController.showingMovementsOrActions = false;
                        BattleController.hoverUnit = null;
                        BattleController.selectedUnit = null;
                        BattleController.hideAllInfoPanels();
                    }
                    else if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
                        BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                        BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
                        BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
                    }
                    Controller.root.infoPanels.actionSelectorPanel.hilightAction(0);
                    BattleController.switchToPrevSelectedUnit();
                }
                static endTurn(fromButton = false) {
                    if (BattleController.currentPhase == BattleController.MOVINGINTOPOSITION) {
                        return;
                    }
                    var i;
                    var turnEnded = false;
                    if (BattleController.selectedUnit) {
                        BattleController.selectedUnit.updateCoolDowns();
                        BattleController.selectedUnit.endTurn();
                        turnEnded = true;
                    }
                    var movesRemaining = false;
                    for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                        if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn && !BattleController.currentMap.unitsInPlay[i].actioned) {
                            movesRemaining = true;
                        }
                    }
                    if (!movesRemaining) {
                        for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                            BattleController.currentMap.unitsInPlay[i].actioned = false;
                        }
                        for (i = 0; i < BattleController.residualEffects.length; i++) {
                            BattleController.residualEffects[i].endTeamTurn(BattleController.teamsTurn, BattleController.currentMap);
                        }
                        BattleController.teamsTurn++;
                        if (BattleController.teamsTurn > 2) {
                            BattleController.teamsTurn = 1;
                        }
                        BattleController.generalDelayCount = Math.floor(15 * 2.4);
                        if (Controller.getLevelNumber() == 1) {
                            BattleController.nextTutorialFrame();
                        }
                        else if (BattleController.showingTutorial && Controller.getLevelNumber() == 2) {
                            if (Controller.root.tut.currentFrame != 18) {
                                BattleController.nextTutorialFrame(18);
                                Controller.root.tut.visible = true;
                            }
                            else {
                                BattleController.nextTutorialFrame();
                            }
                        }
                        BattleController.aiCalculated = false;
                        BattleController.teamPopShown = false;
                        BattleController.runStartOfTeamsTurnFunctions();
                        BattleController.runEndOfTeamsTurnFunctions();
                        for (i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                            if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn) {
                                if (JinxHex.hexedUnit && JinxHex.hexedUnit == BattleController.currentMap.unitsInPlay[i]) {
                                    BattleController.currentMap.unitsInPlay[i].actioned = true;
                                    JinxHex.hexedUnit = null;
                                    break;
                                }
                            }
                        }
                        turnEnded = true;
                    }
                    if (turnEnded) {
                        BattleController.currentMap.clearUnitHighlights();
                        BattleController.currentMap.clearSquareHighlights();
                        BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
                        BattleController.showingMovementsOrActions = false;
                        BattleController.hoverUnit = null;
                        BattleController.selectedUnit = null;
                        BattleController.lastHighlightMouseDown = false;
                        BattleController.currentPhase = BattleController.SELECTUNITPHASE;
                        BattleController.aiCalculated = false;
                        BattleController.nextAIUnit = 0;
                        BattleController.hideAllInfoPanels();
                        if (fromButton) {
                            SoundController.playSound("select");
                        }
                        BattleController.switchToPrevSelectedUnit();
                    }
                }
                static switchToPrevSelectedUnit() {
                    if (BattleController.selectedUnit_switch) {
                        BattleController.selectedUnit = BattleController.selectedUnit_switch;
                        BattleController.selectedUnit.selectedAction = 0;
                        BattleController.currentPhase = BattleController.MOVEMENTPHASE;
                        BattleController.currentMap.clearSquareHighlights();
                        BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                        BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
                        BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
                        BattleController.selectedUnit_switch = null;
                    }
                }
                static runStartOfTeamsTurnFunctions() {
                    for (var i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                        if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn) {
                            BattleController.currentMap.unitsInPlay[i].unit.startOfTeamsTurnFunction(BattleController.currentMap.unitsInPlay[i], BattleController.currentMap);
                        }
                    }
                }
                static runEndOfTeamsTurnFunctions() {
                    for (var i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                        if (BattleController.currentMap.unitsInPlay[i].team != BattleController.teamsTurn) {
                            BattleController.currentMap.unitsInPlay[i].unit.endOfTeamsTurnFunction(BattleController.currentMap.unitsInPlay[i], BattleController.currentMap);
                        }
                    }
                }
                static checkForWinner(triggerEnd = true) {
                    var team1Count = 0;
                    var team2Count = 0;
                    for (var i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                        if (BattleController.currentMap.unitsInPlay[i].team == 1 && BattleController.currentMap.unitsInPlay[i].currentHP > 0) {
                            team1Count++;
                        }
                        else if (BattleController.currentMap.unitsInPlay[i].team == 2 && BattleController.currentMap.unitsInPlay[i].currentHP > 0) {
                            team2Count++;
                        }
                    }
                    if (team1Count == 0 && team2Count > 0) {
                        return 2;
                    }
                    else if (team1Count > 0 && team2Count == 0) {
                        if (!BattleController.battleOver) {
                            BattleController.doEndSpeech(triggerEnd);
                        }
                        return 1;
                    }
                    //return 1; //debug fix
                    return 0;
                }
                static doEndSpeech(triggerEnd = true) {
                    if (triggerEnd) {
                        SoundController.stopMusic();
                        SoundController.playSound("win");
                        battleTactics.SpeechController.init();
                    }
                    for (var k = 0; k < BattleController.endSpeech.length; k++) {
                        if (BattleController.endSpeech[k] != "") {
                            if (!BattleController.endSpeechClips[k].clip.parent) {
                                BattleController.currentMap.unitsContainerClip.addChild(BattleController.endSpeechClips[k].clip);
                                BattleController.currentMap.objectClipsInView.push(BattleController.endSpeechClips[k].clip);
                                var mX = BattleController.endSpeechClips[k].startX;
                                var mY = BattleController.endSpeechClips[k].startY;
                                var unitInSquare = BattleController.currentMap.getUnitInSquare(mX, mY);
                                while (unitInSquare) {
                                    mX = Math.floor(Math.random() * BattleController.currentMap.mapGrid.length);
                                    mY = Math.floor(Math.random() * BattleController.currentMap.mapGrid[0].length);
                                    var unitInSquare = BattleController.currentMap.getUnitInSquare(mX, mY);
                                }
                                BattleController.endSpeechClips[k].externalForcesActing = false;
                                BattleController.endSpeechClips[k].mapX = mX;
                                BattleController.endSpeechClips[k].mapY = mY;
                                BattleController.endSpeechClips[k].updateClipPosition(BattleController.currentMap);
                                BattleController.endSpeechClips[k].clip.gotoAndStop("breath");
                                BattleController.endSpeechClips[k].clip.filters = [];
                                BattleController.endSpeechClips[k].clip.hp.visible = false;
                                BattleController.endSpeechClips[k].clip_hp.visible = false;
                                BattleController.currentMap.depthSortView();
                            }
                            if (triggerEnd) {
                                battleTactics.SpeechController.addSpeech(BattleController.endSpeech[k], BattleController.endSpeechClips[k].clip);
                                Controller.root.infoPanels.visible = false;
                                Controller.root.infoPanels.enemyInfoPanel.gotoAndStop(1);
                                if (Controller.root.batman.currentFrame == 1 && Controller.getLevelNumber() == 12) {
                                    Controller.root.batman.gotoAndPlay(2);
                                }
                            }
                        }
                    }
                    for (var i = 0; i < BattleController.yourTeamUnits.length; i++) {
                        if (!BattleController.yourTeamUnits[i].clip.parent) {
                            BattleController.currentMap.unitsContainerClip.addChild(BattleController.yourTeamUnits[i].clip);
                            BattleController.currentMap.objectClipsInView.push(BattleController.yourTeamUnits[i].clip);
                            var mX = BattleController.yourTeamUnits[i].startX;
                            var mY = BattleController.yourTeamUnits[i].startY;
                            var unitInSquare = BattleController.currentMap.getUnitInSquare(mX, mY);
                            while (unitInSquare || BattleController.currentMap.mapGrid[mX][mY].type == ussgames.MapSquare.NOACCESS) {
                                mX = Math.floor(Math.random() * BattleController.currentMap.mapGrid.length);
                                mY = Math.floor(Math.random() * BattleController.currentMap.mapGrid[0].length);
                                var unitInSquare = BattleController.currentMap.getUnitInSquare(mX, mY);
                            }
                            BattleController.yourTeamUnits[i].externalForcesActing = false;
                            BattleController.yourTeamUnits[i].mapX = mX;
                            BattleController.yourTeamUnits[i].mapY = mY;
                            BattleController.yourTeamUnits[i].updateClipPosition(BattleController.currentMap);
                            BattleController.yourTeamUnits[i].clip.gotoAndStop("breath");
                            BattleController.yourTeamUnits[i].clip.hp.visible = false;
                            BattleController.yourTeamUnits[i].clip_hp.visible = false;
                            BattleController.currentMap.depthSortView();
                        }
                        BattleController.yourTeamUnits[i].clip.filters = [];
                    }
                    BattleController.currentMap.clearSquareHighlights();
                    BattleController.currentMap.clearUnitHighlights(true);
                    Controller.root.infoPanels.actionSelectorPanel.x = battleTactics.ActionSelectorPanel.OFFX;
                    Controller.root.infoPanels.actionSelectorPanel.visible = false;
                    Controller.root.infoPanels.actionSelectorPanel._titanID = -1;
                    Controller.root.infoPanels.actionSelectorPanel._unitInPlay = null;
                    Controller.root.infoPanels.enemyInfoPanel.x = battleTactics.EnemyInfoPanel.OFFX;
                    Controller.root.infoPanels.enemyInfoPanel.visible = false;
                    Controller.root.infoPanels.enemyInfoPanel.gotoAndStop(1);
                    if (Controller.getLevelNumber() == 2) {
                        Controller.root.tut.visible = false;
                    }
                }
                static awardSurvivalXP() {
                    for (var i = 0; i < BattleController.yourTeamUnits.length; i++) {
                        if (BattleController.yourTeamUnits[i].currentHP > 0) {
                            BattleController.yourTeamUnits[i].awardXP(battleTactics.Config.SURVIVEXP, battleTactics.UnitInPlay.SURVIVE);
                        }
                    }
                }
                static levelUpPersistentUnits() {
                    for (var i = 0; i < BattleController.yourTeamUnits.length; i++) {
                        BattleController.yourTeamUnits[i].unit.increaseXP(BattleController.yourTeamUnits[i].XPEarned);
                    }
                }
                static selectAction(actionID) {
                    if (BattleController.currentPhase != BattleController.MOVINGINTOPOSITION) {
                        if (BattleController.selectedUnit.selectAction(actionID)) {
                            if (BattleController.selectedUnit.unit.unitActions[actionID].type != battleTactics.Action.SELF) {
                                if (BattleController.selectedUnit.unit.unitActions[actionID].attackMultipleUnits && !BattleController.selectedUnit.unit.unitActions[actionID].straightLineOnly) {
                                    var unitToAttack;
                                    for (var i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                                        if (BattleController.currentMap.unitsInPlay[i].team != BattleController.selectedUnit.team && BattleController.currentMap.actionGrid[BattleController.currentMap.unitsInPlay[i].mapX][BattleController.currentMap.unitsInPlay[i].mapY] >= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].minRange && BattleController.currentMap.actionGrid[BattleController.currentMap.unitsInPlay[i].mapX][BattleController.currentMap.unitsInPlay[i].mapY] <= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].maxRange) {
                                            unitToAttack = BattleController.currentMap.unitsInPlay[i];
                                            break;
                                        }
                                    }
                                    console.log("performAction 2");
                                    if (unitToAttack && BattleController.selectedUnit.performAction(BattleController.currentMap, unitToAttack.mapX, unitToAttack.mapY)) {
                                        BattleController.currentMap.clearSquareHighlights();
                                        BattleController.currentMap.clearUnitHighlights();
                                        BattleController.currentPhase = BattleController.PERFORMINGACTIONPHASE;
                                        BattleController.hideDamagePercClips();
                                        SoundController.playSound("select");
                                    }
                                }
                                else {
                                    BattleController.showActionGrid();
                                    BattleController.currentPhase = BattleController.ACTIONPHASE;
                                    Controller.root.infoPanels.actionSelectorPanel.hilightAction(actionID);
                                    SoundController.playSound("select");
                                }
                            }
                            else {
                                BattleController.endTurn();
                                SoundController.playSound("select");
                            }
                        }
                    }
                    if (BattleController.showingTutorial) {
                        BattleController.nextTutorialFrame();
                    }
                }
                static showActionGrid() {
                    BattleController.hideDamagePercClips();
                    BattleController.currentMap.clearUnitHighlights();
                    BattleController.currentMap.clearSquareHighlights();
                    BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                    BattleController.currentMap.calculateActionGrid(BattleController.selectedUnit);
                    BattleController.currentMap.showActionGrid(BattleController.selectedUnit);
                    BattleController.currentMap.showActionUnits(BattleController.selectedUnit, BattleController.teamsTurn);
                    BattleController.showingMovementsOrActions = true;
                }
                static hilightUnitUnderMouse() {
                    var mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
                    if (mapSquare) {
                        var unitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
                        if (BattleController.mouseDown && unitInPlay && unitInPlay.team == 1) {
                            BattleController.mouseDown = false;
                        }
                        if (BattleController.currentPhase == BattleController.ACTIONPHASE) {
                        }
                        else if (unitInPlay && (BattleController.currentPhase != BattleController.SELECTACTIONPHASE || unitInPlay != BattleController.selectedUnit)) {
                            if (unitInPlay != BattleController.hoverUnit || BattleController.mouseDown != BattleController.lastHighlightMouseDown || BattleController.hoverUnit == null) {
                                BattleController.currentMap.clearUnitHighlights();
                                BattleController.currentMap.clearSquareHighlights();
                                if (!BattleController.mouseDown || unitInPlay.team == 1) {
                                    BattleController.currentMap.calculateMovementGrid(unitInPlay, true, true);
                                }
                                else {
                                    BattleController.currentMap.clearMovementGrid();
                                    BattleController.currentMap.movementGrid[unitInPlay.mapX][unitInPlay.mapY] = 0;
                                }
                                if (unitInPlay.team == 1) {
                                    BattleController.currentMap.showMovementGrid();
                                }
                                BattleController.currentMap.calculateUnitDangerArea(unitInPlay);
                                BattleController.currentMap.showActionGrid(unitInPlay, true, !BattleController.mouseDown);
                                BattleController.currentMap.hilightUnit(unitInPlay);
                                BattleController.showingMovementsOrActions = true;
                                BattleController.hoverUnit = unitInPlay;
                                if (unitInPlay.ai == false) {
                                    Controller.root.infoPanels.actionSelectorPanel.init(unitInPlay);
                                }
                                BattleController.lastHighlightMouseDown = BattleController.mouseDown;
                            }
                        }
                        else {
                            if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
                                if (BattleController.hoverUnit) {
                                    BattleController.currentMap.clearSquareHighlights();
                                    BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
                                    BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                                    BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
                                    BattleController.hoverUnit = null;
                                    BattleController.lastHighlightMouseDown = false;
                                }
                            }
                            else if (BattleController.showingMovementsOrActions) {
                                BattleController.currentMap.clearSquareHighlights();
                                BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
                                if (BattleController.currentPhase == BattleController.SELECTACTIONPHASE) {
                                    BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                                }
                                if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
                                    BattleController.showingMovementsOrActions = true;
                                }
                                else {
                                    BattleController.showingMovementsOrActions = false;
                                }
                            }
                            BattleController.hoverUnit = null;
                            BattleController.lastHighlightMouseDown = false;
                        }
                    }
                    else {
                        if (!BattleController.hoverUnit) {
                            return;
                        }
                        if (BattleController.currentPhase == BattleController.ACTIONPHASE) {
                            BattleController.currentMap.clearUnitHighlights();
                            BattleController.currentMap.showActionUnits(BattleController.selectedUnit, BattleController.teamsTurn);
                        }
                        else if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
                            if (!Controller.root.infoPanels.actionSelectorPanel.showingActionInfo) {
                                BattleController.currentMap.clearSquareHighlights();
                                BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
                                BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                                BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
                                BattleController.showingMovementsOrActions = true;
                            }
                            BattleController.hoverUnit = null;
                            BattleController.lastHighlightMouseDown = false;
                        }
                        else {
                            BattleController.currentMap.clearSquareHighlights();
                            BattleController.currentMap.hilightUnitSquares(BattleController.teamsTurn);
                            if (BattleController.currentPhase == BattleController.SELECTACTIONPHASE) {
                                BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                            }
                            BattleController.showingMovementsOrActions = false;
                            BattleController.hoverUnit = null;
                            BattleController.lastHighlightMouseDown = false;
                        }
                    }
                    if (!BattleController.hoverUnit && BattleController.selectedUnit) {
                        if (BattleController.selectedUnit.ai == false) {
                            Controller.root.infoPanels.actionSelectorPanel.init(BattleController.selectedUnit);
                        }
                    }
                    if (BattleController.hoverUnit && BattleController.hoverUnit.team == 2) {
                        Controller.root.infoPanels.enemyInfoPanel.showUnitInfo(BattleController.hoverUnit);
                    }
                    else {
                        Controller.root.infoPanels.enemyInfoPanel.closePanel();
                    }
                }
                static displayTargetInfo() {
                    var mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
                    if (mapSquare) {
                        var unitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
                    }
                }
                static getDefenceBonus(mapX, mapY) {
                    var mapSquare = BattleController.currentMap.mapGrid[mapX][mapY];
                    var defBonus = 0;
                    if (mapSquare) {
                        if (mapSquare.type == ussgames.MapSquare.COVER || mapSquare.type == ussgames.MapSquare.HIGHGROUND) {
                            defBonus = battleTactics.Config.COVERDEFENCEBONUS * 100;
                        }
                    }
                    return defBonus;
                }
                static getAttackBonus(mapX, mapY) {
                    var mapSquare = BattleController.currentMap.mapGrid[mapX][mapY];
                    var attBonus = 0;
                    if (mapSquare) {
                        if (mapSquare.type == ussgames.MapSquare.HIGHGROUND) {
                            attBonus = battleTactics.Config.HIGHGROUNDATTACKBONUS * 100;
                        }
                    }
                    return attBonus;
                }
                static showActionGrid_forID(actionID) {
                    if (BattleController.selectedUnit && BattleController.currentPhase != BattleController.MOVINGINTOPOSITION) {
                        BattleController.hideDamagePercClips();
                        var oldAction = BattleController.selectedUnit.selectedAction;
                        if (actionID > 0 && BattleController.selectedUnit.unit.unlockedActions[actionID]) {
                            BattleController.selectedUnit.selectedAction = actionID;
                            BattleController.currentMap.clearSquareHighlights();
                            BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                            BattleController.currentMap.calculateActionGrid(BattleController.selectedUnit);
                            var fullColour = false;
                            if (BattleController.selectedUnit.unit.unitActions[actionID].coolDown <= BattleController.selectedUnit.coolDownCount[actionID]) {
                                fullColour = true;
                            }
                            BattleController.currentMap.showActionGrid(BattleController.selectedUnit, false, false, BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].friendlyFire, fullColour);
                            BattleController.currentMap.showActionUnits(BattleController.selectedUnit, BattleController.teamsTurn);
                            BattleController.selectedUnit.selectedAction = oldAction;
                        }
                        else {
                            BattleController.currentMap.clearActionGrid();
                            BattleController.currentMap.clearUnitHighlights();
                            BattleController.currentMap.clearSquareHighlights();
                            if (BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
                                BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
                                BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                                BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
                                BattleController.hoverUnit = null;
                            }
                            else if (BattleController.currentPhase == BattleController.ACTIONPHASE || BattleController.currentPhase == BattleController.SELECTACTIONPHASE) {
                                BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                                if (BattleController.currentPhase == BattleController.ACTIONPHASE && BattleController.selectedUnit.selectedAction > 0) {
                                    BattleController.currentMap.calculateActionGrid(BattleController.selectedUnit);
                                    BattleController.currentMap.showActionGrid(BattleController.selectedUnit, false, false, BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].friendlyFire);
                                    BattleController.currentMap.showActionUnits(BattleController.selectedUnit, BattleController.teamsTurn);
                                }
                            }
                        }
                    }
                }
                static displayDamagePerc(unitInPlay) {
                    if (BattleController.damagePercClips == null) {
                        BattleController.damagePercClips = [];
                    }
                    var aDamagePercClip = Main.addGAFMovieClip("DamagePercDisplay");
                    if (BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].useStandardDamagePerc) {
                        var damage = BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].getStandardAttackPower(BattleController.selectedUnit, unitInPlay, BattleController.currentMap);
                        var damagePerc = Math.round((damage / unitInPlay.currentHP) * 100);
                        Main.changeText(aDamagePercClip.damagePerc, [String(damagePerc) + "%"]);
                    }
                    else {
                        aDamagePercClip.damagePerc.text = BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].alternateDamageDisplay(BattleController.selectedUnit, unitInPlay, BattleController.currentMap);
                    }
                    aDamagePercClip.x = unitInPlay.clip.x;
                    aDamagePercClip.y = unitInPlay.clip.y - 32;
                    BattleController.currentMap.mapView.addChild(aDamagePercClip);
                    BattleController.damagePercClips.push(aDamagePercClip);
                }
                static hideDamagePercClips() {
                    for (var i = 0; i < BattleController.damagePercClips.length; i++) {
                        if (BattleController.damagePercClips[i] && BattleController.damagePercClips[i].parent) {
                            BattleController.damagePercClips[i].parent.removeChild(BattleController.damagePercClips[i]);
                        }
                    }
                    BattleController.damagePercClips = [];
                }
                static showMouseIcon() {
                    if (BattleController.mouseActionIcon == undefined) {
                        BattleController.mouseActionIcon = Main.addGAFMovieClip("MouseIcons", false, true);
                    }
                    if (BattleController.currentPhase == BattleController.ACTIONPHASE || BattleController.currentPhase == BattleController.MOVEMENTPHASE) {
                        var mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
                        if (mapSquare) {
                            var unitInSquare = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
                            if (BattleController.currentPhase == BattleController.MOVEMENTPHASE && BattleController.currentMap.movementGrid[mapSquare.mapX][mapSquare.mapY] >= 0) {
                                if (unitInSquare && unitInSquare != BattleController.selectedUnit) {
                                    BattleController.hideMouseIcon();
                                }
                                else {
                                    if (unitInSquare == BattleController.selectedUnit) {
                                        BattleController.hideMouseIcon();
                                        return;
                                    }
                                    else {
                                        BattleController.mouseActionIcon.gotoAndStop(1);
                                    }
                                    BattleController.mouseActionIcon.x = (mapSquare.mapX * battleTactics.Config.GRIDSIZEX) + (battleTactics.Config.GRIDSIZEX / 2);
                                    BattleController.mouseActionIcon.y = (mapSquare.mapY * battleTactics.Config.GRIDSIZEY) + (battleTactics.Config.GRIDSIZEY / 2);
                                    BattleController.currentMap.mapView.addChild(BattleController.mouseActionIcon);
                                }
                            }
                            else if (BattleController.selectedUnit && BattleController.currentPhase == BattleController.ACTIONPHASE && BattleController.currentMap.actionGrid[mapSquare.mapX][mapSquare.mapY] >= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].minRange && BattleController.currentMap.actionGrid[mapSquare.mapX][mapSquare.mapY] <= BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].maxRange && ((BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].validSquareOccupied && unitInSquare && unitInSquare.validUnitForAction) || (!BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].validSquareOccupied))) {
                                BattleController.mouseActionIcon.gotoAndStop(BattleController.selectedUnit.unit.unitActions[BattleController.selectedUnit.selectedAction].mouseIconFrame);
                                BattleController.mouseActionIcon.x = (mapSquare.mapX * battleTactics.Config.GRIDSIZEX) + (battleTactics.Config.GRIDSIZEX / 2);
                                BattleController.mouseActionIcon.y = (mapSquare.mapY * battleTactics.Config.GRIDSIZEY) + (battleTactics.Config.GRIDSIZEY / 2);
                                BattleController.currentMap.mapView.addChild(BattleController.mouseActionIcon);
                            }
                            else {
                                BattleController.hideMouseIcon();
                            }
                        }
                        else {
                            BattleController.hideMouseIcon();
                        }
                    }
                    else {
                        BattleController.hideMouseIcon();
                    }
                }
                static hideMouseIcon() {
                    if (BattleController.mouseActionIcon == undefined) {
                        BattleController.mouseActionIcon = Main.addGAFMovieClip("MouseIcons", false, true);
                    }
                    if (BattleController.mouseActionIcon && BattleController.mouseActionIcon.parent) {
                        BattleController.mouseActionIcon.parent.removeChild(BattleController.mouseActionIcon);
                    }
                }
                static hideAllInfoPanels() {
                    BattleController.hideDamagePercClips();
                }
                static showDamageRiser(damage, targetUnit, poison = false) {
                    if (damage > 0) {
                        var damageRiser;
                        if (!poison) {
                            damageRiser = Main.addGAFMovieClip("DamageRiser");
                        }
                        else {
                            damageRiser = Main.addGAFMovieClip("DamageRiser_poisoned");
                        }
                        Main.changeText(damageRiser.damageDisplay.damage, ["-" + String(damage)], "xp");
                        damageRiser.x = targetUnit.clip.x;
                        damageRiser.y = targetUnit.clip.y - targetUnit.clip.height;
                        //targetUnit.clip.parent.addChild(damageRiser);
                        //damageRiser.play();
                        if (!targetUnit.unit.useNewAttackAnim && battleTactics.BattleAnimController.battleAnimHolder) {
                            var battleAnimClip;
                            if (targetUnit == battleTactics.BattleAnimController.attackingUnit) {
                                battleAnimClip = battleTactics.BattleAnimController.attackingClip;
                            }
                            else {
                                battleAnimClip = battleTactics.BattleAnimController.defendingClip;
                            }
                            var damageRiser2 = Main.addGAFMovieClip("DamageRiser");
                            damageRiser2.scale.x = damageRiser2.scale.y = 2;
                            Main.changeText(damageRiser2.damageDisplay.damage, [String(damage)], "xp");
                            damageRiser2.x = battleAnimClip.x;
                            damageRiser2.y = (battleAnimClip.y - (battleAnimClip.height / 2));
                            if (battleAnimClip.parent) {
                                //battleAnimClip.parent.addChild(damageRiser2);
                                //damageRiser2.play();
                            }
                        }
                    }
                }
                static showHealRiser(hpUp, targetUnit) {
                    if (hpUp > 0) {
                        var healRiser = Main.addGAFMovieClip("HealRiser");
                        Main.changeText(healRiser.damageDisplay.damage, ["+" + String(hpUp)], "xp");
                        healRiser.x = targetUnit.clip.x;
                        healRiser.y = targetUnit.clip.y - targetUnit.clip.height;
                        //targetUnit.clip.parent.addChild(healRiser);
                        //healRiser.play();
                        if (battleTactics.BattleAnimController.battleAnimHolder) {
                            var battleAnimClip;
                            if (targetUnit == battleTactics.BattleAnimController.attackingUnit) {
                                battleAnimClip = battleTactics.BattleAnimController.attackingClip;
                            }
                            else {
                                battleAnimClip = battleTactics.BattleAnimController.defendingClip;
                            }
                            var damageRiser2 = Main.addGAFMovieClip("DamageRiser");
                            damageRiser2.scale.x = damageRiser2.scale.y = 2;
                            Main.changeText(damageRiser2.damageDisplay.damage, [String(hpUp)], "xp");
                            damageRiser2.x = battleAnimClip.x;
                            damageRiser2.y = (battleAnimClip.y - (battleAnimClip.height / 2));
                            if (battleAnimClip.parent) {
                                battleAnimClip.parent.addChild(damageRiser2);
                                damageRiser2.play();
                            }
                        }
                    }
                }
                static showXPRiser(xpUp, targetUnit) {
                    if (xpUp > 0 && targetUnit && targetUnit.clip && targetUnit.clip.parent) {
                        var xpRiserClip = Main.addGAFMovieClip("XPRiser");
                        Main.changeText(xpRiserClip.damageDisplay.damage, ["+" + String(xpUp) + "xp"], "xp");
                        xpRiserClip.x = targetUnit.clip.x;
                        xpRiserClip.y = targetUnit.clip.y - targetUnit.clip.height;
                        targetUnit.clip.parent.addChild(xpRiserClip);
                        xpRiserClip.play();
                        //BattleController.xpCounter++;
                        BattleController.xpCounterClip = xpRiserClip;
                        Main.addCustomEfFunc('xpCounter.onEnterFrame', function () {
                            if (BattleController.xpCounterClip.currentFrame == BattleController.xpCounterClip.totalFrames) {
                                BattleController.xpCounterClip.parent.removeChild(BattleController.xpCounterClip);
                                Main.removeCustomEfFunc('xpCounter.onEnterFrame');
                            }
                        });
                    }
                }
                static mouseDown_h(e) {
                    BattleController.mouseDown = true;
                }
                static mouseUp_h(e) {
                    BattleController.mouseDown = false;
                }
                static mouseClicked(e = null) {
                    console.log("mouse click", battleTactics.SpeechController.running, GamePanel.panelOpen, BattleController.battleOver, battleTactics.UnitInPlay.actionSelectorOpen, BattleController.showingTutorial, !BattleController.validClick);
                    if (Controller.getLevelNumber() != 1) {
                        BattleController.validClick = true;
                    }
                    if (battleTactics.SpeechController.running) {
                        battleTactics.SpeechController.speedUp();
                        return;
                    }
                    if (GamePanel.panelOpen || BattleController.battleOver || battleTactics.UnitInPlay.actionSelectorOpen || (BattleController.showingTutorial && !BattleController.validClick)) {
                        return;
                    }
                    var mapSquare;
                    var unitInPlay;
                    switch (BattleController.currentPhase) {
                        case BattleController.SELECTUNITPHASE:
                            mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
                            if (mapSquare) {
                                unitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
                                if (unitInPlay && !unitInPlay.actioned && unitInPlay.team == BattleController.teamsTurn) {
                                    BattleController.selectedUnit = unitInPlay;
                                    BattleController.selectedUnit.selectedAction = 0;
                                    BattleController.currentPhase = BattleController.MOVEMENTPHASE;
                                    BattleController.currentMap.clearSquareHighlights();
                                    BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                                    BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
                                    BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
                                    SoundController.playSound("select");
                                }
                            }
                            break;
                        case BattleController.MOVEMENTPHASE:
                            mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
                            if (mapSquare) {
                                unitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
                                if (unitInPlay && unitInPlay != BattleController.selectedUnit && !unitInPlay.actioned && unitInPlay.team == BattleController.teamsTurn) {
                                    BattleController.selectedUnit = unitInPlay;
                                    BattleController.selectedUnit.selectedAction = 0;
                                    BattleController.currentPhase = BattleController.MOVEMENTPHASE;
                                    BattleController.currentMap.clearSquareHighlights();
                                    BattleController.currentMap.hilightThisUnitSquare(BattleController.selectedUnit);
                                    BattleController.currentMap.calculateMovementGrid(BattleController.selectedUnit);
                                    BattleController.currentMap.showMovementGrid(BattleController.selectedUnit);
                                    SoundController.playSound("select");
                                }
                                else if (BattleController.currentMap.movementGrid[mapSquare.mapX][mapSquare.mapY] >= 0) {
                                    unitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
                                    if (unitInPlay == null) {
                                        BattleController.selectedUnit.moveTo(mapSquare.mapX, mapSquare.mapY, BattleController.currentMap);
                                        BattleController.currentMap.clearSquareHighlights();
                                        BattleController.currentMap.clearUnitHighlights();
                                        BattleController.currentPhase = BattleController.MOVINGINTOPOSITION;
                                        SoundController.playSound("select");
                                    }
                                }
                                else {
                                    BattleController.undo();
                                }
                                BattleController.hideMouseIcon();
                            }
                            else {
                                if (e.target == Controller.root.bgs) {
                                    BattleController.undo();
                                    BattleController.hideMouseIcon();
                                }
                            }
                            break;
                        case BattleController.ACTIONPHASE:
                            mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
                            if (mapSquare) {
                                if (BattleController.currentMap.actionGrid[mapSquare.mapX][mapSquare.mapY] >= 0) {
                                    console.log("performAction 3");
                                    //enemy action
                                    if (BattleController.selectedUnit.performAction(BattleController.currentMap, mapSquare.mapX, mapSquare.mapY)) {
                                        BattleController.currentMap.clearSquareHighlights();
                                        BattleController.currentMap.clearUnitHighlights();
                                        BattleController.currentPhase = BattleController.PERFORMINGACTIONPHASE;
                                        var unitInSquare = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
                                        if (unitInSquare && unitInSquare.team != BattleController.selectedUnit.team) {
                                            Controller.root.infoPanels.enemyInfoPanel.showUnitInfo(unitInSquare);
                                        }
                                        BattleController.hideDamagePercClips();
                                        SoundController.playSound("select");
                                        BattleController.selectedUnit.unit.usedActions[BattleController.selectedUnit.selectedAction] = true;
                                        var usedAllActions = true;
                                        for (var i = 0; i < BattleController.selectedUnit.unit.usedActions.length; i++) {
                                            if (BattleController.selectedUnit.unit.usedActions[i] == false) {
                                                usedAllActions = false;
                                            }
                                        }
                                    }
                                }
                                else {
                                    Main.inGamePanel.openPanel("undoEndAlert");
                                }
                                BattleController.hideMouseIcon();
                            }
                            else {
                                if (e.target == Controller.root.bgs) {
                                    Main.inGamePanel.openPanel("undoEndAlert");
                                    BattleController.hideMouseIcon();
                                }
                            }
                            break;
                        case BattleController.SELECTACTIONPHASE:
                            mapSquare = BattleController.currentMap.getMapSquareUnderMouse();
                            if (mapSquare) {
                                unitInPlay = BattleController.currentMap.getUnitInSquare(mapSquare.mapX, mapSquare.mapY);
                                if (unitInPlay) {
                                    if (unitInPlay != BattleController.selectedUnit && unitInPlay.team == BattleController.teamsTurn && !unitInPlay.actioned) {
                                        BattleController.selectedUnit_switch = unitInPlay;
                                        Main.inGamePanel.openPanel("undoEndAlert");
                                    }
                                }
                                else {
                                    BattleController.selectedUnit_switch = null;
                                    Main.inGamePanel.openPanel("undoEndAlert");
                                }
                            }
                            else {
                                if (e.target == Controller.root.bgs) {
                                    BattleController.undo();
                                    BattleController.hideMouseIcon();
                                }
                            }
                    }
                    if (BattleController.showingTutorial && Controller.getLevelNumber() != 2) {
                        BattleController.nextTutorialFrame();
                    }
                }
                static startTutorial() {
                    console.log("startTutorial");
                    if (battleTactics.Config.tutorialInteractiveLevels[Controller.getLevelNumber() - 1]) {
                        Controller.root.tut.gotoAndStop("level" + String(Controller.getLevelNumber()));
                        BattleController.showingTutorial = true;
                        BattleController.validClick = false;
                        if (Controller.getLevelNumber() == 1) {
                            var la = 0;
                            var cla = Controller.root.tut.children;
                            for (var a of cla) {
                                if (a && a._config && a._config._linkage == "validClickTutorialButton") {
                                    //console.log(">>>>>>>>>>", cla[la]);
                                    new ValidClickButton(cla[la]);
                                }
                                la++;
                            }
                        }
                        if (Controller.getLevelNumber() == 2) {
                            Controller.root.tut.visible = false;
                        }
                        else {
                            Controller.root.tut.visible = true;
                        }
                    }
                }
                static nextTutorialFrame(forceFrame = -1) {
                    if (forceFrame == -1) {
                        Controller.root.tut.gotoAndStop(Controller.root.tut.currentFrame + 1);
                    }
                    else {
                        Controller.root.tut.gotoAndStop(forceFrame);
                    }
                    if (Main.getCurrentLabel(Controller.root.tut) == "end1" || Main.getCurrentLabel(Controller.root.tut) == "end2" || Main.getCurrentLabel(Controller.root.tut) == "end3") {
                        BattleController.showingTutorial = false;
                    }
                    else {
                        BattleController.validClick = false;
                    }
                }
                static showCorrectEndAlert(alertClip) {
                    var availableUnitCount = 0;
                    for (var i = 0; i < BattleController.currentMap.unitsInPlay.length; i++) {
                        if (BattleController.currentMap.unitsInPlay[i].team == BattleController.teamsTurn && !BattleController.currentMap.unitsInPlay[i].actioned) {
                            availableUnitCount++;
                        }
                    }
                    if (availableUnitCount == 1) {
                        alertClip.bg.gotoAndStop("team");
                        alertClip.mess.gotoAndStop(2);
                    }
                    else {
                        alertClip.bg.gotoAndStop(BattleController.selectedUnit.unit.frameLabel);
                        alertClip.mess.gotoAndStop(1);
                    }
                }
            }
            BattleController.SELECTUNITPHASE = 0;
            BattleController.MOVEMENTPHASE = 1;
            BattleController.MOVINGINTOPOSITION = 2;
            BattleController.SELECTACTIONPHASE = 3;
            BattleController.ACTIONPHASE = 4;
            BattleController.PERFORMINGACTIONPHASE = 5;
            BattleController.currentPhase = BattleController.SELECTUNITPHASE;
            BattleController.teamPopInc = 0;
            BattleController.teamPopShown = false;
            BattleController.showingMovementsOrActions = false;
            BattleController.aiTeams = [false, false];
            BattleController.aiCalculated = false;
            BattleController.nextAIUnit = 0;
            BattleController.AIPAUSEBETWEENPHASES = 10;
            BattleController.phaseDelay = 0;
            BattleController.showingTutorial = false;
            BattleController.validClick = true;
            BattleController.battleOver = false;
            BattleController.battleOverCountDown = 60;
            BattleController.startSpeech = ["", "", "", "", "", ""];
            BattleController.startSpeechCharacter = [1, 1, 1, 1, 1, 1];
            BattleController.endSpeech = ["", "", "", "", "", ""];
            BattleController.endSpeechCharacter = [1, 1, 1, 1, 1, 1];
            BattleController.endSpeechClips = [];
            BattleController.tutorialDone = false;
            BattleController.mouseDown = false;
            BattleController.generalDelayCount = 0;
            BattleController.xpCounter = 0;
            BattleController.lastHighlightMouseDown = false;
            BattleController.damagePercClips = [];
            battleTactics.BattleController = BattleController;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BattleController = com.ussgames.battleTactics.BattleController;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class CinematicEvent {
                constructor() {
                }
                init() {
                }
            }
            battleTactics.CinematicEvent = CinematicEvent;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var CinematicEvent = com.ussgames.battleTactics.CinematicEvent;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class Cinematics {
                constructor() {
                }
                init() {
                }
                static initCinematicUnits(map) {
                    Cinematics.cinematicsRunning = false;
                    Cinematics.level = Controller.getLevelNumber() - 1;
                    if (Cinematics.cinematicEvents && Cinematics.cinematicEvents.length >= Cinematics.level) {
                        for (var i = 0; i < map.unitsInPlay.length; i++) {
                            for (var j = 0; j < Cinematics.cinematicEvents[Cinematics.level].length; j++) {
                                if (Cinematics.cinematicEvents[Cinematics.level][j].baddieIDs.indexOf(map.unitsInPlay[i].unit.id) >= 0) {
                                    map.unitsInPlay[i].clip.visible = false;
                                    Cinematics.cinematicsRunning = true;
                                }
                            }
                        }
                    }
                }
                static triggerCinematic(map) {
                    var cinematicTriggered = false;
                    Cinematics.speechBubbleCount++;
                    if (Cinematics.cinematicEvents && Cinematics.cinematicEvents.length >= Cinematics.level) {
                        for (var i = 0; i < map.unitsInPlay.length; i++) {
                            for (var j = 0; j < Cinematics.cinematicEvents[Cinematics.level].length; j++) {
                                if (Cinematics.cinematicEvents[Cinematics.level][j].afterSpeech == Cinematics.speechBubbleCount && Cinematics.cinematicEvents[Cinematics.level][j].baddieIDs.indexOf(map.unitsInPlay[i].unit.id) >= 0) {
                                    var destX = map.unitsInPlay[i].mapX;
                                    var destY = map.unitsInPlay[i].mapY;
                                    if (destX >= 5) {
                                        map.unitsInPlay[i].mapX = 11;
                                    }
                                    else {
                                        map.unitsInPlay[i].mapX = -1;
                                    }
                                    map.unitsInPlay[i].updateClipPosition(map);
                                    map.unitsInPlay[i].moveTo(destX, destY, map, false);
                                    map.unitsInPlay[i].clip.visible = true;
                                    cinematicTriggered = true;
                                }
                            }
                        }
                    }
                    return cinematicTriggered;
                }
                static update(map) {
                    var allMoved = true;
                    for (var i = 0; i < map.unitsInPlay.length; i++) {
                        if (map.unitsInPlay[i].state == battleTactics.UnitInPlay.MOVINGINTOPOSITION) {
                            if (map.unitsInPlay[i].moveIntoPosition(map, false)) {
                                map.unitsInPlay[i].state = battleTactics.UnitInPlay.IDLE;
                                map.unitsInPlay[i].update();
                                map.unitsInPlay[i].movedFromX = map.unitsInPlay[i].mapX;
                                map.unitsInPlay[i].movedFromY = map.unitsInPlay[i].mapY;
                            }
                            else {
                                map.unitsInPlay[i].update();
                                allMoved = false;
                            }
                        }
                    }
                    return allMoved;
                }
            }
            Cinematics.speechBubbleCount = -1;
            Cinematics.cinematicsRunning = false;
            Cinematics.level = 0;
            battleTactics.Cinematics = Cinematics;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Cinematics = com.ussgames.battleTactics.Cinematics;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class Config {
                constructor() {
                }
            }
            Config.GRIDSIZEX = 64;
            Config.GRIDSIZEY = 64;
            Config.MAPWIDTH = 10;
            Config.MAPHEIGHT = 5;
            Config.unitConfigs = [Robin, Cyborg, BeastBoy, Raven, Starfire, BankRobber, OldMotherMaeEye, Plasmus, DrLightBeam, BillyNumerous, Trigon, Jinx, Mammoth, Gizmo, SeeMore, BankRobberLongRange, KamikazePie, DrLightBeamHolo, Demon, RobotArmy];
            Config.mapSquareConfig = [
                { type: ussgames.MapSquare.OPEN, height: 0, clipClassName: null, label: "Flat Ground" },
                { type: ussgames.MapSquare.HIGHGROUND, height: 32, clipClassName: "HighgroundPlaceholder", label: "Crate" },
                { type: ussgames.MapSquare.NOACCESS, height: 0, clipClassName: "BarrierPlaceholder", label: "Deep Hole" },
                { type: ussgames.MapSquare.NOACCESS, height: 0, clipClassName: "PotHole1", label: "Pothole" },
                { type: ussgames.MapSquare.NOACCESS, height: 0, clipClassName: "PotHole2", label: "Pothole" },
                { type: ussgames.MapSquare.NOACCESS, height: 0, clipClassName: "PotHole3", label: "Pothole" },
                { type: ussgames.MapSquare.NOACCESS, height: 0, clipClassName: "PotHole4", label: "Pothole" },
                { type: ussgames.MapSquare.HIGHGROUND, height: 32, clipClassName: "PapersHG", label: "Papers" },
                { type: ussgames.MapSquare.HIGHGROUND, height: 32, clipClassName: "TreeTrunkHG", label: "Stump" },
                { type: ussgames.MapSquare.HIGHGROUND, height: 32, clipClassName: "TiresHG", label: "Tires" },
                { type: ussgames.MapSquare.HIGHGROUND, height: 32, clipClassName: "RockHG", label: "Rock" },
                { type: ussgames.MapSquare.HIGHGROUND, height: 32, clipClassName: "TableHG", label: "Table" }
            ];
            Config.COVERDEFENCEBONUS = 0.5;
            Config.HIGHGROUNDATTACKBONUS = 0.5;
            Config.TEAMNAMES = ["Teen Titan's Turn", "Villain's Turn"];
            Config.XPTOLEVELUP = [10, 25, 50, 75, 100, 125, 150, 200, 250];
            Config.MAXLEVEL = 10;
            Config.KOXP = 3;
            Config.SURVIVEXP = 5;
            Config.DIEXP = -3;
            Config.tutorialIntroLevels = [false, true, false, false, false, false, false, false, false, false, false, false];
            Config.tutorialInteractiveLevels = [true, true, true, false, false, false, false, false, false, false, false, false];
            battleTactics.Config = Config;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Config = com.ussgames.battleTactics.Config;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class EndTurnAction extends battleTactics.Action {
                constructor() {
                    super();
                    this.coolDown = 0;
                    this.label = "End Turn";
                }
            }
            battleTactics.EndTurnAction = EndTurnAction;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var EndTurnAction = com.ussgames.battleTactics.EndTurnAction;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class EnemyInfoPanel extends CustomMovieClip {
                constructor(mc) {
                    super(mc);
                    this.panelOpen = false;
                    this.instanceClip["hpBar"] = new battleTactics.HPBar(this.instanceClip["hpBar"]);
                    this.instanceClip.y = 50;
                }
                showUnitInfo(theUnit) {
                    if (theUnit.unit.villainInfoLabel != "") {
                        this.instanceClip.gotoAndStop(theUnit.unit.villainInfoLabel);
                        this.instanceClip["hpBar"].showHP(theUnit.currentHP);
                        if (this.instanceClip["cooler"]) {
                            if (theUnit.unit.unitActions.length > 2)
                                if (theUnit.unit.unitActions[2].coolDown > theUnit.coolDownCount[2]) {
                                    var coolDownPerc = theUnit.coolDownCount[2] / theUnit.unit.unitActions[2].coolDown;
                                    if (coolDownPerc > 1) {
                                        coolDownPerc = 1;
                                    }
                                    this.instanceClip["cooler"].gotoAndStop(Math.round(coolDownPerc * 100));
                                    this.instanceClip["cooler"].visible = true;
                                }
                                else {
                                    this.instanceClip["cooler"].visible = false;
                                }
                        }
                        var powerPerc = theUnit.unit.unitActions[1].power / 10;
                        if (powerPerc > 1 || theUnit.unit.unitActions[1].alwaysShowFullPower) {
                            powerPerc = 1;
                        }
                        var dmg = Math.ceil(5 * powerPerc) + 1;
                        if (dmg < 1)
                            dmg = 1;
                        if (dmg > 6)
                            dmg = 6;
                        this.instanceClip["actionPower"].gotoAndStop(dmg);
                        if (theUnit.unit.unitActions.length > 2) {
                            powerPerc = theUnit.unit.unitActions[2].power / 10;
                            if (powerPerc > 1 || theUnit.unit.unitActions[2].alwaysShowFullPower) {
                                powerPerc = 1;
                            }
                            var dmg = Math.ceil(5 * powerPerc) + 1;
                            if (dmg < 1)
                                dmg = 1;
                            if (dmg > 6)
                                dmg = 6;
                            this.instanceClip["actionPower2"].gotoAndStop(dmg);
                        }
                        this.panelOpen = true;
                    }
                    else {
                        this.panelOpen = false;
                    }
                }
                closePanel() {
                    this.panelOpen = false;
                }
                update() {
                    if (battleTactics.BattleController.teamsTurn == 1 && this.panelOpen) {
                        if (this.instanceClip.x > EnemyInfoPanel.ONX + 1) {
                            this.instanceClip.x += (EnemyInfoPanel.ONX - this.instanceClip.x) / 2;
                            this.instanceClip.visible = true;
                        }
                    }
                    else {
                        if (this.instanceClip.x < EnemyInfoPanel.OFFX - 1) {
                            this.instanceClip.x += (EnemyInfoPanel.OFFX - this.instanceClip.x) / 2;
                        }
                        else {
                            this.instanceClip.visible = false;
                            this.instanceClip.gotoAndStop(1);
                        }
                    }
                }
            }
            EnemyInfoPanel.OFFX = 1038;
            EnemyInfoPanel.ONX = 753;
            battleTactics.EnemyInfoPanel = EnemyInfoPanel;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var EnemyInfoPanel = com.ussgames.battleTactics.EnemyInfoPanel;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class HPBar extends CustomMovieClip {
                constructor(mc) {
                    super(mc);
                }
                showHP(hp) {
                    for (var i = 1; i <= 4; i++) {
                        if (hp <= 0) {
                            this.instanceClip["fill" + String(i)].gotoAndStop(1);
                        }
                        else if (hp >= 10) {
                            this.instanceClip["fill" + String(i)].gotoAndStop(11);
                        }
                        else {
                            this.instanceClip["fill" + String(i)].gotoAndStop(Math.floor(hp % 10) + 1);
                        }
                        hp -= 10;
                    }
                }
            }
            battleTactics.HPBar = HPBar;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var HPBar = com.ussgames.battleTactics.HPBar;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class ResidualEffect {
                constructor() {
                    this.effectCountDown = 0;
                    this.effectLive = false;
                }
                init(map, originatingUnit, mapX, mapY) {
                    this.originatingUnit = originatingUnit;
                    this.mapX = mapX;
                    this.mapY = mapY;
                    this.effectLive = true;
                }
                update(map) {
                }
                endTeamTurn(team, map) {
                }
            }
            battleTactics.ResidualEffect = ResidualEffect;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var ResidualEffect = com.ussgames.battleTactics.ResidualEffect;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class SpeechBubbleData {
                constructor() {
                    this.speech = "";
                }
            }
            battleTactics.SpeechBubbleData = SpeechBubbleData;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class SpeechController {
                constructor() {
                }
                static init() {
                    SpeechController.running = true;
                    SpeechController.runningCinematic = false;
                    SpeechController.speechQueue = [];
                    SpeechController.speechBubbleContainer = battleTactics.BattleController.currentMap.mapView;
                    SpeechController.speechDelayCount = 0;
                }
                static addSpeech(speechText, speakingClip) {
                    var newSpeechBubble = new battleTactics.SpeechBubbleData;
                    newSpeechBubble.speech = speechText;
                    newSpeechBubble.speakerClip = speakingClip;
                    SpeechController.speechQueue.push(newSpeechBubble);
                }
                static update() {
                    if (SpeechController.speechDelayCount <= 0) {
                        var cinematicOver = true;
                        if (!SpeechController.runningCinematic) {
                            SpeechController.runningCinematic = true;
                            battleTactics.Cinematics.triggerCinematic(battleTactics.BattleController.currentMap);
                            if (SpeechController.currentSpeechBubble) {
                                SpeechController.currentSpeechBubble.visible = false;
                            }
                        }
                        if (SpeechController.runningCinematic) {
                            cinematicOver = battleTactics.Cinematics.update(battleTactics.BattleController.currentMap);
                        }
                        if (cinematicOver) {
                            if (SpeechController.speechQueue.length >= 1) {
                                var nextSpeech = SpeechController.speechQueue[0];
                                SpeechController.speechQueue.splice(0, 1);
                                SpeechController.showSpeechBubble(nextSpeech);
                                SpeechController.speechDelayCount = SpeechController.SPEECHDELAY;
                                if (SpeechController.speechQueue.length == 0 && Controller.root.batman.currentFrame > 1) {
                                    Controller.root.batman.gotoAndPlay(22);
                                }
                            }
                            else {
                                SpeechController.endSpeech();
                            }
                            SpeechController.runningCinematic = false;
                        }
                    }
                    else {
                        SpeechController.speechDelayCount--;
                    }
                }
                static showSpeechBubble(speech) {
                    if (SpeechController.currentSpeechBubble && SpeechController.currentSpeechBubble.parent) {
                        SpeechController.currentSpeechBubble.parent.removeChild(SpeechController.currentSpeechBubble);
                    }
                    SpeechController.currentSpeechBubble = Main.addGAFMovieClip("SpeechBubble");
                    Main.changeText(SpeechController.currentSpeechBubble.speech.speechText, Localizer.getlocalisedText(speech.speech), "speech");
                    SpeechController.currentSpeechBubble.speech.speechText.x = -(SpeechController.currentSpeechBubble.speech.speechText.width / 2) - 35;
                    SpeechController.currentSpeechBubble.speech.speechText.y = -(SpeechController.currentSpeechBubble.speech.speechText.height / 2);
                    var speechBubbleXOff = 0;
                    var speechBubblePointerXOff = 0;
                    var speechBubblePointerXScale = 1;
                    if (speech.speakerClip.x < 320) {
                        speechBubbleXOff = 30;
                        speechBubblePointerXOff = 0;
                        speechBubblePointerXScale = -1;
                    }
                    else {
                        speechBubbleXOff = -30;
                        speechBubblePointerXOff = 0;
                        speechBubblePointerXScale = 1;
                    }
                    SpeechController.currentSpeechBubble.bubbleSizer.width = Math.round(SpeechController.currentSpeechBubble.speech.speechText.textField.width + 2);
                    SpeechController.currentSpeechBubble.bubbleSizer.height = Math.round(SpeechController.currentSpeechBubble.speech.speechText.textField.height + 4);
                    SpeechController.currentSpeechBubble.bubbleSizer.visible = false;
                    if (SpeechController.currentSpeechBubble.bubbleSizer.scale.x >= 1) {
                        SpeechController.currentSpeechBubble.bubble.scale.x = SpeechController.currentSpeechBubble.bubbleSizer.scale.x;
                    }
                    else {
                        SpeechController.currentSpeechBubble.bubble.scale.x = 1;
                    }
                    if (SpeechController.currentSpeechBubble.bubbleSizer.scale.y >= 1) {
                        SpeechController.currentSpeechBubble.bubble.scale.y = SpeechController.currentSpeechBubble.bubbleSizer.scale.y;
                    }
                    else {
                        SpeechController.currentSpeechBubble.bubble.scale.y = 1;
                    }
                    SpeechController.currentSpeechBubble.pointer.x = 0;
                    SpeechController.currentSpeechBubble.pointer.y = SpeechController.currentSpeechBubble.bubble.height / 2;
                    SpeechController.currentSpeechBubble.pointer.scale.x = speechBubblePointerXScale;
                    SpeechController.currentSpeechBubble.x = Math.floor((speech.speakerClip.x + speechBubbleXOff));
                    SpeechController.currentSpeechBubble.y = speech.speakerClip.y - speech.speakerClip.height - 30;
                    if (SpeechController.currentSpeechBubble.parent != SpeechController.speechBubbleContainer) {
                        SpeechController.speechBubbleContainer.addChild(SpeechController.currentSpeechBubble);
                    }
                    var speechBubbleBounds = SpeechController.currentSpeechBubble.getBounds(Controller.root);
                    if (speechBubbleBounds.left < 0) {
                        SpeechController.currentSpeechBubble.x -= speechBubbleBounds.left;
                    }
                    else if (speechBubbleBounds.right > 640) {
                        var shift = speechBubbleBounds.right - 640;
                        SpeechController.currentSpeechBubble.x -= shift;
                    }
                    SpeechController.currentSpeechBubble.bubble.x -= SpeechController.currentSpeechBubble.bubble.width / 2;
                    SpeechController.currentSpeechBubble.bubble.y -= SpeechController.currentSpeechBubble.bubble.height / 2;
                }
                static speedUp() {
                    SpeechController.speechDelayCount = 0;
                }
                static endSpeech() {
                    SpeechController.running = false;
                    if (SpeechController.currentSpeechBubble.parent) {
                        SpeechController.currentSpeechBubble.parent.removeChild(SpeechController.currentSpeechBubble);
                    }
                }
            }
            SpeechController.running = false;
            SpeechController.runningCinematic = false;
            SpeechController.speechQueue = [];
            SpeechController.SPEECHDELAY = 100 * 2 * 1.0;
            SpeechController.speechDelayCount = 0;
            battleTactics.SpeechController = SpeechController;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var SpeechController = com.ussgames.battleTactics.SpeechController;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class UnitInPlay {
                constructor() {
                    this.XPEarned = 0;
                    this.XPEarnedLastAttack = 0;
                    this.firstFrame = true;
                    this.XPEarnedFor = [0, 0, 0, 0];
                    this.stats = [0, 0, 0, 0];
                    this.clipX = 0;
                    this.clipY = 0;
                    this.destClipX = 0;
                    this.destClipY = 0;
                    this.startX = 0;
                    this.startY = 0;
                    this.ai = false;
                    this.selectedAction = 0;
                    this.externalForcesActing = false;
                    this.validUnitForAction = false;
                    this.moved = false;
                    this.actioned = false;
                    this.poisonPower = 0;
                    this.poisonTurns = 0;
                    this.poisonRemoveDelay = 45;
                    this.evadeAttackCount = 0;
                    this.attackable = true;
                    this.state = 0;
                    this.dir = 1;
                    this.moveXSpeed = 0;
                    this.moveYSpeed = 0;
                    this.thisStateLabel = "idle";
                }
                update() {
                    if (this.currentHP <= 0)
                        Main.changeText(this.clip_hp.damageDisplay.damage, [""], "hp");
                    else
                        Main.changeText(this.clip_hp.damageDisplay.damage, [String(this.currentHP)], "hp");
                    this.thisStateLabel = UnitInPlay.stateLabels[this.state];
                    if (this.state == UnitInPlay.IDLE && !this.attackable) {
                        this.thisStateLabel = "hide";
                    }
                    //console.log("this.state", this.state, this.thisStateLabel);
                    if (this.state == UnitInPlay.KO) {
                        if (battleTactics.BattleAnimController.battleAnimHolder) {
                        }
                        else {
                            if (Main.getCurrentLabel(this.clip) != this.thisStateLabel) {
                                this.clip.gotoAndStop(this.thisStateLabel);
                                this.clip.scale.x = this.dir;
                                this.clip_hp.scale.x = this.dir;
                            }
                            else {
                                if (Main.getCurrentLabel(this.clip) == "ko" && this.clip["anim_" + this.thisStateLabel] && this.clip["anim_" + this.thisStateLabel].action && this.clip["anim_" + this.thisStateLabel].action.currentFrame == this.clip["anim_" + this.thisStateLabel].action.totalFrames) {
                                    if (this.poisonRemoveDelay > 0) {
                                        this.poisonRemoveDelay--;
                                    }
                                    else {
                                        battleTactics.BattleController.currentMap.removeDeadUnits();
                                    }
                                }
                            }
                        }
                    }
                    else if (this.state == UnitInPlay.EVADE) {
                        if (battleTactics.BattleAnimController.battleAnimHolder) {
                        }
                    }
                    else if (this.state == UnitInPlay.HIT) {
                        if (battleTactics.BattleAnimController.battleAnimHolder) {
                        }
                    }
                    else if (this.state == UnitInPlay.PERFORMINGACTION) {
                        this.thisStateLabel += String(this.selectedAction);
                        if (battleTactics.BattleAnimController.battleAnimHolder && battleTactics.BattleAnimController.battleStarted) {
                        }
                        else {
                            if (this.unit.unitActions[this.selectedAction].type != battleTactics.Action.ATTACK && Main.getCurrentLabel(this.clip) != this.thisStateLabel) {
                                this.clip.gotoAndStop(this.thisStateLabel);
                                this.clip.scale.x = this.dir;
                                this.clip_hp.scale.x = this.dir;
                            }
                        }
                    }
                    else if (Main.getCurrentLabel(this.clip) != this.thisStateLabel) {
                        if (this.state == UnitInPlay.MOVINGINTOPOSITION && this.mapX == this.movedFromX && this.mapY == this.movedFromY) {
                            this.thisStateLabel = "idle";
                        }
                        this.clip.gotoAndStop(this.thisStateLabel);
                        if (this.thisStateLabel == "idle") {
                            this.clip.gotoAndStop("breath");
                            if (this.clip["anim_breath"].breath) {
                                this.clip["anim_breath"].breath.gotoAndStop(1);
                            }
                            else
                                this.clip.gotoAndStop(this.thisStateLabel);
                        }
                        if (this.thisStateLabel == "move") {
                            this.clip.anim_move.children[0].play();
                        }
                        this.clip.scale.x = this.dir;
                        this.clip_hp.scale.x = this.dir;
                        if (this.state == UnitInPlay.WAITINGFORORDER) {
                            if (this.clip["anim_" + this.thisStateLabel] && this.clip["anim_" + this.thisStateLabel].breath) {
                                this.clip["anim_" + this.thisStateLabel].breath.gotoAndPlay(Math.floor(Math.random() * this.clip["anim_" + this.thisStateLabel].breath.totalFrames) + 1);
                            }
                        }
                    }
                    if (UnitInPlay.actionSelector == null) {
                        UnitInPlay.actionSelectorOpen = false;
                    }
                }
                init(unit, mapX, mapY, team, ai = false) {
                    this.unit = unit;
                    this.currentHP = Math.floor(unit.HP + unit.HPBonus);
                    this.coolDownCount = [];
                    for (var i = 0; i < unit.unitActions.length; i++) {
                        this.coolDownCount[i] = 0;
                    }
                    this.mapX = mapX;
                    this.mapY = mapY;
                    this.movedFromX = mapX;
                    this.movedFromY = mapY;
                    this.team = team;
                    this.ai = ai;
                    //console.log("unit info", unit);
                    this.clip = unit.movieClipClass;
                    this.clip.alpha = 1;
                    this.clip_hp = Main.addGAFMovieClip("HealRiser", false, false);
                    this.clip_hp.y = this.clip.hp.transform.localTransform.ty;
                    this.clip.addChild(this.clip_hp);
                    Main.changeText(this.clip_hp.damageDisplay.damage, [String(this.currentHP)], "hp");
                    Main.changeText(this.clip.hp, [""]);
                    this.clip.hp.visible = false;
                    if (ai) {
                        this.aiController = new unit.aiControllerClass;
                    }
                    if (team == 2) {
                        this.dir = -1;
                        this.clip.scale.x = this.dir;
                        this.clip_hp.scale.x = this.dir;
                    }
                    this.state = UnitInPlay.IDLE;
                    UnitInPlay.actionSelector = null;
                    UnitInPlay.actionSelectorOpen = false;
                }
                availableForOrder() {
                    if (this.state == UnitInPlay.IDLE) {
                        this.state = UnitInPlay.WAITINGFORORDER;
                    }
                }
                normalize(point, scale) {
                    var norm = Math.sqrt(point.x * point.x + point.y * point.y);
                    if (norm != 0) {
                        point.x = scale * point.x / norm;
                        point.y = scale * point.y / norm;
                    }
                }
                moveTo(mapX_, mapY_, map, triggerBeforeMoveFunction = true) {
                    this.movedFromX = this.mapX;
                    this.movedFromY = this.mapY;
                    this.mapX = mapX_;
                    this.mapY = mapY_;
                    this.destClipX = (this.mapX * battleTactics.Config.GRIDSIZEX) + (battleTactics.Config.GRIDSIZEX / 2);
                    this.destClipY = (this.mapY * battleTactics.Config.GRIDSIZEY) + battleTactics.Config.GRIDSIZEY;
                    this.state = UnitInPlay.MOVINGINTOPOSITION;
                    var movePoint = new Point(this.destClipX - this.clipX, this.destClipY - this.clipY);
                    this.normalize(movePoint, 1);
                    this.moveXSpeed = movePoint.x * this.unit.movementSpeed;
                    this.moveYSpeed = movePoint.y * this.unit.movementSpeed;
                    if (this.moveXSpeed < 0) {
                        this.dir = -1;
                    }
                    else if (this.moveXSpeed > 0) {
                        this.dir = 1;
                    }
                    if (triggerBeforeMoveFunction) {
                        this.unit.beforeMoveFunction(this, map);
                    }
                }
                moveIntoPosition(map, triggerAfterMoveFunction = true) {
                    if (Math.abs(this.clipX - this.destClipX) <= this.unit.movementSpeed) {
                        this.clipX = this.destClipX;
                    }
                    else {
                        this.clipX += this.moveXSpeed;
                    }
                    if (Math.abs(this.clipY - this.destClipY) <= this.unit.movementSpeed) {
                        this.clipY = this.destClipY;
                    }
                    else {
                        this.clipY += this.moveYSpeed;
                    }
                    this.clip.x = this.clipX;
                    this.clip.y = this.clipY;
                    if (Math.abs(this.clipX - this.destClipX) <= this.unit.movementSpeed && Math.abs(this.clipY - this.destClipY) <= this.unit.movementSpeed) {
                        this.updateClipPosition(map);
                        this.state = UnitInPlay.WAITINGFORORDER;
                        if (triggerAfterMoveFunction) {
                            this.unit.afterMoveFunction(this, map);
                        }
                        return true;
                    }
                    return false;
                }
                undoMove(map) {
                    this.mapX = this.movedFromX;
                    this.mapY = this.movedFromY;
                    this.updateClipPosition(map);
                    this.closeActionSelector();
                }
                updateClipPosition(map) {
                    if (!this.externalForcesActing) {
                        this.clipX = (this.mapX * battleTactics.Config.GRIDSIZEX) + (battleTactics.Config.GRIDSIZEX / 2);
                        this.clipY = (this.mapY * battleTactics.Config.GRIDSIZEY) + (battleTactics.Config.GRIDSIZEY);
                        this.clip.x = this.clipX;
                        if (this.mapX >= 0 && map.mapGrid.length > this.mapX && this.mapY >= 0 && map.mapGrid[this.mapX].length > this.mapY) {
                            this.clip.y = this.clipY - map.mapGrid[this.mapX][this.mapY].height;
                        }
                        if (this.firstFrame) {
                            this.startX = this.mapX;
                            this.startY = this.mapY;
                            this.firstFrame = false;
                        }
                    }
                }
                static generateUnvailableActionFilter() {
                    UnitInPlay.unvailableActionFilter = new ColorMatrixFilter();
                    UnitInPlay.unvailableActionFilter.saturate(1);
                }
                openActionSelector(map) {
                    if (UnitInPlay.actionSelector == null) {
                        UnitInPlay.actionSelector = Main.addGAFMovieClip("ActionIconHolder");
                    }
                    if (UnitInPlay.unvailableActionFilter == null) {
                        UnitInPlay.generateUnvailableActionFilter();
                    }
                    var iconX = 22;
                    var iconY = 22;
                    var anActionButton = Main.addGAFMovieClip("UndoActionButton");
                    anActionButton.x = iconX;
                    anActionButton.y = iconY;
                    UnitInPlay.actionSelector.addChild(anActionButton);
                    iconX += 36;
                    anActionButton = Main.addGAFMovieClip("EndTurnActionButton");
                    anActionButton.x = iconX;
                    anActionButton.y = iconY;
                    UnitInPlay.actionSelector.addChild(anActionButton);
                    for (var i = 1; i < this.unit.unitActions.length; i++) {
                        iconX += 36;
                        anActionButton = Main.addGAFMovieClip("SelectActionButton");
                        anActionButton.x = iconX;
                        anActionButton.y = iconY;
                        anActionButton.actionID = i;
                        anActionButton.icon.gotoAndStop(this.unit.unitActions[i].iconFrame);
                        UnitInPlay.actionSelector.addChild(anActionButton);
                        if (!this.unit.unlockedActions[i]) {
                            anActionButton.filters = [UnitInPlay.unvailableActionFilter];
                            anActionButton["redBG"].visible = false;
                        }
                        else if (this.unit.unitActions[i].coolDown > this.coolDownCount[i]) {
                            var coolDownPerc = this.coolDownCount[i] / this.unit.unitActions[i].coolDown;
                            if (coolDownPerc > 1) {
                                coolDownPerc = 1;
                            }
                            anActionButton["redBG"].scale.y = 1 - coolDownPerc;
                        }
                        else {
                            anActionButton["redBG"].visible = false;
                        }
                    }
                    UnitInPlay.actionSelector.bgPanel.width = iconX + 22;
                    UnitInPlay.actionSelector.x = this.clip.x - (UnitInPlay.actionSelector.bgPanel.width / 2);
                    UnitInPlay.actionSelector.y = this.clip.y;
                    if ((UnitInPlay.actionSelector.y + UnitInPlay.actionSelector.height) + map.mapView.y > 320) {
                        UnitInPlay.actionSelector.y = this.clip.y - (this.clip.height + UnitInPlay.actionSelector.height);
                    }
                    if (UnitInPlay.actionSelector.x + map.mapView.x < 0) {
                        UnitInPlay.actionSelector.x = this.clip.x;
                    }
                    else if (UnitInPlay.actionSelector.x + map.mapView.x + UnitInPlay.actionSelector.width > 640) {
                        UnitInPlay.actionSelector.x = this.clip.x - UnitInPlay.actionSelector.width;
                    }
                    map.mapView.addChild(UnitInPlay.actionSelector);
                    UnitInPlay.actionSelectorOpen = true;
                }
                closeActionSelector() {
                    if (UnitInPlay.actionSelector && UnitInPlay.actionSelector.parent) {
                        UnitInPlay.actionSelector.parent.removeChild(UnitInPlay.actionSelector);
                    }
                    UnitInPlay.actionSelector = null;
                }
                selectAction(actionID) {
                    if (this.unit.level >= this.unit.unitActions[actionID].level && this.unit.unitActions[actionID].coolDown <= this.coolDownCount[actionID]) {
                        if (this.unit.unitActions[actionID].type == battleTactics.Action.SELF) {
                            this.unit.unitActions[actionID].performSelfAction(this);
                            this.coolDownCount[actionID] = -1;
                        }
                        this.selectedAction = actionID;
                        this.closeActionSelector();
                        return true;
                    }
                    return false;
                }
                performAction(map, targetX, targetY) {
                    if (this.coolDownCount[this.selectedAction] >= this.unit.unitActions[this.selectedAction].coolDown && this.unit.performAction(this.selectedAction, map, this, targetX, targetY)) {
                        this.coolDownCount[this.selectedAction] = -1;
                        if (targetX > this.mapX) {
                            this.dir = 1;
                        }
                        else if (targetX < this.mapX) {
                            this.dir = -1;
                        }
                        this.clip.scale.x = this.dir;
                        this.clip_hp.scale.x = this.dir;
                        this.state = UnitInPlay.PERFORMINGACTION;
                        return true;
                    }
                    return false;
                }
                updateAction(map) {
                    return this.unit.unitActions[this.selectedAction].updateAction(map, this);
                }
                actionAnimFinished(animClip) {
                    if (Main.getCurrentLabel(animClip) == UnitInPlay.stateLabels[UnitInPlay.KO] || Main.getCurrentLabel(animClip) == UnitInPlay.stateLabels[UnitInPlay.HIT] || Main.getCurrentLabel(animClip) == UnitInPlay.stateLabels[UnitInPlay.EVADE] || Main.getCurrentLabel(animClip) == UnitInPlay.stateLabels[UnitInPlay.PERFORMINGACTION] + String(this.selectedAction)) {
                        if (animClip["anim_" + this.thisStateLabel] && animClip["anim_" + this.thisStateLabel].action) {
                            if (animClip["anim_" + this.thisStateLabel].action.currentFrame == animClip["anim_" + this.thisStateLabel].action.totalFrames) {
                                this.state = UnitInPlay.IDLE;
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                        this.state = UnitInPlay.IDLE;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                actionHit(animClip) {
                    if (animClip["anim_" + this.thisStateLabel] && animClip["anim_" + this.thisStateLabel].action) {
                        if (Main.getCurrentLabel(animClip["anim_" + this.thisStateLabel].action) == "attackOver") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    return false;
                }
                updateCoolDowns() {
                    for (var i = 0; i < this.coolDownCount.length; i++) {
                        this.coolDownCount[i]++;
                    }
                }
                removeFromPlay() {
                    if (this.clip && this.clip.parent) {
                        this.clip.parent.removeChild(this.clip);
                    }
                }
                endTurn() {
                    this.actioned = true;
                    this.state = UnitInPlay.IDLE;
                    this.movedFromX = this.mapX;
                    this.movedFromY = this.mapY;
                    this.closeActionSelector();
                }
                heal(maxHealPerc) {
                    var healAmount = Math.ceil((this.unit.HP + this.unit.HPBonus) * maxHealPerc);
                    if (this.currentHP + healAmount > this.unit.HP + this.unit.HPBonus) {
                        healAmount = (this.unit.HP + this.unit.HPBonus) - this.currentHP;
                        this.currentHP = Math.floor(this.unit.HP + this.unit.HPBonus);
                    }
                    else {
                        this.currentHP += Math.floor(healAmount);
                    }
                    this.poisonTurns = 0;
                    this.poisonPower = 0;
                    return healAmount;
                }
                awardXP(XPToAward, reason) {
                    this.XPEarned += XPToAward;
                    this.XPEarnedFor[reason] += XPToAward;
                    this.XPEarnedLastAttack += XPToAward;
                    this.stats[reason]++;
                }
            }
            UnitInPlay.DAMAGE = 0;
            UnitInPlay.KOS = 1;
            UnitInPlay.SURVIVE = 2;
            UnitInPlay.DIE = 3;
            UnitInPlay.IDLE = 0;
            UnitInPlay.WAITINGFORORDER = 3;
            UnitInPlay.MOVINGINTOPOSITION = 1;
            UnitInPlay.PERFORMINGACTION = 2;
            UnitInPlay.HIT = 4;
            UnitInPlay.KO = 5;
            UnitInPlay.EVADE = 6;
            UnitInPlay.stateLabels = ["idle", "move", "action", "breath", "hit", "ko", "evade"];
            UnitInPlay.unlockedActionFilter = Main.convertToPixiGlowFilter(0x33333300, 1, 5, 5, 2, 1, true, true);
            UnitInPlay.actionSelectorOpen = false;
            battleTactics.UnitInPlay = UnitInPlay;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var UnitInPlay = com.ussgames.battleTactics.UnitInPlay;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class UpgradePanel extends CustomMovieClip {
                constructor(clip) {
                    super(clip);
                    this.titanID = 0;
                    this.XPDisp = 0;
                    this.XPUpDisp = 0;
                    this.levelDisp = 0;
                    this.tickUpDelay = 20;
                    this.fadingBars = false;
                    this.inited_btns = false;
                    if (this.instanceClip["hpBar"].pluginName == undefined)
                        this.instanceClip["hpBar"] = new battleTactics.HPBar(this.instanceClip["hpBar"]);
                }
                init(ind) {
                    this.ind = ind;
                    this.titanID = battleTactics.BattleController.yourTeamUnits[ind - 1].unit.id + 1;
                    this.XPDisp = battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].prevXP;
                    this.levelDisp = battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].prevLevel;
                    this.XPUpDisp = 0;
                    this.gotoAndStop(this.titanID);
                    this.updateInfo();
                    this.updateXPBarDisplay();
                    this.clearActionInfo();
                    this.initLocks();
                    if (this.XPDisp != battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].XP) {
                        Main.addCustomEfFunc('tickUpXP.onEnterFrame' + this.titanID, this.tickUpXP.bind(this));
                    }
                    for (var i = 0; i < 4; i++) {
                        this.instanceClip["_" + String(i + 1)].on(com.CustomMouseEvent.MOUSE_OVER, this.displayActionInfo.bind(this, i));
                        this.instanceClip["_" + String(i + 1)].on(com.CustomMouseEvent.MOUSE_OUT, this.clearActionInfo);
                        if (this.instanceClip["l" + String(i + 1)]) {
                            this.instanceClip["l" + String(i + 1)].on(com.CustomMouseEvent.MOUSE_OVER, this.showLockedInfo);
                            this.instanceClip["l" + String(i + 1)].on(com.CustomMouseEvent.MOUSE_OUT, this.clearActionInfo);
                        }
                    }
                }
                initLocks() {
                    for (var i = 2; i <= 4; i++) {
                        if (battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].unlockedActions[i]) {
                            this.instanceClip["l" + String(i)].gotoAndStop("unlocked");
                        }
                    }
                }
                updateInfo() {
                    Main.changeText(this.instanceClip["titanName"], Localizer.getlocalisedText(battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].label));
                    Main.changeText(this.instanceClip["level"], [String(this.levelDisp)]);
                    Main.changeText(this.instanceClip["xp"], [String(Math.floor(this.XPDisp))]);
                    this.instanceClip["hpBar"].showHP(battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].HP + battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].HPBonus);
                    for (var i = 0; i < 4; i++) {
                        this.instanceClip["_" + String(i + 1)].gotoAndStop(battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].unitActions[i + 1].iconFrame);
                    }
                }
                unlockAction() {
                    battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].unlockAction();
                    for (var i = 2; i <= 4; i++) {
                        if (this.instanceClip["l" + String(i)].currentLabel == "locked" && battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].unlockedActions[i]) {
                            this.instanceClip["l" + String(i)].gotoAndPlay("unlock");
                            SoundController.playSound("buyUpgrade");
                            Controller.root.tut2.gotoAndStop(battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].unitActions[i].unlockTutorialFrame);
                        }
                    }
                    if (battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend <= 0) {
                        this.instanceClip["levelUpPanel"].gotoAndStop(1);
                    }
                    this.allPointsSpent();
                    var allActionsUnlocked = true;
                    for (var i = 0; i < battleTactics.BattleController.persistentTeamUnits.length; i++) {
                        for (var j = 0; j < 5; j++) {
                            if (battleTactics.BattleController.persistentTeamUnits[i].unlockedActions[j] == false) {
                                allActionsUnlocked = false;
                            }
                        }
                    }
                }
                upgradeHP() {
                    var zeroHPBonus = false;
                    if (battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].HPBonus == 0) {
                        zeroHPBonus = true;
                    }
                    battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].increaseHP();
                    this.updateInfo();
                    if (battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend <= 0) {
                        this.instanceClip["levelUpPanel"].gotoAndStop(1);
                    }
                    this.allPointsSpent();
                    SoundController.playSound("buyUpgrade");
                    var allHPUpgraded = zeroHPBonus;
                    for (var i = 0; i < battleTactics.BattleController.persistentTeamUnits.length; i++) {
                        if (battleTactics.BattleController.persistentTeamUnits[i].HPBonus == 0) {
                            allHPUpgraded = false;
                        }
                    }
                }
                allPointsSpent() {
                    var pointsLeft = 0;
                    for (var i = 0; i < battleTactics.BattleController.persistentTeamUnits.length; i++) {
                        pointsLeft += battleTactics.BattleController.persistentTeamUnits[i].levelPointsLeftToSpend;
                    }
                    if (pointsLeft == 0) {
                        Transitioner.theRoot.level_up_scene.nextLevel.visible = true;
                    }
                }
                updateXPBarDisplay() {
                    var bar1Perc, bar2Perc, prevxpForLevel, prevxpPastLevel, xpForLevel, xpPastLevel;
                    if (this.levelDisp == battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].prevLevel || this.XPDisp == battleTactics.Config.XPTOLEVELUP[this.levelDisp - 1] || battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].prevXP == battleTactics.Config.XPTOLEVELUP[battleTactics.Config.XPTOLEVELUP.length - 1]) {
                        if (this.levelDisp > 1) {
                            prevxpForLevel = battleTactics.Config.XPTOLEVELUP[this.levelDisp - 1] - battleTactics.Config.XPTOLEVELUP[this.levelDisp - 2];
                            prevxpPastLevel = battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].prevXP - battleTactics.Config.XPTOLEVELUP[this.levelDisp - 2];
                            xpForLevel = battleTactics.Config.XPTOLEVELUP[this.levelDisp - 1] - battleTactics.Config.XPTOLEVELUP[this.levelDisp - 2];
                            xpPastLevel = this.XPDisp - battleTactics.Config.XPTOLEVELUP[this.levelDisp - 2];
                        }
                        else {
                            prevxpForLevel = battleTactics.Config.XPTOLEVELUP[0];
                            prevxpPastLevel = battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].prevXP;
                            xpForLevel = battleTactics.Config.XPTOLEVELUP[0];
                            xpPastLevel = this.XPDisp;
                        }
                        bar1Perc = prevxpPastLevel / prevxpForLevel;
                        bar2Perc = xpPastLevel / xpForLevel;
                        this.instanceClip["XPBar"].oldXP.width = 185 * bar1Perc;
                        this.instanceClip["XPBar"].newXP.width = 185 * bar2Perc;
                    }
                    else {
                        if (this.levelDisp > 1) {
                            xpForLevel = battleTactics.Config.XPTOLEVELUP[this.levelDisp - 1] - battleTactics.Config.XPTOLEVELUP[this.levelDisp - 2];
                            xpPastLevel = this.XPDisp - battleTactics.Config.XPTOLEVELUP[this.levelDisp - 2];
                        }
                        else {
                            xpForLevel = battleTactics.Config.XPTOLEVELUP[0];
                            xpPastLevel = this.XPDisp;
                        }
                        bar1Perc = 0;
                        bar2Perc = xpPastLevel / xpForLevel;
                        this.instanceClip["XPBar"].oldXP.width = 185 * bar1Perc;
                        this.instanceClip["XPBar"].newXP.width = 185 * bar2Perc;
                    }
                    this.instanceClip["XPBar"].oldXP.alpha = 1;
                    this.instanceClip["XPBar"].newXP.alpha = 1;
                    if (this.levelDisp < battleTactics.Config.MAXLEVEL) {
                        Main.changeText(this.instanceClip["xpToGo"], [Localizer.getlocalisedText("LEVEL UP IN ")[0] + String(Math.ceil(battleTactics.Config.XPTOLEVELUP[this.levelDisp - 1] - this.XPDisp))]);
                    }
                    else {
                        Main.changeText(this.instanceClip["xpToGo"], [""]);
                    }
                }
                tickUpXP(e) {
                    if (this.instanceClip["levelUpPanel"].currentFrame >= 45 && !this.inited_btns) {
                        this.inited_btns = true;
                        this.instanceClip["levelUpPanel"].upgrade_hp = new UpgradeHPButton(this.instanceClip["levelUpPanel"].upgrade_hp);
                        this.instanceClip["levelUpPanel"].upgrade_hp.init(this.ind);
                        this.instanceClip["levelUpPanel"].unlock_action = new UnlockActionButton(this.instanceClip["levelUpPanel"].unlock_action);
                        this.instanceClip["levelUpPanel"].unlock_action.init(this.ind);
                    }
                    if (this.tickUpDelay > 0) {
                        this.tickUpDelay--;
                        if (this.fadingBars) {
                            this.instanceClip["XPBar"].oldXP.alpha -= 0.05;
                            this.instanceClip["XPBar"].newXP.alpha -= 0.05;
                        }
                        return;
                    }
                    else {
                        this.fadingBars = false;
                    }
                    if (this.XPDisp == battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].XP) {
                        if (battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend > 0) {
                            if (this.instanceClip["levelUpPanel"].currentFrame == 1) {
                                this.instanceClip["levelUpPanel"].gotoAndPlay(2);
                                SoundController.playSound("upgrades");
                            }
                            if (this.instanceClip["levelUpPanel"].levelUpPanel && this.instanceClip["levelUpPanel"].levelUpPanel.levelUpMess) {
                                if (battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend > 1) {
                                    Main.changeText(this.instanceClip["levelUpPanel"].levelUpPanel.levelUpMess.pointsToSpend, [String(battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend) + Localizer.getlocalisedText(" Points to Spend")[0]]);
                                }
                                else {
                                    Main.changeText(this.instanceClip["levelUpPanel"].levelUpPanel.levelUpMess.pointsToSpend, [String(battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].levelPointsLeftToSpend) + Localizer.getlocalisedText(" Point to Spend")[0]]);
                                }
                            }
                        }
                        else {
                            Main.removeCustomEfFunc('tickUpXP.onEnterFrame' + this.titanID);
                        }
                        return;
                    }
                    if (this.instanceClip["levelUpPanel"].currentFrame == 1) {
                        if (this.XPDisp < battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].XP) {
                            this.XPDisp += 0.5;
                            this.XPUpDisp += 0.5;
                        }
                        if (this.XPDisp >= battleTactics.Config.XPTOLEVELUP[this.levelDisp - 1]) {
                            this.levelDisp++;
                            this.tickUpDelay = 20;
                            this.updateInfo();
                            this.instanceClip["XPBar"].newXP.width = 185;
                            this.fadingBars = true;
                            SoundController.playSound("levelup");
                            return;
                        }
                        this.updateXPBarDisplay();
                        this.updateInfo();
                    }
                }
                clearActionInfo(e = null) {
                    Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText("Roll over action icon for info"));
                    this.instanceClip["actionPower"].gotoAndStop(1);
                }
                showLockedInfo(e = null) {
                    Main.changeText(this.instanceClip["attackDescription"], Localizer.getlocalisedText("Action locked, level up to unlock"));
                    this.instanceClip["actionPower"].gotoAndStop(1);
                }
                displayActionInfo(num) {
                    var targetName = String(num + 1);
                    var actionID = parseInt(targetName.substr(1));
                    this.instanceClip["attackDescription"].text = Localizer.getlocalisedText(battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].unitActions[actionID].description) + " - " + Localizer.getlocalisedText(battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].unitActions[actionID].label) + " " + Localizer.getlocalisedText(battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].unitActions[actionID].supplementalInfo);
                    var powerPerc = battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].unitActions[actionID].power / 10;
                    if (powerPerc > 1 || battleTactics.BattleController.persistentTeamUnits[this.titanID - 1].unitActions[actionID].alwaysShowFullPower) {
                        powerPerc = 1;
                    }
                    var dmg = Math.ceil(5 * powerPerc) + 1;
                    if (dmg < 1)
                        dmg = 1;
                    if (dmg > 6)
                        dmg = 6;
                    this.instanceClip["actionPower"].gotoAndStop(dmg);
                }
            }
            battleTactics.UpgradePanel = UpgradePanel;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var UpgradePanel = com.ussgames.battleTactics.UpgradePanel;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            class UpgradePanelContainer extends CustomMovieClip {
                constructor(clip) {
                    super(clip);
                    this.YDOWN = [164, 123, 82, 41, 0];
                    this.allUpgr = [];
                    this.info_updated = [false, false, false, false, false];
                    Transitioner.theRoot.level_up_scene.nextLevel.visible = false;
                    new NextLevelButton(Transitioner.theRoot.level_up_scene.nextLevel, "levelUp");
                    this.init();
                }
                init() {
                    this.instanceClip.up2.visible = false;
                    this.instanceClip.up3.visible = false;
                    this.instanceClip.up4.visible = false;
                    this.instanceClip.up5.visible = false;
                    this.instanceClip.y = 0;
                    Main.addCustomEfFunc('UpgradePanelContainer.onEnterFrame', this.update.bind(this));
                }
                update(e) {
                    if (!this.info_updated[0]) {
                        this.info_updated[0] = true;
                        this.allUpgr[0] = new battleTactics.UpgradePanel(this.instanceClip.up1.__1);
                        this.allUpgr[0].init(1);
                    }
                    if (battleTactics.BattleController.yourTeamUnits.length > 1) {
                        if (!this.info_updated[1]) {
                            this.info_updated[1] = true;
                            this.allUpgr[1] = new battleTactics.UpgradePanel(this.instanceClip.up2.__2);
                            this.allUpgr[1].init(2);
                            this.instanceClip.up2.visible = true;
                        }
                    }
                    if (battleTactics.BattleController.yourTeamUnits.length > 2) {
                        if (!this.info_updated[2]) {
                            this.info_updated[2] = true;
                            this.allUpgr[2] = new battleTactics.UpgradePanel(this.instanceClip.up3.__3);
                            this.allUpgr[2].init(3);
                            this.instanceClip.up3.visible = true;
                        }
                    }
                    if (battleTactics.BattleController.yourTeamUnits.length > 3) {
                        if (!this.info_updated[3]) {
                            this.info_updated[3] = true;
                            this.allUpgr[3] = new battleTactics.UpgradePanel(this.instanceClip.up4.__4);
                            this.allUpgr[3].init(4);
                            this.instanceClip.up4.visible = true;
                        }
                    }
                    if (battleTactics.BattleController.yourTeamUnits.length > 4) {
                        if (!this.info_updated[4]) {
                            this.info_updated[4] = true;
                            this.allUpgr[4] = new battleTactics.UpgradePanel(this.instanceClip.up5.__5);
                            this.allUpgr[4].init(5);
                            this.instanceClip.up5.visible = true;
                        }
                    }
                    if (battleTactics.BattleController.yourTeamUnits.length < 5) {
                        if (Math.abs(this.instanceClip.y - this.YDOWN[battleTactics.BattleController.yourTeamUnits.length - 1]) > 1) {
                            this.instanceClip.y += (this.YDOWN[battleTactics.BattleController.yourTeamUnits.length - 1] - this.instanceClip.y) / 5;
                            return;
                        }
                    }
                    Main.removeCustomEfFunc('UpgradePanelContainer.onEnterFrame');
                    this.info_updated = [false, false, false, false, false];
                    var pointsToSpend = 0;
                    for (var i = 0; i < battleTactics.BattleController.yourTeamUnits.length; i++) {
                        pointsToSpend += battleTactics.BattleController.yourTeamUnits[i].unit.levelPointsLeftToSpend;
                    }
                    if (pointsToSpend <= 0) {
                        Transitioner.theRoot.level_up_scene.nextLevel.visible = true;
                    }
                }
            }
            battleTactics.UpgradePanelContainer = UpgradePanelContainer;
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var UpgradePanelContainer = com.ussgames.battleTactics.UpgradePanelContainer;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            var buttons;
            (function (buttons) {
                class ActionButton extends SimpleButton {
                    constructor(mc) {
                        super(mc);
                        this.actionID = 1;
                    }
                    /*override*/ buttonAction() {
                        battleTactics.BattleController.selectAction(this.actionID);
                    }
                    /*override*/ over(e) {
                        Controller.root.infoPanels.actionSelectorPanel.showActionInfo(this.actionID);
                        battleTactics.BattleController.showActionGrid_forID(this.actionID);
                    }
                    /*override*/ out(e) {
                        if (battleTactics.BattleController.currentPhase != battleTactics.BattleController.ACTIONPHASE) {
                            Controller.root.infoPanels.actionSelectorPanel.clearActionInfo();
                        }
                        battleTactics.BattleController.showActionGrid_forID(0);
                    }
                }
                buttons.ActionButton = ActionButton;
            })(buttons = battleTactics.buttons || (battleTactics.buttons = {}));
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var ActionButton = com.ussgames.battleTactics.buttons.ActionButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            var buttons;
            (function (buttons) {
                class AlertButton extends SimpleButton {
                    constructor(mc, name, loc) {
                        super(mc);
                        this.name = "";
                        this.name = name;
                        this.location = loc;
                    }
                    /*override*/ buttonAction() {
                        if (this.name == "endTurn") {
                            Main.inGamePanel.closePanel("BattleController.endTurn");
                        }
                        else if (this.name == "undoMove") {
                            Main.inGamePanel.closePanel("BattleController.undo");
                        }
                    }
                }
                buttons.AlertButton = AlertButton;
            })(buttons = battleTactics.buttons || (battleTactics.buttons = {}));
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var AlertButton = com.ussgames.battleTactics.buttons.AlertButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            var buttons;
            (function (buttons) {
                class EndTurnButton extends SimpleButton {
                    constructor(mc) {
                        super(mc);
                    }
                    /*override*/ buttonAction() {
                        battleTactics.BattleController.endTurn(true);
                    }
                    /*override*/ over(e) {
                        super.over(e);
                        Main.changeText(Controller.root.infoPanels.actionSelectorPanel.instanceClip.attackDescription, Localizer.getlocalisedText("End the current turn"));
                    }
                    /*override*/ out(e) {
                        super.out(e);
                        Controller.root.infoPanels.actionSelectorPanel.clearActionInfo();
                    }
                }
                buttons.EndTurnButton = EndTurnButton;
            })(buttons = battleTactics.buttons || (battleTactics.buttons = {}));
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var EndTurnButton = com.ussgames.battleTactics.buttons.EndTurnButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            var buttons;
            (function (buttons) {
                class UndoButton extends SimpleButton {
                    constructor(mc) {
                        super(mc);
                    }
                    /*override*/ buttonAction() {
                        battleTactics.BattleController.undo(true);
                    }
                    /*override*/ over(e) {
                        super.over(e);
                        Main.changeText(Controller.root.infoPanels.actionSelectorPanel.instanceClip.attackDescription, Localizer.getlocalisedText("Undo move"));
                    }
                    /*override*/ out(e) {
                        super.out(e);
                        Controller.root.infoPanels.actionSelectorPanel.clearActionInfo();
                    }
                }
                buttons.UndoButton = UndoButton;
            })(buttons = battleTactics.buttons || (battleTactics.buttons = {}));
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var UndoButton = com.ussgames.battleTactics.buttons.UndoButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            var buttons;
            (function (buttons) {
                class UnlockActionButton extends ButtonButton {
                    constructor(mc) {
                        super(mc, "levelUp");
                    }
                    /*override*/ init(id) {
                        super.init();
                        this.titanid = id;
                    }
                    /*override*/ buttonAction() {
                        Transitioner.upgrade_panel_instance.allUpgr[this.titanid - 1].unlockAction();
                    }
                }
                buttons.UnlockActionButton = UnlockActionButton;
            })(buttons = battleTactics.buttons || (battleTactics.buttons = {}));
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var UnlockActionButton = com.ussgames.battleTactics.buttons.UnlockActionButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            var buttons;
            (function (buttons) {
                class UpgradeHPButton extends ButtonButton {
                    constructor(mc) {
                        super(mc, "levelUp");
                    }
                    /*override*/ init(id) {
                        super.init();
                        this.titanid = id;
                    }
                    /*override*/ buttonAction() {
                        Transitioner.upgrade_panel_instance.allUpgr[this.titanid - 1].upgradeHP();
                    }
                }
                buttons.UpgradeHPButton = UpgradeHPButton;
            })(buttons = battleTactics.buttons || (battleTactics.buttons = {}));
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var UpgradeHPButton = com.ussgames.battleTactics.buttons.UpgradeHPButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var battleTactics;
        (function (battleTactics) {
            var buttons;
            (function (buttons) {
                class ValidClickButton extends SimpleButton {
                    constructor(mc) {
                        super(mc);
                        this.checkAlpha = false;
                    }
                    /*override*/ init() {
                        super.init();
                    }
                    /*override*/ down(e) {
                        battleTactics.BattleController.validClick = true;
                        //console.log("ValidClickButton down>>>>>");
                    }
                    /*override*/ over(e) {
                        battleTactics.BattleController.validClick = true;
                        //console.log("ValidClickButton over>>>>>");
                    }
                    /*override*/ out(e) {
                        battleTactics.BattleController.validClick = false;
                        //console.log("ValidClickButton out>>>");
                    }
                    buttonAction() {
                        battleTactics.BattleController.mouseClicked(null);
                    }
                }
                buttons.ValidClickButton = ValidClickButton;
            })(buttons = battleTactics.buttons || (battleTactics.buttons = {}));
        })(battleTactics = ussgames.battleTactics || (ussgames.battleTactics = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var ValidClickButton = com.ussgames.battleTactics.buttons.ValidClickButton;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var game;
        (function (game) {
            class Config {
            }
            Config.SONAME = "TitansMostWantedSO_gold_2";
            Config.STARTLIVES = 3;
            Config.NUMBEROFLEVELS = 12;
            Config.RESETLIVESEVERYLEVEL = true;
            game.Config = Config;
        })(game = ussgames.game || (ussgames.game = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var general;
        (function (general) {
            class GamePanel extends CustomMovieClip {
                constructor(mc) {
                    super(mc);
                    this.inited_tut1 = false;
                    this.inited_tut2 = false;
                    this.inited_complete = false;
                    this.inited_undoEndAlert = false;
                    this.inited_gameover = false;
                    this.inited_paused = false;
                    Main.inGamePanel = this;
                }
                openPanel(panelFrameLabel, afterClose = null) {
                    console.log("openPanel", panelFrameLabel);
                    this.afterCloseFunction = afterClose;
                    this.instanceClip["panelContent"].gotoAndStop(panelFrameLabel);
                    GamePanel.panelOpen = true;
                    this.instanceClip["panelContent"].visible = true;
                    if (panelFrameLabel == "tut1") {
                        if (!this.inited_tut1) {
                            this.inited_tut1 = true;
                            new NextLevelButton(this.instanceClip.panelContent.toTutorial1, "theGame");
                        }
                    }
                    else if (panelFrameLabel == "tut2") {
                        if (!this.inited_tut2) {
                            this.inited_tut2 = true;
                            new NextLevelButton(this.instanceClip.panelContent.toTutorial, "theGame");
                        }
                    }
                    else if (panelFrameLabel == "complete") {
                        if (!this.inited_complete) {
                            this.inited_complete = true;
                            new ClosePanelButton(this.instanceClip.panelContent.victory_ok, "theGame");
                        }
                    }
                    else if (panelFrameLabel == "undoEndAlert") {
                        if (!this.inited_undoEndAlert) {
                            this.inited_undoEndAlert = true;
                            new AlertButton(this.instanceClip.panelContent.endTurn, "endTurn", "theGame");
                            new AlertButton(this.instanceClip.panelContent.undoMove, "undoMove", "theGame");
                            new ClosePanelButton(this.instanceClip.panelContent.undo_cancel, "theGame");
                        }
                    }
                    else if (panelFrameLabel == "gameover") {
                        if (!this.inited_gameover) {
                            this.inited_gameover = true;
                            new RetryLevelButton(this.instanceClip.panelContent.defeat_retry);
                            new MenuButtonInGame(this.instanceClip.panelContent.defeat_levels);
                        }
                    }
                    else if (panelFrameLabel == "paused") {
                        if (!this.inited_paused) {
                            this.inited_paused = true;
                            new RetryLevelButton(this.instanceClip.panelContent.pause_retry);
                            new MenuButtonInGame(this.instanceClip.panelContent.pause_levels);
                            new ClosePanelButton(this.instanceClip.panelContent.pause_close, "theGame");
                        }
                    }
                }
                closePanel(afterClose = null) {
                    if (afterClose != null) {
                        this.afterCloseFunction = afterClose;
                    }
                    this.instanceClip["panelContent"].visible = false;
                    console.log("closePanel", afterClose);
                    this.executeAfterCloseFunction();
                }
                executeAfterCloseFunction() {
                    GamePanel.panelOpen = false;
                    if (this.afterCloseFunction != null) {
                        //this.afterCloseFunction();
                        //eval(ts.transpile(this.afterCloseFunction()));
                        switch (this.afterCloseFunction) {
                            case "BattleController.endTurn":
                                BattleController.endTurn();
                                break;
                            case "BattleController.undo":
                                BattleController.undo();
                                break;
                            case "Controller.quitGame":
                                Controller.quitGame();
                                break;
                            case "BattleController.startTutorial":
                                BattleController.startTutorial();
                                break;
                            case "Main.gamePaused = false":
                                Main.gamePaused = false;
                                break;
                            case "Controller.main.retryLevel":
                            case "Main.retryLevel":
                                Controller.main.retryLevel();
                                break;
                            case "this.gotoLevelSelect":
                                Controller.main.stopGame();
                                Controller.transitioner.goto("levelSelect", "Controller.main.cleanUp");
                                break;
                            case "levelComplete_levelUp":
                                Controller.transitioner.goto("levelUp", "Controller.main.cleanUp");
                                break;
                            case "levelComplete_levelOver":
                                Controller.transitioner.goto("levelOver", "Controller.main.cleanUp");
                                break;
                        }
                        console.log("executeAfterCloseFunction", this.afterCloseFunction);
                    }
                }
            }
            GamePanel.panelOpen = false;
            general.GamePanel = GamePanel;
        })(general = ussgames.general || (ussgames.general = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var GamePanel = com.ussgames.general.GamePanel;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var general;
        (function (general) {
            class Localizer {
                constructor() {
                }
                static startLocalizer() {
                    var xmlFileName = "localisedtext.xml";
                    this.localisedXML = xml2js(PIXI.loader.resources[xmlFileName].xhr.response, { compact: true, spaces: 4 });
                    console.log("xml", this.localisedXML);
                    this.lang = this.localisedXML.data.use_language._attributes.code;
                    this.localisedXML = this.localisedXML.data.text;
                    Localizer.inited = true;
                }
                static getlocalisedText(originalText) {
                    //return [originalText.replace(new RegExp(/\|/,'g'), "\n")];
                    var resLocalisedText = [];
                    resLocalisedText[0] = originalText;
                    if (Localizer.inited) {
                        for (var str = 0; str < this.localisedXML.length; str++) {
                            //console.log("str", this.localisedXML[str].original_text._text);
                            var prepareOrigText = originalText.replace(new RegExp(/\|/, 'g'), "").replace(new RegExp(/ /, 'g'), "").replace(new RegExp(/\./, 'g'), "").replace(new RegExp(/\,/, 'g'), "").replace(/(\r\n|\n|\r)/gm, "");
                            var prepareLocalText = this.localisedXML[str].original_text._text.replace(new RegExp(/\|/, 'g'), "").replace(new RegExp(/ /, 'g'), "").replace(new RegExp(/\./, 'g'), "").replace(new RegExp(/\,/, 'g'), "").replace(/(\r\n|\n|\r)/gm, "");
                            //console.log("local check", prepareOrigText, prepareLocalText, prepareOrigText==prepareLocalText);
                            if (prepareOrigText.toLowerCase() == prepareLocalText.toLowerCase()) {
                                //console.log("text >>>>", this.localisedXML[str][this.lang]._text, this.localisedXML[str][this.lang], this.localisedXML[str]);
                                if (this.localisedXML[str][this.lang]._text != undefined) {
                                    resLocalisedText[0] = this.localisedXML[str][this.lang]._text.replace(new RegExp(/\|/, 'g'), "\n");
                                    if (this.localisedXML[str].changeTextSize != undefined) {
                                        resLocalisedText[1] = this.localisedXML[str].changeTextSize._text;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (resLocalisedText[0] == "") {
                        resLocalisedText[0] = originalText;
                    }
                    return resLocalisedText;
                }
            }
            Localizer.inited = false;
            Localizer.lang = "en";
            general.Localizer = Localizer;
        })(general = ussgames.general || (ussgames.general = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Localizer = com.ussgames.general.Localizer;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var general;
        (function (general) {
            class ScreenShaker {
                static init(container) {
                    ScreenShaker.gameContainer = container;
                    ScreenShaker.gcx = container.x;
                    ScreenShaker.gcy = container.y;
                    ScreenShaker.screenShakeAmount = 0;
                    ScreenShaker.screenShakeTime = 0;
                }
                static shakeScreen(amount, time) {
                    if (ScreenShaker.screenShakeTime > 0) {
                        ScreenShaker.screenShakeAmount += amount / 5;
                    }
                    else {
                        ScreenShaker.screenShakeAmount = amount;
                    }
                    if (ScreenShaker.screenShakeAmount > 5) {
                        ScreenShaker.screenShakeAmount = 5;
                    }
                    ScreenShaker.screenShakeTime = time;
                }
                static update() {
                    if (!ScreenShaker.screenShakeOn) {
                        ScreenShaker.screenShakeTime = 0;
                    }
                    if (ScreenShaker.screenShakeTime <= 0) {
                        ScreenShaker.gameContainer.x = 0;
                        ScreenShaker.gameContainer.y = 0;
                        ScreenShaker.screenShakeAmount = 0;
                    }
                    else {
                        ScreenShaker.screenShakeTime--;
                        var xR = Math.random() * (ScreenShaker.screenShakeAmount * 2);
                        var yR = Math.random() * (ScreenShaker.screenShakeAmount * 2);
                        ScreenShaker.gameContainer.x = 0 + (xR - ScreenShaker.screenShakeAmount);
                        ScreenShaker.gameContainer.y = 0 + (yR - ScreenShaker.screenShakeAmount);
                    }
                }
            }
            ScreenShaker.screenShakeTime = 0;
            ScreenShaker.screenShakeAmount = 0;
            ScreenShaker.screenShakeOn = true;
            general.ScreenShaker = ScreenShaker;
        })(general = ussgames.general || (ussgames.general = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var ScreenShaker = com.ussgames.general.ScreenShaker;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var general;
        (function (general) {
            class SoundController {
                static updateSoundButtons() {
                    if (SoundController.soundButton) {
                        SoundController.soundButton.update();
                    }
                    if (SoundController.musicButton) {
                        SoundController.musicButton.update();
                    }
                }
                static toggleSound() {
                    SoundController.soundOn = !SoundController.soundOn;
                    SoundController.updateSoundButtons();
                    Controller.saveSoundSettings();
                }
                static toggleMusic() {
                    SoundController.musicOn = !SoundController.musicOn;
                    if (!SoundController.musicOn) {
                        SoundController.stopMusic(true);
                    }
                    else {
                        if (SoundController.currentMusicID != "" && SoundController.currentMusicID != undefined) {
                            var musicToPlay = SoundController.currentMusicID;
                            SoundController.currentMusicID = "";
                            SoundController.playMusic(musicToPlay);
                        }
                    }
                    SoundController.updateSoundButtons();
                    Controller.saveSoundSettings();
                }
                static playSound(soundID) {
                    soundID = soundID.toLowerCase();
                    if (SoundController.soundOn && Main.visibilityState && Main.soundData[soundID] && soundID != "") {
                        Main.soundData[soundID].play();
                    }
                }
                static playMusic(musicID) {
                    if (SoundController.musicOn && musicID != "" && (musicID != SoundController.currentMusicID)) {
                        SoundController.stopMusic(true);
                        Main.soundMusic = Main.soundData[musicID];
                        Main.soundMusic.play();
                        //Main.soundMusic.unmute();
                    }
                    SoundController.currentMusicID = musicID;
                }
                static stopMusic(toggle = false) {
                    if (!toggle) {
                        SoundController.currentMusicID = "";
                    }
                    if (Main.soundMusic) {
                        Main.soundMusic.stop();
                        //Main.soundMusic.mute();
                    }
                }
            }
            SoundController.soundOn = true;
            SoundController.musicOn = true;
            general.SoundController = SoundController;
        })(general = ussgames.general || (ussgames.general = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var SoundController = com.ussgames.general.SoundController;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var general;
        (function (general) {
            class Transitioner extends CustomMovieClip {
                constructor(clip) {
                    super(clip);
                    this.initedLevelBtn = false;
                    this.initedCompleteBtn = false;
                }
                static setRoot(_root) {
                    Transitioner.theRoot = _root;
                }
                goto(frameLabel, _transEndFunction = null) {
                    if (this.frameLabel == frameLabel)
                        return;
                    console.log("Transitioner goto", frameLabel);
                    this.transEndFunction = _transEndFunction;
                    this.frameLabel = frameLabel;
                    //setTimeout(function () {
                    Transitioner.theRoot.transition.gotoAndPlay(13);
                    //}, 0);
                    //Transitioner.theRoot.gotoAndStop(this.frameLabel);
                    Main.addCustomEfFunc('Transitioner.onEnterFrame', function () {
                        if (Transitioner.theRoot.transition.currentFrame >= 13) {
                            Transitioner.theRoot.transition.stop();
                            this.transEnd();
                            this.frameLabel = "";
                            console.log("GOTO trans", frameLabel, _transEndFunction);
                        }
                        else if (Transitioner.theRoot.transition.currentFrame == 7) {
                            Main.removeCustomEfFunc("Transitioner.onEnterFrame");
                        }
                    }.bind(this));
                }
                transEnd() {
                    console.log("trans end", this.transEndFunction);
                    if (this.transEndFunction != null) {
                        if (this.transEndFunction == "Controller.saveSharedObject")
                            Controller.saveSharedObject();
                        if (this.transEndFunction == "Controller.main.cleanUp")
                            Controller.main.cleanUp();
                        if (this.transEndFunction == "Controller.main.resetLevel")
                            Controller.main.resetLevel();
                    }
                    if (this.frameLabel != "") {
                        Transitioner.theRoot.gotoAndStop(this.frameLabel);
                    }
                    if (this.frameLabel == "levelSelect") {
                        if (!this.initedLevelBtn) {
                            this.initedLevelBtn = true;
                            new LevelSelectButton(Controller.root.l1, "levelSelect");
                            new LevelSelectButton(Controller.root.l2, "levelSelect");
                            new LevelSelectButton(Controller.root.l3, "levelSelect");
                            new LevelSelectButton(Controller.root.l4, "levelSelect");
                            new LevelSelectButton(Controller.root.l5, "levelSelect");
                            new LevelSelectButton(Controller.root.l6, "levelSelect");
                            new LevelSelectButton(Controller.root.l7, "levelSelect");
                            new LevelSelectButton(Controller.root.l8, "levelSelect");
                            new LevelSelectButton(Controller.root.l9, "levelSelect");
                            new LevelSelectButton(Controller.root.l10, "levelSelect");
                            new LevelSelectButton(Controller.root.l11, "levelSelect");
                            new LevelSelectButton(Controller.root.l12, "levelSelect");
                            new NextLevelButton(Controller.root.newGame, "levelSelect");
                        }
                        Controller.root.l1.gotoAndStop(!Controller.isLevelUnlocked(1) ? "locked" : "out");
                        Controller.root.l2.gotoAndStop(!Controller.isLevelUnlocked(2) ? "locked" : "out");
                        Controller.root.l3.gotoAndStop(!Controller.isLevelUnlocked(3) ? "locked" : "out");
                        Controller.root.l4.gotoAndStop(!Controller.isLevelUnlocked(4) ? "locked" : "out");
                        Controller.root.l5.gotoAndStop(!Controller.isLevelUnlocked(5) ? "locked" : "out");
                        Controller.root.l6.gotoAndStop(!Controller.isLevelUnlocked(6) ? "locked" : "out");
                        Controller.root.l7.gotoAndStop(!Controller.isLevelUnlocked(7) ? "locked" : "out");
                        Controller.root.l8.gotoAndStop(!Controller.isLevelUnlocked(8) ? "locked" : "out");
                        Controller.root.l9.gotoAndStop(!Controller.isLevelUnlocked(9) ? "locked" : "out");
                        Controller.root.l10.gotoAndStop(!Controller.isLevelUnlocked(10) ? "locked" : "out");
                        Controller.root.l11.gotoAndStop(!Controller.isLevelUnlocked(11) ? "locked" : "out");
                        Controller.root.l12.gotoAndStop(!Controller.isLevelUnlocked(12) ? "locked" : "out");
                    }
                    if (this.frameLabel == "levelUp") {
                        general.SoundController.playMusic("tune3");
                        Transitioner.theRoot.level_up_scene.play();
                        if (Transitioner.upgrade_panel_instance == undefined) {
                            Transitioner.upgrade_panel_instance = new UpgradePanelContainer(Transitioner.theRoot.level_up_scene.upgrade_panel_container);
                        }
                        else
                            Transitioner.upgrade_panel_instance.init();
                    }
                    if (this.frameLabel == "levelOver") {
                        Transitioner.theRoot.level_over_scene.gotoAndPlay("level" + String(Controller.getLevelNumber()));
                        Main.addCustomEfFunc('Transitioner.theRoot.level_over_scene.onEnterFrame', function () {
                            var allEnds = [121, 209, 284, 359, 445, 520, 595, 670, 758, 846, 1005];
                            if (allEnds.indexOf(Transitioner.theRoot.level_over_scene.currentFrame) > -1 ||
                                (Transitioner.theRoot.level_over_scene.currentFrame > 990)) {
                                Transitioner.theRoot.level_over_scene.stop();
                                Controller.transitioner.goto("levelUp");
                                Main.removeCustomEfFunc("Transitioner.theRoot.level_over_scene.onEnterFrame");
                            }
                        });
                    }
                    if (this.frameLabel == "complete") {
                        if (!this.initedCompleteBtn) {
                            this.initedCompleteBtn = true;
                            new MenuButton(Transitioner.theRoot.NextButton_complete, "complete");
                        }
                    }
                    Transitioner.theRoot.transition.gotoAndPlay(1);
                }
            }
            general.Transitioner = Transitioner;
        })(general = ussgames.general || (ussgames.general = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var Transitioner = com.ussgames.general.Transitioner;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BankRobberAttack extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 1;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.label = "Punch";
                    this.description = "Short range";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.BankRobberAttack = BankRobberAttack;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BankRobberAttack = com.ussgames.teenTitansBattleQuest.BankRobberAttack;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BankRobberLongRngeAttack extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 3;
                    this.power = 1;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("RockFly");
                    this.label = "Slingshot";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.BankRobberLongRngeAttack = BankRobberLongRngeAttack;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BankRobberLongRngeAttack = com.ussgames.teenTitansBattleQuest.BankRobberLongRngeAttack;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BattleQuestMain extends Main {
                constructor() {
                    super();
                }
                /*override*/ initGame() {
                    if (Controller.root.levelTester) {
                        this.initNow();
                    }
                    BattleQuestMain.levelToPlay = teenTitansBattleQuest.LevelData.getLevelData(Controller.getLevelNumber());
                    this.initNow();
                }
                initNow() {
                    this.battleQuestMap = new BTMap();
                    this.battleQuestMap.initMapLayers(Controller.root.gameContainer);
                    this.battleQuestMap.initMap(BattleQuestMain.levelToPlay);
                    this.battleQuestMap.initView();
                    this.battleQuestMap.depthSortView();
                    Cinematics.speechBubbleCount = -1;
                    BattleController.initBattle(this.battleQuestMap);
                }
                /*override*/ update() {
                    BattleController.update();
                }
                /*override*/ cleanUp() {
                    BattleController.cleanUp();
                }
            }
            BattleQuestMain.levelToPlay = "";
            teenTitansBattleQuest.BattleQuestMain = BattleQuestMain;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BattleQuestMain = com.ussgames.teenTitansBattleQuest.BattleQuestMain;
new BattleQuestMain();
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BeastBoyCatHide extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 0;
                    this.maxRange = 0;
                    this.power = 0;
                    this.level = 1; //2;
                    this.coolDown = 1;
                    this.type = Action.SELF;
                    this.label = "Kitty Camo";
                    this.description = "Special Action";
                    this.iconFrame = 3;
                }
                /*override*/ performSelfAction(thisUnit) {
                    thisUnit.attackable = false;
                    return true;
                }
            }
            teenTitansBattleQuest.BeastBoyCatHide = BeastBoyCatHide;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BeastBoyCatHide = com.ussgames.teenTitansBattleQuest.BeastBoyCatHide;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BeastBoyCheetahDash extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 5;
                    this.power = 6;
                    this.level = 1; // 4;
                    this.coolDown = 3;
                    this.type = Action.ATTACK;
                    this.straightLineOnly = true;
                    this.attackMultipleUnits = false;
                    this.dashAttack = true;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("CheetahAttackAnim");
                    this.adjustBlastClipHeight = false;
                    this.canBeCountered = false;
                    this.label = "Cheetah Slash";
                    this.description = "Dash Attack";
                    this.iconFrame = 6;
                    this.unlockTutorialFrame = 5;
                }
            }
            teenTitansBattleQuest.BeastBoyCheetahDash = BeastBoyCheetahDash;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BeastBoyCheetahDash = com.ussgames.teenTitansBattleQuest.BeastBoyCheetahDash;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BeastBoyGorillaPunch extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 3;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.battleAnimOffset = 100;
                    this.label = "Gorilla Punch";
                    this.description = "Melee Attack";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.BeastBoyGorillaPunch = BeastBoyGorillaPunch;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BeastBoyGorillaPunch = com.ussgames.teenTitansBattleQuest.BeastBoyGorillaPunch;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BeastBoyMoquito extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 2;
                    this.power = 0;
                    this.level = 1; // 3;
                    this.coolDown = 2;
                    this.type = Action.ATTACK;
                    this.attackMultipleUnits = true;
                    this.poisonTurns = 999;
                    this.poisonPower = 1;
                    this.canBeCountered = false;
                    this.useStandardDamagePerc = false;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("MozzieAnim");
                    this.label = "Moquito Bite";
                    this.description = "Poison Attack";
                    this.supplementalInfo = "(affects surrounding squares)";
                    this.iconFrame = 8;
                    this.unlockTutorialFrame = 2;
                }
                /*override*/ alternateDamageDisplay(attackingUnit, targetUnit, map) {
                    return "POISON";
                }
            }
            teenTitansBattleQuest.BeastBoyMoquito = BeastBoyMoquito;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BeastBoyMoquito = com.ussgames.teenTitansBattleQuest.BeastBoyMoquito;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BillyNumerousKick extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 3;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.label = "Karate Kick";
                    this.description = "Short range";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.BillyNumerousKick = BillyNumerousKick;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var BillyNumerousKick = com.ussgames.teenTitansBattleQuest.BillyNumerousKick;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class BlackHoleResidualEffect extends ResidualEffect {
                constructor() {
                    super();
                }
                /*override*/ init(map, originatingUnit, mapX, mapY) {
                    super.init(map, originatingUnit, mapX, mapY);
                    this.effectClip = Main.addGAFMovieClip("BlackholeEffect");
                    this.effectClip.x = (mapX * Config.GRIDSIZEX) + (Config.GRIDSIZEX / 2);
                    this.effectClip.y = (mapY * Config.GRIDSIZEY) + (Config.GRIDSIZEY / 2);
                    map.objectsContainerClip.addChild(this.effectClip);
                    this.effectCountDown = teenTitansBattleQuest.RavenBlackHole.BLACKHOLETIME;
                    this.reduceHPOfUnits(map);
                }
                /*override*/ update(map) {
                    for (var i = 0; i < map.unitsInPlay.length; i++) {
                        if (map.unitsInPlay[i].state == UnitInPlay.IDLE && Math.abs(this.mapX - map.unitsInPlay[i].mapX) <= 1 && Math.abs(this.mapY - map.unitsInPlay[i].mapY) <= 1) {
                            if (map.unitsInPlay[i].currentHP <= 0) {
                                map.unitsInPlay[i].currentHP = 0;
                                // suck it in!
                                map.unitsInPlay[i].actioned = true;
                                map.unitsInPlay[i].externalForcesActing = true;
                                map.unitsInPlay[i].clip.x += (this.effectClip.x - map.unitsInPlay[i].clip.x) / 3;
                                map.unitsInPlay[i].clip.y += (this.effectClip.y - map.unitsInPlay[i].clip.y) / 3;
                                map.unitsInPlay[i].clip.scale.x *= 0.9;
                                map.unitsInPlay[i].clip.scale.x *= 0.9;
                                if ((Math.abs(this.effectClip.x - map.unitsInPlay[i].clip.x) <= 2 && Math.abs(this.effectClip.y - map.unitsInPlay[i].clip.y) <= 2) || (Math.abs(map.unitsInPlay[i].clip.scale.x) < 0.1)) {
                                    map.removeDeadUnits();
                                }
                            }
                        }
                    }
                }
                /*override*/ endTeamTurn(team, map) {
                    BlackHoleResidualEffect.unitsAffected = [];
                    this.effectCountDown--;
                    if (this.effectCountDown <= 0) {
                        this.effectLive = false;
                        this.effectClip.gotoAndPlay("vanish");
                    }
                    else {
                        this.reduceHPOfUnits(map, team);
                    }
                }
                reduceHPOfUnits(map, team = 0) {
                    for (var i = 0; i < map.unitsInPlay.length; i++) {
                        if (BlackHoleResidualEffect.unitsAffected.indexOf(map.unitsInPlay[i]) < 0 && (team == 0 || map.unitsInPlay[i].team == team) && map.unitsInPlay[i].state == UnitInPlay.IDLE && Math.abs(this.mapX - map.unitsInPlay[i].mapX) <= 1 && Math.abs(this.mapY - map.unitsInPlay[i].mapY) <= 1) {
                            var damage = BlackHoleResidualEffect.BLACKHOLEDAMAGE;
                            if (damage > map.unitsInPlay[i].currentHP) {
                                damage = Math.floor(map.unitsInPlay[i].currentHP);
                            }
                            map.unitsInPlay[i].currentHP -= damage;
                            BattleController.showDamageRiser(damage, map.unitsInPlay[i]);
                            if (map.unitsInPlay[i].currentHP <= 0) {
                                map.unitsInPlay[i].currentHP = 0;
                                map.unitsInPlay[i].actioned = true;
                                map.unitsInPlay[i].externalForcesActing = true;
                                BlackHoleResidualEffect.unitsAffected.push(map.unitsInPlay[i]);
                            }
                        }
                    }
                }
            }
            BlackHoleResidualEffect.BLACKHOLEDAMAGE = 2;
            BlackHoleResidualEffect.unitsAffected = [];
            teenTitansBattleQuest.BlackHoleResidualEffect = BlackHoleResidualEffect;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class CyborgDashAttack extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 5;
                    this.power = 8;
                    this.level = 1; //4;
                    this.coolDown = 4;
                    this.type = Action.ATTACK;
                    this.straightLineOnly = true;
                    this.attackMultipleUnits = true;
                    this.stopAtSurvivorUnit = true;
                    this.dashAttack = true;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("CyborgDashAttackAnim");
                    this.adjustBlastClipHeight = false;
                    this.canBeCountered = false;
                    this.label = "Jetpack Bash";
                    this.description = "Dash Attack";
                    this.iconFrame = 6;
                    this.unlockTutorialFrame = 4;
                }
            }
            teenTitansBattleQuest.CyborgDashAttack = CyborgDashAttack;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var CyborgDashAttack = com.ussgames.teenTitansBattleQuest.CyborgDashAttack;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class CyborgFistSmash extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 3;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.battleAnimOffset = 50;
                    this.label = "Punch";
                    this.description = "Melee Attack";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.CyborgFistSmash = CyborgFistSmash;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var CyborgFistSmash = com.ussgames.teenTitansBattleQuest.CyborgFistSmash;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class CyborgGroundPound extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 2;
                    this.power = 2;
                    this.level = 1; // 2
                    this.coolDown = 2;
                    this.type = Action.ATTACK;
                    this.battleAnimOffset = 50;
                    this.attackMultipleUnits = true;
                    this.distanceAffectsPower = true;
                    this.canBeCountered = false;
                    this.friendlyFire = true;
                    this.label = "Ground Pound";
                    this.description = "Special Attack";
                    this.supplementalInfo = "(affects surrounding squares)";
                    this.iconFrame = 7;
                    this.unlockTutorialFrame = 3;
                }
            }
            teenTitansBattleQuest.CyborgGroundPound = CyborgGroundPound;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var CyborgGroundPound = com.ussgames.teenTitansBattleQuest.CyborgGroundPound;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class CyborgLaserArm extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 4;
                    this.power = 4;
                    this.level = 1; // 3
                    this.coolDown = 3;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("CyborgLaserAnim");
                    this.label = "Sonic Cannon";
                    this.description = "Range Attack";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.CyborgLaserArm = CyborgLaserArm;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var CyborgLaserArm = com.ussgames.teenTitansBattleQuest.CyborgLaserArm;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class DemonScare extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 3;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.label = "Scare";
                    this.description = "Short range";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.DemonScare = DemonScare;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var DemonScare = com.ussgames.teenTitansBattleQuest.DemonScare;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class DrLightBeamBlast extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 5;
                    this.power = 3;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("LightBeamBlastAnim");
                    this.label = "Beam Blast";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.DrLightBeamBlast = DrLightBeamBlast;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var DrLightBeamBlast = com.ussgames.teenTitansBattleQuest.DrLightBeamBlast;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class DrLightBeamBlastHolo extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 3;
                    this.power = 2;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("LightBeamBlastAnim");
                    this.label = "Holo Beam Blast";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.DrLightBeamBlastHolo = DrLightBeamBlastHolo;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var DrLightBeamBlastHolo = com.ussgames.teenTitansBattleQuest.DrLightBeamBlastHolo;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class GizmoAttack extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 3;
                    this.power = 5;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("SpannerThrowAnim");
                    this.label = "Wrench Throw";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.GizmoAttack = GizmoAttack;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var GizmoAttack = com.ussgames.teenTitansBattleQuest.GizmoAttack;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class JinxHex extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 6;
                    this.power = 0;
                    this.level = 1;
                    this.coolDown = 1;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("JinxHexSpellAnim");
                    this.adjustBlastClipHeight = false;
                    this.placeBlastClipBehind = false;
                    this.label = "Hex";
                    this.iconFrame = 8;
                }
                /*override*/ actionExtraEffect(targetUnit, map) {
                    //super.actionExtraEffect(targetUnit, map);
                    JinxHex.hexedUnit = this.actionTargetUnit;
                }
            }
            teenTitansBattleQuest.JinxHex = JinxHex;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var JinxHex = com.ussgames.teenTitansBattleQuest.JinxHex;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class JinxKick extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 4;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.label = "Karate Kick";
                    this.description = "Short range";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.JinxKick = JinxKick;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var JinxKick = com.ussgames.teenTitansBattleQuest.JinxKick;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class KamikazePieAttack extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 3;
                    this.power = 2;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.canBeCountered = false;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("MayEyePieAttackAnim");
                    this.label = "Kamikaze";
                    this.iconFrame = 2;
                }
                /*override*/ actionEnded(thisUnit, map) {
                    //super.actionEnded(thisUnit, map);
                    thisUnit.currentHP = 0;
                }
            }
            teenTitansBattleQuest.KamikazePieAttack = KamikazePieAttack;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var KamikazePieAttack = com.ussgames.teenTitansBattleQuest.KamikazePieAttack;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class LevelData {
                static getLevelData(levelNumber) {
                    return LevelData.ALLLEVELS[levelNumber - 1];
                }
            }
            LevelData.LEVEL1DATA = "<level_data><level_size data=\"8,4\" /><layer_0_0 data=\"0,0,0,0\" /><layer_0_1 data=\"0,3,0,0\" /><layer_0_2 data=\"0,0,0,0\" /><layer_0_3 data=\"0,0,0,0\" /><layer_0_4 data=\"0,0,0,0\" /><layer_0_5 data=\"0,0,0,0\" /><layer_0_6 data=\"0,0,0,0\" /><layer_0_7 data=\"0,0,0,4\" /><layer_1_0 data=\"0,0,0,0\" /><layer_1_1 data=\"0,0,0,0\" /><layer_1_2 data=\"0,0,1,0\" /><layer_1_3 data=\"0,0,0,0\" /><layer_1_4 data=\"0,0,6,0\" /><layer_1_5 data=\"0,0,0,0\" /><layer_1_6 data=\"0,6,0,0\" /><layer_1_7 data=\"0,0,0,0\" /><layer_2_0 data=\"0,0,0,0\" /><layer_2_1 data=\"0,0,0,0\" /><layer_2_2 data=\"0,0,0,0\" /><layer_2_3 data=\"0,0,0,0\" /><layer_2_4 data=\"0,0,0,0\" /><layer_2_5 data=\"0,0,0,0\" /><layer_2_6 data=\"0,0,0,0\" /><layer_2_7 data=\"0,0,0,0\" /><layer_3_0 data=\"0,0,0,0\" /><layer_3_1 data=\"0,0,0,0\" /><layer_3_2 data=\"0,0,0,0\" /><layer_3_3 data=\"0,0,0,0\" /><layer_3_4 data=\"0,0,0,0\" /><layer_3_5 data=\"0,0,0,0\" /><layer_3_6 data=\"0,0,0,0\" /><layer_3_7 data=\"0,0,0,0\" /><layer_4_0 data=\"0,0,0,0\" /><layer_4_1 data=\"0,0,0,0\" /><layer_4_2 data=\"0,0,0,0\" /><layer_4_3 data=\"0,0,0,0\" /><layer_4_4 data=\"0,0,0,0\" /><layer_4_5 data=\"0,0,0,0\" /><layer_4_6 data=\"0,0,0,0\" /><layer_4_7 data=\"0,0,0,0\" /><layer_5_0 data=\"0,0,0,0\" /><layer_5_1 data=\"0,0,0,0\" /><layer_5_2 data=\"0,0,0,0\" /><layer_5_3 data=\"0,0,0,0\" /><layer_5_4 data=\"0,0,0,0\" /><layer_5_5 data=\"0,0,0,0\" /><layer_5_6 data=\"0,0,0,0\" /><layer_5_7 data=\"0,0,0,0\" /><layer_6_0 data=\"0,0,0,0\" /><layer_6_1 data=\"0,0,0,0\" /><layer_6_2 data=\"0,0,0,0\" /><layer_6_3 data=\"0,0,0,0\" /><layer_6_4 data=\"0,0,0,0\" /><layer_6_5 data=\"0,0,0,0\" /><layer_6_6 data=\"0,0,0,0\" /><layer_6_7 data=\"0,0,0,0\" /><map_bg data=\"1\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"Where do you think|you\'re going?\" char=\"1\" /><start_speech_2 speech=\"\" char=\"1\" /><start_speech_3 speech=\"\" char=\"1\" /><start_speech_4 speech=\"\" char=\"1\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"Great! Now I\'ll never make it to|the Crime Convention on time.\" char=\"6\" /><end_speech_2 speech=\"Crime Convention?\" char=\"1\" /><end_speech_3 speech=\"\" char=\"1\" /><end_speech_4 speech=\"\" char=\"1\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.LEVEL2DATA = "<level_data><level_size data=\"10,4\" /><layer_0_0 data=\"0,0,0,0\" /><layer_0_1 data=\"0,0,0,0\" /><layer_0_2 data=\"0,0,0,0\" /><layer_0_3 data=\"0,0,0,0\" /><layer_0_4 data=\"0,0,0,0\" /><layer_0_5 data=\"0,0,0,0\" /><layer_0_6 data=\"0,0,0,0\" /><layer_0_7 data=\"0,0,0,0\" /><layer_0_8 data=\"0,0,0,0\" /><layer_0_9 data=\"0,0,0,0\" /><layer_1_0 data=\"0,0,0,5\" /><layer_1_1 data=\"0,4,0,0\" /><layer_1_2 data=\"0,0,1,0\" /><layer_1_3 data=\"0,0,0,0\" /><layer_1_4 data=\"0,0,0,0\" /><layer_1_5 data=\"0,0,16,0\" /><layer_1_6 data=\"0,0,0,6\" /><layer_1_7 data=\"16,0,0,0\" /><layer_1_8 data=\"0,0,0,0\" /><layer_1_9 data=\"0,6,0,0\" /><layer_2_0 data=\"0,0,0,0\" /><layer_2_1 data=\"0,0,0,0\" /><layer_2_2 data=\"0,0,0,0\" /><layer_2_3 data=\"0,0,0,0\" /><layer_2_4 data=\"0,0,0,0\" /><layer_2_5 data=\"0,0,0,0\" /><layer_2_6 data=\"0,0,0,0\" /><layer_2_7 data=\"0,0,0,0\" /><layer_2_8 data=\"0,0,0,0\" /><layer_2_9 data=\"0,0,0,0\" /><layer_3_0 data=\"0,0,0,0\" /><layer_3_1 data=\"0,0,0,0\" /><layer_3_2 data=\"0,0,0,0\" /><layer_3_3 data=\"0,0,0,0\" /><layer_3_4 data=\"0,0,0,0\" /><layer_3_5 data=\"0,0,0,0\" /><layer_3_6 data=\"0,0,0,0\" /><layer_3_7 data=\"0,0,0,0\" /><layer_3_8 data=\"0,0,0,0\" /><layer_3_9 data=\"0,0,0,0\" /><layer_4_0 data=\"0,0,0,0\" /><layer_4_1 data=\"0,0,0,0\" /><layer_4_2 data=\"0,0,0,0\" /><layer_4_3 data=\"0,0,0,0\" /><layer_4_4 data=\"0,0,0,0\" /><layer_4_5 data=\"0,0,0,0\" /><layer_4_6 data=\"0,0,0,0\" /><layer_4_7 data=\"0,0,0,0\" /><layer_4_8 data=\"0,0,0,0\" /><layer_4_9 data=\"0,0,0,0\" /><layer_5_0 data=\"0,0,0,0\" /><layer_5_1 data=\"0,0,0,0\" /><layer_5_2 data=\"0,0,0,0\" /><layer_5_3 data=\"0,0,0,0\" /><layer_5_4 data=\"0,0,0,0\" /><layer_5_5 data=\"0,0,0,0\" /><layer_5_6 data=\"0,0,0,0\" /><layer_5_7 data=\"0,0,0,0\" /><layer_5_8 data=\"0,0,0,0\" /><layer_5_9 data=\"0,0,0,0\" /><layer_6_0 data=\"0,0,0,0\" /><layer_6_1 data=\"0,0,0,0\" /><layer_6_2 data=\"0,0,0,0\" /><layer_6_3 data=\"0,0,0,0\" /><layer_6_4 data=\"0,0,0,0\" /><layer_6_5 data=\"0,0,0,0\" /><layer_6_6 data=\"0,0,0,0\" /><layer_6_7 data=\"0,0,0,0\" /><layer_6_8 data=\"0,0,0,0\" /><layer_6_9 data=\"0,0,0,0\" /><map_bg data=\"4\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"Guys! Guys! Great news!|The Crime Convention's in town!\" char=\"1\" /><start_speech_2 speech=\"Yeah, we noticed.\" char=\"4\" /><start_speech_3 speech=\"\" char=\"1\" /><start_speech_4 speech=\"\" char=\"1\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"Ohhh, yeah!|Let the Bad Guy|Bingo begin!\" char=\"1\" /><end_speech_2 speech=\"What is this bingo|of the bad guys?\" char=\"5\" /><end_speech_3 speech=\"If we can take down 14|villains in one day, we'll|break Batman's world record.\" char=\"1\" /><end_speech_4 speech=\"\" char=\"1\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.LEVEL3DATA = "<level_data><level_size data=\"9,4\" /><layer_0_0 data=\"0,0,0,0\" /><layer_0_1 data=\"0,0,0,0\" /><layer_0_2 data=\"0,0,0,0\" /><layer_0_3 data=\"0,0,0,0\" /><layer_0_4 data=\"0,8,8,0\" /><layer_0_5 data=\"0,8,8,0\" /><layer_0_6 data=\"0,0,0,0\" /><layer_0_7 data=\"0,0,0,0\" /><layer_0_8 data=\"0,0,0,0\" /><layer_1_0 data=\"0,0,0,0\" /><layer_1_1 data=\"4,3,0,0\" /><layer_1_2 data=\"0,0,0,2\" /><layer_1_3 data=\"1,0,0,0\" /><layer_1_4 data=\"0,0,0,5\" /><layer_1_5 data=\"0,0,0,0\" /><layer_1_6 data=\"17,0,0,17\" /><layer_1_7 data=\"0,6,0,6\" /><layer_1_8 data=\"17,0,7,0\" /><layer_2_0 data=\"0,0,0,0\" /><layer_2_1 data=\"0,0,0,0\" /><layer_2_2 data=\"0,0,0,0\" /><layer_2_3 data=\"0,0,0,0\" /><layer_2_4 data=\"0,0,0,0\" /><layer_2_5 data=\"0,0,0,0\" /><layer_2_6 data=\"0,0,0,0\" /><layer_2_7 data=\"0,0,0,0\" /><layer_2_8 data=\"0,0,0,0\" /><layer_3_0 data=\"0,0,0,0\" /><layer_3_1 data=\"0,0,0,0\" /><layer_3_2 data=\"0,0,0,0\" /><layer_3_3 data=\"0,0,0,0\" /><layer_3_4 data=\"0,0,0,0\" /><layer_3_5 data=\"0,0,0,0\" /><layer_3_6 data=\"0,0,0,0\" /><layer_3_7 data=\"0,0,0,0\" /><layer_3_8 data=\"0,0,0,0\" /><layer_4_0 data=\"0,0,0,0\" /><layer_4_1 data=\"0,0,0,0\" /><layer_4_2 data=\"0,0,0,0\" /><layer_4_3 data=\"0,0,0,0\" /><layer_4_4 data=\"0,0,0,0\" /><layer_4_5 data=\"0,0,0,0\" /><layer_4_6 data=\"0,0,0,0\" /><layer_4_7 data=\"0,0,0,0\" /><layer_4_8 data=\"0,0,0,0\" /><layer_5_0 data=\"0,0,0,0\" /><layer_5_1 data=\"0,0,0,0\" /><layer_5_2 data=\"0,0,0,0\" /><layer_5_3 data=\"0,0,0,0\" /><layer_5_4 data=\"0,0,0,0\" /><layer_5_5 data=\"0,0,0,0\" /><layer_5_6 data=\"0,0,0,0\" /><layer_5_7 data=\"0,0,0,0\" /><layer_5_8 data=\"0,0,0,0\" /><layer_6_0 data=\"0,0,0,0\" /><layer_6_1 data=\"0,0,0,0\" /><layer_6_2 data=\"0,0,0,0\" /><layer_6_3 data=\"0,0,0,0\" /><layer_6_4 data=\"0,0,0,0\" /><layer_6_5 data=\"0,0,0,0\" /><layer_6_6 data=\"0,0,0,0\" /><layer_6_7 data=\"0,0,0,0\" /><layer_6_8 data=\"0,0,0,0\" /><map_bg data=\"10\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"Do we have to start|with Mother Mae Eye?\" char=\"2\" /><start_speech_2 speech=\"Yeah, dude.|Her pies are delicious!\" char=\"3\" /><start_speech_3 speech=\"Not as delicious as justice.||Titans, GO!\" char=\"1\" /><start_speech_4 speech=\"\" char=\"1\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"Jump City is|crawling with villains!\" char=\"3\" /><end_speech_2 speech=\"We\'d better get down|to the convention center!\" char=\"2\" /><end_speech_3 speech=\"\" char=\"1\" /><end_speech_4 speech=\"\" char=\"1\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.LEVEL4DATA = "<level_data><level_size data=\"9,5\" /><layer_0_0 data=\"0,7,0,0,0\" /><layer_0_1 data=\"0,0,0,0,0\" /><layer_0_2 data=\"0,0,0,0,0\" /><layer_0_3 data=\"0,0,0,3,0\" /><layer_0_4 data=\"7,0,0,0,0\" /><layer_0_5 data=\"0,0,0,7,0\" /><layer_0_6 data=\"0,0,0,0,0\" /><layer_0_7 data=\"0,0,0,0,0\" /><layer_0_8 data=\"0,0,0,0,0\" /><layer_1_0 data=\"0,0,0,2,0\" /><layer_1_1 data=\"5,3,0,0,4\" /><layer_1_2 data=\"0,0,1,0,0\" /><layer_1_3 data=\"0,0,0,0,0\" /><layer_1_4 data=\"0,0,0,0,0\" /><layer_1_5 data=\"0,0,0,0,0\" /><layer_1_6 data=\"0,0,13,6,0\" /><layer_1_7 data=\"0,6,0,0,0\" /><layer_1_8 data=\"16,0,0,0,16\" /><layer_2_0 data=\"0,0,0,0,0\" /><layer_2_1 data=\"0,0,0,0,0\" /><layer_2_2 data=\"0,0,0,0,0\" /><layer_2_3 data=\"0,0,0,0,0\" /><layer_2_4 data=\"0,0,0,0,0\" /><layer_2_5 data=\"0,0,0,0,0\" /><layer_2_6 data=\"0,0,0,0,0\" /><layer_2_7 data=\"0,0,0,0,0\" /><layer_2_8 data=\"0,0,0,0,0\" /><layer_3_0 data=\"0,0,0,0,0\" /><layer_3_1 data=\"0,0,0,0,0\" /><layer_3_2 data=\"0,0,0,0,0\" /><layer_3_3 data=\"0,0,0,0,0\" /><layer_3_4 data=\"0,0,0,0,0\" /><layer_3_5 data=\"0,0,0,0,0\" /><layer_3_6 data=\"0,0,0,0,0\" /><layer_3_7 data=\"0,0,0,0,0\" /><layer_3_8 data=\"0,0,0,0,0\" /><layer_4_0 data=\"0,0,0,0,0\" /><layer_4_1 data=\"0,0,0,0,0\" /><layer_4_2 data=\"0,0,0,0,0\" /><layer_4_3 data=\"0,0,0,0,0\" /><layer_4_4 data=\"0,0,0,0,0\" /><layer_4_5 data=\"0,0,0,0,0\" /><layer_4_6 data=\"0,0,0,0,0\" /><layer_4_7 data=\"0,0,0,0,0\" /><layer_4_8 data=\"0,0,0,0,0\" /><layer_5_0 data=\"0,0,0,0,0\" /><layer_5_1 data=\"0,0,0,0,0\" /><layer_5_2 data=\"0,0,0,0,0\" /><layer_5_3 data=\"0,0,0,0,0\" /><layer_5_4 data=\"0,0,0,0,0\" /><layer_5_5 data=\"0,0,0,0,0\" /><layer_5_6 data=\"0,0,0,0,0\" /><layer_5_7 data=\"0,0,0,0,0\" /><layer_5_8 data=\"0,0,0,0,0\" /><layer_6_0 data=\"0,0,0,0,0\" /><layer_6_1 data=\"0,0,0,0,0\" /><layer_6_2 data=\"0,0,0,0,0\" /><layer_6_3 data=\"0,0,0,0,0\" /><layer_6_4 data=\"0,0,0,0,0\" /><layer_6_5 data=\"0,0,0,0,0\" /><layer_6_6 data=\"0,0,0,0,0\" /><layer_6_7 data=\"0,0,0,0,0\" /><layer_6_8 data=\"0,0,0,0,0\" /><map_bg data=\"5\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"All right, Mammoth.|Prepare to get stamped!\" char=\"1\" /><start_speech_2 speech=\"Let\'s just get|this over with.\" char=\"4\" /><start_speech_3 speech=\"\" char=\"1\" /><start_speech_4 speech=\"\" char=\"1\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"At this rate, we\'ll|never catch all 14|villains in a day!\" char=\"2\" /><end_speech_2 speech=\"We\'d better split up.\" char=\"4\" /><end_speech_3 speech=\"Star and I will head inside.|You three search the streets.|GO!\" char=\"1\" /><end_speech_4 speech=\"\" char=\"1\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.LEVEL5DATA = "<level_data><level_size data=\"9,5\" /><layer_0_0 data=\"0,0,0,0,0\" /><layer_0_1 data=\"0,0,0,0,0\" /><layer_0_2 data=\"0,0,0,0,0\" /><layer_0_3 data=\"0,0,0,0,0\" /><layer_0_4 data=\"0,0,0,0,0\" /><layer_0_5 data=\"0,11,0,11,0\" /><layer_0_6 data=\"0,0,0,0,0\" /><layer_0_7 data=\"0,0,0,0,0\" /><layer_0_8 data=\"0,0,0,0,0\" /><layer_1_0 data=\"0,0,0,0,0\" /><layer_1_1 data=\"0,0,0,0,0\" /><layer_1_2 data=\"0,5,0,1,0\" /><layer_1_3 data=\"0,0,0,0,0\" /><layer_1_4 data=\"0,0,0,0,0\" /><layer_1_5 data=\"0,0,0,0,0\" /><layer_1_6 data=\"0,0,0,0,0\" /><layer_1_7 data=\"0,0,0,0,0\" /><layer_1_8 data=\"18,0,9,0,18\" /><layer_2_0 data=\"0,0,0,0,0\" /><layer_2_1 data=\"0,0,0,0,0\" /><layer_2_2 data=\"0,0,0,0,0\" /><layer_2_3 data=\"0,0,0,0,0\" /><layer_2_4 data=\"0,0,0,0,0\" /><layer_2_5 data=\"0,0,0,0,0\" /><layer_2_6 data=\"0,0,0,0,0\" /><layer_2_7 data=\"0,0,0,0,0\" /><layer_2_8 data=\"0,0,0,0,0\" /><layer_3_0 data=\"0,0,0,0,0\" /><layer_3_1 data=\"0,0,0,0,0\" /><layer_3_2 data=\"0,0,0,0,0\" /><layer_3_3 data=\"0,0,0,0,0\" /><layer_3_4 data=\"0,0,0,0,0\" /><layer_3_5 data=\"0,0,0,0,0\" /><layer_3_6 data=\"0,0,0,0,0\" /><layer_3_7 data=\"0,0,0,0,0\" /><layer_3_8 data=\"0,0,0,0,0\" /><layer_4_0 data=\"0,0,0,0,0\" /><layer_4_1 data=\"0,0,0,0,0\" /><layer_4_2 data=\"0,0,0,0,0\" /><layer_4_3 data=\"0,0,0,0,0\" /><layer_4_4 data=\"0,0,0,0,0\" /><layer_4_5 data=\"0,0,0,0,0\" /><layer_4_6 data=\"0,0,0,0,0\" /><layer_4_7 data=\"0,0,0,0,0\" /><layer_4_8 data=\"0,0,0,0,0\" /><layer_5_0 data=\"0,0,0,0,0\" /><layer_5_1 data=\"0,0,0,0,0\" /><layer_5_2 data=\"0,0,0,0,0\" /><layer_5_3 data=\"0,0,0,0,0\" /><layer_5_4 data=\"0,0,0,0,0\" /><layer_5_5 data=\"0,0,0,0,0\" /><layer_5_6 data=\"0,0,0,0,0\" /><layer_5_7 data=\"0,0,0,0,0\" /><layer_5_8 data=\"0,0,0,0,0\" /><layer_6_0 data=\"0,0,0,0,0\" /><layer_6_1 data=\"0,0,0,0,0\" /><layer_6_2 data=\"0,0,0,0,0\" /><layer_6_3 data=\"0,0,0,0,0\" /><layer_6_4 data=\"0,0,0,0,0\" /><layer_6_5 data=\"0,0,0,0,0\" /><layer_6_6 data=\"0,0,0,0,0\" /><layer_6_7 data=\"0,0,0,0,0\" /><layer_6_8 data=\"0,0,0,0,0\" /><map_bg data=\"6\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"Now where did I park?\" char=\"9\" /><start_speech_2 speech=\"Is that not|the Dr. Light?\" char=\"5\" /><start_speech_3 speech=\"Get him!\" char=\"1\" /><start_speech_4 speech=\"You\'re outnumbered,|boy wonder!\" char=\"9\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"Looks like it\'s lights|out for Dr. Light.\" char=\"1\" /><end_speech_2 speech=\"\" char=\"1\" /><end_speech_3 speech=\"\" char=\"1\" /><end_speech_4 speech=\"\" char=\"1\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.LEVEL6DATA = "<level_data><level_size data=\"10,5\" /><layer_0_0 data=\"0,0,0,0,0\" /><layer_0_1 data=\"0,0,0,0,0\" /><layer_0_2 data=\"0,0,0,0,0\" /><layer_0_3 data=\"0,0,0,0,0\" /><layer_0_4 data=\"0,9,0,9,0\" /><layer_0_5 data=\"0,0,0,0,0\" /><layer_0_6 data=\"0,0,0,0,3\" /><layer_0_7 data=\"0,0,0,0,0\" /><layer_0_8 data=\"0,0,0,0,0\" /><layer_0_9 data=\"0,0,0,0,0\" /><layer_1_0 data=\"0,0,0,0,0\" /><layer_1_1 data=\"0,0,2,0,0\" /><layer_1_2 data=\"0,4,0,3,0\" /><layer_1_3 data=\"0,0,0,0,0\" /><layer_1_4 data=\"0,0,0,0,0\" /><layer_1_5 data=\"0,0,0,0,0\" /><layer_1_6 data=\"0,0,0,0,0\" /><layer_1_7 data=\"0,0,20,0,0\" /><layer_1_8 data=\"0,16,0,16,0\" /><layer_1_9 data=\"0,0,12,0,0\" /><layer_2_0 data=\"0,0,0,0,0\" /><layer_2_1 data=\"0,0,0,0,0\" /><layer_2_2 data=\"0,0,0,0,0\" /><layer_2_3 data=\"0,0,0,0,0\" /><layer_2_4 data=\"0,0,0,0,0\" /><layer_2_5 data=\"0,0,0,0,0\" /><layer_2_6 data=\"0,0,0,0,0\" /><layer_2_7 data=\"0,0,0,0,0\" /><layer_2_8 data=\"0,0,0,0,0\" /><layer_2_9 data=\"0,0,0,0,0\" /><layer_3_0 data=\"0,0,0,0,0\" /><layer_3_1 data=\"0,0,0,0,0\" /><layer_3_2 data=\"0,0,0,0,0\" /><layer_3_3 data=\"0,0,0,0,0\" /><layer_3_4 data=\"0,0,0,0,0\" /><layer_3_5 data=\"0,0,0,0,0\" /><layer_3_6 data=\"0,0,0,0,0\" /><layer_3_7 data=\"0,0,0,0,0\" /><layer_3_8 data=\"0,0,0,0,0\" /><layer_3_9 data=\"0,0,0,0,0\" /><layer_4_0 data=\"0,0,0,0,0\" /><layer_4_1 data=\"0,0,0,0,0\" /><layer_4_2 data=\"0,0,0,0,0\" /><layer_4_3 data=\"0,0,0,0,0\" /><layer_4_4 data=\"0,0,0,0,0\" /><layer_4_5 data=\"0,0,0,0,0\" /><layer_4_6 data=\"0,0,0,0,0\" /><layer_4_7 data=\"0,0,0,0,0\" /><layer_4_8 data=\"0,0,0,0,0\" /><layer_4_9 data=\"0,0,0,0,0\" /><layer_5_0 data=\"0,0,0,0,0\" /><layer_5_1 data=\"0,0,0,0,0\" /><layer_5_2 data=\"0,0,0,0,0\" /><layer_5_3 data=\"0,0,0,0,0\" /><layer_5_4 data=\"0,0,0,0,0\" /><layer_5_5 data=\"0,0,0,0,0\" /><layer_5_6 data=\"0,0,0,0,0\" /><layer_5_7 data=\"0,0,0,0,0\" /><layer_5_8 data=\"0,0,0,0,0\" /><layer_5_9 data=\"0,0,0,0,0\" /><layer_6_0 data=\"0,0,0,0,0\" /><layer_6_1 data=\"0,0,0,0,0\" /><layer_6_2 data=\"0,0,0,0,0\" /><layer_6_3 data=\"0,0,0,0,0\" /><layer_6_4 data=\"0,0,0,0,0\" /><layer_6_5 data=\"0,0,0,0,0\" /><layer_6_6 data=\"0,0,0,0,0\" /><layer_6_7 data=\"0,0,0,0,0\" /><layer_6_8 data=\"0,0,0,0,0\" /><layer_6_9 data=\"0,0,0,0,0\" /><map_bg data=\"7\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"You\'re mine, Jinx!\" char=\"2\" /><start_speech_2 speech=\"Nice to see|you too, Cyborg.\" char=\"12\" /><start_speech_3 speech=\"Enough with the flirting.|Let's fight!\" char=\"3\" /><start_speech_4 speech=\"\" char=\"1\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"Perimeter secure!\" char=\"3\" /><end_speech_2 speech=\"Jinx - call me.\" char=\"2\" /><end_speech_3 speech=\"Are we done yet?\" char=\"4\" /><end_speech_4 speech=\"\" char=\"1\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.LEVEL7DATA = "<level_data><level_size data=\"10,5\" /><layer_0_0 data=\"0,0,0,0,0\" /><layer_0_1 data=\"0,0,0,0,0\" /><layer_0_2 data=\"0,0,0,0,0\" /><layer_0_3 data=\"0,0,0,0,0\" /><layer_0_4 data=\"11,0,0,0,0\" /><layer_0_5 data=\"0,0,0,1,0\" /><layer_0_6 data=\"0,0,1,0,0\" /><layer_0_7 data=\"0,0,0,0,0\" /><layer_0_8 data=\"0,0,0,0,0\" /><layer_0_9 data=\"0,0,0,0,0\" /><layer_1_0 data=\"4,0,0,0,5\" /><layer_1_1 data=\"0,0,1,0,0\" /><layer_1_2 data=\"0,2,0,3,0\" /><layer_1_3 data=\"0,0,0,0,0\" /><layer_1_4 data=\"0,0,0,0,0\" /><layer_1_5 data=\"0,0,0,0,0\" /><layer_1_6 data=\"0,0,0,0,0\" /><layer_1_7 data=\"10,0,0,0,0\" /><layer_1_8 data=\"10,0,0,0,0\" /><layer_1_9 data=\"10,10,10,0,0\" /><layer_2_0 data=\"0,0,0,0,0\" /><layer_2_1 data=\"0,0,0,0,0\" /><layer_2_2 data=\"0,0,0,0,0\" /><layer_2_3 data=\"0,0,0,0,0\" /><layer_2_4 data=\"0,0,0,0,0\" /><layer_2_5 data=\"0,0,0,0,0\" /><layer_2_6 data=\"0,0,0,0,0\" /><layer_2_7 data=\"0,0,0,0,0\" /><layer_2_8 data=\"0,0,0,0,0\" /><layer_2_9 data=\"0,0,0,0,0\" /><layer_3_0 data=\"0,0,0,0,0\" /><layer_3_1 data=\"0,0,0,0,0\" /><layer_3_2 data=\"0,0,0,0,0\" /><layer_3_3 data=\"0,0,0,0,0\" /><layer_3_4 data=\"0,0,0,0,0\" /><layer_3_5 data=\"0,0,0,0,0\" /><layer_3_6 data=\"0,0,0,0,0\" /><layer_3_7 data=\"0,0,0,0,0\" /><layer_3_8 data=\"0,0,0,0,0\" /><layer_3_9 data=\"0,0,0,0,0\" /><layer_4_0 data=\"0,0,0,0,0\" /><layer_4_1 data=\"0,0,0,0,0\" /><layer_4_2 data=\"0,0,0,0,0\" /><layer_4_3 data=\"0,0,0,0,0\" /><layer_4_4 data=\"0,0,0,0,0\" /><layer_4_5 data=\"0,0,0,0,0\" /><layer_4_6 data=\"0,0,0,0,0\" /><layer_4_7 data=\"0,0,0,0,0\" /><layer_4_8 data=\"0,0,0,0,0\" /><layer_4_9 data=\"0,0,0,0,0\" /><layer_5_0 data=\"0,0,0,0,0\" /><layer_5_1 data=\"0,0,0,0,0\" /><layer_5_2 data=\"0,0,0,0,0\" /><layer_5_3 data=\"0,0,0,0,0\" /><layer_5_4 data=\"0,0,0,0,0\" /><layer_5_5 data=\"0,0,0,0,0\" /><layer_5_6 data=\"0,0,0,0,0\" /><layer_5_7 data=\"0,0,0,0,0\" /><layer_5_8 data=\"0,0,0,0,0\" /><layer_5_9 data=\"0,0,0,0,0\" /><layer_6_0 data=\"0,0,0,0,0\" /><layer_6_1 data=\"0,0,0,0,0\" /><layer_6_2 data=\"0,0,0,0,0\" /><layer_6_3 data=\"0,0,0,0,0\" /><layer_6_4 data=\"0,0,0,0,0\" /><layer_6_5 data=\"0,0,0,0,0\" /><layer_6_6 data=\"0,0,0,0,0\" /><layer_6_7 data=\"0,0,0,0,0\" /><layer_6_8 data=\"0,0,0,0,0\" /><layer_6_9 data=\"0,0,0,0,0\" /><map_bg data=\"9\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"This line is ridiculous.\" char=\"10\" /><start_speech_2 speech=\"Your number's up,|Numerous!\" char=\"1\" /><start_speech_3 speech=\"Get 'em!\" char=\"10\" /><start_speech_4 speech=\"\" char=\"1\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"Crime alert from|Justice Java!\" char=\"2\" /><end_speech_2 speech=\"Raven, Star, go with Cyborg.|Beast Boy and I will|patrol around here.\" char=\"1\" /><end_speech_3 speech=\"\" char=\"1\" /><end_speech_4 speech=\"\" char=\"1\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.LEVEL8DATA = "<level_data><level_size data=\"9,4\" /><layer_0_0 data=\"0,0,0,0\" /><layer_0_1 data=\"0,0,0,0\" /><layer_0_2 data=\"0,0,0,0\" /><layer_0_3 data=\"0,0,3,0\" /><layer_0_4 data=\"0,0,0,0\" /><layer_0_5 data=\"0,0,0,0\" /><layer_0_6 data=\"0,9,0,9\" /><layer_0_7 data=\"0,0,0,0\" /><layer_0_8 data=\"0,0,0,0\" /><layer_1_0 data=\"0,0,0,0\" /><layer_1_1 data=\"0,0,1,0\" /><layer_1_2 data=\"0,3,0,0\" /><layer_1_3 data=\"0,0,0,0\" /><layer_1_4 data=\"0,0,0,0\" /><layer_1_5 data=\"0,0,0,0\" /><layer_1_6 data=\"0,0,16,0\" /><layer_1_7 data=\"0,0,0,0\" /><layer_1_8 data=\"0,20,0,15\" /><layer_2_0 data=\"0,0,0,0\" /><layer_2_1 data=\"0,0,0,0\" /><layer_2_2 data=\"0,0,0,0\" /><layer_2_3 data=\"0,0,0,0\" /><layer_2_4 data=\"0,0,0,0\" /><layer_2_5 data=\"0,0,0,0\" /><layer_2_6 data=\"0,0,0,0\" /><layer_2_7 data=\"0,0,0,0\" /><layer_2_8 data=\"0,0,0,0\" /><layer_3_0 data=\"0,0,0,0\" /><layer_3_1 data=\"0,0,0,0\" /><layer_3_2 data=\"0,0,0,0\" /><layer_3_3 data=\"0,0,0,0\" /><layer_3_4 data=\"0,0,0,0\" /><layer_3_5 data=\"0,0,0,0\" /><layer_3_6 data=\"0,0,0,0\" /><layer_3_7 data=\"0,0,0,0\" /><layer_3_8 data=\"0,0,0,0\" /><layer_4_0 data=\"0,0,0,0\" /><layer_4_1 data=\"0,0,0,0\" /><layer_4_2 data=\"0,0,0,0\" /><layer_4_3 data=\"0,0,0,0\" /><layer_4_4 data=\"0,0,0,0\" /><layer_4_5 data=\"0,0,0,0\" /><layer_4_6 data=\"0,0,0,0\" /><layer_4_7 data=\"0,0,0,0\" /><layer_4_8 data=\"0,0,0,0\" /><layer_5_0 data=\"0,0,0,0\" /><layer_5_1 data=\"0,0,0,0\" /><layer_5_2 data=\"0,0,0,0\" /><layer_5_3 data=\"0,0,0,0\" /><layer_5_4 data=\"0,0,0,0\" /><layer_5_5 data=\"0,0,0,0\" /><layer_5_6 data=\"0,0,0,0\" /><layer_5_7 data=\"0,0,0,0\" /><layer_5_8 data=\"0,0,0,0\" /><layer_6_0 data=\"0,0,0,0\" /><layer_6_1 data=\"0,0,0,0\" /><layer_6_2 data=\"0,0,0,0\" /><layer_6_3 data=\"0,0,0,0\" /><layer_6_4 data=\"0,0,0,0\" /><layer_6_5 data=\"0,0,0,0\" /><layer_6_6 data=\"0,0,0,0\" /><layer_6_7 data=\"0,0,0,0\" /><layer_6_8 data=\"0,0,0,0\" /><map_bg data=\"9\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"Looking for us,|See-More?\" char=\"1\" /><start_speech_2 speech=\"Titans!\" char=\"15\" /><start_speech_3 speech=\"\" char=\"1\" /><start_speech_4 speech=\"\" char=\"1\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"We won\'t see|anymore of him.\" char=\"3\" /><end_speech_2 speech=\"Hey,|I was gonna say that.\" char=\"1\" /><end_speech_3 speech=\"\" char=\"1\" /><end_speech_4 speech=\"\" char=\"1\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.LEVEL9DATA = "<level_data><level_size data=\"9,5\" /><layer_0_0 data=\"0,0,0,0,0\" /><layer_0_1 data=\"0,0,0,0,0\" /><layer_0_2 data=\"0,0,0,0,0\" /><layer_0_3 data=\"0,0,0,0,0\" /><layer_0_4 data=\"0,7,0,0,0\" /><layer_0_5 data=\"0,0,0,9,0\" /><layer_0_6 data=\"0,0,0,0,0\" /><layer_0_7 data=\"0,0,0,0,0\" /><layer_0_8 data=\"0,0,0,0,0\" /><layer_1_0 data=\"0,0,0,0,0\" /><layer_1_1 data=\"0,0,0,0,0\" /><layer_1_2 data=\"5,0,2,0,4\" /><layer_1_3 data=\"0,0,0,0,0\" /><layer_1_4 data=\"0,0,0,0,0\" /><layer_1_5 data=\"0,0,0,0,0\" /><layer_1_6 data=\"0,0,0,0,0\" /><layer_1_7 data=\"0,0,0,0,0\" /><layer_1_8 data=\"0,0,8,0,0\" /><layer_2_0 data=\"0,0,0,0,0\" /><layer_2_1 data=\"0,0,0,0,0\" /><layer_2_2 data=\"0,0,0,0,0\" /><layer_2_3 data=\"0,0,0,0,0\" /><layer_2_4 data=\"0,0,0,0,0\" /><layer_2_5 data=\"0,0,0,0,0\" /><layer_2_6 data=\"0,0,0,0,0\" /><layer_2_7 data=\"0,0,0,0,0\" /><layer_2_8 data=\"0,0,0,0,0\" /><layer_3_0 data=\"0,0,0,0,0\" /><layer_3_1 data=\"0,0,0,0,0\" /><layer_3_2 data=\"0,0,0,0,0\" /><layer_3_3 data=\"0,0,0,0,0\" /><layer_3_4 data=\"0,0,0,0,0\" /><layer_3_5 data=\"0,0,0,0,0\" /><layer_3_6 data=\"0,0,0,0,0\" /><layer_3_7 data=\"0,0,0,0,0\" /><layer_3_8 data=\"0,0,0,0,0\" /><layer_4_0 data=\"0,0,0,0,0\" /><layer_4_1 data=\"0,0,0,0,0\" /><layer_4_2 data=\"0,0,0,0,0\" /><layer_4_3 data=\"0,0,0,0,0\" /><layer_4_4 data=\"0,0,0,0,0\" /><layer_4_5 data=\"0,0,0,0,0\" /><layer_4_6 data=\"0,0,0,0,0\" /><layer_4_7 data=\"0,0,0,0,0\" /><layer_4_8 data=\"0,0,0,0,0\" /><layer_5_0 data=\"0,0,0,0,0\" /><layer_5_1 data=\"0,0,0,0,0\" /><layer_5_2 data=\"0,0,0,0,0\" /><layer_5_3 data=\"0,0,0,0,0\" /><layer_5_4 data=\"0,0,0,0,0\" /><layer_5_5 data=\"0,0,0,0,0\" /><layer_5_6 data=\"0,0,0,0,0\" /><layer_5_7 data=\"0,0,0,0,0\" /><layer_5_8 data=\"0,0,0,0,0\" /><layer_6_0 data=\"0,0,0,0,0\" /><layer_6_1 data=\"0,0,0,0,0\" /><layer_6_2 data=\"0,0,0,0,0\" /><layer_6_3 data=\"0,0,0,0,0\" /><layer_6_4 data=\"0,0,0,0,0\" /><layer_6_5 data=\"0,0,0,0,0\" /><layer_6_6 data=\"0,0,0,0,0\" /><layer_6_7 data=\"0,0,0,0,0\" /><layer_6_8 data=\"0,0,0,0,0\" /><map_bg data=\"2\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"Plasmus!\" char=\"4\" /><start_speech_2 speech=\"What kind of monster|orders decaf?!\" char=\"2\" /><start_speech_3 speech=\"\" char=\"1\" /><start_speech_4 speech=\"\" char=\"1\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"Well, that was gross.\" char=\"4\" /><end_speech_2 speech=\"Perhaps we should|check in on|Robin and Beast Boy.\" char=\"5\" /><end_speech_3 speech=\"\" char=\"1\" /><end_speech_4 speech=\"\" char=\"1\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.LEVEL10DATA = "<level_data><level_size data=\"10,5\" /><layer_0_0 data=\"0,0,0,0,0\" /><layer_0_1 data=\"0,0,0,0,0\" /><layer_0_2 data=\"0,0,0,0,0\" /><layer_0_3 data=\"0,0,0,0,0\" /><layer_0_4 data=\"0,11,0,0,0\" /><layer_0_5 data=\"0,0,0,11,0\" /><layer_0_6 data=\"0,0,0,0,0\" /><layer_0_7 data=\"0,0,0,0,0\" /><layer_0_8 data=\"0,0,0,0,0\" /><layer_0_9 data=\"0,0,0,0,0\" /><layer_1_0 data=\"0,0,2,0,0\" /><layer_1_1 data=\"0,1,0,3,0\" /><layer_1_2 data=\"5,0,4,0,0\" /><layer_1_3 data=\"0,0,0,0,0\" /><layer_1_4 data=\"0,0,0,0,0\" /><layer_1_5 data=\"0,0,0,0,0\" /><layer_1_6 data=\"0,19,0,0,0\" /><layer_1_7 data=\"19,0,0,19,0\" /><layer_1_8 data=\"0,0,11,0,19\" /><layer_1_9 data=\"19,0,0,0,0\" /><layer_2_0 data=\"0,0,0,0,0\" /><layer_2_1 data=\"0,0,0,0,0\" /><layer_2_2 data=\"0,0,0,0,0\" /><layer_2_3 data=\"0,0,0,0,0\" /><layer_2_4 data=\"0,0,0,0,0\" /><layer_2_5 data=\"0,0,0,0,0\" /><layer_2_6 data=\"0,0,0,0,0\" /><layer_2_7 data=\"0,0,0,0,0\" /><layer_2_8 data=\"0,0,0,0,0\" /><layer_2_9 data=\"0,0,0,0,0\" /><layer_3_0 data=\"0,0,0,0,0\" /><layer_3_1 data=\"0,0,0,0,0\" /><layer_3_2 data=\"0,0,0,0,0\" /><layer_3_3 data=\"0,0,0,0,0\" /><layer_3_4 data=\"0,0,0,0,0\" /><layer_3_5 data=\"0,0,0,0,0\" /><layer_3_6 data=\"0,0,0,0,0\" /><layer_3_7 data=\"0,0,0,0,0\" /><layer_3_8 data=\"0,0,0,0,0\" /><layer_3_9 data=\"0,0,0,0,0\" /><layer_4_0 data=\"0,0,0,0,0\" /><layer_4_1 data=\"0,0,0,0,0\" /><layer_4_2 data=\"0,0,0,0,0\" /><layer_4_3 data=\"0,0,0,0,0\" /><layer_4_4 data=\"0,0,0,0,0\" /><layer_4_5 data=\"0,0,0,0,0\" /><layer_4_6 data=\"0,0,0,0,0\" /><layer_4_7 data=\"0,0,0,0,0\" /><layer_4_8 data=\"0,0,0,0,0\" /><layer_4_9 data=\"0,0,0,0,0\" /><layer_5_0 data=\"0,0,0,0,0\" /><layer_5_1 data=\"0,0,0,0,0\" /><layer_5_2 data=\"0,0,0,0,0\" /><layer_5_3 data=\"0,0,0,0,0\" /><layer_5_4 data=\"0,0,0,0,0\" /><layer_5_5 data=\"0,0,0,0,0\" /><layer_5_6 data=\"0,0,0,0,0\" /><layer_5_7 data=\"0,0,0,0,0\" /><layer_5_8 data=\"0,0,0,0,0\" /><layer_5_9 data=\"0,0,0,0,0\" /><layer_6_0 data=\"0,0,0,0,0\" /><layer_6_1 data=\"0,0,0,0,0\" /><layer_6_2 data=\"0,0,0,0,0\" /><layer_6_3 data=\"0,0,0,0,0\" /><layer_6_4 data=\"0,0,0,0,0\" /><layer_6_5 data=\"0,0,0,0,0\" /><layer_6_6 data=\"0,0,0,0,0\" /><layer_6_7 data=\"0,0,0,0,0\" /><layer_6_8 data=\"0,0,0,0,0\" /><layer_6_9 data=\"0,0,0,0,0\" /><map_bg data=\"8\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"Oh, Titans!|Can you point me|towards Hall H?|I\'m giving the keynote.\" char=\"11\" /><start_speech_2 speech=\"I\'ve got your directions|RIGHT HERE!\" char=\"2\" /><start_speech_3 speech=\"\" char=\"1\" /><start_speech_4 speech=\"\" char=\"1\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"And stay out!\" char=\"4\" /><end_speech_2 speech=\"We're running|out of daylight.|Let\'s go!\" char=\"1\" /><end_speech_3 speech=\"\" char=\"1\" /><end_speech_4 speech=\"\" char=\"1\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.LEVEL11DATA = "<level_data><level_size data=\"10,5\" /><layer_0_0 data=\"0,0,0,0,0\" /><layer_0_1 data=\"0,0,0,0,0\" /><layer_0_2 data=\"0,0,0,0,0\" /><layer_0_3 data=\"0,4,0,0,0\" /><layer_0_4 data=\"0,0,0,0,0\" /><layer_0_5 data=\"0,0,3,0,0\" /><layer_0_6 data=\"0,0,0,0,0\" /><layer_0_7 data=\"0,0,0,0,0\" /><layer_0_8 data=\"0,0,0,0,0\" /><layer_0_9 data=\"0,0,0,0,0\" /><layer_1_0 data=\"0,0,0,0,0\" /><layer_1_1 data=\"0,0,4,0,5\" /><layer_1_2 data=\"0,2,0,3,0\" /><layer_1_3 data=\"0,0,1,0,0\" /><layer_1_4 data=\"0,0,0,0,0\" /><layer_1_5 data=\"0,0,0,0,0\" /><layer_1_6 data=\"0,20,0,0,0\" /><layer_1_7 data=\"0,14,0,0,20\" /><layer_1_8 data=\"0,16,0,16,0\" /><layer_1_9 data=\"0,0,20,0,0\" /><layer_2_0 data=\"0,0,0,0,0\" /><layer_2_1 data=\"0,0,0,0,0\" /><layer_2_2 data=\"0,0,0,0,0\" /><layer_2_3 data=\"0,0,0,0,0\" /><layer_2_4 data=\"0,0,0,0,0\" /><layer_2_5 data=\"0,0,0,0,0\" /><layer_2_6 data=\"0,0,0,0,0\" /><layer_2_7 data=\"0,0,0,0,0\" /><layer_2_8 data=\"0,0,0,0,0\" /><layer_2_9 data=\"0,0,0,0,0\" /><layer_3_0 data=\"0,0,0,0,0\" /><layer_3_1 data=\"0,0,0,0,0\" /><layer_3_2 data=\"0,0,0,0,0\" /><layer_3_3 data=\"0,0,0,0,0\" /><layer_3_4 data=\"0,0,0,0,0\" /><layer_3_5 data=\"0,0,0,0,0\" /><layer_3_6 data=\"0,0,0,0,0\" /><layer_3_7 data=\"0,0,0,0,0\" /><layer_3_8 data=\"0,0,0,0,0\" /><layer_3_9 data=\"0,0,0,0,0\" /><layer_4_0 data=\"0,0,0,0,0\" /><layer_4_1 data=\"0,0,0,0,0\" /><layer_4_2 data=\"0,0,0,0,0\" /><layer_4_3 data=\"0,0,0,0,0\" /><layer_4_4 data=\"0,0,0,0,0\" /><layer_4_5 data=\"0,0,0,0,0\" /><layer_4_6 data=\"0,0,0,0,0\" /><layer_4_7 data=\"0,0,0,0,0\" /><layer_4_8 data=\"0,0,0,0,0\" /><layer_4_9 data=\"0,0,0,0,0\" /><layer_5_0 data=\"0,0,0,0,0\" /><layer_5_1 data=\"0,0,0,0,0\" /><layer_5_2 data=\"0,0,0,0,0\" /><layer_5_3 data=\"0,0,0,0,0\" /><layer_5_4 data=\"0,0,0,0,0\" /><layer_5_5 data=\"0,0,0,0,0\" /><layer_5_6 data=\"0,0,0,0,0\" /><layer_5_7 data=\"0,0,0,0,0\" /><layer_5_8 data=\"0,0,0,0,0\" /><layer_5_9 data=\"0,0,0,0,0\" /><layer_6_0 data=\"0,0,0,0,0\" /><layer_6_1 data=\"0,0,0,0,0\" /><layer_6_2 data=\"0,0,0,0,0\" /><layer_6_3 data=\"0,0,0,0,0\" /><layer_6_4 data=\"0,0,0,0,0\" /><layer_6_5 data=\"0,0,0,0,0\" /><layer_6_6 data=\"0,0,0,0,0\" /><layer_6_7 data=\"0,0,0,0,0\" /><layer_6_8 data=\"0,0,0,0,0\" /><layer_6_9 data=\"0,0,0,0,0\" /><map_bg data=\"12\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"We just need one|more villain to|beat the record!\" char=\"1\" /><start_speech_2 speech=\"Get lost, dweebs!\" char=\"14\" /><start_speech_3 speech=\"Bingo!\" char=\"1\" /><start_speech_4 speech=\"\" char=\"1\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"We did it.\" char=\"2\" /><end_speech_2 speech=\"Hooray!\" char=\"5\" /><end_speech_3 speech=\"YES! We just broke|Batman\'s world record!\" char=\"1\" /><end_speech_4 speech=\"Uhh, Robin.|Hive 5 have escaped!\" char=\"3\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.LEVEL12DATA = "<level_data><level_size data=\"10,5\" /><layer_0_0 data=\"0,0,0,0,0\" /><layer_0_1 data=\"0,0,0,0,0\" /><layer_0_2 data=\"0,0,0,0,0\" /><layer_0_3 data=\"0,0,0,0,0\" /><layer_0_4 data=\"4,0,0,0,9\" /><layer_0_5 data=\"0,9,0,0,0\" /><layer_0_6 data=\"0,0,0,0,3\" /><layer_0_7 data=\"0,0,0,0,0\" /><layer_0_8 data=\"0,0,0,0,0\" /><layer_0_9 data=\"0,0,0,0,0\" /><layer_1_0 data=\"4,0,0,0,3\" /><layer_1_1 data=\"0,2,0,5,0\" /><layer_1_2 data=\"0,0,1,0,0\" /><layer_1_3 data=\"0,0,0,0,0\" /><layer_1_4 data=\"0,0,0,0,0\" /><layer_1_5 data=\"0,0,0,0,0\" /><layer_1_6 data=\"0,0,0,0,0\" /><layer_1_7 data=\"0,0,14,0,0\" /><layer_1_8 data=\"0,15,0,12,0\" /><layer_1_9 data=\"13,0,0,0,10\" /><layer_2_0 data=\"0,0,0,0,0\" /><layer_2_1 data=\"0,0,0,0,0\" /><layer_2_2 data=\"0,0,0,0,0\" /><layer_2_3 data=\"0,0,0,0,0\" /><layer_2_4 data=\"0,0,0,0,0\" /><layer_2_5 data=\"0,0,0,0,0\" /><layer_2_6 data=\"0,0,0,0,0\" /><layer_2_7 data=\"0,0,0,0,0\" /><layer_2_8 data=\"0,0,0,0,0\" /><layer_2_9 data=\"0,0,0,0,0\" /><layer_3_0 data=\"0,0,0,0,0\" /><layer_3_1 data=\"0,0,0,0,0\" /><layer_3_2 data=\"0,0,0,0,0\" /><layer_3_3 data=\"0,0,0,0,0\" /><layer_3_4 data=\"0,0,0,0,0\" /><layer_3_5 data=\"0,0,0,0,0\" /><layer_3_6 data=\"0,0,0,0,0\" /><layer_3_7 data=\"0,0,0,0,0\" /><layer_3_8 data=\"0,0,0,0,0\" /><layer_3_9 data=\"0,0,0,0,0\" /><layer_4_0 data=\"0,0,0,0,0\" /><layer_4_1 data=\"0,0,0,0,0\" /><layer_4_2 data=\"0,0,0,0,0\" /><layer_4_3 data=\"0,0,0,0,0\" /><layer_4_4 data=\"0,0,0,0,0\" /><layer_4_5 data=\"0,0,0,0,0\" /><layer_4_6 data=\"0,0,0,0,0\" /><layer_4_7 data=\"0,0,0,0,0\" /><layer_4_8 data=\"0,0,0,0,0\" /><layer_4_9 data=\"0,0,0,0,0\" /><layer_5_0 data=\"0,0,0,0,0\" /><layer_5_1 data=\"0,0,0,0,0\" /><layer_5_2 data=\"0,0,0,0,0\" /><layer_5_3 data=\"0,0,0,0,0\" /><layer_5_4 data=\"0,0,0,0,0\" /><layer_5_5 data=\"0,0,0,0,0\" /><layer_5_6 data=\"0,0,0,0,0\" /><layer_5_7 data=\"0,0,0,0,0\" /><layer_5_8 data=\"0,0,0,0,0\" /><layer_5_9 data=\"0,0,0,0,0\" /><layer_6_0 data=\"0,0,0,0,0\" /><layer_6_1 data=\"0,0,0,0,0\" /><layer_6_2 data=\"0,0,0,0,0\" /><layer_6_3 data=\"0,0,0,0,0\" /><layer_6_4 data=\"0,0,0,0,0\" /><layer_6_5 data=\"0,0,0,0,0\" /><layer_6_6 data=\"0,0,0,0,0\" /><layer_6_7 data=\"0,0,0,0,0\" /><layer_6_8 data=\"0,0,0,0,0\" /><layer_6_9 data=\"0,0,0,0,0\" /><map_bg data=\"12\" /><map_info mapaim=\"0\" mapname=\"Level Name\" mapdescription=\"Level Description\" /><start_speech_1 speech=\"The H.I.V.E. Five!\" char=\"3\" /><start_speech_2 speech=\"Is this part of|the bingo?!\" char=\"5\" /><start_speech_3 speech=\"Shut up and fight,|losers!\" char=\"14\" /><start_speech_4 speech=\"\" char=\"1\" /><start_speech_5 speech=\"\" char=\"1\" /><start_speech_6 speech=\"\" char=\"1\" /><end_speech_1 speech=\"How\'d they get|out of prison anyway?\" char=\"4\" /><end_speech_2 speech=\"Wait, why\'s|Batman here?\" char=\"1\" /><end_speech_3 speech=\"\" char=\"1\" /><end_speech_4 speech=\"\" char=\"1\" /><end_speech_5 speech=\"\" char=\"1\" /><end_speech_6 speech=\"\" char=\"1\" /><ground_info groundtype=\"1\" ground1y=\"453.1\" ground2y=\"333.1\" /><parallax1 data=\"\" /><parallax2 data=\"\" /><parallax3 data=\"\" /><parallax4 data=\"\" /></level_data>";
            LevelData.ALLLEVELS = [LevelData.LEVEL1DATA, LevelData.LEVEL2DATA, LevelData.LEVEL3DATA, LevelData.LEVEL4DATA, LevelData.LEVEL5DATA, LevelData.LEVEL6DATA, LevelData.LEVEL7DATA, LevelData.LEVEL8DATA, LevelData.LEVEL9DATA, LevelData.LEVEL10DATA, LevelData.LEVEL11DATA, LevelData.LEVEL12DATA];
            teenTitansBattleQuest.LevelData = LevelData;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class MaeEyeAttack extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 3;
                    this.power = 3;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("MayEyePieAttackAnim");
                    this.label = "Pie Toss";
                }
            }
            teenTitansBattleQuest.MaeEyeAttack = MaeEyeAttack;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var MaeEyeAttack = com.ussgames.teenTitansBattleQuest.MaeEyeAttack;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class MammothAttack extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 6;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.label = "Power Punch";
                    this.description = "Short range";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.MammothAttack = MammothAttack;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var MammothAttack = com.ussgames.teenTitansBattleQuest.MammothAttack;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class PlasmusAttack extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 6;
                    this.power = 8;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.straightLineOnly = true;
                    this.attackMultipleUnits = true;
                    this.friendlyFire = true;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("PlasmusFlameBlast");
                    this.adjustBlastClipHeight = false;
                    this.label = "Line of Fire";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.PlasmusAttack = PlasmusAttack;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var PlasmusAttack = com.ussgames.teenTitansBattleQuest.PlasmusAttack;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class RavenBlackHole extends Action {
                constructor() {
                    super();
                    this.blackHoleDone = false;
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 3;
                    this.power = 0;
                    this.level = 1; // 4;
                    this.coolDown = 3;
                    this.type = Action.AREA;
                    this.label = "Demon Vortex";
                    this.description = "Special Attack";
                    this.supplementalInfo = "(affects surrounding squares)";
                    this.iconFrame = 5;
                    this.mouseIconFrame = 5;
                    this.useStandardDamagePerc = false;
                    this.alwaysShowFullPower = true;
                    this.validSquareOccupied = false;
                }
                /*override*/ perform(paramObj = null) {
                    var map = paramObj.map;
                    var targetX = paramObj.targetX;
                    var targetY = paramObj.targetY;
                    var originatingUnit = paramObj.unit;
                    var targetUnit = map.getUnitInSquare(targetX, targetY);
                    map.calculateActionGrid(originatingUnit);
                    this.attackDamageDone = false;
                    this.retaliateDamageDone = false;
                    this.attackDamage = 0;
                    this.defendDamage = 0;
                    this.blackHoleDone = false;
                    if (map.actionGrid[targetX][targetY] >= this.minRange && map.actionGrid[targetX][targetY] <= this.maxRange) {
                        this.actionTargetMapX = targetX;
                        this.actionTargetMapY = targetY;
                        this.actionTargetUnit = targetUnit;
                        this.actionPhase = Action.PERFORM;
                        originatingUnit.state = UnitInPlay.PERFORMINGACTION;
                        return true;
                    }
                    return false;
                }
                /*override*/ updateAction(map, thisUnit) {
                    if (!this.blackHoleDone && thisUnit.actionHit(thisUnit.clip)) {
                        var newBlackHole = new teenTitansBattleQuest.BlackHoleResidualEffect;
                        newBlackHole.init(map, thisUnit, this.actionTargetMapX, this.actionTargetMapY);
                        BattleController.residualEffects.push(newBlackHole);
                        this.blackHoleDone = true;
                    }
                    if (thisUnit.actionAnimFinished(thisUnit.clip)) {
                        this.actionPhase = Action.IDLE;
                        return true;
                    }
                    return false;
                }
            }
            RavenBlackHole.BLACKHOLETIME = 3;
            teenTitansBattleQuest.RavenBlackHole = RavenBlackHole;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var RavenBlackHole = com.ussgames.teenTitansBattleQuest.RavenBlackHole;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class RavenHeal extends Action {
                constructor() {
                    super();
                    this.healDone = false;
                }
                /*override*/ init() {
                    this.minRange = 0;
                    this.maxRange = 1;
                    this.power = 0;
                    this.level = 1; //2;
                    this.coolDown = 3;
                    this.type = Action.DEFENCE;
                    this.label = "Heal a Titan";
                    this.description = "Special Action";
                    this.iconFrame = 4;
                    this.mouseIconFrame = 3;
                    this.useStandardDamagePerc = false;
                    this.canAffectSelf = true;
                }
                /*override*/ perform(paramObj = null) {
                    var map = paramObj.map;
                    var targetX = paramObj.targetX;
                    var targetY = paramObj.targetY;
                    var originatingUnit = paramObj.unit;
                    var targetUnit = map.getUnitInSquare(targetX, targetY);
                    map.calculateActionGrid(originatingUnit);
                    this.attackDamageDone = false;
                    this.retaliateDamageDone = false;
                    this.attackDamage = 0;
                    this.defendDamage = 0;
                    this.healDone = false;
                    if (map.actionGrid[targetX][targetY] >= this.minRange && map.actionGrid[targetX][targetY] <= this.maxRange && targetUnit && targetUnit.team == originatingUnit.team) {
                        this.actionTargetMapX = targetX;
                        this.actionTargetMapY = targetY;
                        this.actionTargetUnit = targetUnit;
                        this.actionPhase = Action.PERFORM;
                        originatingUnit.state = UnitInPlay.PERFORMINGACTION;
                        return true;
                    }
                    return false;
                }
                /*override*/ updateAction(map, thisUnit) {
                    if (!this.healDone && thisUnit.actionHit(thisUnit.clip)) {
                        var hpUp = this.actionTargetUnit.heal(RavenHeal.healPerc);
                        var healEffect = Main.addGAFMovieClip("RavenHealSpellEffect");
                        healEffect.x = this.actionTargetUnit.clip.x;
                        healEffect.y = this.actionTargetUnit.clip.y - (this.actionTargetUnit.clip.height / 2);
                        BattleController.currentMap.mapView.addChild(healEffect);
                        BattleController.showHealRiser(hpUp, this.actionTargetUnit);
                        this.healDone = true;
                    }
                    if (thisUnit.actionAnimFinished(thisUnit.clip)) {
                        this.actionPhase = Action.IDLE;
                        return true;
                    }
                    return false;
                }
                /*override*/ alternateDamageDisplay(attackingUnit, targetUnit, map) {
                    var healAmount = Math.ceil((targetUnit.unit.HP + targetUnit.unit.HPBonus) * RavenHeal.healPerc);
                    if (targetUnit.unit.HP + targetUnit.unit.HPBonus < targetUnit.currentHP + healAmount) {
                        healAmount = (targetUnit.unit.HP + targetUnit.unit.HPBonus) - targetUnit.currentHP;
                    }
                    return "+" + String(healAmount);
                }
            }
            // 50% max healage
            RavenHeal.healPerc = 0.5;
            teenTitansBattleQuest.RavenHeal = RavenHeal;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var RavenHeal = com.ussgames.teenTitansBattleQuest.RavenHeal;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class RavenTeleport extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 4;
                    this.power = 0;
                    this.level = 1; // 3
                    this.coolDown = 2;
                    this.type = Action.AREA;
                    this.label = "Teleport";
                    this.description = "Special Action";
                    this.iconFrame = 3;
                    this.mouseIconFrame = 4;
                    this.useStandardDamagePerc = false;
                    this.validSquareOccupied = false;
                }
                /*override*/ perform(paramObj = null) {
                    var map = paramObj.map;
                    var targetX = paramObj.targetX;
                    var targetY = paramObj.targetY;
                    var originatingUnit = paramObj.unit;
                    var targetUnit = map.getUnitInSquare(targetX, targetY);
                    map.calculateActionGrid(originatingUnit);
                    this.attackDamageDone = false;
                    this.retaliateDamageDone = false;
                    this.attackDamage = 0;
                    this.defendDamage = 0;
                    if (map.actionGrid[targetX][targetY] >= this.minRange && map.actionGrid[targetX][targetY] <= this.maxRange && targetUnit == null) {
                        this.actionTargetMapX = targetX;
                        this.actionTargetMapY = targetY;
                        this.actionTargetUnit = targetUnit;
                        this.actionPhase = Action.PERFORM;
                        originatingUnit.state = UnitInPlay.PERFORMINGACTION;
                        return true;
                    }
                    return false;
                }
                /*override*/ updateAction(map, thisUnit) {
                    if (thisUnit.actionHit(thisUnit.clip)) {
                        thisUnit.movedFromX = thisUnit.mapX;
                        thisUnit.movedFromY = thisUnit.mapY;
                        thisUnit.mapX = this.actionTargetMapX;
                        thisUnit.mapY = this.actionTargetMapY;
                        thisUnit.updateClipPosition(map);
                    }
                    if (thisUnit.actionAnimFinished(thisUnit.clip)) {
                        this.actionPhase = Action.IDLE;
                        return true;
                    }
                    return false;
                }
            }
            teenTitansBattleQuest.RavenTeleport = RavenTeleport;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var RavenTeleport = com.ussgames.teenTitansBattleQuest.RavenTeleport;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class RavenWandBlast extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 3;
                    this.power = 2;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("WandBlastAnim");
                    this.label = "Dark Energy";
                    this.description = "Range Attack";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.RavenWandBlast = RavenWandBlast;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var RavenWandBlast = com.ussgames.teenTitansBattleQuest.RavenWandBlast;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class RobinBaterang extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 4;
                    this.power = 4;
                    this.level = 1;
                    this.coolDown = 3;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("BatarangAnim");
                    this.label = "Birdarang";
                    this.description = "Range Attack";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.RobinBaterang = RobinBaterang;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var RobinBaterang = com.ussgames.teenTitansBattleQuest.RobinBaterang;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class RobinKick extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 4;
                    this.level = 1; // 2;
                    this.coolDown = 1;
                    this.type = Action.ATTACK;
                    this.label = "Jump Kick";
                    this.description = "Melee Attack";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.RobinKick = RobinKick;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var RobinKick = com.ussgames.teenTitansBattleQuest.RobinKick;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class RobinSlap extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 2;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.label = "Punch";
                    this.description = "Melee Attack";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.RobinSlap = RobinSlap;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var RobinSlap = com.ussgames.teenTitansBattleQuest.RobinSlap;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class RobinStaffAttack extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 6;
                    this.level = 1; // 3;
                    this.coolDown = 2;
                    this.type = Action.ATTACK;
                    this.label = "Staff Smash";
                    this.description = "Melee Attack";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.RobinStaffAttack = RobinStaffAttack;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var RobinStaffAttack = com.ussgames.teenTitansBattleQuest.RobinStaffAttack;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class RobotAttack extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 4;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.label = "Kick Smash";
                    this.description = "Short range";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.RobotAttack = RobotAttack;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var RobotAttack = com.ussgames.teenTitansBattleQuest.RobotAttack;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class SeeMoreEyeBeam extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 3;
                    this.power = 4;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("SeeMoreBlastAnim");
                    this.label = "Laser Eye";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.SeeMoreEyeBeam = SeeMoreEyeBeam;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var SeeMoreEyeBeam = com.ussgames.teenTitansBattleQuest.SeeMoreEyeBeam;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class StarfireEvade extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 0;
                    this.maxRange = 0;
                    this.power = 0;
                    this.level = 1; // 2;
                    this.coolDown = 1;
                    this.type = Action.SELF;
                    this.label = "Evade";
                    this.description = "Special Action";
                    this.iconFrame = 3;
                }
                /*override*/ performSelfAction(thisUnit) {
                    thisUnit.evadeAttackCount = 1;
                    return true;
                }
            }
            teenTitansBattleQuest.StarfireEvade = StarfireEvade;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var StarfireEvade = com.ussgames.teenTitansBattleQuest.StarfireEvade;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class StarfireLaserEyes extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 3;
                    this.power = 4;
                    this.level = 1; // 2;
                    this.coolDown = 2;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("LaserEyesAnim");
                    this.label = "Eyebeams";
                    this.description = "Range Attack";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.StarfireLaserEyes = StarfireLaserEyes;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var StarfireLaserEyes = com.ussgames.teenTitansBattleQuest.StarfireLaserEyes;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class StarfireLaserFist extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 3;
                    this.power = 3;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("LaserFistsAnim");
                    this.label = "Starbolts";
                    this.description = "Range Attack";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.StarfireLaserFist = StarfireLaserFist;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var StarfireLaserFist = com.ussgames.teenTitansBattleQuest.StarfireLaserFist;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class StarfireMegaFist extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 4;
                    this.power = 6;
                    this.level = 1; // 4;
                    this.coolDown = 3;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("LaserFists2Anim");
                    this.label = "Starblast";
                    this.description = "Range Attack";
                    this.iconFrame = 2;
                }
            }
            teenTitansBattleQuest.StarfireMegaFist = StarfireMegaFist;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var StarfireMegaFist = com.ussgames.teenTitansBattleQuest.StarfireMegaFist;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class TrigonAttack1 extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 1;
                    this.maxRange = 1;
                    this.power = 8;
                    this.level = 1;
                    this.coolDown = 0;
                    this.type = Action.ATTACK;
                    this.battleAnimOffset = 50;
                    this.label = "Flick";
                    this.iconFrame = 1;
                }
            }
            teenTitansBattleQuest.TrigonAttack1 = TrigonAttack1;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var TrigonAttack1 = com.ussgames.teenTitansBattleQuest.TrigonAttack1;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            class TrigonAttack2 extends Action {
                constructor() {
                    super();
                }
                /*override*/ init() {
                    this.minRange = 2;
                    this.maxRange = 6;
                    this.power = 1000;
                    this.level = 1;
                    this.coolDown = 3;
                    this.type = Action.ATTACK;
                    this.longRangeAnimClipClass = Main.addGAFMovieClip("TrigonVortexBlastAnim");
                    this.adjustBlastClipHeight = false;
                    this.placeBlastClipBehind = true;
                    this.label = "Mega Blast";
                    this.iconFrame = 5;
                }
            }
            teenTitansBattleQuest.TrigonAttack2 = TrigonAttack2;
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var TrigonAttack2 = com.ussgames.teenTitansBattleQuest.TrigonAttack2;
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            var TitansCinematics;
            (function (TitansCinematics) {
                class Level11Cine extends CinematicEvent {
                    constructor() {
                        super();
                    }
                    /*override*/ init() {
                        this.baddieIDs = [13];
                        this.afterSpeech = 1;
                    }
                }
                TitansCinematics.Level11Cine = Level11Cine;
            })(TitansCinematics = teenTitansBattleQuest.TitansCinematics || (teenTitansBattleQuest.TitansCinematics = {}));
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            var TitansCinematics;
            (function (TitansCinematics) {
                class Level11Cine2 extends CinematicEvent {
                    constructor() {
                        super();
                    }
                    /*override*/ init() {
                        this.baddieIDs = [5, 15, 19];
                        this.afterSpeech = 2;
                    }
                }
                TitansCinematics.Level11Cine2 = Level11Cine2;
            })(TitansCinematics = teenTitansBattleQuest.TitansCinematics || (teenTitansBattleQuest.TitansCinematics = {}));
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            var TitansCinematics;
            (function (TitansCinematics) {
                class Level2Cine extends CinematicEvent {
                    constructor() {
                        super();
                    }
                    /*override*/ init() {
                        this.baddieIDs = [5, 15];
                        this.afterSpeech = 2;
                    }
                }
                TitansCinematics.Level2Cine = Level2Cine;
            })(TitansCinematics = teenTitansBattleQuest.TitansCinematics || (teenTitansBattleQuest.TitansCinematics = {}));
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            var TitansCinematics;
            (function (TitansCinematics) {
                class Level5Cine extends CinematicEvent {
                    constructor() {
                        super();
                    }
                    /*override*/ init() {
                        this.baddieIDs = [0, 1, 2, 3, 4];
                        this.afterSpeech = 1;
                    }
                }
                TitansCinematics.Level5Cine = Level5Cine;
            })(TitansCinematics = teenTitansBattleQuest.TitansCinematics || (teenTitansBattleQuest.TitansCinematics = {}));
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            var TitansCinematics;
            (function (TitansCinematics) {
                class Level5Cine2 extends CinematicEvent {
                    constructor() {
                        super();
                    }
                    /*override*/ init() {
                        this.baddieIDs = [17];
                        this.afterSpeech = 3;
                    }
                }
                TitansCinematics.Level5Cine2 = Level5Cine2;
            })(TitansCinematics = teenTitansBattleQuest.TitansCinematics || (teenTitansBattleQuest.TitansCinematics = {}));
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            var TitansCinematics;
            (function (TitansCinematics) {
                class Level7Cine extends CinematicEvent {
                    constructor() {
                        super();
                    }
                    /*override*/ init() {
                        this.baddieIDs = [0, 1, 2, 3, 4];
                        this.afterSpeech = 1;
                    }
                }
                TitansCinematics.Level7Cine = Level7Cine;
            })(TitansCinematics = teenTitansBattleQuest.TitansCinematics || (teenTitansBattleQuest.TitansCinematics = {}));
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            var TitansCinematics;
            (function (TitansCinematics) {
                class Level8Cine extends CinematicEvent {
                    constructor() {
                        super();
                    }
                    /*override*/ init() {
                        this.baddieIDs = [5, 15, 19];
                        this.afterSpeech = 2;
                    }
                }
                TitansCinematics.Level8Cine = Level8Cine;
            })(TitansCinematics = teenTitansBattleQuest.TitansCinematics || (teenTitansBattleQuest.TitansCinematics = {}));
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var com;
(function (com) {
    var ussgames;
    (function (ussgames) {
        var teenTitansBattleQuest;
        (function (teenTitansBattleQuest) {
            var TitansCinematics;
            (function (TitansCinematics) {
                class TitansCinematicInitialiser extends Cinematics {
                    constructor() {
                        super();
                    }
                    /*override*/ init() {
                        Cinematics.speechBubbleCount = 0;
                        Cinematics.cinematicEvents = [[], [new TitansCinematics.Level2Cine], [], [], [new TitansCinematics.Level5Cine, new TitansCinematics.Level5Cine2], [], [new TitansCinematics.Level7Cine], [new TitansCinematics.Level8Cine], [], [], [new TitansCinematics.Level11Cine, new TitansCinematics.Level11Cine2], []];
                        for (var i = 0; i < Cinematics.cinematicEvents.length; i++) {
                            for (var j = 0; j < Cinematics.cinematicEvents[i].length; j++) {
                                if (Cinematics.cinematicEvents[i][j]) {
                                    Cinematics.cinematicEvents[i][j].init();
                                }
                            }
                        }
                    }
                }
                TitansCinematics.TitansCinematicInitialiser = TitansCinematicInitialiser;
            })(TitansCinematics = teenTitansBattleQuest.TitansCinematics || (teenTitansBattleQuest.TitansCinematics = {}));
        })(teenTitansBattleQuest = ussgames.teenTitansBattleQuest || (ussgames.teenTitansBattleQuest = {}));
    })(ussgames = com.ussgames || (com.ussgames = {}));
})(com || (com = {}));
var TitansCinematicInitialiser = com.ussgames.teenTitansBattleQuest.TitansCinematics.TitansCinematicInitialiser;
