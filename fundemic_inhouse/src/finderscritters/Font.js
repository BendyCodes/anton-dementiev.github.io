PR.Font = function() {
    new PR.BitmapFontLoader();
};

extend(PR.Font, PIXI.AssetLoader);


PR.FontString = '<font>' +
    '<info face="Font" size="59" />' +
    '<common lineHeight="59" scaleW="529" scaleH="531" pages="1" />' +
    '<pages>' +
    '<page id="0" file="Fontt.png" />' +
    '</pages>' +
    '<chars count="190">' +
    '<char id="35" x="261" y="487" width="36" height="41" xoffset="0" yoffset="18" xadvance="40" /><!-- # -->' + 
    '<char id="33" x="508" y="373" width="11" height="42" xoffset="0" yoffset="17" xadvance="15" /><!-- ! -->' + 
    '<char id="36" x="261" y="391" width="36" height="51" xoffset="0" yoffset="13" xadvance="40" /><!-- $ -->' + 
    '<char id="37" x="0" y="347" width="51" height="43" xoffset="0" yoffset="17" xadvance="55" /><!-- % -->' + 
    '<char id="38" x="143" y="376" width="41" height="42" xoffset="0" yoffset="17" xadvance="45" /><!-- & -->' + 
    '<char id="39" x="64" y="372" width="9" height="18" xoffset="0" yoffset="18" xadvance="13" /><!-- -->' +
    '<char id="40" x="507" y="0" width="16" height="52" xoffset="0" yoffset="17" xadvance="20" /><!-- ( -->' + 
    '<char id="41" x="507" y="53" width="16" height="52" xoffset="0" yoffset="17" xadvance="20" /><!-- ) -->' + 
    '<char id="42" x="209" y="507" width="23" height="22" xoffset="0" yoffset="17" xadvance="27" /><!-- * -->' + 
    '<char id="43" x="365" y="246" width="32" height="32" xoffset="0" yoffset="27" xadvance="36" /><!-- + -->' + 
    '<char id="44" x="56" y="240" width="11" height="21" xoffset="0" yoffset="48" xadvance="15" /><!-- , -->' + 
    '<char id="45" x="186" y="218" width="18" height="9" xoffset="0" yoffset="39" xadvance="22" /><!-- - -->' + 
    '<char id="46" x="52" y="372" width="11" height="11" xoffset="0" yoffset="48" xadvance="15" /><!-- . -->' + 
    '<char id="47" x="458" y="168" width="25" height="42" xoffset="0" yoffset="17" xadvance="29" /><!-- / -->' + 
    '<char id="48" x="332" y="119" width="33" height="41" xoffset="0" yoffset="18" xadvance="37" /><!-- 0 -->' + 
    '<char id="49" x="486" y="434" width="21" height="41" xoffset="0" yoffset="18" xadvance="25" /><!-- 1 -->' + 
    '<char id="50" x="299" y="161" width="33" height="41" xoffset="0" yoffset="18" xadvance="37" /><!-- 2 -->' + 
    '<char id="51" x="262" y="306" width="34" height="41" xoffset="0" yoffset="18" xadvance="38" /><!-- 3 -->' + 
    '<char id="52" x="298" y="119" width="33" height="41" xoffset="0" yoffset="18" xadvance="37" /><!-- 4 -->' + 
    '<char id="53" x="298" y="255" width="33" height="41" xoffset="0" yoffset="18" xadvance="37" /><!-- 5 -->' + 
    '<char id="54" x="298" y="77" width="33" height="41" xoffset="0" yoffset="18" xadvance="37" /><!-- 6 -->' + 
    '<char id="55" x="399" y="317" width="30" height="41" xoffset="0" yoffset="18" xadvance="34" /><!-- 7 -->' + 
    '<char id="56" x="298" y="213" width="33" height="41" xoffset="0" yoffset="18" xadvance="37" /><!-- 8 -->' + 
    '<char id="57" x="332" y="77" width="33" height="41" xoffset="0" yoffset="18" xadvance="37" /><!-- 9 -->' + 
    '<char id="58" x="399" y="43" width="11" height="30" xoffset="0" yoffset="29" xadvance="15" /><!-- : -->' + 
    '<char id="59" x="485" y="84" width="11" height="40" xoffset="0" yoffset="29" xadvance="15" /><!-- ; -->' + 
    '<char id="60" x="366" y="431" width="32" height="34" xoffset="0" yoffset="25" xadvance="36" /><!-- < -->' + 
    '<char id="61" x="176" y="507" width="32" height="23" xoffset="0" yoffset="32" xadvance="36" /><!-- = -->' + 
    '<char id="62" x="366" y="353" width="32" height="34" xoffset="0" yoffset="25" xadvance="36" /><!-- > -->' + 
    '<char id="63" x="398" y="117" width="31" height="42" xoffset="0" yoffset="17" xadvance="35" /><!-- ? -->' + 
    '<char id="89" x="102" y="196" width="42" height="42" xoffset="0" yoffset="17" xadvance="46" /><!-- Y -->' + 
    '<char id="64" x="60" y="98" width="44" height="43" xoffset="0" yoffset="17" xadvance="48" /><!-- @ -->' + 
    '<char id="65" x="110" y="44" width="42" height="42" xoffset="0" yoffset="17" xadvance="46" /><!-- A -->' + 
    '<char id="66" x="224" y="348" width="37" height="42" xoffset="0" yoffset="17" xadvance="41" /><!-- B -->' + 
    '<char id="67" x="147" y="132" width="40" height="42" xoffset="0" yoffset="17" xadvance="44" /><!-- C -->' + 
    '<char id="68" x="186" y="175" width="38" height="42" xoffset="0" yoffset="17" xadvance="42" /><!-- D -->' + 
    '<char id="69" x="297" y="306" width="34" height="42" xoffset="0" yoffset="17" xadvance="38" /><!-- E -->' + 
    '<char id="70" x="398" y="242" width="31" height="42" xoffset="0" yoffset="17" xadvance="35" /><!-- F -->' + 
    '<char id="71" x="145" y="185" width="40" height="42" xoffset="0" yoffset="17" xadvance="44" /><!-- G -->' + 
    '<char id="72" x="262" y="213" width="35" height="42" xoffset="0" yoffset="17" xadvance="39" /><!-- H -->' + 
    '<char id="73" x="508" y="330" width="11" height="42" xoffset="0" yoffset="17" xadvance="15" /><!-- I -->' + 
    '<char id="74" x="430" y="317" width="29" height="42" xoffset="0" yoffset="17" xadvance="33" /><!-- J -->' + 
    '<char id="75" x="144" y="239" width="40" height="42" xoffset="0" yoffset="17" xadvance="44" /><!-- K -->' + 
    '<char id="76" x="405" y="0" width="30" height="42" xoffset="0" yoffset="17" xadvance="34" /><!-- L -->' + 
    '<char id="77" x="52" y="329" width="47" height="42" xoffset="0" yoffset="17" xadvance="51" /><!-- M -->' + 
    '<char id="78" x="262" y="170" width="36" height="42" xoffset="0" yoffset="17" xadvance="40" /><!-- N -->' + 
    '<char id="79" x="113" y="0" width="41" height="42" xoffset="0" yoffset="17" xadvance="45" /><!-- O -->' + 
    '<char id="80" x="298" y="458" width="34" height="42" xoffset="0" yoffset="17" xadvance="38" /><!-- P -->' + 
    '<char id="81" x="143" y="328" width="41" height="47" xoffset="0" yoffset="17" xadvance="45" /><!-- Q -->' + 
    '<char id="82" x="188" y="84" width="38" height="42" xoffset="0" yoffset="17" xadvance="42" /><!-- R -->' + 
    '<char id="83" x="226" y="127" width="36" height="42" xoffset="0" yoffset="17" xadvance="40" /><!-- S -->' + 
    '<char id="84" x="224" y="218" width="37" height="42" xoffset="0" yoffset="17" xadvance="41" /><!-- T -->' + 
    '<char id="85" x="224" y="261" width="37" height="42" xoffset="0" yoffset="17" xadvance="41" /><!-- U -->' + 
    '<char id="86" x="155" y="0" width="39" height="42" xoffset="0" yoffset="17" xadvance="43" /><!-- V -->' + 
    '<char id="87" x="0" y="186" width="56" height="42" xoffset="0" yoffset="17" xadvance="60" /><!-- W -->' + 
    '<char id="88" x="104" y="142" width="42" height="42" xoffset="0" yoffset="17" xadvance="46" /><!-- X -->' + 
    '<char id="90" x="224" y="391" width="36" height="42" xoffset="0" yoffset="17" xadvance="40" /><!-- Z -->' + 
    '<char id="91" x="486" y="277" width="17" height="52" xoffset="0" yoffset="17" xadvance="21" /><!-- [ -->' + 
    '<char id="92" x="458" y="125" width="25" height="42" xoffset="0" yoffset="17" xadvance="29" /><!-- \ -->' + 
    '<char id="93" x="504" y="277" width="17" height="52" xoffset="0" yoffset="17" xadvance="21" /><!-- ] -->' + 
    '<char id="94" x="143" y="419" width="29" height="26" xoffset="0" yoffset="18" xadvance="33" /><!-- ^ -->' + 
    '<char id="34" x="224" y="434" width="24" height="24" xoffset="0" yoffset="12" xadvance="28" /><!-- " -->' + 
    '<char id="95" x="0" y="521" width="29" height="3" xoffset="0" yoffset="63" xadvance="33" /><!-- _ -->' + 
    '<char id="96" x="205" y="218" width="17" height="9" xoffset="0" yoffset="17" xadvance="21" /><!-- ` -->' + 
    '<char id="97" x="373" y="0" width="31" height="31" xoffset="0" yoffset="28" xadvance="35" /><!-- a -->' + 
    '<char id="98" x="366" y="388" width="32" height="42" xoffset="0" yoffset="17" xadvance="36" /><!-- b -->' + 
    '<char id="99" x="398" y="160" width="31" height="31" xoffset="0" yoffset="28" xadvance="35" /><!-- c -->' + 
    '<char id="100" x="398" y="74" width="31" height="42" xoffset="0" yoffset="17" xadvance="35" /><!-- d -->' + 
    '<char id="101" x="340" y="0" width="32" height="31" xoffset="0" yoffset="28" xadvance="36" /><!-- e -->' + 
    '<char id="102" x="485" y="347" width="22" height="43" xoffset="0" yoffset="16" xadvance="26" /><!-- f -->' + 
    '<char id="103" x="366" y="32" width="32" height="41" xoffset="0" yoffset="28" xadvance="36" /><!-- g -->' + 
    '<char id="104" x="399" y="359" width="30" height="42" xoffset="0" yoffset="17" xadvance="34" /><!-- h -->' + 
    '<char id="105" x="508" y="416" width="10" height="42" xoffset="0" yoffset="17" xadvance="14" /><!-- i -->' + 
    '<char id="106" x="508" y="106" width="15" height="52" xoffset="0" yoffset="17" xadvance="19" /><!-- j -->' + 
    '<char id="107" x="366" y="466" width="32" height="42" xoffset="0" yoffset="17" xadvance="36" /><!-- k -->' + 
    '<char id="108" x="508" y="459" width="10" height="42" xoffset="0" yoffset="17" xadvance="14" /><!-- l -->' + 
    '<char id="109" x="52" y="297" width="47" height="31" xoffset="0" yoffset="28" xadvance="51" /><!-- m -->' + 
    '<char id="110" x="399" y="477" width="30" height="31" xoffset="0" yoffset="28" xadvance="34" /><!-- n -->' + 
    '<char id="111" x="366" y="321" width="32" height="31" xoffset="0" yoffset="28" xadvance="36" /><!-- o -->' + 
    '<char id="112" x="365" y="279" width="32" height="41" xoffset="0" yoffset="28" xadvance="36" /><!-- p -->' + 
    '<char id="113" x="366" y="107" width="31" height="41" xoffset="0" yoffset="28" xadvance="35" /><!-- q -->' + 
    '<char id="114" x="457" y="497" width="21" height="31" xoffset="0" yoffset="28" xadvance="25" /><!-- r -->' + 
    '<char id="115" x="398" y="285" width="30" height="31" xoffset="0" yoffset="28" xadvance="34" /><!-- s -->' + 
    '<char id="116" x="464" y="0" width="22" height="41" xoffset="0" yoffset="18" xadvance="26" /><!-- t -->' + 
    '<char id="117" x="399" y="445" width="30" height="31" xoffset="0" yoffset="28" xadvance="34" /><!-- u -->' + 
    '<char id="118" x="333" y="161" width="32" height="31" xoffset="0" yoffset="28" xadvance="36" /><!-- v -->' + 
    '<char id="119" x="0" y="391" width="49" height="31" xoffset="0" yoffset="27" xadvance="53" /><!-- w -->' + 
    '<char id="120" x="333" y="460" width="32" height="31" xoffset="0" yoffset="27" xadvance="36" /><!-- x -->' + 
    '<char id="121" x="333" y="418" width="32" height="41" xoffset="0" yoffset="27" xadvance="36" /><!-- y -->' + 
    '<char id="122" x="429" y="285" width="29" height="31" xoffset="0" yoffset="27" xadvance="33" /><!-- z -->' + 
    '<char id="123" x="484" y="171" width="23" height="52" xoffset="0" yoffset="16" xadvance="27" /><!-- { -->' + 
    '<char id="124" x="519" y="416" width="9" height="58" xoffset="0" yoffset="12" xadvance="13" /><!-- | -->' + 
    '<char id="125" x="485" y="224" width="22" height="52" xoffset="0" yoffset="16" xadvance="26" /><!-- } -->' + 
    '<char id="323" x="332" y="236" width="32" height="49" xoffset="0" yoffset="10" xadvance="36" /><!-- Ń -->' + 
    '<char id="199" x="365" y="193" width="32" height="52" xoffset="0" yoffset="18" xadvance="36" /><!-- Ç -->' + 
    '<char id="213" x="185" y="363" width="38" height="49" xoffset="0" yoffset="10" xadvance="42" /><!-- Õ -->' + 
    '<char id="211" x="195" y="0" width="38" height="49" xoffset="0" yoffset="10" xadvance="42" /><!-- Ó -->' + 
    '<char id="231" x="461" y="42" width="24" height="41" xoffset="0" yoffset="29" xadvance="28" /><!-- ç -->' + 
    '<char id="237" x="508" y="203" width="13" height="42" xoffset="0" yoffset="17" xadvance="17" /><!-- í -->' + 
    '<char id="227" x="460" y="305" width="25" height="41" xoffset="0" yoffset="18" xadvance="29" /><!-- ã -->' + 
    '<char id="243" x="399" y="402" width="30" height="42" xoffset="0" yoffset="17" xadvance="34" /><!-- ó -->' + 
    '<char id="234" x="430" y="84" width="27" height="42" xoffset="0" yoffset="17" xadvance="31" /><!-- ê -->' + 
    '<char id="233" x="430" y="127" width="27" height="42" xoffset="0" yoffset="17" xadvance="31" /><!-- é -->' + 
    '<char id="228" x="458" y="211" width="25" height="40" xoffset="0" yoffset="19" xadvance="29" /><!-- ä -->' + 
    '<char id="223" x="430" y="213" width="27" height="43" xoffset="0" yoffset="16" xadvance="31" /><!-- ß -->' + 
    '<char id="246" x="430" y="43" width="30" height="40" xoffset="0" yoffset="19" xadvance="34" /><!-- ö -->' + 
    '<char id="252" x="458" y="84" width="26" height="40" xoffset="0" yoffset="19" xadvance="30" /><!-- ü -->' + 
    '<char id="241" x="430" y="455" width="27" height="41" xoffset="0" yoffset="18" xadvance="31" /><!-- ñ -->' + 
    '<char id="161" x="487" y="0" width="9" height="41" xoffset="0" yoffset="29" xadvance="13" /><!-- ¡ -->' + 
    '<char id="191" x="486" y="42" width="20" height="41" xoffset="0" yoffset="29" xadvance="24" /><!-- ¿ -->' + 
    '<char id="200" x="460" y="347" width="24" height="49" xoffset="0" yoffset="10" xadvance="28" /><!-- È -->' + 
    '<char id="195" x="262" y="256" width="35" height="49" xoffset="0" yoffset="10" xadvance="39" /><!-- Ã -->' + 
    '<char id="350" x="459" y="402" width="26" height="52" xoffset="0" yoffset="18" xadvance="30" /><!-- Ş -->' + 
    '<char id="220" x="398" y="192" width="31" height="49" xoffset="0" yoffset="10" xadvance="35" /><!-- Ü -->' + 
    '<char id="351" x="486" y="476" width="21" height="41" xoffset="0" yoffset="29" xadvance="25" /><!-- ş -->' + 
    '<char id="287" x="430" y="402" width="28" height="52" xoffset="0" yoffset="18" xadvance="32" /><!-- ğ -->' + 
    '<char id="280" x="459" y="252" width="25" height="52" xoffset="0" yoffset="18" xadvance="29" /><!-- Ę -->' + 
    '<char id="281" x="458" y="455" width="27" height="41" xoffset="0" yoffset="29" xadvance="31" /><!-- ę -->' + 
    '<char id="261" x="436" y="0" width="27" height="41" xoffset="0" yoffset="29" xadvance="31" /><!-- ą -->' + 
    '<char id="321" x="430" y="360" width="29" height="41" xoffset="0" yoffset="18" xadvance="33" /><!-- Ł -->' + 
    '<char id="322" x="508" y="159" width="15" height="43" xoffset="0" yoffset="16" xadvance="19" /><!-- ł -->' + 
    '<char id="324" x="430" y="170" width="27" height="42" xoffset="0" yoffset="17" xadvance="31" /><!-- ń -->' + 
    '<char id="126" x="50" y="512" width="35" height="14" xoffset="0" yoffset="36" xadvance="39" /><!-- ~ -->' + 
    '<char id="347" x="486" y="391" width="21" height="42" xoffset="0" yoffset="17" xadvance="25" /><!-- ś -->' + 
    '<char id="1072" x="332" y="319" width="32" height="32" xoffset="0" yoffset="27" xadvance="36" /><!-- а -->' + 
    '<char id="1073" x="263" y="94" width="34" height="44" xoffset="0" yoffset="15" xadvance="38" /><!-- б -->' + 
    '<char id="1074" x="332" y="203" width="32" height="32" xoffset="0" yoffset="27" xadvance="36" /><!-- в -->' + 
    '<char id="1075" x="430" y="497" width="26" height="32" xoffset="0" yoffset="27" xadvance="30" /><!-- г -->' + 
    '<char id="1076" x="153" y="43" width="39" height="40" xoffset="0" yoffset="27" xadvance="43" /><!-- д -->' + 
    '<char id="1077" x="227" y="94" width="34" height="32" xoffset="0" yoffset="27" xadvance="38" /><!-- е -->' + 
    '<char id="1078" x="0" y="229" width="55" height="32" xoffset="0" yoffset="27" xadvance="59" /><!-- ж -->' + 
    '<char id="1079" x="333" y="385" width="32" height="32" xoffset="0" yoffset="27" xadvance="36" /><!-- з -->' + 
    '<char id="1080" x="333" y="492" width="32" height="32" xoffset="0" yoffset="27" xadvance="36" /><!-- и -->' + 
    '<char id="1082" x="264" y="44" width="34" height="32" xoffset="0" yoffset="27" xadvance="38" /><!-- к -->' + 
    '<char id="1083" x="271" y="0" width="34" height="32" xoffset="0" yoffset="27" xadvance="38" /><!-- л -->' + 
    '<char id="1084" x="99" y="493" width="41" height="32" xoffset="0" yoffset="27" xadvance="45" /><!-- м -->' + 
    '<char id="1085" x="333" y="33" width="32" height="32" xoffset="0" yoffset="27" xadvance="36" /><!-- н -->' + 
    '<char id="1086" x="298" y="425" width="34" height="32" xoffset="0" yoffset="27" xadvance="38" /><!-- о -->' + 
    '<char id="1087" x="333" y="352" width="32" height="32" xoffset="0" yoffset="27" xadvance="36" /><!-- п -->' + 
    '<char id="1088" x="298" y="382" width="34" height="42" xoffset="0" yoffset="27" xadvance="38" /><!-- р -->' + 
    '<char id="1089" x="193" y="50" width="33" height="32" xoffset="0" yoffset="27" xadvance="37" /><!-- с -->' + 
    '<char id="1090" x="332" y="286" width="32" height="32" xoffset="0" yoffset="27" xadvance="36" /><!-- т -->' + 
    '<char id="1091" x="262" y="348" width="34" height="42" xoffset="0" yoffset="27" xadvance="38" /><!-- у -->' + 
    '<char id="1092" x="0" y="423" width="49" height="53" xoffset="0" yoffset="16" xadvance="53" /><!-- ф -->' + 
    '<char id="1093" x="141" y="493" width="34" height="32" xoffset="0" yoffset="27" xadvance="38" /><!-- х -->' + 
    '<char id="1094" x="225" y="171" width="36" height="40" xoffset="0" yoffset="27" xadvance="40" /><!-- ц -->' + 
    '<char id="1095" x="366" y="74" width="31" height="32" xoffset="0" yoffset="27" xadvance="35" /><!-- ч -->' + 
    '<char id="1096" x="50" y="479" width="48" height="32" xoffset="0" yoffset="27" xadvance="52" /><!-- ш -->' + 
    '<char id="1097" x="0" y="306" width="51" height="40" xoffset="0" yoffset="27" xadvance="55" /><!-- щ -->' + 
    '<char id="1100" x="366" y="149" width="31" height="32" xoffset="0" yoffset="27" xadvance="35" /><!-- ь -->' + 
    '<char id="1099" x="99" y="372" width="43" height="32" xoffset="0" yoffset="27" xadvance="47" /><!-- ы -->' + 
    '<char id="1101" x="306" y="0" width="33" height="32" xoffset="0" yoffset="27" xadvance="37" /><!-- э -->' + 
    '<char id="1102" x="52" y="262" width="48" height="34" xoffset="0" yoffset="26" xadvance="52" /><!-- ю -->' + 
    '<char id="1103" x="297" y="349" width="34" height="32" xoffset="0" yoffset="27" xadvance="38" /><!-- я -->' + 
    '<char id="1052" x="0" y="477" width="49" height="43" xoffset="0" yoffset="16" xadvance="53" /><!-- М -->' + 
    '<char id="1040" x="65" y="44" width="44" height="43" xoffset="0" yoffset="16" xadvance="48" /><!-- А -->' + 
    '<char id="1043" x="299" y="33" width="33" height="43" xoffset="0" yoffset="16" xadvance="37" /><!-- Г -->' + 
    '<char id="1047" x="185" y="228" width="38" height="43" xoffset="0" yoffset="16" xadvance="42" /><!-- З -->' + 
    '<char id="1048" x="184" y="463" width="38" height="43" xoffset="0" yoffset="16" xadvance="42" /><!-- И -->' + 
    '<char id="1053" x="188" y="127" width="37" height="43" xoffset="0" yoffset="16" xadvance="41" /><!-- Н -->' + 
    '<char id="1051" x="142" y="449" width="41" height="43" xoffset="0" yoffset="16" xadvance="45" /><!-- Л -->' + 
    '<char id="1062" x="100" y="297" width="42" height="53" xoffset="0" yoffset="16" xadvance="46" /><!-- Ц -->' + 
    '<char id="1059" x="68" y="0" width="44" height="43" xoffset="0" yoffset="16" xadvance="48" /><!-- У -->' + 
    '<char id="1050" x="105" y="88" width="42" height="43" xoffset="0" yoffset="16" xadvance="46" /><!-- К -->' + 
    '<char id="1041" x="148" y="87" width="39" height="43" xoffset="0" yoffset="16" xadvance="43" /><!-- Б -->' + 
    '<char id="1061" x="57" y="196" width="44" height="43" xoffset="0" yoffset="16" xadvance="48" /><!-- Х -->' + 
    '<char id="1063" x="223" y="463" width="37" height="43" xoffset="0" yoffset="16" xadvance="41" /><!-- Ч -->' + 
    '<char id="1044" x="57" y="142" width="46" height="53" xoffset="0" yoffset="16" xadvance="50" /><!-- Д -->' + 
    '<char id="1042" x="184" y="419" width="39" height="43" xoffset="0" yoffset="16" xadvance="43" /><!-- В -->' + 
    '<char id="1055" x="224" y="304" width="37" height="43" xoffset="0" yoffset="16" xadvance="41" /><!-- П -->' + 
    '<char id="1057" x="99" y="449" width="42" height="43" xoffset="0" yoffset="16" xadvance="46" /><!-- С -->' + 
    '<char id="1056" x="234" y="0" width="36" height="43" xoffset="0" yoffset="16" xadvance="40" /><!-- Р -->' + 
    '<char id="1058" x="185" y="272" width="38" height="43" xoffset="0" yoffset="16" xadvance="42" /><!-- Т -->' + 
    '<char id="1054" x="99" y="405" width="43" height="43" xoffset="0" yoffset="16" xadvance="47" /><!-- О -->' + 
    '<char id="304" x="519" y="475" width="8" height="49" xoffset="0" yoffset="10" xadvance="12" /><!-- İ -->' + 
    '<char id="1068" x="261" y="443" width="36" height="43" xoffset="0" yoffset="16" xadvance="40" /><!-- Ь -->' + 
    '<char id="1046" x="0" y="0" width="67" height="43" xoffset="0" yoffset="16" xadvance="71" /><!-- Ж -->' + 
    '<char id="1045" x="227" y="50" width="36" height="43" xoffset="0" yoffset="16" xadvance="40" /><!-- Е -->' + 
    '<char id="224" x="185" y="316" width="38" height="46" xoffset="0" yoffset="13" xadvance="42" /><!-- à -->' + 
    '<char id="236" x="484" y="125" width="23" height="45" xoffset="0" yoffset="13" xadvance="27" /><!-- ì -->' + 
    '<char id="1060" x="50" y="435" width="48" height="43" xoffset="0" yoffset="16" xadvance="52" /><!-- Ф -->' + 
    '<char id="1064" x="0" y="98" width="59" height="43" xoffset="0" yoffset="16" xadvance="63" /><!-- Ш -->' + 
    '<char id="1065" x="0" y="44" width="64" height="53" xoffset="0" yoffset="16" xadvance="68" /><!-- Щ -->' + 
    '<char id="1066" x="50" y="391" width="48" height="43" xoffset="0" yoffset="16" xadvance="52" /><!-- Ъ -->' + 
    '<char id="1067" x="0" y="262" width="51" height="43" xoffset="0" yoffset="16" xadvance="55" /><!-- Ы -->' + 
    '<char id="1069" x="101" y="240" width="42" height="43" xoffset="0" yoffset="16" xadvance="46" /><!-- Э -->' + 
    '<char id="1070" x="0" y="142" width="56" height="43" xoffset="0" yoffset="16" xadvance="60" /><!-- Ю -->' + 
    '<char id="1071" x="143" y="284" width="41" height="43" xoffset="0" yoffset="16" xadvance="45" /><!-- Я -->' + 
    '<char id="32" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="25" /><!--   -->' + 
    '<char id="9" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="200" /><!-- 	 -->' + 
    '</chars>' +
    '<kernings count="0">' +
    '</kernings>' +
    '</font>';
PR.BitmapFontLoader = function() {

    var xmlDoc;
    if (window.DOMParser) {
        var parser=new DOMParser();
        xmlDoc=parser.parseFromString(PR.FontString ,"text/xml");
    }
    else  {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(PR.FontString );
    }


            var responseXML = xmlDoc;
            var textureUrl = this.baseUrl + responseXML.getElementsByTagName('page')[0].getAttribute('file');
           // var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
            this.texture = GodStep.textures['Font'].baseTexture;//image.texture.baseTexture;

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
extend(PR.BitmapFontLoader, PIXI.BitmapFontLoader);