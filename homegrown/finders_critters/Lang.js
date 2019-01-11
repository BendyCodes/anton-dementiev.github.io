PR.Lang = function(lang) {
    var l = lang || 'en';
    PR.langs = this;
        switch (l.toUpperCase()) {
            case 'EN':
                this.lang = 0;
                break;
            case 'FR':
                this.lang = 1;
                break;
            case 'PT':
                this.lang = 2;
                break;
            case 'ES':
                this.lang = 3;
                break;
            case 'DE':
                this.lang = 4;
                break;
            case 'NL':
                this.lang = 5;
                break;
            case 'IT':
                this.lang = 6;
                break;
            case 'PL':
                this.lang = 7;
                break;
            case 'RU':
                this.lang = 8;
                break;
            case 'TR':
                this.lang = 9;
                break;
            default :
                this.lang = 0;
                break;
        }


    switch (l.toUpperCase()) {
        case 'EN':
            this.loadingPos = 2;
            break;
        case 'DE':
            this.loadingPos = 3;
            break;
        case 'ES':
            this.loadingPos = 4;
            break;
        case 'FR':
            this.loadingPos = 5;
            break;
        case 'IT':
            this.loadingPos = 6;
            break;
        case 'PT':
            this.loadingPos = 7;
            break;
        case 'RU':
            this.loadingPos = 8;
            break;
        case 'TR':
            this.loadingPos = 9;
            break;
        case 'NL':
            this.loadingPos = 10;
            break;
        case 'PL':
            this.loadingPos = 11;
            break;
        default :
            this.loadingPos = 0;
            break;
    }


    var s = this.S = [];
    var newSymbols = 'ÇÕÓçíãóêéäßöüñ¡¿ÈÃŞÜşğĘęąŁłńŃś' + 'абвгдежзиклмнопрстуфхцчшщьыэюяМАГЗИНЛЦУКБХЧДВПСРТО' + 'İЬЖЕàìФШЩЪЫЭЮЯıćœÉżйèîõá';

    s['try again'] = ['Try again!'];
    s['no moves'] = ['No Moves!'];
    s['you win'] = ['You Win!'];
    s['tutorial'] = ['Tutorial'];
    s['options'] = ['Options'];
    s['on'] = ['on'];
    s['pause'] = ['PAUSE'];
    s['off'] = ['off'];
    s['victory'] = ['victory'];
    s['new record'] = ['New Record'];
    s['score'] = ['score'];
    s['level'] = ['level'];
    s['levels'] = ['levels'];
    s['save'] = ['save'];
    s['move'] = ['move'];
    s['in'] = ['in'];
    s['moves'] = ['moves'];
    s['critter'] = ['critter'];
    s['critters'] = ['critters'];
    s['game over'] = ['GAME\nOVER'];

}; extend(PR.Lang, Object);


PR.S = function(v) {
    return PR.langs.S[v][PR.langs.lang];
};