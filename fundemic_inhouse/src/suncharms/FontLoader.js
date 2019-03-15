M3.FontLoader = function(assetURLs, crossorigin) {

    new M3.BitmapFontLoader();
};

extend(M3.FontLoader, PIXI.AssetLoader);


M3.FontString = '<font>'+
    '<info face="Font2" size="71" />'+
    '<common lineHeight="71" scaleW="681" scaleH="682" pages="1" />'+
    '<pages>'+
    '<page id="0" file="Font2.png" />'+
    '</pages>'+
   '<chars count="190">'+
    '<char id="33" x="654" y="279" width="8" height="51" xoffset="0" yoffset="20" xadvance="12" /><!-- ! -->' +
    '<char id="34" x="112" y="348" width="18" height="14" xoffset="0" yoffset="20" xadvance="22" /><!-- " -->' +
    '<char id="35" x="254" y="67" width="28" height="51" xoffset="0" yoffset="20" xadvance="32" /><!-- # -->' +
    '<char id="36" x="254" y="132" width="28" height="59" xoffset="0" yoffset="16" xadvance="32" /><!-- $ -->' +
    '<char id="37" x="0" y="53" width="53" height="43" xoffset="0" yoffset="28" xadvance="57" /><!-- % -->' +
    '<char id="38" x="160" y="456" width="32" height="53" xoffset="0" yoffset="19" xadvance="36" /><!-- & -->' +
    '<char id="39" x="494" y="540" width="8" height="14" xoffset="0" yoffset="20" xadvance="12" /><!-- -->' +
    '<char id="40" x="632" y="69" width="14" height="55" xoffset="0" yoffset="18" xadvance="18" /><!-- ( -->' +
    '<char id="41" x="632" y="0" width="14" height="55" xoffset="0" yoffset="18" xadvance="18" /><!-- ) -->' +
    '<char id="42" x="531" y="189" width="22" height="22" xoffset="0" yoffset="24" xadvance="26" /><!-- * -->' +
    '<char id="43" x="211" y="100" width="18" height="18" xoffset="0" yoffset="43" xadvance="22" /><!-- + -->' +
    '<char id="44" x="295" y="399" width="8" height="16" xoffset="0" yoffset="63" xadvance="12" /><!-- , -->' +
    '<char id="45" x="160" y="575" width="11" height="6" xoffset="0" yoffset="53" xadvance="15" /><!-- - -->' +
    '<char id="46" x="164" y="320" width="8" height="8" xoffset="0" yoffset="63" xadvance="12" /><!-- . -->' +
    '<char id="47" x="418" y="239" width="24" height="51" xoffset="0" yoffset="20" xadvance="28" /><!-- / -->' +
    '<char id="48" x="378" y="65" width="26" height="53" xoffset="0" yoffset="19" xadvance="30" /><!-- 0 -->' +
    '<char id="49" x="632" y="574" width="14" height="51" xoffset="0" yoffset="20" xadvance="18" /><!-- 1 -->' +
    '<char id="50" x="376" y="408" width="26" height="52" xoffset="0" yoffset="19" xadvance="30" /><!-- 2 -->' +
    '<char id="51" x="416" y="369" width="26" height="53" xoffset="0" yoffset="19" xadvance="30" /><!-- 3 -->' +
    '<char id="52" x="294" y="577" width="28" height="51" xoffset="0" yoffset="20" xadvance="32" /><!-- 4 -->' +
    '<char id="53" x="377" y="541" width="26" height="52" xoffset="0" yoffset="20" xadvance="30" /><!-- 5 -->' +
    '<char id="54" x="376" y="474" width="26" height="53" xoffset="0" yoffset="19" xadvance="30" /><!-- 6 -->' +
    '<char id="55" x="566" y="266" width="21" height="51" xoffset="0" yoffset="20" xadvance="25" /><!-- 7 -->' +
    '<char id="56" x="335" y="399" width="27" height="53" xoffset="0" yoffset="19" xadvance="31" /><!-- 8 -->' +
    '<char id="57" x="338" y="65" width="26" height="53" xoffset="0" yoffset="19" xadvance="30" /><!-- 9 -->' +
    '<char id="58" x="601" y="130" width="8" height="24" xoffset="0" yoffset="40" xadvance="12" /><!-- : -->' +
    '<char id="59" x="567" y="449" width="8" height="31" xoffset="0" yoffset="40" xadvance="12" /><!-- ; -->' +
    '<char id="60" x="567" y="169" width="19" height="34" xoffset="0" yoffset="36" xadvance="23" /><!-- < -->' +
    '<char id="61" x="127" y="653" width="18" height="15" xoffset="0" yoffset="49" xadvance="22" /><!-- = -->' +
    '<char id="62" x="567" y="217" width="19" height="34" xoffset="0" yoffset="36" xadvance="23" /><!-- > -->' +
    '<char id="63" x="338" y="132" width="26" height="47" xoffset="0" yoffset="24" xadvance="30" /><!-- ? -->' +
    '<char id="64" x="0" y="382" width="44" height="49" xoffset="0" yoffset="26" xadvance="48" /><!-- @ -->' +
    '<char id="65" x="167" y="67" width="30" height="51" xoffset="0" yoffset="20" xadvance="34" /><!-- A -->' +
    '<char id="66" x="297" y="0" width="28" height="51" xoffset="0" yoffset="20" xadvance="32" /><!-- B -->' +
    '<char id="67" x="252" y="289" width="29" height="53" xoffset="0" yoffset="19" xadvance="33" /><!-- C -->' +
    '<char id="68" x="337" y="197" width="27" height="51" xoffset="0" yoffset="20" xadvance="31" /><!-- D -->' +
    '<char id="69" x="567" y="539" width="21" height="51" xoffset="0" yoffset="20" xadvance="25" /><!-- E -->' +
    '<char id="70" x="567" y="331" width="21" height="51" xoffset="0" yoffset="20" xadvance="25" /><!-- F -->' +
    '<char id="71" x="167" y="0" width="30" height="53" xoffset="0" yoffset="19" xadvance="34" /><!-- G -->' +
    '<char id="72" x="292" y="512" width="28" height="51" xoffset="0" yoffset="20" xadvance="32" /><!-- H -->' +
    '<char id="73" x="659" y="138" width="8" height="51" xoffset="0" yoffset="20" xadvance="12" /><!-- I -->' +
    '<char id="74" x="602" y="372" width="15" height="51" xoffset="0" yoffset="20" xadvance="19" /><!-- J -->' +
    '<char id="75" x="205" y="523" width="30" height="51" xoffset="0" yoffset="20" xadvance="34" /><!-- K -->' +
    '<char id="76" x="566" y="606" width="21" height="51" xoffset="0" yoffset="20" xadvance="25" /><!-- L -->' +
    '<char id="77" x="118" y="0" width="35" height="51" xoffset="0" yoffset="20" xadvance="39" /><!-- M -->' +
    '<char id="78" x="339" y="0" width="26" height="51" xoffset="0" yoffset="20" xadvance="30" /><!-- N -->' +
    '<char id="79" x="254" y="0" width="29" height="53" xoffset="0" yoffset="19" xadvance="33" /><!-- O -->' +
    '<char id="80" x="378" y="173" width="26" height="51" xoffset="0" yoffset="20" xadvance="30" /><!-- P -->' +
    '<char id="81" x="252" y="356" width="29" height="60" xoffset="0" yoffset="19" xadvance="33" /><!-- Q -->' +
    '<char id="82" x="295" y="272" width="28" height="51" xoffset="0" yoffset="20" xadvance="32" /><!-- R -->' +
    '<char id="83" x="295" y="205" width="28" height="53" xoffset="0" yoffset="19" xadvance="32" /><!-- S -->' +
    '<char id="84" x="377" y="607" width="26" height="51" xoffset="0" yoffset="20" xadvance="30" /><!-- T -->' +
    '<char id="85" x="208" y="288" width="30" height="52" xoffset="0" yoffset="20" xadvance="34" /><!-- U -->' +
    '<char id="86" x="208" y="223" width="30" height="51" xoffset="0" yoffset="20" xadvance="34" /><!-- V -->' +
    '<char id="87" x="0" y="445" width="44" height="51" xoffset="0" yoffset="20" xadvance="48" /><!-- W -->' +
    '<char id="88" x="207" y="588" width="30" height="51" xoffset="0" yoffset="20" xadvance="34" /><!-- X -->' +
    '<char id="89" x="249" y="512" width="29" height="51" xoffset="0" yoffset="20" xadvance="33" /><!-- Y -->' +
    '<char id="90" x="417" y="502" width="25" height="51" xoffset="0" yoffset="20" xadvance="29" /><!-- Z -->' +
    '<char id="91" x="602" y="513" width="16" height="55" xoffset="0" yoffset="18" xadvance="20" /><!-- [ -->' +
    '<char id="92" x="632" y="437" width="14" height="51" xoffset="0" yoffset="20" xadvance="18" /><!--  -->' +
    '<char id="93" x="602" y="0" width="16" height="55" xoffset="0" yoffset="18" xadvance="20" /><!-- ] -->' +
    '<char id="94" x="55" y="649" width="23" height="19" xoffset="0" yoffset="27" xadvance="27" /><!-- ^ -->' +
    '<char id="95" x="0" y="650" width="22" height="6" xoffset="0" yoffset="65" xadvance="26" /><!-- _ -->' +
    '<char id="96" x="159" y="655" width="12" height="12" xoffset="0" yoffset="20" xadvance="16" /><!-- ` -->' +
    '<char id="97" x="455" y="629" width="24" height="38" xoffset="0" yoffset="34" xadvance="28" /><!-- a -->' +
    '<char id="98" x="456" y="502" width="24" height="52" xoffset="0" yoffset="20" xadvance="28" /><!-- b -->' +
    '<char id="99" x="493" y="422" width="23" height="38" xoffset="0" yoffset="34" xadvance="27" /><!-- c -->' +
    '<char id="100" x="416" y="436" width="25" height="52" xoffset="0" yoffset="20" xadvance="29" /><!-- d -->' +
    '<char id="101" x="493" y="568" width="23" height="38" xoffset="0" yoffset="34" xadvance="27" /><!-- e -->' +
    '<char id="102" x="601" y="604" width="17" height="49" xoffset="0" yoffset="22" xadvance="21" /><!-- f -->' +
    '<char id="103" x="295" y="337" width="28" height="48" xoffset="0" yoffset="34" xadvance="32" /><!-- g -->' +
    '<char id="104" x="531" y="433" width="22" height="51" xoffset="0" yoffset="20" xadvance="26" /><!-- h -->' +
    '<char id="105" x="659" y="344" width="8" height="49" xoffset="0" yoffset="22" xadvance="12" /><!-- i -->' +
    '<char id="106" x="632" y="502" width="14" height="58" xoffset="0" yoffset="22" xadvance="18" /><!-- j -->' +
    '<char id="107" x="456" y="193" width="24" height="51" xoffset="0" yoffset="20" xadvance="28" /><!-- k -->' +
    '<char id="108" x="632" y="307" width="8" height="51" xoffset="0" yoffset="20" xadvance="12" /><!-- l -->' +
    '<char id="109" x="67" y="53" width="37" height="37" xoffset="0" yoffset="34" xadvance="41" /><!-- m -->' +
    '<char id="110" x="530" y="606" width="22" height="37" xoffset="0" yoffset="34" xadvance="26" /><!-- n -->' +
    '<char id="111" x="493" y="620" width="23" height="38" xoffset="0" yoffset="34" xadvance="27" /><!-- o -->' +
    '<char id="112" x="456" y="65" width="24" height="48" xoffset="0" yoffset="34" xadvance="28" /><!-- p -->' +
    '<char id="113" x="417" y="567" width="25" height="48" xoffset="0" yoffset="34" xadvance="29" /><!-- q -->' +
    '<char id="114" x="601" y="79" width="17" height="37" xoffset="0" yoffset="34" xadvance="21" /><!-- r -->' +
    '<char id="115" x="456" y="568" width="23" height="38" xoffset="0" yoffset="34" xadvance="27" /><!-- s -->' +
    '<char id="116" x="601" y="449" width="17" height="50" xoffset="0" yoffset="22" xadvance="21" /><!-- t -->' +
    '<char id="117" x="494" y="367" width="22" height="38" xoffset="0" yoffset="34" xadvance="26" /><!-- u -->' +
    '<char id="118" x="418" y="147" width="24" height="37" xoffset="0" yoffset="34" xadvance="28" /><!-- v -->' +
    '<char id="119" x="110" y="550" width="36" height="37" xoffset="0" yoffset="33" xadvance="40" /><!-- w -->' +
    '<char id="120" x="417" y="629" width="24" height="37" xoffset="0" yoffset="33" xadvance="28" /><!-- x -->' +
    '<char id="121" x="418" y="48" width="24" height="46" xoffset="0" yoffset="33" xadvance="28" /><!-- y -->' +
    '<char id="122" x="567" y="79" width="20" height="37" xoffset="0" yoffset="33" xadvance="24" /><!-- z -->' +
    '<char id="123" x="601" y="238" width="18" height="55" xoffset="0" yoffset="17" xadvance="22" /><!-- { -->' +
    '<char id="124" x="660" y="407" width="6" height="59" xoffset="0" yoffset="15" xadvance="10" /><!-- | -->' +
    '<char id="125" x="600" y="169" width="18" height="55" xoffset="0" yoffset="17" xadvance="22" /><!-- } -->' +
    '<char id="126" x="92" y="655" width="21" height="9" xoffset="0" yoffset="38" xadvance="25" /><!-- ~ -->' +
    '<char id="199" x="250" y="431" width="29" height="67" xoffset="0" yoffset="18" xadvance="33" /><!-- Ç -->' +
    '<char id="213" x="251" y="577" width="29" height="64" xoffset="0" yoffset="7" xadvance="33" /><!-- Õ -->' +
    '<char id="211" x="252" y="209" width="29" height="66" xoffset="0" yoffset="5" xadvance="33" /><!-- Ó -->' +
    '<char id="231" x="530" y="367" width="23" height="52" xoffset="0" yoffset="33" xadvance="27" /><!-- ç -->' +
    '<char id="237" x="631" y="372" width="14" height="51" xoffset="0" yoffset="19" xadvance="18" /><!-- í -->' +
    '<char id="227" x="456" y="320" width="24" height="49" xoffset="0" yoffset="22" xadvance="28" /><!-- ã -->' +
    '<char id="243" x="530" y="540" width="23" height="52" xoffset="0" yoffset="19" xadvance="27" /><!-- ó -->' +
    '<char id="234" x="494" y="235" width="23" height="52" xoffset="0" yoffset="19" xadvance="27" /><!-- ê -->' +
    '<char id="233" x="494" y="169" width="23" height="52" xoffset="0" yoffset="19" xadvance="27" /><!-- é -->' +
    '<char id="228" x="456" y="258" width="24" height="48" xoffset="0" yoffset="23" xadvance="28" /><!-- ä -->' +
    '<char id="223" x="376" y="341" width="26" height="53" xoffset="0" yoffset="18" xadvance="30" /><!-- ß -->' +
    '<char id="246" x="494" y="107" width="23" height="48" xoffset="0" yoffset="23" xadvance="27" /><!-- ö -->' +
    '<char id="252" x="531" y="62" width="22" height="48" xoffset="0" yoffset="23" xadvance="26" /><!-- ü -->' +
    '<char id="241" x="531" y="0" width="22" height="48" xoffset="0" yoffset="22" xadvance="26" /><!-- ñ -->' +
    '<char id="161" x="655" y="203" width="8" height="44" xoffset="0" yoffset="18" xadvance="12" /><!-- ¡ -->' +
    '<char id="191" x="567" y="396" width="21" height="39" xoffset="0" yoffset="23" xadvance="25" /><!-- ¿ -->' +
    '<char id="200" x="567" y="0" width="21" height="65" xoffset="0" yoffset="5" xadvance="25" /><!-- È -->' +
    '<char id="195" x="208" y="354" width="30" height="63" xoffset="0" yoffset="7" xadvance="34" /><!-- Ã -->' +
    '<char id="350" x="293" y="430" width="28" height="67" xoffset="0" yoffset="18" xadvance="32" /><!-- Ş -->' +
    '<char id="220" x="210" y="132" width="30" height="63" xoffset="0" yoffset="8" xadvance="34" /><!-- Ü -->' +
    '<char id="351" x="494" y="474" width="23" height="52" xoffset="0" yoffset="34" xadvance="27" /><!-- ş -->' +
    '<char id="287" x="296" y="121" width="28" height="62" xoffset="0" yoffset="20" xadvance="32" /><!-- ğ -->' +
    '<char id="280" x="531" y="266" width="21" height="66" xoffset="0" yoffset="20" xadvance="25" /><!-- Ę -->' +
    '<char id="281" x="494" y="41" width="23" height="52" xoffset="0" yoffset="34" xadvance="27" /><!-- ę -->' +
    '<char id="261" x="456" y="127" width="24" height="52" xoffset="0" yoffset="34" xadvance="28" /><!-- ą -->' +
    '<char id="321" x="456" y="0" width="24" height="51" xoffset="0" yoffset="20" xadvance="28" /><!-- Ł -->' +
    '<char id="322" x="602" y="307" width="16" height="51" xoffset="0" yoffset="20" xadvance="20" /><!-- ł -->' +
    '<char id="324" x="531" y="124" width="22" height="51" xoffset="0" yoffset="20" xadvance="26" /><!-- ń -->' +
    '<char id="323" x="378" y="238" width="26" height="65" xoffset="0" yoffset="6" xadvance="30" /><!-- Ń -->' +
    '<char id="347" x="494" y="301" width="23" height="52" xoffset="0" yoffset="20" xadvance="27" /><!-- ś -->' +
    '<char id="1072" x="418" y="198" width="24" height="27" xoffset="0" yoffset="45" xadvance="28" /><!-- а -->' +
    '<char id="1073" x="337" y="341" width="25" height="43" xoffset="0" yoffset="29" xadvance="29" /><!-- б -->' +
    '<char id="1074" x="418" y="108" width="24" height="25" xoffset="0" yoffset="46" xadvance="28" /><!-- в -->' +
    '<char id="1075" x="567" y="130" width="20" height="25" xoffset="0" yoffset="46" xadvance="24" /><!-- г -->' +
    '<char id="1076" x="379" y="0" width="26" height="34" xoffset="0" yoffset="46" xadvance="30" /><!-- д -->' +
    '<char id="1077" x="531" y="498" width="21" height="27" xoffset="0" yoffset="45" xadvance="25" /><!-- е -->' +
    '<char id="1078" x="0" y="610" width="41" height="26" xoffset="0" yoffset="45" xadvance="45" /><!-- ж -->' +
    '<char id="1079" x="566" y="498" width="21" height="27" xoffset="0" yoffset="45" xadvance="25" /><!-- з -->' +
    '<char id="1080" x="167" y="132" width="29" height="25" xoffset="0" yoffset="46" xadvance="33" /><!-- и -->' +
    '<char id="1082" x="337" y="262" width="27" height="26" xoffset="0" yoffset="45" xadvance="31" /><!-- к -->' +
    '<char id="1083" x="335" y="466" width="27" height="26" xoffset="0" yoffset="46" xadvance="31" /><!-- л -->' +
    '<char id="1084" x="111" y="382" width="35" height="25" xoffset="0" yoffset="46" xadvance="39" /><!-- м -->' +
    '<char id="1085" x="166" y="223" width="28" height="25" xoffset="0" yoffset="46" xadvance="32" /><!-- н -->' +
    '<char id="1086" x="378" y="132" width="26" height="27" xoffset="0" yoffset="45" xadvance="30" /><!-- о -->' +
    '<char id="1087" x="294" y="642" width="28" height="25" xoffset="0" yoffset="46" xadvance="32" /><!-- п -->' +
    '<char id="1088" x="336" y="565" width="27" height="41" xoffset="0" yoffset="44" xadvance="31" /><!-- р -->' +
    '<char id="1089" x="531" y="225" width="22" height="27" xoffset="0" yoffset="45" xadvance="26" /><!-- с -->' +
    '<char id="1090" x="419" y="0" width="23" height="25" xoffset="0" yoffset="46" xadvance="27" /><!-- т -->' +
    '<char id="1091" x="296" y="67" width="28" height="40" xoffset="0" yoffset="46" xadvance="32" /><!-- у -->' +
    '<char id="1092" x="115" y="278" width="35" height="56" xoffset="0" yoffset="29" xadvance="39" /><!-- ф -->' +
    '<char id="1093" x="118" y="171" width="28" height="25" xoffset="0" yoffset="46" xadvance="32" /><!-- х -->' +
    '<char id="1094" x="211" y="52" width="29" height="34" xoffset="0" yoffset="46" xadvance="33" /><!-- ц -->' +
    '<char id="1095" x="337" y="302" width="27" height="25" xoffset="0" yoffset="46" xadvance="31" /><!-- ч -->' +
    '<char id="1096" x="55" y="610" width="41" height="25" xoffset="0" yoffset="46" xadvance="45" /><!-- ш -->' +
    '<char id="1097" x="0" y="562" width="42" height="34" xoffset="0" yoffset="46" xadvance="46" /><!-- щ -->' +
    '<char id="1100" x="456" y="383" width="24" height="25" xoffset="0" yoffset="46" xadvance="28" /><!-- ь -->' +
    '<char id="1099" x="68" y="0" width="36" height="25" xoffset="0" yoffset="46" xadvance="40" /><!-- ы -->' +
    '<char id="1101" x="494" y="0" width="23" height="27" xoffset="0" yoffset="45" xadvance="27" /><!-- э -->' +
    '<char id="1102" x="56" y="563" width="37" height="27" xoffset="0" yoffset="45" xadvance="41" /><!-- ю -->' +
    '<char id="1103" x="336" y="620" width="27" height="25" xoffset="0" yoffset="46" xadvance="31" /><!-- я -->' +
    '<char id="1052" x="0" y="278" width="49" height="38" xoffset="0" yoffset="33" xadvance="53" /><!-- М -->' +
    '<char id="1040" x="66" y="110" width="38" height="39" xoffset="0" yoffset="32" xadvance="42" /><!-- А -->' +
    '<char id="1043" x="416" y="317" width="26" height="38" xoffset="0" yoffset="33" xadvance="30" /><!-- Г -->' +
    '<char id="1047" x="334" y="511" width="27" height="40" xoffset="0" yoffset="32" xadvance="31" /><!-- З -->' +
    '<char id="1048" x="59" y="330" width="39" height="38" xoffset="0" yoffset="33" xadvance="43" /><!-- И -->' +
    '<char id="1053" x="0" y="510" width="42" height="38" xoffset="0" yoffset="33" xadvance="46" /><!-- Н -->' +
    '<char id="1051" x="159" y="601" width="34" height="39" xoffset="0" yoffset="33" xadvance="38" /><!-- Л -->' +
    '<char id="1062" x="58" y="382" width="39" height="48" xoffset="0" yoffset="33" xadvance="43" /><!-- Ц -->' +
    '<char id="1059" x="110" y="496" width="36" height="40" xoffset="0" yoffset="33" xadvance="40" /><!-- У -->' +
    '<char id="1050" x="117" y="215" width="35" height="39" xoffset="0" yoffset="32" xadvance="39" /><!-- К -->' +
    '<char id="1041" x="166" y="171" width="30" height="38" xoffset="0" yoffset="33" xadvance="34" /><!-- Б -->' +
    '<char id="1061" x="66" y="163" width="38" height="38" xoffset="0" yoffset="33" xadvance="42" /><!-- Х -->' +
    '<char id="1063" x="110" y="601" width="35" height="38" xoffset="0" yoffset="33" xadvance="39" /><!-- Ч -->' +
    '<char id="1044" x="111" y="421" width="35" height="48" xoffset="0" yoffset="33" xadvance="39" /><!-- Д -->' +
    '<char id="1042" x="206" y="456" width="30" height="38" xoffset="0" yoffset="33" xadvance="34" /><!-- В -->' +
    '<char id="1055" x="63" y="278" width="38" height="38" xoffset="0" yoffset="33" xadvance="42" /><!-- П -->' +
    '<char id="1057" x="118" y="65" width="35" height="40" xoffset="0" yoffset="32" xadvance="39" /><!-- С -->' +
    '<char id="1056" x="211" y="0" width="29" height="38" xoffset="0" yoffset="33" xadvance="33" /><!-- Р -->' +
    '<char id="1058" x="160" y="402" width="33" height="40" xoffset="0" yoffset="31" xadvance="37" /><!-- Т -->' +
    '<char id="1054" x="65" y="224" width="38" height="40" xoffset="0" yoffset="32" xadvance="42" /><!-- О -->' +
    '<char id="304" x="633" y="203" width="8" height="62" xoffset="0" yoffset="9" xadvance="12" /><!-- İ -->' +
    '<char id="1068" x="164" y="268" width="30" height="38" xoffset="0" yoffset="33" xadvance="34" /><!-- Ь -->' +
    '<char id="1046" x="0" y="0" width="54" height="39" xoffset="0" yoffset="32" xadvance="58" /><!-- Ж -->' +
    '<char id="1045" x="160" y="523" width="31" height="38" xoffset="0" yoffset="33" xadvance="35" /><!-- Е -->' +
    '<char id="224" x="455" y="436" width="24" height="52" xoffset="0" yoffset="20" xadvance="28" /><!-- à -->' +
    '<char id="236" x="632" y="138" width="13" height="51" xoffset="0" yoffset="20" xadvance="17" /><!-- ì -->' +
    '<char id="1060" x="56" y="510" width="40" height="39" xoffset="0" yoffset="32" xadvance="44" /><!-- Ф -->' +
    '<char id="1064" x="0" y="172" width="52" height="38" xoffset="0" yoffset="33" xadvance="56" /><!-- Ш -->' +
    '<char id="1065" x="0" y="110" width="52" height="48" xoffset="0" yoffset="33" xadvance="56" /><!-- Щ -->' +
    '<char id="1066" x="58" y="444" width="39" height="38" xoffset="0" yoffset="33" xadvance="43" /><!-- Ъ -->' +
    '<char id="1067" x="0" y="330" width="45" height="38" xoffset="0" yoffset="33" xadvance="49" /><!-- Ы -->' +
    '<char id="1069" x="160" y="348" width="34" height="40" xoffset="0" yoffset="32" xadvance="38" /><!-- Э -->' +
    '<char id="1070" x="0" y="224" width="51" height="40" xoffset="0" yoffset="32" xadvance="55" /><!-- Ю -->' +
    '<char id="1071" x="118" y="119" width="35" height="38" xoffset="0" yoffset="33" xadvance="39" /><!-- Я -->' +
    '<char id="32" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="21" /><!--   -->' +
    '<char id="9" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="168" /><!-- 	 -->' +
    '</chars>'+
