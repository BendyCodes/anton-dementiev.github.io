PS.FontLoader = function(assetURLs, crossorigin) {

    new PS.BitmapFontLoader();
};

extend(PS.FontLoader, PIXI.AssetLoader);


PS.FontString = '<font>' +
    '<info face="Font2" size="86" />' +
    '<common lineHeight="62" scaleW="707" scaleH="713" pages="1" />' +
    '<pages>' +
    '<page id="0" file="Font2.png" />' +
    '</pages>' +
'<chars count="192">' +
    '<char id="33" x="685" y="59" width="7" height="45" xoffset="0" yoffset="17" xadvance="10" /><!-- ! -->' +
    '<char id="34" x="74" y="46" width="12" height="12" xoffset="0" yoffset="17" xadvance="15" /><!-- " -->' +
    '<char id="35" x="278" y="118" width="33" height="46" xoffset="0" yoffset="16" xadvance="36" /><!-- # -->' +
    '<char id="36" x="587" y="0" width="26" height="56" xoffset="0" yoffset="11" xadvance="29" /><!-- $ -->' +
    '<char id="37" x="0" y="437" width="47" height="45" xoffset="0" yoffset="17" xadvance="50" /><!-- % -->' +
    '<char id="38" x="176" y="426" width="37" height="46" xoffset="0" yoffset="16" xadvance="40" /><!-- & -->' +
    '<char id="39" x="100" y="46" width="5" height="11" xoffset="0" yoffset="17" xadvance="8" /><!--  -->' +
    '<char id="40" x="663" y="462" width="12" height="59" xoffset="0" yoffset="17" xadvance="15" /><!-- ( -->' +
    '<char id="41" x="660" y="119" width="12" height="60" xoffset="0" yoffset="16" xadvance="15" /><!-- ) -->' +
    '<char id="42" x="226" y="604" width="18" height="16" xoffset="0" yoffset="17" xadvance="21" /><!-- * -->' +
    '<char id="43" x="176" y="545" width="28" height="27" xoffset="0" yoffset="26" xadvance="31" /><!-- + -->' +
    '<char id="44" x="627" y="325" width="7" height="13" xoffset="0" yoffset="56" xadvance="10" /><!-- , -->' +
    '<char id="45" x="0" y="692" width="18" height="4" xoffset="0" yoffset="44" xadvance="21" /><!-- - -->' +
    '<char id="46" x="95" y="164" width="7" height="6" xoffset="0" yoffset="56" xadvance="10" /><!-- . -->' +
    '<char id="47" x="627" y="260" width="23" height="51" xoffset="0" yoffset="16" xadvance="26" /><!-- / -->' +
    '<char id="48" x="505" y="552" width="28" height="46" xoffset="0" yoffset="16" xadvance="31" /><!-- 0 -->' +
    '<char id="49" x="662" y="0" width="11" height="45" xoffset="0" yoffset="17" xadvance="14" /><!-- 1 -->' +
    '<char id="50" x="545" y="0" width="28" height="46" xoffset="0" yoffset="16" xadvance="31" /><!-- 2 -->' +
    '<char id="51" x="545" y="60" width="28" height="46" xoffset="0" yoffset="16" xadvance="31" /><!-- 3 -->' +
    '<char id="52" x="369" y="614" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- 4 -->' +
    '<char id="53" x="460" y="397" width="30" height="46" xoffset="0" yoffset="16" xadvance="33" /><!-- 5 -->' +
    '<char id="54" x="546" y="285" width="28" height="45" xoffset="0" yoffset="17" xadvance="31" /><!-- 6 -->' +
    '<char id="55" x="546" y="344" width="28" height="46" xoffset="0" yoffset="16" xadvance="31" /><!-- 7 -->' +
    '<char id="56" x="546" y="180" width="28" height="46" xoffset="0" yoffset="16" xadvance="31" /><!-- 8 -->' +
    '<char id="57" x="545" y="612" width="28" height="46" xoffset="0" yoffset="16" xadvance="31" /><!-- 9 -->' +
    '<char id="58" x="664" y="381" width="7" height="32" xoffset="0" yoffset="30" xadvance="10" /><!-- : -->' +
    '<char id="59" x="685" y="381" width="7" height="39" xoffset="0" yoffset="30" xadvance="10" /><!-- ; -->' +
    '<char id="60" x="371" y="338" width="28" height="31" xoffset="0" yoffset="26" xadvance="31" /><!-- < -->' +
    '<char id="61" x="416" y="516" width="25" height="19" xoffset="0" yoffset="32" xadvance="28" /><!-- = -->' +
    '<char id="62" x="546" y="240" width="28" height="31" xoffset="0" yoffset="26" xadvance="31" /><!-- > -->' +
    '<char id="63" x="545" y="120" width="28" height="46" xoffset="0" yoffset="16" xadvance="31" /><!-- ? -->' +
    '<char id="64" x="0" y="0" width="60" height="58" xoffset="0" yoffset="17" xadvance="63" /><!-- @ -->' +
    '<char id="65" x="176" y="486" width="37" height="45" xoffset="0" yoffset="17" xadvance="40" /><!-- A -->' +
    '<char id="66" x="547" y="463" width="27" height="45" xoffset="0" yoffset="17" xadvance="30" /><!-- B -->' +
    '<char id="67" x="125" y="249" width="38" height="45" xoffset="0" yoffset="17" xadvance="41" /><!-- C -->' +
    '<char id="68" x="231" y="0" width="34" height="45" xoffset="0" yoffset="17" xadvance="37" /><!-- D -->' +
    '<char id="69" x="279" y="0" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- E -->' +
    '<char id="70" x="371" y="220" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- F -->' +
    '<char id="71" x="125" y="308" width="38" height="45" xoffset="0" yoffset="17" xadvance="41" /><!-- G -->' +
    '<char id="72" x="324" y="496" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- H -->' +
    '<char id="73" x="687" y="0" width="4" height="45" xoffset="0" yoffset="17" xadvance="7" /><!-- I -->' +
    '<char id="74" x="587" y="568" width="27" height="45" xoffset="0" yoffset="17" xadvance="30" /><!-- J -->' +
    '<char id="75" x="417" y="0" width="30" height="45" xoffset="0" yoffset="17" xadvance="33" /><!-- K -->' +
    '<char id="76" x="461" y="0" width="30" height="45" xoffset="0" yoffset="17" xadvance="33" /><!-- L -->' +
    '<char id="77" x="65" y="368" width="46" height="45" xoffset="0" yoffset="17" xadvance="49" /><!-- M -->' +
    '<char id="78" x="180" y="0" width="37" height="45" xoffset="0" yoffset="17" xadvance="40" /><!-- N -->' +
    '<char id="79" x="61" y="437" width="46" height="45" xoffset="0" yoffset="17" xadvance="49" /><!-- O -->' +
    '<char id="80" x="587" y="404" width="26" height="45" xoffset="0" yoffset="17" xadvance="29" /><!-- P -->' +
    '<char id="81" x="60" y="615" width="46" height="45" xoffset="0" yoffset="17" xadvance="49" /><!-- Q -->' +
    '<char id="82" x="417" y="115" width="30" height="45" xoffset="0" yoffset="17" xadvance="33" /><!-- R -->' +
    '<char id="83" x="505" y="0" width="26" height="45" xoffset="0" yoffset="17" xadvance="29" /><!-- S -->' +
    '<char id="84" x="275" y="604" width="34" height="45" xoffset="0" yoffset="17" xadvance="37" /><!-- T -->' +
    '<char id="85" x="415" y="608" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- U -->' +
    '<char id="86" x="227" y="448" width="37" height="45" xoffset="0" yoffset="17" xadvance="40" /><!-- V -->' +
    '<char id="87" x="0" y="190" width="51" height="45" xoffset="0" yoffset="17" xadvance="54" /><!-- W -->' +
    '<char id="88" x="173" y="648" width="37" height="45" xoffset="0" yoffset="17" xadvance="40" /><!-- X -->' +
    '<char id="89" x="325" y="0" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- Y -->' +
    '<char id="90" x="177" y="262" width="37" height="45" xoffset="0" yoffset="17" xadvance="40" /><!-- Z -->' +
    '<char id="91" x="659" y="628" width="14" height="60" xoffset="0" yoffset="16" xadvance="17" /><!-- [ -->' +
    '<char id="92" x="627" y="398" width="23" height="50" xoffset="0" yoffset="17" xadvance="26" /><!--  -->' +
    '<char id="93" x="659" y="554" width="14" height="60" xoffset="0" yoffset="16" xadvance="17" /><!-- ] -->' +
    '<char id="94" x="46" y="674" width="23" height="17" xoffset="0" yoffset="17" xadvance="26" /><!-- ^ -->' +
    '<char id="95" x="0" y="674" width="32" height="4" xoffset="0" yoffset="62" xadvance="35" /><!-- _ -->' +
    '<char id="96" x="69" y="164" width="12" height="10" xoffset="0" yoffset="17" xadvance="15" /><!-- ` -->' +
    '<char id="97" x="370" y="443" width="32" height="32" xoffset="0" yoffset="30" xadvance="35" /><!-- a -->' +
    '<char id="98" x="371" y="59" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- b -->' +
    '<char id="99" x="504" y="447" width="28" height="32" xoffset="0" yoffset="30" xadvance="31" /><!-- c -->' +
    '<char id="100" x="325" y="118" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- d -->' +
    '<char id="101" x="275" y="663" width="32" height="32" xoffset="0" yoffset="30" xadvance="35" /><!-- e -->' +
    '<char id="102" x="627" y="0" width="21" height="46" xoffset="0" yoffset="16" xadvance="24" /><!-- f -->' +
    '<char id="103" x="370" y="383" width="32" height="46" xoffset="0" yoffset="30" xadvance="35" /><!-- g -->' +
    '<char id="104" x="461" y="608" width="30" height="45" xoffset="0" yoffset="17" xadvance="33" /><!-- h -->' +
    '<char id="105" x="687" y="224" width="5" height="42" xoffset="0" yoffset="20" xadvance="8" /><!-- i -->' +
    '<char id="106" x="628" y="554" width="16" height="56" xoffset="0" yoffset="20" xadvance="19" /><!-- j -->' +
    '<char id="107" x="503" y="119" width="28" height="45" xoffset="0" yoffset="17" xadvance="31" /><!-- k -->' +
    '<char id="108" x="664" y="252" width="9" height="45" xoffset="0" yoffset="17" xadvance="12" /><!-- l -->' +
    '<char id="109" x="65" y="190" width="46" height="32" xoffset="0" yoffset="30" xadvance="49" /><!-- m -->' +
    '<char id="110" x="461" y="562" width="30" height="32" xoffset="0" yoffset="30" xadvance="33" /><!-- n -->' +
    '<char id="111" x="371" y="118" width="32" height="32" xoffset="0" yoffset="30" xadvance="35" /><!-- o -->' +
    '<char id="112" x="323" y="565" width="32" height="46" xoffset="0" yoffset="30" xadvance="35" /><!-- p -->' +
    '<char id="113" x="370" y="489" width="32" height="46" xoffset="0" yoffset="30" xadvance="35" /><!-- q -->' +
    '<char id="114" x="588" y="352" width="24" height="32" xoffset="0" yoffset="30" xadvance="27" /><!-- r -->' +
    '<char id="115" x="505" y="612" width="26" height="32" xoffset="0" yoffset="30" xadvance="29" /><!-- s -->' +
    '<char id="116" x="628" y="194" width="18" height="45" xoffset="0" yoffset="17" xadvance="21" /><!-- t -->' +
    '<char id="117" x="461" y="516" width="30" height="32" xoffset="0" yoffset="30" xadvance="33" /><!-- u -->' +
    '<char id="118" x="459" y="667" width="30" height="32" xoffset="0" yoffset="30" xadvance="33" /><!-- v -->' +
    '<char id="119" x="74" y="0" width="42" height="32" xoffset="0" yoffset="30" xadvance="45" /><!-- w -->' +
    '<char id="120" x="503" y="667" width="28" height="32" xoffset="0" yoffset="30" xadvance="31" /><!-- x -->' +
    '<char id="121" x="503" y="59" width="28" height="46" xoffset="0" yoffset="30" xadvance="31" /><!-- y -->' +
    '<char id="122" x="504" y="401" width="28" height="32" xoffset="0" yoffset="30" xadvance="31" /><!-- z -->' +
    '<char id="123" x="627" y="627" width="18" height="60" xoffset="0" yoffset="16" xadvance="21" /><!-- { -->' +
    '<char id="124" x="687" y="280" width="4" height="59" xoffset="0" yoffset="17" xadvance="7" /><!-- | -->' +
    '<char id="125" x="628" y="120" width="18" height="60" xoffset="0" yoffset="16" xadvance="21" /><!-- } -->' +
    '<char id="126" x="83" y="674" width="23" height="8" xoffset="0" yoffset="36" xadvance="26" /><!-- ~ -->' +
    '<char id="199" x="125" y="118" width="39" height="58" xoffset="0" yoffset="17" xadvance="42" /><!-- Ç -->' +
    '<char id="213" x="60" y="543" width="46" height="58" xoffset="0" yoffset="4" xadvance="49" /><!-- Õ -->' +
    '<char id="211" x="65" y="295" width="46" height="59" xoffset="0" yoffset="3" xadvance="49" /><!-- Ó -->' +
    '<char id="231" x="461" y="59" width="28" height="45" xoffset="0" yoffset="30" xadvance="31" /><!-- ç -->' +
    '<char id="237" x="660" y="193" width="12" height="45" xoffset="0" yoffset="17" xadvance="15" /><!-- í -->' +
    '<char id="227" x="277" y="507" width="33" height="44" xoffset="0" yoffset="18" xadvance="36" /><!-- ã -->' +
    '<char id="243" x="416" y="338" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- ó -->' +
    '<char id="234" x="415" y="549" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- ê -->' +
    '<char id="233" x="371" y="279" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- é -->' +
    '<char id="228" x="278" y="237" width="33" height="42" xoffset="0" yoffset="20" xadvance="36" /><!-- ä -->' +
    '<char id="223" x="461" y="118" width="28" height="46" xoffset="0" yoffset="16" xadvance="31" /><!-- ß -->' +
    '<char id="246" x="371" y="164" width="32" height="42" xoffset="0" yoffset="20" xadvance="35" /><!-- ö -->' +
    '<char id="252" x="417" y="59" width="30" height="42" xoffset="0" yoffset="20" xadvance="33" /><!-- ü -->' +
    '<char id="241" x="416" y="397" width="30" height="44" xoffset="0" yoffset="18" xadvance="33" /><!-- ñ -->' +
    '<char id="161" x="686" y="118" width="7" height="46" xoffset="0" yoffset="22" xadvance="10" /><!-- ¡ -->' +
    '<char id="191" x="462" y="284" width="28" height="46" xoffset="0" yoffset="21" xadvance="31" /><!-- ¿ -->' +
    '<char id="200" x="278" y="363" width="33" height="59" xoffset="0" yoffset="3" xadvance="36" /><!-- È -->' +
    '<char id="195" x="177" y="190" width="37" height="58" xoffset="0" yoffset="4" xadvance="40" /><!-- Ã -->' +
    '<char id="350" x="588" y="129" width="26" height="58" xoffset="0" yoffset="17" xadvance="29" /><!-- Ş -->' +
    '<char id="220" x="278" y="293" width="33" height="56" xoffset="0" yoffset="6" xadvance="36" /><!-- Ü -->' +
    '<char id="351" x="587" y="70" width="26" height="45" xoffset="0" yoffset="30" xadvance="29" /><!-- ş -->' +
    '<char id="287" x="325" y="310" width="32" height="59" xoffset="0" yoffset="17" xadvance="35" /><!-- ğ -->' +
    '<char id="280" x="325" y="237" width="32" height="59" xoffset="0" yoffset="17" xadvance="35" /><!-- Ę -->' +
    '<char id="281" x="325" y="177" width="32" height="46" xoffset="0" yoffset="30" xadvance="35" /><!-- ę -->' +
    '<char id="261" x="175" y="589" width="37" height="45" xoffset="0" yoffset="30" xadvance="40" /><!-- ą -->' +
    '<char id="321" x="228" y="237" width="36" height="45" xoffset="0" yoffset="17" xadvance="39" /><!-- Ł -->' +
    '<char id="322" x="627" y="60" width="18" height="46" xoffset="0" yoffset="16" xadvance="21" /><!-- ł -->' +
    '<char id="324" x="416" y="455" width="30" height="45" xoffset="0" yoffset="17" xadvance="33" /><!-- ń -->' +
    '<char id="323" x="178" y="105" width="37" height="59" xoffset="0" yoffset="3" xadvance="40" /><!-- Ń -->' +
    '<char id="347" x="588" y="201" width="26" height="45" xoffset="0" yoffset="17" xadvance="29" /><!-- ś -->' +
    '<char id="1072" x="180" y="59" width="33" height="32" xoffset="0" yoffset="30" xadvance="36" /><!-- а -->' +
    '<char id="1073" x="323" y="625" width="32" height="46" xoffset="0" yoffset="16" xadvance="35" /><!-- б -->' +
    '<char id="1074" x="588" y="260" width="25" height="32" xoffset="0" yoffset="30" xadvance="28" /><!-- в -->' +
    '<char id="1075" x="627" y="508" width="21" height="32" xoffset="0" yoffset="30" xadvance="24" /><!-- г -->' +
    '<char id="1076" x="324" y="436" width="32" height="46" xoffset="0" yoffset="30" xadvance="35" /><!-- д -->' +
    '<char id="1077" x="121" y="495" width="32" height="32" xoffset="0" yoffset="30" xadvance="35" /><!-- е -->' +
    '<char id="1078" x="61" y="496" width="46" height="32" xoffset="0" yoffset="30" xadvance="49" /><!-- ж -->' +
    '<char id="1079" x="627" y="462" width="22" height="32" xoffset="0" yoffset="30" xadvance="25" /><!-- з -->' +
    '<char id="1080" x="417" y="292" width="30" height="32" xoffset="0" yoffset="30" xadvance="33" /><!-- и -->' +
    '<char id="1082" x="588" y="509" width="25" height="32" xoffset="0" yoffset="30" xadvance="28" /><!-- к -->' +
    '<char id="1083" x="325" y="383" width="30" height="33" xoffset="0" yoffset="30" xadvance="33" /><!-- л -->' +
    '<char id="1084" x="120" y="542" width="42" height="33" xoffset="0" yoffset="30" xadvance="45" /><!-- м -->' +
    '<char id="1085" x="547" y="522" width="27" height="32" xoffset="0" yoffset="30" xadvance="30" /><!-- н -->' +
    '<char id="1086" x="177" y="321" width="32" height="32" xoffset="0" yoffset="30" xadvance="35" /><!-- о -->' +
    '<char id="1087" x="415" y="667" width="30" height="32" xoffset="0" yoffset="30" xadvance="33" /><!-- п -->' +
    '<char id="1088" x="278" y="436" width="32" height="46" xoffset="0" yoffset="30" xadvance="35" /><!-- р -->' +
    '<char id="1089" x="461" y="178" width="28" height="32" xoffset="0" yoffset="30" xadvance="31" /><!-- с -->' +
    '<char id="1090" x="69" y="72" width="46" height="32" xoffset="0" yoffset="30" xadvance="49" /><!-- т -->' +
    '<char id="1091" x="461" y="224" width="28" height="46" xoffset="0" yoffset="30" xadvance="31" /><!-- у -->' +
    '<char id="1092" x="0" y="309" width="51" height="59" xoffset="0" yoffset="17" xadvance="54" /><!-- ф -->' +
    '<char id="1093" x="504" y="355" width="28" height="32" xoffset="0" yoffset="30" xadvance="31" /><!-- х -->' +
    '<char id="1094" x="229" y="59" width="35" height="41" xoffset="0" yoffset="30" xadvance="38" /><!-- ц -->' +
    '<char id="1095" x="588" y="463" width="25" height="32" xoffset="0" yoffset="30" xadvance="28" /><!-- ч -->' +
    '<char id="1096" x="0" y="496" width="47" height="33" xoffset="0" yoffset="30" xadvance="50" /><!-- ш -->' +
    '<char id="1097" x="0" y="382" width="51" height="41" xoffset="0" yoffset="30" xadvance="54" /><!-- щ -->' +
    '<char id="1100" x="626" y="352" width="24" height="32" xoffset="0" yoffset="30" xadvance="27" /><!-- ь -->' +
    '<char id="1099" x="130" y="0" width="32" height="32" xoffset="0" yoffset="30" xadvance="35" /><!-- ы -->' +
    '<char id="1101" x="462" y="344" width="28" height="32" xoffset="0" yoffset="30" xadvance="31" /><!-- э -->' +
    '<char id="1102" x="69" y="118" width="42" height="32" xoffset="0" yoffset="30" xadvance="45" /><!-- ю -->' +
    '<char id="1103" x="588" y="306" width="25" height="32" xoffset="0" yoffset="30" xadvance="28" /><!-- я -->' +
    '<char id="1052" x="0" y="249" width="51" height="46" xoffset="0" yoffset="16" xadvance="54" /><!-- М -->' +
    '<char id="1040" x="224" y="648" width="37" height="45" xoffset="0" yoffset="17" xadvance="40" /><!-- А -->' +
    '<char id="1043" x="417" y="174" width="30" height="45" xoffset="0" yoffset="17" xadvance="33" /><!-- Г -->' +
    '<char id="1047" x="587" y="627" width="26" height="45" xoffset="0" yoffset="17" xadvance="29" /><!-- З -->' +
    '<char id="1048" x="129" y="46" width="37" height="45" xoffset="0" yoffset="17" xadvance="40" /><!-- И -->' +
    '<char id="1053" x="278" y="178" width="33" height="45" xoffset="0" yoffset="17" xadvance="36" /><!-- Н -->' +
    '<char id="1051" x="125" y="367" width="37" height="45" xoffset="0" yoffset="17" xadvance="40" /><!-- Л -->' +
    '<char id="1062" x="227" y="380" width="37" height="54" xoffset="0" yoffset="17" xadvance="40" /><!-- Ц -->' +
    '<char id="1059" x="227" y="321" width="37" height="45" xoffset="0" yoffset="17" xadvance="40" /><!-- У -->' +
    '<char id="1050" x="460" y="457" width="30" height="45" xoffset="0" yoffset="17" xadvance="33" /><!-- К -->' +
    '<char id="1041" x="503" y="178" width="28" height="45" xoffset="0" yoffset="17" xadvance="31" /><!-- Б -->' +
    '<char id="1061" x="176" y="367" width="37" height="45" xoffset="0" yoffset="17" xadvance="40" /><!-- Х -->' +
    '<char id="1063" x="325" y="59" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- Ч -->' +
    '<char id="1044" x="121" y="427" width="41" height="54" xoffset="0" yoffset="17" xadvance="44" /><!-- Д -->' +
    '<char id="1042" x="504" y="237" width="28" height="45" xoffset="0" yoffset="17" xadvance="31" /><!-- В -->' +
    '<char id="1055" x="369" y="555" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- П -->' +
    '<char id="1057" x="120" y="648" width="39" height="45" xoffset="0" yoffset="17" xadvance="42" /><!-- С -->' +
    '<char id="1056" x="546" y="404" width="27" height="45" xoffset="0" yoffset="17" xadvance="30" /><!-- Р -->' +
    '<char id="1058" x="229" y="114" width="35" height="45" xoffset="0" yoffset="17" xadvance="38" /><!-- Т -->' +
    '<char id="1054" x="65" y="236" width="46" height="45" xoffset="0" yoffset="17" xadvance="49" /><!-- О -->' +
    '<char id="304" x="664" y="311" width="9" height="56" xoffset="0" yoffset="6" xadvance="12" /><!-- İ -->' +
    '<char id="1068" x="504" y="296" width="28" height="45" xoffset="0" yoffset="17" xadvance="31" /><!-- Ь -->' +
    '<char id="1046" x="0" y="131" width="55" height="45" xoffset="0" yoffset="17" xadvance="58" /><!-- Ж -->' +
    '<char id="1045" x="371" y="0" width="32" height="45" xoffset="0" yoffset="17" xadvance="35" /><!-- Е -->' +
    '<char id="224" x="278" y="59" width="33" height="45" xoffset="0" yoffset="17" xadvance="36" /><!-- à -->' +
    '<char id="236" x="659" y="60" width="12" height="45" xoffset="0" yoffset="17" xadvance="15" /><!-- ì -->' +
    '<char id="1060" x="0" y="543" width="46" height="45" xoffset="0" yoffset="17" xadvance="49" /><!-- Ф -->' +
    '<char id="1064" x="120" y="589" width="41" height="45" xoffset="0" yoffset="17" xadvance="44" /><!-- Ш -->' +
    '<char id="1065" x="0" y="602" width="46" height="54" xoffset="0" yoffset="17" xadvance="49" /><!-- Щ -->' +
    '<char id="1066" x="228" y="178" width="36" height="45" xoffset="0" yoffset="17" xadvance="39" /><!-- Ъ -->' +
    '<char id="1067" x="226" y="545" width="37" height="45" xoffset="0" yoffset="17" xadvance="40" /><!-- Ы -->' +
    '<char id="1069" x="125" y="190" width="38" height="45" xoffset="0" yoffset="17" xadvance="41" /><!-- Э -->' +
    '<char id="1070" x="0" y="72" width="55" height="45" xoffset="0" yoffset="17" xadvance="58" /><!-- Ю -->' +
    '<char id="1071" x="417" y="233" width="30" height="45" xoffset="0" yoffset="17" xadvance="33" /><!-- Я -->' +
    '<char id="305" x="686" y="178" width="5" height="32" xoffset="0" yoffset="30" xadvance="8" /><!-- ı -->' +
    '<char id="263" x="505" y="493" width="28" height="45" xoffset="0" yoffset="17" xadvance="31" /><!-- ć -->' +
    '<char id="32" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="20" /><!--   -->' +
    '<char id="9" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="160" /><!-- 	 -->' +
'</chars>' +
'<kernings count="0">' +
    '</kernings>' +
    '</font>';
PS.BitmapFontLoader = function() {

    var xmlDoc;
    if (window.DOMParser)
    {
        var parser=new DOMParser();
        xmlDoc=parser.parseFromString(PS.FontString ,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(PS.FontString );
    }

            var responseXML = xmlDoc;


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
                    yOffset: parseInt(letters[i].getAttribute('yoffset'), 10) - 2,
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
extend(PS.BitmapFontLoader, PIXI.BitmapFontLoader);