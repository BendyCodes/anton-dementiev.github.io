AG.Lang = function(lang) {
    AG.langs = this;
    switch (lang.toUpperCase()) {
        case 'en':
            this.lang = 0;
            break;
        case 'cj':
            this.lang = 1;
            break;
        case 'EN':
            this.lang = 2;
            break;
        case 'DE':
            this.lang = 3;
            break;
        case 'ES':
            this.lang = 4;
            break;
        case 'FR':
            this.lang = 5;
            break;
        case 'IT':
            this.lang = 6;
            break;
        case 'PT':
            this.lang = 7;
            break;
        case 'RU':
            this.lang = 8;
            break;
        case 'TR':
            this.lang = 9;
            break;
        case 'NL':
            this.lang = 10;
            break;
        case 'PL':
            this.lang = 11;
            break;
        default :
            this.lang = 0;
            break;
    }

    var s = this.S = [];
    var newSymbols = 'ÇÕÓçíãóêéäßöüñ¡¿ÈÃŞÜşğĘęąŁłńŃś' + 'абвгдежзиклмнопрстуфхцчшщьыэюяМАГЗИНЛЦУКБХЧДВПСРТО' + 'İЬЖЕàìФШЩЪЫЭЮЯıć';

    s['options'] = ['OPTIONS', 'OPÇÕES', 'OPTIONS', 'Optionen', 'OPCIONES', 'OPTIONS', 'OPZIONI', 'OPÇÕES', 'ОПЦИИ', 'SEÇENEKLER', 'OPTIES', 'OPCJE'];
    s['tutor'] = ['Tutorial on/off', 'Ativar/Desativar Tutorial', 'Tutorial on/off', 'Tutorial an/aus', 'Tutorial sí/no', 'Tutoriel activé / désactivé', 'Tutorial on/off', 'Tutorial ligado/desligado', 'Инструкции вкл/выкл', 'Eğitim açık/kapalı', 'Handleiding aan / uit', 'Instrukcje włącz/wyłącz'];
    s['erase'] = ['ERASE PROGRESS', 'APAGAR PROGRESSO', 'DELETE PROGRESS', 'Fortschritt löschen', 'BORRAR PROGRESO', 'SUPPRIMER LES PROGRÈS', 'ELIMINA AVANZAMENTO', 'APAGAR PROGRESSÃO', 'УДАЛИТЬ ПРОДВИЖЕНИЕ', 'İLERLEMEYİ SİL', 'VOORTGANG WISSEN', 'USUŃ WYNIKI'];
    s['head'] = ['FACE', 'CARA', 'FACE', 'GESICHT', 'CARA', 'VISAGE', 'VOLTO', 'ROSTO', 'ЛИЦО', 'YÜZ', 'GEZICHT', 'TWARZ'];
    s['arm'] = ['ARM', 'BRAÇO', 'ARM', 'ARM', 'BRAZO', 'BRAS', 'BRACCIO', 'BRAÇO', 'РУКА', 'SİLAH', 'ARM', 'RĘKA'];
    s['shifty'] = ['Shifty Eyes', 'Olhos Astutos', 'Shifty Eyes', 'Wackelaugen', 'Mirada\nesquiva', 'Yeux fuyants', 'Occhi\nsfuggenti', 'Olhos\nEsgazeados', 'Бегающие\nглазки', 'Kurnaz Gözler', 'Onbetrouwbare\nogen', 'Rozbiegane\noczy'];
    s['gents'] = ["Gent's\nMoustache", "Bigode de\nCavalheiro", "Gent's\nMoustache", 'Gentleman -\nSchnurrbart', 'Bigote de\ncaballero', 'Moustache de\ngentleman', 'Baffi da\ngentiluomo', 'Bigode à\nCavalheiro', 'Усы\nджентльмена', 'Centilmen\nBıyık', 'Mannensnor', 'Męskie\nwąsy'];
    s['Hachimaki'] = ["Hachimaki", "Bandana", 'Hachimaki', 'Hachimaki', 'Hachimaki', 'Hachimaki\n(bandeau de tête)', 'Hachimaki', 'Hachimaki', 'Хатимаки', 'Hachimaki', 'Hachimaki', 'Opaska\nHachimaki'];
    s['Chow Chow'] = ['Chow Chow', 'Chow Chow', 'Chow Chow', 'Chow-Chow-\nHaare', 'Chow Chow', 'Chow Chow', 'Chow Chow', 'Chow Chow', 'Чау-чау', 'Çov Çov', 'Chow Chow', 'Chow Chow'];
    s['hip'] = ['Hip\nGlasses', 'Óculos', 'Hip\nGlasses', 'Hipster-\nBrille', 'Gafas\nmodernas', 'Lunettes\ntendances', 'Occhiali\nda vista', 'Óculos\nHip', 'Хипстерские\nочки', 'Çerçevel\nGözlük', 'Hippe\nbril', 'Hipsterskie\nokulary'];
    s['clown'] = ['Clown Nose', 'Nariz de\nPalhaço', 'Clown Nose', 'Clown-Nase', 'Nariz d\npayaso', 'Nez de\nclown', 'Naso da\nclown', 'Nariz de\nPalhaço', 'Нос\nклоуна', 'Palyaço\nBurnu', 'Clownsneus', 'Nos\nclowna'];
    s['brows'] = ['Bushy Brows', 'Sobrancelhas\nDensas', 'Bushy Brows', 'Buschige\nAugenbrauen', 'Cajas\npobladas', 'Sourcils\nbroussailleux', 'Sopracciglia\nfolte', 'Sobrancelhas\nCerradas', 'Густые брови', 'Gür Kaşlar', 'Borstelige\nwenkbrouwen', 'Krzaczaste\nbrwi'];
    s['vamp'] = ['Vamp Teeth', 'Dentes de\nVampiro', 'Vamp Teeth', 'Vampirzähne', 'Dientes de \nvampiro', 'Dents de\nvamp ', 'Denti da\nvampiro', 'Dentes de\nVampiro', 'Клыки\nвампира', 'Vampir\nDişleri', 'Vampiertanden', 'Zęby\nwampira'];
    s['coolshades'] = ['Cool Shades', 'Óculos de\nSol', 'Cool Shades', 'Coole\nSonnenbrille', 'Gafas de sol\ngeniales', 'Lunettes de\nsoleil à la mode', 'Occhiali', 'Óculos\nCool', 'Солнцезащитные\nочки', 'Harika\nGölgeler', 'Coole\nzonnebril', 'Modne\nokulary'];
    s['Tall Hat'] = ['Tall Hat', 'Cartola', 'Tall Hat', 'Zylinder', 'Sombrero de\ncopa', 'Chapeau haut\nde forme', 'Cappello\nalto', 'Chapéu Alto', 'Цилиндр', 'Uzun Şapka', 'Hoge hoed', 'Wysok\nkapelusz'];
    s['longe'] = ['Long\nEyelashes', 'Cílios\nLongos', 'Long\nEyelashes', 'Falsche\nWimpern', 'Pestañas\nlargas', 'Longs cils', 'Ciglia\nlunghe', 'Pestanas\nCompridas', 'Длинные\nресницы', 'Uzu\nKirpikler', 'lange\nwimpers', 'Długie\nrzęsy'];
    s['gold'] = ['Gold\nCrown', 'Coroa de\nOuro', 'Gold Crown', 'Goldene\nKrone', 'Corona de\noro', 'Couronne\nen or', 'Corona\ndorata', 'Coroa\nDourada', 'Золотая\nкорона', 'Altın Taç', 'Gouden kroon', 'Złota\nkorona'];
    s['smile'] = ['Smiley Face', 'Cara\nSorridente','Smiley Face', 'Smiley-\nGesicht', 'Cara\nsonriente', 'Smiley', 'Faccia\nsorridente', 'Rosto\nSorridente', 'Усы\nджентльмена', 'Gülen\nSurat', 'Lachebek', 'Uśmiechnięta\nbuzia'];
    s['Arm Hair'] = ['Arm Hair', 'Pelo do\nBraço', 'Arm Hair', 'Haariger\nArm', 'Pelo de\nbrazo', 'Poils des\nbras ', 'Peluria sul\nbraccio', 'Pelos nos\nBraços', 'Волосатая\nрука', 'Kol Tüyü', 'Armhaar', 'Owłosiona\nręka'];
    s['yoga'] = ['Yoga\nBand', 'Faixa de\nIoga', 'Yoga\nBand', 'Yoga-\nBand', 'Cinta de\nyoga', 'Bande de\nyoga ', 'Elastico per\nlo yoga', 'Banda de\nIoga', 'Повязка для\nйоги', 'Yoga Bandı', 'yogaband', 'Opaska na\njogę'];
    s['sticky'] = ['Sticky\nFingers', 'Palma\nPegajosa', 'Sticky\nPalm', 'Klebrige\nHände', 'Palma\npegajosa', 'Paume\ncollante', 'Palma\nappiccicosa', 'Palma\nPegajosa', 'Липкая\nладошка', 'Yapışkan\nAvuç içi', 'Plakkerige\nhandpalm', 'Klejąca\ndłoń'];
    s['slimy'] = ['Slimy Squid', 'Lula\nGosmenta', 'Slimy\nSquid', 'Schleimiger\nTintenfisch', 'Calamar\nbaboso', 'Calmar\nvisqueux ', 'Calamaro\nviscido', 'Lula\nEscorregadia', 'Липкий\nкальмар', 'Çamurlu\nKalamar', 'Slijmerige\ninktvis', 'Oślizgła\nkałamarnica'];
    s['hair'] = ['Hair Curlers', 'Bobes de\nCabelo', 'Hair\nCurlers', 'Lockenwickler', 'Rulos', 'Bigoudis', 'Bigodini', 'Rolos de\n Cabelo', 'Бигуди', 'Saç\nBükücü', 'Haarkrullers', 'Loki'];
    s['spike'] = ['Spike\nBracelet', 'Faixa com\nEspinhos', 'Spike\nBand', 'Stachelarmband', 'Pulsera de\npinchos', 'Bande en\npointe', 'Bracciale\nchiodato', 'Crista', 'Браслет с\nшипами', 'Çivili\nBand', 'Spijkerband', 'Opaska z\nkolcami'];
    s['garden'] = ['Garden Glove', 'Luva de\nJardinagem', 'Garden\nGlove', '\nGartenhandschuh', 'Guante de\njardinería', 'Gant de\njardinage', 'Guanti da\ngiardinaggio', 'Luva de\nJardim', 'Садовая\nперчатка', 'Bahçe\nEldiveni', 'Tuinhandschoen', 'Rękawica\nogrodowa'];
    s['tailored'] = ['Tailored\nSuit', 'Terno', 'Tailored\nSuit', 'Maßgeschneiderter\nAnzug', 'Traje a\nmedida', 'Costume', 'Abito\nsartoriale', 'Fato à\nMedida', 'Английский\nкостюм', 'Dikilmiş\nElbise', 'Maatpak', 'Garnitur'];
    s['critter'] = ['Critter Pet', 'Animal de\nEstimação', 'Critter\nPet', 'Kleines\nHaustier', 'Mascota de\ncriatura', 'Bestiole de\ncompagnie', 'bestiolina', 'Bicharoco de\nEstimação', 'Домашний\nпитомец', 'Evcil\nYaratık', 'Huisdier', 'Zwierzątko\nCritter'];
    s['lux'] = ['Lux Watch', 'Relógio\nIluminado', 'Lux Watch', 'Luxus-Uhr', 'Reloj de \nlujo', 'Montre de\nLuxe', 'Orologio di\nlusso', 'Relógio de\nLuxo', 'Роскошные\nчасы', 'Lüks Saat', 'Luxe\nhorloge', 'Luksusowy\nzegarek '];
    s['glove'] = ['Leather\nGlove', 'Luva de\nCouro', 'Leather\nGlove', 'Lederhandschuh', 'Guante de\ncuero', 'Gant en\ncuir', 'Guanto in\npelle', 'Luva de\nCouro', 'Кожаная\nперчатка', 'Deri\nEldiven', 'Lederen\nhandschoen', 'Skórzana\nrękawiczka'];

    s['total'] = ['Total', 'Total', 'Total', 'Gesamt', 'Total', 'Total', 'Totale', 'Total', 'Всего', 'Toplam', 'Totaal', 'Razem'];
    s['yes'] = ['Yes', 'Sim', 'Yes', 'Ja', 'Sí', 'Oui', 'Sì', 'Sim', 'Да', 'Evet', 'Ja', 'Tak'];
    s['no'] = ['No', 'Não', 'No', 'Nein', 'No', 'Non', 'NO', 'Não', 'Нет', 'Hayır', 'Nee', 'Nie'];
    s['toclaim'] = [' to claim the next prize', ' para receber o próximo prêmio', ' to claim the next prize', ' um den nächsten preis freizuschalten', ' para reclamar el premio siguiente', ' pour réclamer le prix suivant', ' per richiedere il prossimo premio', ' para reclamar o próximo prémio', ' для требования следующего приза', ' sonraki ödülü talep etmek için ', ' om de volgende prijs te claimen', ' aby odebrać następną nagrodę'];
    s['youunlocked'] = ['You unlocked a new item! Congrats!', 'Você desbloqueou um item novo! Parabéns!', 'You unlocked a new item! Congrats!', 'Toll, Du hast einen neuen Gegenstand freigeschaltet! ', '¡Has desbloqueado un artículo nuevo! ¡Enhorabuena!', 'Vous avez déverrouillé un nouvel élément ! Félicitations !', 'Congratulazioni! Hai sbloccato un nuovo oggetto!', 'Desbloqueou um novo artigo! Parabéns!', 'Ты разблокировал новый предмет! Поздравляем!', 'Yeni bir öğenin kilidini açtın! Tebrikler!', 'U hebt een nieuw item ontgrendeld! Gefeliciteerd!', 'Odblokowałeś/aś nową rzecz! Gratulacje!'];
    s['newrecord'] = ['New record!', 'Novo recorde!', 'New record!','Neuer Rekord!','Nuevo récord!','Nouveau Record!','Nuovo record!','Novo Recorde!','Новая запись!','Yeni Rekor!','Nieuw record!','Nowy rekord!'];
    s['equipthisitem'] = ['Equip this item?', 'Equipar esse\nitem?','Equip this item?', 'Gegenstand anlegen?','¡Equipar este objeto?','Installer cet\néquipement?','Usa questo\noggetto?','Equipar este item?','Забрать этот предмет?','Bu parçayı giy?','Dit element\nuitrusten?','Użyć tego\nprzedmiotu?'];
    s['buythisitem'] = ['Buy this item for', 'Comprar este item por', 'Buy this item for?', 'Diesen Gegenstand für kaufen?', '¿Quieres comprar este artículo por?', 'Achetez cet article pour?', 'Compra questo oggetto per?', 'Comprar este artigo por?', 'Купи этот предмет за?', 'Bu parçayı fiyata al?', 'Dit item kopen voor?', 'Kup to za?'];
    s['nocoins'] = ['Not enough coins!', 'Moedas insuficientes!', 'Not enough coins', 'Nicht genug Münzen', 'No tienes suficientes monedas', 'Pas assez de pièces ', 'Non ci sono abbastanza monete', 'Moedas insuficientes', 'Недостаточно монет', 'Yeterli para yok', 'Niet genoeg munten', 'Brak wystarczającej liczby monet'];
    s['warning'] = ['Warning!', 'Atenção!', 'Warning!', 'Achtung!', '¡Atención!', 'Attention!', 'Attenzione!', 'Aviso!', 'Внимание!', 'Uyarı!', 'Waarschuwing!', 'Uwaga!'];
    s['doyouwantclear'] = [' Do you want to\ndelete your saved data?', ' Deseja excluir os\ndados salvos?', ' Do you want to delete\nyour saved data?', ' Willst Du wirklich Deinen\nFortschritt löschen?', ' ¿Quieres borrar tus\ndatos guardados?',  'Voulez-vous supprimer vos\ndonnées sauvegardées?', ' Vuoi eliminare i\ndati salvati?', ' Deseja apagar os seus\ndados guardados?', ' Ты хочешь удалить\nсохраненные данные?', ' Kaydedilmiş verini\nsilmek istiyor musun?', ' Wil je je opgeslagen\ngegevens wissen?', ' Chcesz usunąć\nzapamiętane informacje?'];


}; extend(AG.Lang, Object);


AG.S = function(v) {
    return AG.langs.S[v][AG.langs.lang];
};