AG.FontLoader = function(assetURLs, crossorigin) {

    new AG.BitmapFontLoader();
};

extend(AG.FontLoader, PIXI.AssetLoader);


AG.FontString = '<font>' +
    '<info face="Font1" size="97" />' +
    '<common lineHeight="62" scaleW="794" scaleH="794" pages="1" />' +
    '<pages>' +
    '<page id="0" file="Font1.png" />' +
    '</pages>' +
'<chars count="192">' +
    '<char id="33" x="739" y="730" width="13" height="50" xoffset="0" yoffset="12" xadvance="16" /><!-- ! -->' +
    '<char id="34" x="511" y="610" width="17" height="17" xoffset="0" yoffset="12" xadvance="20" /><!-- " -->' +
    '<char id="35" x="303" y="602" width="38" height="51" xoffset="0" yoffset="11" xadvance="41" /><!-- # -->' +
    '<char id="36" x="606" y="438" width="32" height="61" xoffset="0" yoffset="6" xadvance="35" /><!-- $ -->' +
    '<char id="37" x="71" y="205" width="52" height="50" xoffset="0" yoffset="12" xadvance="55" /><!-- % -->' +
    '<char id="38" x="190" y="725" width="43" height="51" xoffset="0" yoffset="11" xadvance="46" /><!-- & -->' +
    '<char id="39" x="738" y="415" width="10" height="16" xoffset="0" yoffset="12" xadvance="13" /><!-- -->' +
    '<char id="40" x="738" y="337" width="17" height="64" xoffset="0" yoffset="12" xadvance="20" /><!-- ( -->' +
    '<char id="41" x="737" y="258" width="17" height="65" xoffset="0" yoffset="11" xadvance="20" /><!-- ) -->' +
    '<char id="42" x="698" y="0" width="24" height="21" xoffset="0" yoffset="12" xadvance="27" /><!-- * -->' +
    '<char id="43" x="133" y="474" width="33" height="32" xoffset="0" yoffset="21" xadvance="36" /><!-- + -->' +
    '<char id="44" x="559" y="576" width="13" height="18" xoffset="0" yoffset="51" xadvance="16" /><!-- , -->' +
    '<char id="45" x="507" y="771" width="24" height="9" xoffset="0" yoffset="39" xadvance="27" /><!-- - -->' +
    '<char id="46" x="409" y="567" width="13" height="11" xoffset="0" yoffset="51" xadvance="16" /><!-- . -->' +
    '<char id="47" x="696" y="699" width="29" height="56" xoffset="0" yoffset="11" xadvance="32" /><!-- / -->' +
    '<char id="48" x="606" y="194" width="33" height="51" xoffset="0" yoffset="11" xadvance="36" /><!-- 0 -->' +
    '<char id="49" x="736" y="0" width="17" height="50" xoffset="0" yoffset="12" xadvance="20" /><!-- 1 -->' +
    '<char id="50" x="559" y="461" width="33" height="51" xoffset="0" yoffset="11" xadvance="36" /><!-- 2 -->' +
    '<char id="51" x="603" y="726" width="33" height="51" xoffset="0" yoffset="11" xadvance="36" /><!-- 3 -->' +
    '<char id="52" x="358" y="0" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- 4 -->' +
    '<char id="53" x="459" y="642" width="36" height="51" xoffset="0" yoffset="11" xadvance="39" /><!-- 5 -->' +
    '<char id="54" x="605" y="65" width="33" height="50" xoffset="0" yoffset="12" xadvance="36" /><!-- 6 -->' +
    '<char id="55" x="606" y="129" width="33" height="51" xoffset="0" yoffset="11" xadvance="36" /><!-- 7 -->' +
    '<char id="56" x="511" y="129" width="33" height="51" xoffset="0" yoffset="11" xadvance="36" /><!-- 8 -->' +
    '<char id="57" x="511" y="64" width="33" height="51" xoffset="0" yoffset="11" xadvance="36" /><!-- 9 -->' +
    '<char id="58" x="698" y="577" width="13" height="37" xoffset="0" yoffset="25" xadvance="16" /><!-- : -->' +
    '<char id="59" x="698" y="273" width="13" height="44" xoffset="0" yoffset="25" xadvance="16" /><!-- ; -->' +
    '<char id="60" x="559" y="526" width="33" height="36" xoffset="0" yoffset="21" xadvance="36" /><!-- < -->' +
    '<char id="61" x="558" y="661" width="31" height="24" xoffset="0" yoffset="27" xadvance="34" /><!-- = -->' +
    '<char id="62" x="559" y="360" width="33" height="36" xoffset="0" yoffset="21" xadvance="36" /><!-- > -->' +
    '<char id="63" x="603" y="661" width="33" height="51" xoffset="0" yoffset="11" xadvance="36" /><!-- ? -->' +
    '<char id="64" x="0" y="0" width="65" height="63" xoffset="0" yoffset="12" xadvance="68" /><!-- @ -->' +
    '<char id="65" x="250" y="278" width="42" height="50" xoffset="0" yoffset="12" xadvance="45" /><!-- A -->' +
    '<char id="66" x="606" y="259" width="33" height="50" xoffset="0" yoffset="12" xadvance="36" /><!-- B -->' +
    '<char id="67" x="137" y="205" width="44" height="50" xoffset="0" yoffset="12" xadvance="47" /><!-- C -->' +
    '<char id="68" x="250" y="406" width="40" height="50" xoffset="0" yoffset="12" xadvance="43" /><!-- D -->' +
    '<char id="69" x="356" y="385" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- E -->' +
    '<char id="70" x="306" y="256" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- F -->' +
    '<char id="71" x="132" y="711" width="44" height="50" xoffset="0" yoffset="12" xadvance="47" /><!-- G -->' +
    '<char id="72" x="409" y="503" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- H -->' +
    '<char id="73" x="768" y="666" width="10" height="50" xoffset="0" yoffset="12" xadvance="13" /><!-- I -->' +
    '<char id="74" x="606" y="374" width="33" height="50" xoffset="0" yoffset="12" xadvance="36" /><!-- J -->' +
    '<char id="75" x="507" y="707" width="35" height="50" xoffset="0" yoffset="12" xadvance="38" /><!-- K -->' +
    '<char id="76" x="510" y="354" width="35" height="50" xoffset="0" yoffset="12" xadvance="38" /><!-- L -->' +
    '<char id="77" x="71" y="333" width="52" height="50" xoffset="0" yoffset="12" xadvance="55" /><!-- M -->' +
    '<char id="78" x="194" y="397" width="42" height="50" xoffset="0" yoffset="12" xadvance="45" /><!-- N -->' +
    '<char id="79" x="70" y="408" width="52" height="50" xoffset="0" yoffset="12" xadvance="55" /><!-- O -->' +
    '<char id="80" x="650" y="717" width="32" height="50" xoffset="0" yoffset="12" xadvance="35" /><!-- P -->' +
    '<char id="81" x="75" y="77" width="52" height="50" xoffset="0" yoffset="12" xadvance="55" /><!-- Q -->' +
    '<char id="82" x="509" y="642" width="35" height="50" xoffset="0" yoffset="12" xadvance="38" /><!-- R -->' +
    '<char id="83" x="653" y="166" width="31" height="50" xoffset="0" yoffset="12" xadvance="34" /><!-- S -->' +
    '<char id="84" x="250" y="470" width="40" height="50" xoffset="0" yoffset="12" xadvance="43" /><!-- T -->' +
    '<char id="85" x="408" y="374" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- U -->' +
    '<char id="86" x="197" y="141" width="42" height="50" xoffset="0" yoffset="12" xadvance="45" /><!-- V -->' +
    '<char id="87" x="0" y="408" width="56" height="50" xoffset="0" yoffset="12" xadvance="59" /><!-- W -->' +
    '<char id="88" x="247" y="666" width="42" height="50" xoffset="0" yoffset="12" xadvance="45" /><!-- X -->' +
    '<char id="89" x="409" y="176" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- Y -->' +
    '<char id="90" x="247" y="602" width="42" height="50" xoffset="0" yoffset="12" xadvance="45" /><!-- Z -->' +
    '<char id="91" x="736" y="523" width="20" height="65" xoffset="0" yoffset="11" xadvance="23" /><!-- [ -->' +
    '<char id="92" x="696" y="630" width="29" height="55" xoffset="0" yoffset="12" xadvance="32" /><!-- -->' +
    '<char id="93" x="736" y="115" width="20" height="65" xoffset="0" yoffset="11" xadvance="23" /><!-- ] -->' +
    '<char id="94" x="193" y="602" width="29" height="22" xoffset="0" yoffset="12" xadvance="32" /><!-- ^ -->' +
    '<char id="95" x="79" y="51" width="38" height="9" xoffset="0" yoffset="57" xadvance="41" /><!-- _ -->' +
    '<char id="96" x="512" y="258" width="17" height="15" xoffset="0" yoffset="12" xadvance="20" /><!-- ` -->' +
    '<char id="97" x="307" y="116" width="38" height="37" xoffset="0" yoffset="25" xadvance="41" /><!-- a -->' +
    '<char id="98" x="355" y="598" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- b -->' +
    '<char id="99" x="559" y="410" width="33" height="37" xoffset="0" yoffset="25" xadvance="36" /><!-- c -->' +
    '<char id="100" x="355" y="662" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- d -->' +
    '<char id="101" x="355" y="726" width="38" height="37" xoffset="0" yoffset="25" xadvance="41" /><!-- e -->' +
    '<char id="102" x="697" y="332" width="26" height="51" xoffset="0" yoffset="11" xadvance="29" /><!-- f -->' +
    '<char id="103" x="358" y="245" width="38" height="51" xoffset="0" yoffset="25" xadvance="41" /><!-- g -->' +
    '<char id="104" x="462" y="0" width="36" height="50" xoffset="0" yoffset="12" xadvance="39" /><!-- h -->' +
    '<char id="105" x="766" y="730" width="11" height="47" xoffset="0" yoffset="15" xadvance="14" /><!-- i -->' +
    '<char id="106" x="736" y="448" width="22" height="61" xoffset="0" yoffset="15" xadvance="25" /><!-- j -->' +
    '<char id="107" x="559" y="167" width="33" height="50" xoffset="0" yoffset="12" xadvance="36" /><!-- k -->' +
    '<char id="108" x="739" y="666" width="15" height="50" xoffset="0" yoffset="12" xadvance="18" /><!-- l -->' +
    '<char id="109" x="66" y="602" width="52" height="37" xoffset="0" yoffset="25" xadvance="55" /><!-- m -->' +
    '<char id="110" x="407" y="735" width="36" height="37" xoffset="0" yoffset="25" xadvance="39" /><!-- n -->' +
    '<char id="111" x="358" y="64" width="38" height="37" xoffset="0" yoffset="25" xadvance="41" /><!-- o -->' +
    '<char id="112" x="407" y="670" width="38" height="51" xoffset="0" yoffset="25" xadvance="41" /><!-- p -->' +
    '<char id="113" x="408" y="438" width="38" height="51" xoffset="0" yoffset="25" xadvance="41" /><!-- q -->' +
    '<char id="114" x="653" y="332" width="30" height="37" xoffset="0" yoffset="25" xadvance="33" /><!-- r -->' +
    '<char id="115" x="559" y="0" width="32" height="37" xoffset="0" yoffset="25" xadvance="35" /><!-- s -->' +
    '<char id="116" x="698" y="513" width="24" height="50" xoffset="0" yoffset="12" xadvance="27" /><!-- t -->' +
    '<char id="117" x="462" y="239" width="36" height="37" xoffset="0" yoffset="25" xadvance="39" /><!-- u -->' +
    '<char id="118" x="461" y="64" width="36" height="37" xoffset="0" yoffset="25" xadvance="39" /><!-- v -->' +
    '<char id="119" x="79" y="0" width="47" height="37" xoffset="0" yoffset="25" xadvance="50" /><!-- w -->' +
    '<char id="120" x="558" y="51" width="33" height="37" xoffset="0" yoffset="25" xadvance="36" /><!-- x -->' +
    '<char id="121" x="556" y="706" width="33" height="51" xoffset="0" yoffset="25" xadvance="36" /><!-- y -->' +
    '<char id="122" x="512" y="0" width="33" height="37" xoffset="0" yoffset="25" xadvance="36" /><!-- z -->' +
    '<char id="123" x="698" y="194" width="24" height="65" xoffset="0" yoffset="11" xadvance="27" /><!-- { -->' +
    '<char id="124" x="768" y="259" width="10" height="64" xoffset="0" yoffset="12" xadvance="13" /><!-- | -->' +
    '<char id="125" x="698" y="115" width="24" height="65" xoffset="0" yoffset="11" xadvance="27" /><!-- } -->' +
    '<char id="126" x="459" y="707" width="29" height="13" xoffset="0" yoffset="31" xadvance="32" /><!-- ~ -->' +
    '<char id="199" x="136" y="397" width="44" height="63" xoffset="0" yoffset="12" xadvance="47" /><!-- Ç -->' +
    '<char id="213" x="66" y="653" width="52" height="63" xoffset="0" yoffset="-1" xadvance="55" /><!-- Õ -->' +
    '<char id="211" x="66" y="524" width="52" height="64" xoffset="0" yoffset="-2" xadvance="55" /><!-- Ó -->' +
    '<char id="231" x="511" y="546" width="34" height="50" xoffset="0" yoffset="25" xadvance="37" /><!-- ç -->' +
    '<char id="237" x="739" y="602" width="17" height="50" xoffset="0" yoffset="12" xadvance="20" /><!-- í -->' +
    '<char id="227" x="410" y="240" width="38" height="49" xoffset="0" yoffset="13" xadvance="41" /><!-- ã -->' +
    '<char id="243" x="358" y="310" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- ó -->' +
    '<char id="234" x="410" y="0" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- ê -->' +
    '<char id="233" x="410" y="303" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- é -->' +
    '<char id="228" x="303" y="731" width="38" height="47" xoffset="0" yoffset="15" xadvance="41" /><!-- ä -->' +
    '<char id="223" x="559" y="231" width="33" height="51" xoffset="0" yoffset="11" xadvance="36" /><!-- ß -->' +
    '<char id="246" x="409" y="115" width="38" height="47" xoffset="0" yoffset="15" xadvance="41" /><!-- ö -->' +
    '<char id="252" x="461" y="178" width="36" height="47" xoffset="0" yoffset="15" xadvance="39" /><!-- ü -->' +
    '<char id="241" x="461" y="115" width="36" height="49" xoffset="0" yoffset="13" xadvance="39" /><!-- ñ -->' +
    '<char id="161" x="768" y="194" width="12" height="51" xoffset="0" yoffset="17" xadvance="15" /><!-- ¡ -->' +
    '<char id="191" x="605" y="0" width="33" height="51" xoffset="0" yoffset="16" xadvance="36" /><!-- ¿ -->' +
    '<char id="200" x="407" y="592" width="38" height="64" xoffset="0" yoffset="-2" xadvance="41" /><!-- È -->' +
    '<char id="195" x="141" y="64" width="43" height="63" xoffset="0" yoffset="-1" xadvance="46" /><!-- Ã -->' +
    '<char id="350" x="650" y="640" width="32" height="63" xoffset="0" yoffset="12" xadvance="35" /><!-- Ş -->' +
    '<char id="220" x="459" y="567" width="38" height="61" xoffset="0" yoffset="1" xadvance="41" /><!-- Ü -->' +
    '<char id="351" x="652" y="502" width="32" height="50" xoffset="0" yoffset="25" xadvance="35" /><!-- ş -->' +
    '<char id="287" x="357" y="167" width="38" height="64" xoffset="0" yoffset="12" xadvance="41" /><!-- ğ -->' +
    '<char id="280" x="357" y="514" width="38" height="64" xoffset="0" yoffset="12" xadvance="41" /><!-- Ę -->' +
    '<char id="281" x="356" y="449" width="38" height="51" xoffset="0" yoffset="25" xadvance="41" /><!-- ę -->' +
    '<char id="261" x="193" y="474" width="43" height="50" xoffset="0" yoffset="25" xadvance="46" /><!-- ą -->' +
    '<char id="321" x="249" y="538" width="42" height="50" xoffset="0" yoffset="12" xadvance="45" /><!-- Ł -->' +
    '<char id="322" x="698" y="448" width="24" height="51" xoffset="0" yoffset="11" xadvance="27" /><!-- ł -->' +
    '<char id="324" x="460" y="367" width="36" height="50" xoffset="0" yoffset="12" xadvance="39" /><!-- ń -->' +
    '<char id="323" x="190" y="647" width="43" height="64" xoffset="0" yoffset="-2" xadvance="46" /><!-- Ń -->' +
    '<char id="347" x="652" y="566" width="32" height="50" xoffset="0" yoffset="12" xadvance="35" /><!-- ś -->' +
    '<char id="1072" x="306" y="65" width="38" height="37" xoffset="0" yoffset="25" xadvance="41" /><!-- а -->' +
    '<char id="1073" x="306" y="320" width="38" height="51" xoffset="0" yoffset="11" xadvance="41" /><!-- б -->' +
    '<char id="1074" x="653" y="115" width="31" height="37" xoffset="0" yoffset="25" xadvance="34" /><!-- в -->' +
    '<char id="1075" x="698" y="397" width="26" height="37" xoffset="0" yoffset="25" xadvance="29" /><!-- г -->' +
    '<char id="1076" x="306" y="0" width="38" height="51" xoffset="0" yoffset="25" xadvance="41" /><!-- д -->' +
    '<char id="1077" x="254" y="65" width="38" height="37" xoffset="0" yoffset="25" xadvance="41" /><!-- е -->' +
    '<char id="1078" x="66" y="730" width="52" height="37" xoffset="0" yoffset="25" xadvance="55" /><!-- ж -->' +
    '<char id="1079" x="697" y="64" width="28" height="37" xoffset="0" yoffset="25" xadvance="31" /><!-- з -->' +
    '<char id="1080" x="460" y="431" width="36" height="37" xoffset="0" yoffset="25" xadvance="39" /><!-- и -->' +
    '<char id="1082" x="653" y="230" width="31" height="37" xoffset="0" yoffset="25" xadvance="34" /><!-- к -->' +
    '<char id="1083" x="359" y="115" width="36" height="38" xoffset="0" yoffset="25" xadvance="39" /><!-- л -->' +
    '<char id="1084" x="75" y="141" width="47" height="38" xoffset="0" yoffset="25" xadvance="50" /><!-- м -->' +
    '<char id="1085" x="606" y="513" width="32" height="37" xoffset="0" yoffset="25" xadvance="35" /><!-- н -->' +
    '<char id="1086" x="195" y="278" width="38" height="37" xoffset="0" yoffset="25" xadvance="41" /><!-- о -->' +
    '<char id="1087" x="457" y="735" width="36" height="37" xoffset="0" yoffset="25" xadvance="39" /><!-- п -->' +
    '<char id="1088" x="254" y="0" width="38" height="51" xoffset="0" yoffset="25" xadvance="41" /><!-- р -->' +
    '<char id="1089" x="511" y="290" width="34" height="37" xoffset="0" yoffset="25" xadvance="37" /><!-- с -->' +
    '<char id="1090" x="67" y="472" width="52" height="37" xoffset="0" yoffset="25" xadvance="55" /><!-- т -->' +
    '<char id="1091" x="558" y="102" width="33" height="51" xoffset="0" yoffset="25" xadvance="36" /><!-- у -->' +
    '<char id="1092" x="0" y="205" width="57" height="64" xoffset="0" yoffset="12" xadvance="60" /><!-- ф -->' +
    '<char id="1093" x="558" y="610" width="33" height="37" xoffset="0" yoffset="25" xadvance="36" /><!-- х -->' +
    '<char id="1094" x="251" y="205" width="40" height="46" xoffset="0" yoffset="25" xadvance="43" /><!-- ц -->' +
    '<char id="1095" x="653" y="281" width="31" height="37" xoffset="0" yoffset="25" xadvance="34" /><!-- ч -->' +
    '<char id="1096" x="0" y="472" width="53" height="38" xoffset="0" yoffset="25" xadvance="56" /><!-- ш -->' +
    '<char id="1097" x="0" y="283" width="57" height="46" xoffset="0" yoffset="25" xadvance="60" /><!-- щ -->' +
    '<char id="1100" x="653" y="383" width="30" height="37" xoffset="0" yoffset="25" xadvance="33" /><!-- ь -->' +
    '<char id="1099" x="410" y="64" width="37" height="37" xoffset="0" yoffset="25" xadvance="40" /><!-- ы -->' +
    '<char id="1101" x="606" y="323" width="33" height="37" xoffset="0" yoffset="25" xadvance="36" /><!-- э -->' +
    '<char id="1102" x="132" y="596" width="47" height="37" xoffset="0" yoffset="25" xadvance="50" /><!-- ю -->' +
    '<char id="1103" x="652" y="64" width="31" height="37" xoffset="0" yoffset="25" xadvance="34" /><!-- я -->' +
    '<char id="1052" x="0" y="343" width="57" height="51" xoffset="0" yoffset="11" xadvance="60" /><!-- М -->' +
    '<char id="1040" x="140" y="0" width="43" height="50" xoffset="0" yoffset="12" xadvance="46" /><!-- А -->' +
    '<char id="1043" x="510" y="418" width="35" height="50" xoffset="0" yoffset="12" xadvance="38" /><!-- Г -->' +
    '<char id="1047" x="652" y="0" width="32" height="50" xoffset="0" yoffset="12" xadvance="35" /><!-- З -->' +
    '<char id="1048" x="193" y="538" width="42" height="50" xoffset="0" yoffset="12" xadvance="45" /><!-- И -->' +
    '<char id="1053" x="304" y="406" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- Н -->' +
    '<char id="1051" x="194" y="333" width="42" height="50" xoffset="0" yoffset="12" xadvance="45" /><!-- Л -->' +
    '<char id="1062" x="195" y="205" width="42" height="59" xoffset="0" yoffset="12" xadvance="45" /><!-- Ц -->' +
    '<char id="1059" x="198" y="64" width="42" height="50" xoffset="0" yoffset="12" xadvance="45" /><!-- У -->' +
    '<char id="1050" x="461" y="482" width="36" height="50" xoffset="0" yoffset="12" xadvance="39" /><!-- К -->' +
    '<char id="1041" x="605" y="576" width="33" height="50" xoffset="0" yoffset="12" xadvance="36" /><!-- Б -->' +
    '<char id="1061" x="137" y="333" width="43" height="50" xoffset="0" yoffset="12" xadvance="46" /><!-- Х -->' +
    '<char id="1063" x="305" y="534" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- Ч -->' +
    '<char id="1044" x="132" y="523" width="47" height="59" xoffset="0" yoffset="12" xadvance="50" /><!-- Д -->' +
    '<char id="1042" x="512" y="194" width="33" height="50" xoffset="0" yoffset="12" xadvance="36" /><!-- В -->' +
    '<char id="1055" x="304" y="470" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- П -->' +
    '<char id="1057" x="137" y="269" width="44" height="50" xoffset="0" yoffset="12" xadvance="47" /><!-- С -->' +
    '<char id="1056" x="652" y="438" width="32" height="50" xoffset="0" yoffset="12" xadvance="35" /><!-- Р -->' +
    '<char id="1058" x="253" y="128" width="40" height="50" xoffset="0" yoffset="12" xadvance="43" /><!-- Т -->' +
    '<char id="1054" x="71" y="269" width="52" height="50" xoffset="0" yoffset="12" xadvance="55" /><!-- О -->' +
    '<char id="304" x="767" y="0" width="13" height="61" xoffset="0" yoffset="1" xadvance="16" /><!-- İ -->' +
    '<char id="1068" x="559" y="296" width="33" height="50" xoffset="0" yoffset="12" xadvance="36" /><!-- Ь -->' +
    '<char id="1046" x="0" y="141" width="61" height="50" xoffset="0" yoffset="12" xadvance="64" /><!-- Ж -->' +
    '<char id="1045" x="305" y="192" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- Е -->' +
    '<char id="224" x="303" y="667" width="38" height="50" xoffset="0" yoffset="12" xadvance="41" /><!-- à -->' +
    '<char id="236" x="736" y="194" width="17" height="50" xoffset="0" yoffset="12" xadvance="20" /><!-- ì -->' +
    '<char id="1060" x="0" y="725" width="52" height="50" xoffset="0" yoffset="12" xadvance="55" /><!-- Ф -->' +
    '<char id="1064" x="136" y="141" width="47" height="50" xoffset="0" yoffset="12" xadvance="50" /><!-- Ш -->' +
    '<char id="1065" x="0" y="652" width="52" height="59" xoffset="0" yoffset="12" xadvance="55" /><!-- Щ -->' +
    '<char id="1066" x="250" y="342" width="42" height="50" xoffset="0" yoffset="12" xadvance="45" /><!-- Ъ -->' +
    '<char id="1067" x="197" y="0" width="42" height="50" xoffset="0" yoffset="12" xadvance="45" /><!-- Ы -->' +
    '<char id="1069" x="132" y="647" width="44" height="50" xoffset="0" yoffset="12" xadvance="47" /><!-- Э -->' +
    '<char id="1070" x="0" y="77" width="61" height="50" xoffset="0" yoffset="12" xadvance="64" /><!-- Ю -->' +
    '<char id="1071" x="462" y="290" width="35" height="50" xoffset="0" yoffset="12" xadvance="38" /><!-- Я -->' +
    '<char id="305" x="739" y="64" width="10" height="37" xoffset="0" yoffset="25" xadvance="13" /><!-- ı -->' +
    '<char id="263" x="511" y="482" width="34" height="50" xoffset="0" yoffset="12" xadvance="37" /><!-- ć -->' +
    '<char id="32" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="20" /><!--   -->' +
    '<char id="9" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="160" /><!-- 	 -->' +
'</chars>' +
'<kernings count="0">' +
'</kernings>' +
    '</font>';
AG.BitmapFontLoader = function() {

    var xmlDoc;
    if (window.DOMParser)
    {
        var parser=new DOMParser();
        xmlDoc=parser.parseFromString(AG.FontString ,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(AG.FontString );
    }

            var responseXML = xmlDoc;

            var textureUrl = this.baseUrl + responseXML.getElementsByTagName('page')[0].getAttribute('file');
           // var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
            this.texture = GodStep.textures['Font1'].baseTexture;//image.texture.baseTexture;

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
                    yOffset: parseInt(letters[i].getAttribute('yoffset'), 10) + 25,
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
extend(AG.BitmapFontLoader, PIXI.BitmapFontLoader);