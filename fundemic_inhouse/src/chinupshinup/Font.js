SS.Font = function() {
    new SS.BitmapFontLoader();
};

extend(SS.Font, PIXI.AssetLoader);


SS.FontString = '<font>'+
    '<info face="Font" size="80" />'+
    '<common lineHeight="80" scaleW="539" scaleH="547" pages="1" />'+
    '<pages>'+
    '<page id="0" file="Font.png" />'+
    '</pages>'+
    '<chars count="190">'+
    '<char id="35" x="142" y="367" width="41" height="45" xoffset="0" yoffset="35" xadvance="42" /><!-- # -->'+
    '<char id="33" x="510" y="272" width="18" height="45" xoffset="0" yoffset="35" xadvance="19" /><!-- ! -->'+
    '<char id="36" x="225" y="313" width="38" height="60" xoffset="0" yoffset="28" xadvance="39" /><!-- $ -->'+
    '<char id="37" x="0" y="368" width="48" height="47" xoffset="0" yoffset="34" xadvance="49" /><!-- % -->'+
    '<char id="38" x="0" y="416" width="47" height="47" xoffset="0" yoffset="34" xadvance="48" /><!-- & -->'+
    '<char id="39" x="409" y="132" width="13" height="13" xoffset="0" yoffset="35" xadvance="14" /><!--  -->'+
    '<char id="40" x="498" y="0" width="19" height="65" xoffset="0" yoffset="28" xadvance="20" /><!-- ( -->'+
    '<char id="41" x="510" y="160" width="19" height="65" xoffset="0" yoffset="28" xadvance="20" /><!-- ) -->'+
    '<char id="42" x="407" y="357" width="22" height="21" xoffset="0" yoffset="35" xadvance="23" /><!-- * -->'+
    '<char id="43" x="242" y="93" width="30" height="29" xoffset="0" yoffset="46" xadvance="31" /><!-- + -->'+
    '<char id="44" x="395" y="514" width="9" height="19" xoffset="0" yoffset="70" xadvance="10" /><!-- , -->'+
    '<char id="45" x="340" y="359" width="19" height="10" xoffset="0" yoffset="56" xadvance="20" /><!-- - -->'+
    '<char id="46" x="514" y="447" width="9" height="10" xoffset="0" yoffset="70" xadvance="10" /><!-- . -->'+
    '<char id="47" x="435" y="190" width="28" height="58" xoffset="0" yoffset="31" xadvance="29" /><!-- / -->'+
    '<char id="48" x="141" y="414" width="42" height="47" xoffset="0" yoffset="34" xadvance="43" /><!-- 0 -->'+
    '<char id="49" x="405" y="455" width="30" height="45" xoffset="0" yoffset="35" xadvance="31" /><!-- 1 -->'+
    '<char id="50" x="281" y="0" width="37" height="46" xoffset="0" yoffset="34" xadvance="38" /><!-- 2 -->'+
    '<char id="51" x="339" y="372" width="35" height="47" xoffset="0" yoffset="34" xadvance="36" /><!-- 3 -->'+
    '<char id="52" x="184" y="420" width="39" height="45" xoffset="0" yoffset="35" xadvance="40" /><!-- 4 -->'+
    '<char id="53" x="264" y="371" width="37" height="47" xoffset="0" yoffset="35" xadvance="38" /><!-- 5 -->'+
    '<char id="54" x="184" y="466" width="39" height="47" xoffset="0" yoffset="34" xadvance="40" /><!-- 6 -->'+
    '<char id="55" x="242" y="0" width="38" height="45" xoffset="0" yoffset="35" xadvance="39" /><!-- 7 -->'+
    '<char id="56" x="147" y="270" width="41" height="47" xoffset="0" yoffset="34" xadvance="42" /><!-- 8 -->'+
    '<char id="57" x="161" y="90" width="40" height="47" xoffset="0" yoffset="34" xadvance="41" /><!-- 9 -->'+
    '<char id="58" x="528" y="0" width="9" height="29" xoffset="0" yoffset="51" xadvance="10" /><!-- : -->'+
    '<char id="59" x="518" y="0" width="9" height="38" xoffset="0" yoffset="51" xadvance="10" /><!-- ; -->'+
    '<char id="60" x="464" y="291" width="25" height="29" xoffset="0" yoffset="47" xadvance="26" /><!-- < -->'+
    '<char id="61" x="408" y="190" width="25" height="25" xoffset="0" yoffset="48" xadvance="26" /><!-- = -->'+
    '<char id="62" x="464" y="188" width="25" height="29" xoffset="0" yoffset="47" xadvance="26" /><!-- > -->'+
    '<char id="63" x="302" y="372" width="36" height="46" xoffset="0" yoffset="34" xadvance="37" /><!-- ? -->'+
    '<char id="89" x="116" y="46" width="44" height="45" xoffset="0" yoffset="35" xadvance="45" /><!-- Y -->'+
    '<char id="64" x="0" y="92" width="63" height="60" xoffset="0" yoffset="34" xadvance="64" /><!-- @ -->'+
    '<char id="65" x="48" y="458" width="46" height="45" xoffset="0" yoffset="35" xadvance="47" /><!-- A -->'+
    '<char id="66" x="74" y="0" width="45" height="45" xoffset="0" yoffset="35" xadvance="46" /><!-- B -->'+
    '<char id="67" x="161" y="42" width="40" height="47" xoffset="0" yoffset="34" xadvance="41" /><!-- C -->'+
    '<char id="68" x="49" y="368" width="46" height="45" xoffset="0" yoffset="35" xadvance="47" /><!-- D -->'+
    '<char id="69" x="153" y="138" width="40" height="45" xoffset="0" yoffset="35" xadvance="41" /><!-- E -->'+
    '<char id="70" x="302" y="466" width="36" height="45" xoffset="0" yoffset="35" xadvance="37" /><!-- F -->'+
    '<char id="71" x="101" y="272" width="45" height="47" xoffset="0" yoffset="34" xadvance="46" /><!-- G -->'+
    '<char id="72" x="0" y="322" width="49" height="45" xoffset="0" yoffset="35" xadvance="50" /><!-- H -->'+
    '<char id="73" x="489" y="352" width="24" height="45" xoffset="0" yoffset="35" xadvance="25" /><!-- I -->'+
    '<char id="74" x="380" y="42" width="31" height="46" xoffset="0" yoffset="35" xadvance="32" /><!-- J -->'+
    '<char id="75" x="0" y="464" width="47" height="45" xoffset="0" yoffset="35" xadvance="48" /><!-- K -->'+
    '<char id="76" x="264" y="325" width="37" height="45" xoffset="0" yoffset="35" xadvance="38" /><!-- L -->'+
    '<char id="77" x="0" y="46" width="68" height="45" xoffset="0" yoffset="35" xadvance="69" /><!-- M -->'+
    '<char id="78" x="0" y="220" width="54" height="45" xoffset="0" yoffset="35" xadvance="55" /><!-- N -->'+
    '<char id="79" x="55" y="272" width="45" height="47" xoffset="0" yoffset="34" xadvance="46" /><!-- O -->'+
    '<char id="80" x="141" y="462" width="42" height="45" xoffset="0" yoffset="35" xadvance="43" /><!-- P -->'+
    '<char id="81" x="55" y="220" width="46" height="51" xoffset="0" yoffset="34" xadvance="47" /><!-- Q -->'+
    '<char id="82" x="50" y="322" width="46" height="45" xoffset="0" yoffset="35" xadvance="47" /><!-- R -->'+
    '<char id="83" x="234" y="133" width="38" height="47" xoffset="0" yoffset="34" xadvance="39" /><!-- S -->'+
    '<char id="84" x="111" y="92" width="44" height="45" xoffset="0" yoffset="35" xadvance="45" /><!-- T -->'+
    '<char id="85" x="97" y="320" width="45" height="46" xoffset="0" yoffset="35" xadvance="46" /><!-- U -->'+
    '<char id="86" x="96" y="368" width="45" height="45" xoffset="0" yoffset="35" xadvance="46" /><!-- V -->'+
    '<char id="87" x="0" y="0" width="73" height="45" xoffset="0" yoffset="35" xadvance="74" /><!-- W -->'+
    '<char id="88" x="69" y="46" width="46" height="45" xoffset="0" yoffset="35" xadvance="47" /><!-- X -->'+
    '<char id="90" x="184" y="374" width="39" height="45" xoffset="0" yoffset="35" xadvance="40" /><!-- Z -->'+
    '<char id="91" x="512" y="66" width="17" height="69" xoffset="0" yoffset="28" xadvance="18" /><!-- [ -->'+
    '<char id="92" x="412" y="42" width="28" height="58" xoffset="0" yoffset="31" xadvance="29" /><!-- \ -->'+
    '<char id="93" x="513" y="458" width="17" height="69" xoffset="0" yoffset="28" xadvance="18" /><!-- ] -->'+
    '<char id="94" x="374" y="455" width="24" height="15" xoffset="0" yoffset="35" xadvance="25" /><!-- ^ -->'+
    '<char id="34" x="436" y="483" width="20" height="14" xoffset="0" yoffset="34" xadvance="21" /><!-- " -->'+
    '<char id="95" x="57" y="213" width="35" height="6" xoffset="0" yoffset="84" xadvance="36" /><!-- _ -->'+
    '<char id="96" x="311" y="131" width="20" height="10" xoffset="0" yoffset="35" xadvance="21" /><!-- ` -->'+
    '<char id="97" x="203" y="0" width="38" height="34" xoffset="0" yoffset="47" xadvance="39" /><!-- a -->'+
    '<char id="98" x="268" y="181" width="37" height="46" xoffset="0" yoffset="35" xadvance="38" /><!-- b -->'+
    '<char id="99" x="374" y="262" width="31" height="34" xoffset="0" yoffset="47" xadvance="32" /><!-- c -->'+
    '<char id="100" x="229" y="231" width="38" height="46" xoffset="0" yoffset="35" xadvance="39" /><!-- d -->'+
    '<char id="101" x="229" y="278" width="33" height="34" xoffset="0" yoffset="47" xadvance="34" /><!-- e -->'+
    '<char id="102" x="437" y="101" width="26" height="46" xoffset="0" yoffset="34" xadvance="27" /><!-- f -->'+
    '<char id="103" x="224" y="466" width="38" height="47" xoffset="0" yoffset="47" xadvance="39" /><!-- g -->'+
    '<char id="104" x="194" y="138" width="39" height="45" xoffset="0" yoffset="35" xadvance="40" /><!-- h -->'+
    '<char id="105" x="490" y="191" width="19" height="45" xoffset="0" yoffset="35" xadvance="20" /><!-- i -->'+
    '<char id="106" x="489" y="398" width="24" height="59" xoffset="0" yoffset="35" xadvance="25" /><!-- j -->'+
    '<char id="107" x="224" y="420" width="38" height="45" xoffset="0" yoffset="35" xadvance="39" /><!-- k -->'+
    '<char id="108" x="490" y="279" width="19" height="45" xoffset="0" yoffset="35" xadvance="20" /><!-- l -->'+
    '<char id="109" x="0" y="153" width="59" height="33" xoffset="0" yoffset="47" xadvance="60" /><!-- m -->'+
    '<char id="110" x="141" y="508" width="39" height="33" xoffset="0" yoffset="47" xadvance="40" /><!-- n -->'+
    '<char id="111" x="294" y="512" width="36" height="34" xoffset="0" yoffset="47" xadvance="37" /><!-- o -->'+
    '<char id="112" x="302" y="325" width="37" height="46" xoffset="0" yoffset="47" xadvance="38" /><!-- p -->'+
    '<char id="113" x="229" y="184" width="38" height="46" xoffset="0" yoffset="47" xadvance="39" /><!-- q -->'+
    '<char id="114" x="347" y="97" width="29" height="33" xoffset="0" yoffset="47" xadvance="30" /><!-- r -->'+
    '<char id="115" x="374" y="420" width="31" height="34" xoffset="0" yoffset="47" xadvance="32" /><!-- s -->'+
    '<char id="116" x="446" y="0" width="26" height="40" xoffset="0" yoffset="41" xadvance="27" /><!-- t -->'+
    '<char id="117" x="189" y="184" width="39" height="33" xoffset="0" yoffset="48" xadvance="40" /><!-- u -->'+
    '<char id="118" x="181" y="514" width="37" height="32" xoffset="0" yoffset="48" xadvance="38" /><!-- v -->'+
    '<char id="119" x="0" y="187" width="56" height="32" xoffset="0" yoffset="47" xadvance="57" /><!-- w -->'+
    '<char id="120" x="257" y="514" width="36" height="32" xoffset="0" yoffset="47" xadvance="37" /><!-- x -->'+
    '<char id="121" x="306" y="192" width="36" height="46" xoffset="0" yoffset="47" xadvance="37" /><!-- y -->'+
    '<char id="122" x="273" y="145" width="32" height="32" xoffset="0" yoffset="47" xadvance="33" /><!-- z -->'+
    '<char id="123" x="514" y="318" width="15" height="64" xoffset="0" yoffset="29" xadvance="16" /><!-- { -->'+
    '<char id="124" x="530" y="276" width="8" height="74" xoffset="0" yoffset="24" xadvance="9" /><!-- | -->'+
    '<char id="125" x="514" y="383" width="15" height="63" xoffset="0" yoffset="30" xadvance="16" /><!-- } -->'+
    '<char id="323" x="0" y="266" width="54" height="55" xoffset="0" yoffset="24" xadvance="55" /><!-- Ń -->'+
    '<char id="199" x="148" y="205" width="40" height="61" xoffset="0" yoffset="33" xadvance="41" /><!-- Ç -->'+
    '<char id="213" x="107" y="144" width="45" height="60" xoffset="0" yoffset="20" xadvance="46" /><!-- Õ -->'+
    '<char id="211" x="102" y="213" width="45" height="56" xoffset="0" yoffset="24" xadvance="46" /><!-- Ó -->'+
    '<char id="231" x="377" y="97" width="31" height="48" xoffset="0" yoffset="46" xadvance="32" /><!-- ç -->'+
    '<char id="237" x="490" y="72" width="21" height="45" xoffset="0" yoffset="34" xadvance="22" /><!-- í -->'+
    '<char id="227" x="263" y="462" width="38" height="47" xoffset="0" yoffset="33" xadvance="39" /><!-- ã -->'+
    '<char id="243" x="306" y="145" width="36" height="46" xoffset="0" yoffset="34" xadvance="37" /><!-- ó -->'+
    '<char id="234" x="343" y="131" width="33" height="46" xoffset="0" yoffset="34" xadvance="34" /><!-- ê -->'+
    '<char id="233" x="340" y="270" width="33" height="46" xoffset="0" yoffset="34" xadvance="34" /><!-- é -->'+
    '<char id="228" x="264" y="278" width="38" height="46" xoffset="0" yoffset="34" xadvance="39" /><!-- ä -->'+
    '<char id="223" x="189" y="218" width="39" height="47" xoffset="0" yoffset="33" xadvance="40" /><!-- ß -->'+
    '<char id="246" x="303" y="270" width="36" height="46" xoffset="0" yoffset="34" xadvance="37" /><!-- ö -->'+
    '<char id="252" x="189" y="266" width="39" height="46" xoffset="0" yoffset="34" xadvance="40" /><!-- ü -->'+
    '<char id="241" x="202" y="86" width="39" height="46" xoffset="0" yoffset="33" xadvance="40" /><!-- ñ -->'+
    '<char id="161" x="510" y="226" width="18" height="45" xoffset="0" yoffset="39" xadvance="19" /><!-- ¡ -->'+
    '<char id="191" x="302" y="419" width="36" height="46" xoffset="0" yoffset="38" xadvance="37" /><!-- ¿ -->'+
    '<char id="200" x="184" y="318" width="40" height="55" xoffset="0" yoffset="24" xadvance="41" /><!-- È -->'+
    '<char id="195" x="60" y="153" width="46" height="59" xoffset="0" yoffset="20" xadvance="47" /><!-- Ã -->'+
    '<char id="350" x="406" y="379" width="29" height="61" xoffset="0" yoffset="33" xadvance="30" /><!-- Ş -->'+
    '<char id="220" x="95" y="458" width="45" height="56" xoffset="0" yoffset="24" xadvance="46" /><!-- Ü -->'+
    '<char id="351" x="490" y="118" width="21" height="41" xoffset="0" yoffset="50" xadvance="22" /><!-- ş -->'+
    '<char id="287" x="406" y="262" width="28" height="52" xoffset="0" yoffset="39" xadvance="29" /><!-- ğ -->'+
    '<char id="280" x="464" y="73" width="25" height="52" xoffset="0" yoffset="39" xadvance="26" /><!-- Ę -->'+
    '<char id="281" x="436" y="337" width="27" height="41" xoffset="0" yoffset="50" xadvance="28" /><!-- ę -->'+
    '<char id="261" x="436" y="295" width="27" height="41" xoffset="0" yoffset="50" xadvance="28" /><!-- ą -->'+
    '<char id="321" x="224" y="374" width="39" height="45" xoffset="0" yoffset="34" xadvance="40" /><!-- Ł -->'+
    '<char id="322" x="435" y="249" width="27" height="45" xoffset="0" yoffset="34" xadvance="28" /><!-- ł -->'+
    '<char id="324" x="202" y="40" width="39" height="45" xoffset="0" yoffset="34" xadvance="40" /><!-- ń -->'+
    '<char id="126" x="153" y="184" width="33" height="12" xoffset="0" yoffset="54" xadvance="34" /><!-- ~ -->'+
    '<char id="347" x="490" y="237" width="19" height="41" xoffset="0" yoffset="38" xadvance="20" /><!-- ś -->'+
    '<char id="1072" x="463" y="452" width="25" height="30" xoffset="0" yoffset="50" xadvance="26" /><!-- а -->'+
    '<char id="1073" x="408" y="146" width="28" height="43" xoffset="0" yoffset="37" xadvance="29" /><!-- б -->'+
    '<char id="1074" x="464" y="321" width="25" height="30" xoffset="0" yoffset="50" xadvance="26" /><!-- в -->'+
    '<char id="1075" x="490" y="160" width="19" height="30" xoffset="0" yoffset="50" xadvance="20" /><!-- г -->'+
    '<char id="1076" x="374" y="297" width="31" height="39" xoffset="0" yoffset="50" xadvance="32" /><!-- д -->'+
    '<char id="1077" x="409" y="101" width="27" height="30" xoffset="0" yoffset="50" xadvance="28" /><!-- е -->'+
    '<char id="1078" x="0" y="510" width="40" height="30" xoffset="0" yoffset="50" xadvance="41" /><!-- ж -->'+
    '<char id="1079" x="468" y="41" width="24" height="30" xoffset="0" yoffset="50" xadvance="25" /><!-- з -->'+
    '<char id="1080" x="441" y="42" width="26" height="30" xoffset="0" yoffset="50" xadvance="27" /><!-- и -->'+
    '<char id="1082" x="464" y="126" width="25" height="30" xoffset="0" yoffset="50" xadvance="26" /><!-- к -->'+
    '<char id="1083" x="377" y="146" width="27" height="30" xoffset="0" yoffset="50" xadvance="28" /><!-- л -->'+
    '<char id="1084" x="306" y="239" width="35" height="30" xoffset="0" yoffset="50" xadvance="36" /><!-- м -->'+
    '<char id="1085" x="436" y="452" width="26" height="30" xoffset="0" yoffset="50" xadvance="27" /><!-- н -->'+
    '<char id="1086" x="364" y="514" width="30" height="30" xoffset="0" yoffset="50" xadvance="31" /><!-- о -->'+
    '<char id="1087" x="463" y="514" width="25" height="30" xoffset="0" yoffset="50" xadvance="26" /><!-- п -->'+
    '<char id="1088" x="387" y="0" width="30" height="41" xoffset="0" yoffset="50" xadvance="31" /><!-- р -->'+
    '<char id="1089" x="464" y="352" width="24" height="30" xoffset="0" yoffset="50" xadvance="25" /><!-- с -->'+
    '<char id="1090" x="464" y="157" width="25" height="30" xoffset="0" yoffset="50" xadvance="26" /><!-- т -->'+
    '<char id="1091" x="405" y="501" width="29" height="42" xoffset="0" yoffset="50" xadvance="30" /><!-- у -->'+
    '<char id="1092" x="319" y="0" width="35" height="54" xoffset="0" yoffset="37" xadvance="36" /><!-- ф -->'+
    '<char id="1093" x="318" y="55" width="28" height="30" xoffset="0" yoffset="50" xadvance="29" /><!-- х -->'+
    '<char id="1094" x="375" y="379" width="28" height="39" xoffset="0" yoffset="50" xadvance="29" /><!-- ц -->'+
    '<char id="1095" x="473" y="0" width="24" height="30" xoffset="0" yoffset="50" xadvance="25" /><!-- ч -->'+
    '<char id="1096" x="95" y="515" width="37" height="30" xoffset="0" yoffset="50" xadvance="38" /><!-- ш -->'+
    '<char id="1097" x="163" y="0" width="39" height="39" xoffset="0" yoffset="50" xadvance="40" /><!-- щ -->'+
    '<char id="1100" x="463" y="483" width="25" height="30" xoffset="0" yoffset="50" xadvance="26" /><!-- ь -->'+
    '<char id="1099" x="331" y="514" width="32" height="30" xoffset="0" yoffset="50" xadvance="33" /><!-- ы -->'+
    '<char id="1101" x="464" y="218" width="25" height="30" xoffset="0" yoffset="50" xadvance="26" /><!-- э -->'+
    '<char id="1102" x="219" y="514" width="37" height="30" xoffset="0" yoffset="50" xadvance="38" /><!-- ю -->'+
    '<char id="1103" x="436" y="379" width="27" height="30" xoffset="0" yoffset="50" xadvance="28" /><!-- я -->'+
    '<char id="1052" x="120" y="0" width="42" height="41" xoffset="0" yoffset="39" xadvance="43" /><!-- М -->'+
    '<char id="1040" x="311" y="89" width="35" height="41" xoffset="0" yoffset="39" xadvance="36" /><!-- А -->'+
    '<char id="1043" x="489" y="458" width="23" height="41" xoffset="0" yoffset="39" xadvance="24" /><!-- Г -->'+
    '<char id="1047" x="437" y="148" width="26" height="41" xoffset="0" yoffset="39" xadvance="27" /><!-- З -->'+
    '<char id="1048" x="347" y="55" width="32" height="41" xoffset="0" yoffset="39" xadvance="33" /><!-- И -->'+
    '<char id="1053" x="375" y="337" width="31" height="41" xoffset="0" yoffset="39" xadvance="32" /><!-- Н -->'+
    '<char id="1051" x="339" y="472" width="33" height="41" xoffset="0" yoffset="39" xadvance="34" /><!-- Л -->'+
    '<char id="1062" x="339" y="420" width="34" height="51" xoffset="0" yoffset="39" xadvance="35" /><!-- Ц -->'+
    '<char id="1059" x="343" y="220" width="32" height="41" xoffset="0" yoffset="39" xadvance="33" /><!-- У -->'+
    '<char id="1050" x="376" y="220" width="29" height="41" xoffset="0" yoffset="39" xadvance="30" /><!-- К -->'+
    '<char id="1041" x="436" y="410" width="27" height="41" xoffset="0" yoffset="39" xadvance="28" /><!-- Б -->'+
    '<char id="1061" x="340" y="317" width="33" height="41" xoffset="0" yoffset="39" xadvance="34" /><!-- Х -->'+
    '<char id="1063" x="406" y="220" width="28" height="41" xoffset="0" yoffset="39" xadvance="29" /><!-- Ч -->'+
    '<char id="1044" x="273" y="93" width="37" height="51" xoffset="0" yoffset="39" xadvance="38" /><!-- Д -->'+
    '<char id="1042" x="435" y="501" width="27" height="41" xoffset="0" yoffset="39" xadvance="28" /><!-- В -->'+
    '<char id="1055" x="376" y="178" width="31" height="41" xoffset="0" yoffset="39" xadvance="32" /><!-- П -->'+
    '<char id="1057" x="343" y="178" width="32" height="41" xoffset="0" yoffset="39" xadvance="33" /><!-- С -->'+
    '<char id="1056" x="463" y="249" width="26" height="41" xoffset="0" yoffset="39" xadvance="27" /><!-- Р -->'+
    '<char id="1058" x="355" y="0" width="31" height="41" xoffset="0" yoffset="39" xadvance="32" /><!-- Т -->'+
    '<char id="1054" x="263" y="420" width="38" height="41" xoffset="0" yoffset="39" xadvance="39" /><!-- О -->'+
    '<char id="304" x="529" y="226" width="8" height="49" xoffset="0" yoffset="31" xadvance="9" /><!-- İ -->'+
    '<char id="1068" x="418" y="0" width="27" height="41" xoffset="0" yoffset="39" xadvance="28" /><!-- Ь -->'+
    '<char id="1046" x="48" y="416" width="47" height="41" xoffset="0" yoffset="39" xadvance="48" /><!-- Ж -->'+
    '<char id="1045" x="464" y="383" width="24" height="41" xoffset="0" yoffset="39" xadvance="25" /><!-- Е -->'+
    '<char id="224" x="242" y="46" width="38" height="46" xoffset="0" yoffset="34" xadvance="39" /><!-- à -->'+
    '<char id="236" x="489" y="500" width="23" height="45" xoffset="0" yoffset="34" xadvance="24" /><!-- ì -->'+
    '<char id="1060" x="143" y="320" width="40" height="43" xoffset="0" yoffset="38" xadvance="41" /><!-- Ф -->'+
    '<char id="1064" x="96" y="414" width="43" height="41" xoffset="0" yoffset="39" xadvance="44" /><!-- Ш -->'+
    '<char id="1065" x="64" y="92" width="46" height="51" xoffset="0" yoffset="39" xadvance="47" /><!-- Щ -->'+
    '<char id="1066" x="281" y="47" width="36" height="41" xoffset="0" yoffset="39" xadvance="37" /><!-- Ъ -->'+
    '<char id="1067" x="268" y="228" width="37" height="41" xoffset="0" yoffset="39" xadvance="38" /><!-- Ы -->'+
    '<char id="1069" x="373" y="472" width="31" height="41" xoffset="0" yoffset="39" xadvance="32" /><!-- Э -->'+
    '<char id="1070" x="48" y="504" width="46" height="41" xoffset="0" yoffset="39" xadvance="47" /><!-- Ю -->'+
    '<char id="1071" x="407" y="315" width="28" height="41" xoffset="0" yoffset="39" xadvance="29" /><!-- Я -->'+
    '<char id="32" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="20" /><!--   -->'+
    '<char id="9" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="160" /><!-- 	 -->'+
    '</chars>'+
    '<kernings count="0">'+
    '</kernings>'+
    '</font>';
SS.BitmapFontLoader = function() {
    var xmlDoc;
    if (window.DOMParser) {
        var parser=new DOMParser();
        xmlDoc=parser.parseFromString(SS.FontString ,"text/xml");
    }
    else  {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(SS.FontString );
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
extend(SS.BitmapFontLoader, PIXI.BitmapFontLoader);