'<kernings count="0">'+
'</kernings>'+
   '</font>';
M3.BitmapFontLoader = function() {

    var xmlDoc;
    if (window.DOMParser)
    {
        var parser=new DOMParser();
        xmlDoc=parser.parseFromString(M3.FontString ,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(M3.FontString );
    }


            var responseXML = xmlDoc;
            /*
            if(!responseXML || /MSIE 9/i.test(navigator.userAgent) || navigator.isCocoonJS) {
                if(typeof(window.DOMParser) === 'function') {
                    var domparser = new DOMParser();
                    responseXML = domparser.parseFromString(this.ajaxRequest.responseText, 'text/xml');
                } else {
                    var div = document.createElement('div');
                    div.innerHTML = this.ajaxRequest.responseText;
                    responseXML = div;
                }
            }
            //*/

            var textureUrl = this.baseUrl + responseXML.getElementsByTagName('page')[0].getAttribute('file');
           // var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
            this.texture = GodStep.textures['Font2'].baseTexture;//image.texture.baseTexture;

            var data = {};
            var info = responseXML.getElementsByTagName('info')[0];
            var common = responseXML.getElementsByTagName('common')[0];
            data.font = info.getAttribute('face');
            data.size = parseInt(info.getAttribute('size'), 10);
            data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10);
            data.chars = {};

            //parse letters
            var letters = responseXML.getElementsByTagName('char');

            for (var i = 0; i < letters.length; i++)
            {
                var charCode = parseInt(letters[i].getAttribute('id'), 10);

                var textureRect = new PIXI.Rectangle(
                    parseInt(letters[i].getAttribute('x'), 10),
                    parseInt(letters[i].getAttribute('y'), 10),
                    parseInt(letters[i].getAttribute('width'), 10),
                    parseInt(letters[i].getAttribute('height'), 10)
                );

                data.chars[charCode] = {
                    xOffset: parseInt(letters[i].getAttribute('xoffset'), 10),
                    yOffset: parseInt(letters[i].getAttribute('yoffset'), 10) + 20,
                    xAdvance: parseInt(letters[i].getAttribute('xadvance'), 10),
                    kerning: {},
                    texture: PIXI.TextureCache[charCode] = new PIXI.Texture(this.texture, textureRect)

                };
            }

            //parse kernings
            var kernings = responseXML.getElementsByTagName('kerning');
            for (i = 0; i < kernings.length; i++)
            {
                var first = parseInt(kernings[i].getAttribute('first'), 10);
                var second = parseInt(kernings[i].getAttribute('second'), 10);
                var amount = parseInt(kernings[i].getAttribute('amount'), 10);

                data.chars[second].kerning[first] = amount;

            }

            PIXI.BitmapText.fonts[data.font] = data;
            //this.onComplete();

           // image.addEventListener('loaded', this.onLoaded.bind(this));
          //  image.load();

};
extend(M3.BitmapFontLoader, PIXI.BitmapFontLoader);