PS.Lang = function(lang) {
    PS.langs = this;
    switch (lang.toUpperCase()) {
        case 'EN':
            this.lang = 0;
            break;
        case 'DE':
            this.lang = 1;
            break;
        case 'ES':
            this.lang = 2;
            break;
        case 'FR':
            this.lang = 3;
            break;
        case 'IT':
            this.lang = 4;
            break;
        case 'PT':
            this.lang = 5;
            break;
        case 'RU':
            this.lang = 6;
            break;
        case 'TR':
            this.lang = 7;
            break;
        case 'NL':
            this.lang = 8;
            break;
        case 'PL':
            this.lang = 9;
            break;
        default :
            this.lang = 0;
            break;
    }


    var s = this.S = [];
    var newSymbols = 'ÇÕÓçíãóêéäßöüñ¡¿ÈÃŞÜşğĘęąŁłńŃś' + 'абвгдежзиклмнопрстуфхцчшщьыэюяМАГЗИНЛЦУКБХЧДВПСРТО' + 'İЬЖЕàìФШЩЪЫЭЮЯıć';

    s['Loading'] = ['Loading', 'Laden', 'Cargando', 'Chargement', 'Caricamento in corso', 'A carregar', 'Загрузка', 'Yükleniyor', 'Laden', 'Pobieranie'];
    s['How to play'] = ['How to play', "So geht's", 'Cómo jugar', 'Comment jouer', 'Come giocare', 'Como jogar', 'Как играть', 'Nasıl oynanır', 'Hoe te spelen', 'Jak grać'];
    s['Tap'] = ['TAP', 'Antippen', 'Tocar', 'Tapotez', 'Tocca', 'Toque', 'Нажмите', 'Dokun', 'Tikken', 'Stuknij'];
    s['Options'] = ['Options', 'Optionen', 'Opciones', 'Options', 'Opzioni', 'Opções', 'Параметры', 'Seçenekler', 'Opties', 'Opcje'];
    s['on'] = ['on', 'an', 'con', 'allumé', 'on', 'lig.', 'вкл.', 'açık', 'aan', 'włącz'];
    s['off'] = ['off', 'aus', 'desc', 'éteint', 'off', 'deslig.', 'выкл.', 'kapalı', 'uit', 'wyłącz'];
    s['developed'] = ['Developed by Fundemic', 'Entwickelt von Fundemic', 'Desarrollado por Fundemic', 'Développé par Fundemic', 'Sviluppato da Fundemic', 'Desenvolvido por Fundemic', 'Разработано Fundemic', 'Fundemic tarafından geliştirilmiştir', 'Ontwikkeld door Fundemic', 'Opracowane przez Fundemic'];
    s['Levels'] = ['Levels', 'Level', 'Niveles', 'Niveaux', 'Livelli', 'Níveis', 'Уровни', 'Seviyeler', 'Niveaus', 'Poziomy'];
    s['Level'] = ['Level', 'Level', 'Nivel', 'Niveau', 'Livello', 'Nívei', 'Уровень', 'Seviye', 'Niveau', 'Poziom'];
    s['Pause'] = ['Pause', 'Pause', 'Pause', 'Pause', 'Pause', 'Pause', 'Pause', 'Pause', 'Pause', 'Pause'];

}; extend(PS.Lang, Object);


PS.S = function(v) {
    return PS.langs.S[v][PS.langs.lang];
};