LQ.LiquidFont = function() {
    new LQ.BitmapFontLoader();
};

extend(LQ.LiquidFont, PIXI.AssetLoader);

LQ.FontString = '<font>'+
    '<info face="LiquidFont" size="105" />'+
    '<common lineHeight="70" scaleW="573" scaleH="575" pages="1" />'+
    '<pages>'+
    '<page id="0" file="LiquidFont.png" />'+
    '</pages>'+
'<chars count="105">'+
    '<char id="33" x="546" y="256" width="13" height="50" xoffset="0" yoffset="39" xadvance="17" /><!-- ! -->'+
    '<char id="34" x="513" y="322" width="17" height="17" xoffset="0" yoffset="39" xadvance="21" /><!-- " -->'+
    '<char id="35" x="283" y="447" width="38" height="51" xoffset="0" yoffset="38" xadvance="42" /><!-- # -->'+
    '<char id="36" x="429" y="347" width="32" height="61" xoffset="0" yoffset="33" xadvance="36" /><!-- $ -->'+
    '<char id="37" x="0" y="205" width="52" height="50" xoffset="0" yoffset="39" xadvance="56" /><!-- % -->'+
    '<char id="38" x="66" y="499" width="43" height="51" xoffset="0" yoffset="38" xadvance="47" /><!-- & -->'+
    '<char id="39" x="544" y="524" width="10" height="16" xoffset="0" yoffset="39" xadvance="14" /><!-- -->'+
    '<char id="40" x="517" y="382" width="17" height="64" xoffset="0" yoffset="39" xadvance="21" /><!-- ( -->'+
    '<char id="41" x="517" y="0" width="17" height="65" xoffset="0" yoffset="38" xadvance="21" /><!-- ) -->'+
    '<char id="42" x="433" y="257" width="24" height="21" xoffset="0" yoffset="39" xadvance="28" /><!-- * -->'+
    '<char id="43" x="335" y="448" width="33" height="32" xoffset="0" yoffset="48" xadvance="37" /><!-- + -->'+
    '<char id="44" x="544" y="320" width="13" height="18" xoffset="0" yoffset="78" xadvance="17" /><!-- , -->'+
    '<char id="45" x="475" y="0" width="24" height="9" xoffset="0" yoffset="66" xadvance="28" /><!-- - -->'+
    '<char id="46" x="544" y="352" width="13" height="11" xoffset="0" yoffset="78" xadvance="17" /><!-- . -->'+
    '<char id="47" x="474" y="422" width="29" height="56" xoffset="0" yoffset="38" xadvance="33" /><!-- / -->'+
    '<char id="48" x="339" y="179" width="33" height="51" xoffset="0" yoffset="38" xadvance="37" /><!-- 0 -->'+
    '<char id="49" x="515" y="102" width="17" height="50" xoffset="0" yoffset="39" xadvance="21" /><!-- 1 -->'+
    '<char id="50" x="339" y="244" width="33" height="51" xoffset="0" yoffset="38" xadvance="37" /><!-- 2 -->'+
    '<char id="51" x="380" y="494" width="33" height="51" xoffset="0" yoffset="38" xadvance="37" /><!-- 3 -->'+
    '<char id="52" x="137" y="0" width="38" height="50" xoffset="0" yoffset="39" xadvance="42" /><!-- 4 -->'+
    '<char id="53" x="284" y="321" width="36" height="51" xoffset="0" yoffset="38" xadvance="40" /><!-- 5 -->'+
    '<char id="54" x="343" y="0" width="33" height="50" xoffset="0" yoffset="39" xadvance="37" /><!-- 6 -->'+
    '<char id="55" x="388" y="64" width="33" height="51" xoffset="0" yoffset="38" xadvance="37" /><!-- 7 -->'+
    '<char id="56" x="386" y="166" width="33" height="51" xoffset="0" yoffset="38" xadvance="37" /><!-- 8 -->'+
    '<char id="57" x="386" y="231" width="33" height="51" xoffset="0" yoffset="38" xadvance="37" /><!-- 9 -->'+
    '<char id="58" x="517" y="524" width="13" height="37" xoffset="0" yoffset="52" xadvance="17" /><!-- : -->'+
    '<char id="59" x="546" y="79" width="13" height="44" xoffset="0" yoffset="52" xadvance="17" /><!-- ; -->'+
    '<char id="60" x="427" y="503" width="33" height="36" xoffset="0" yoffset="48" xadvance="37" /><!-- < -->'+
    '<char id="61" x="382" y="439" width="31" height="24" xoffset="0" yoffset="54" xadvance="35" /><!-- = -->'+
    '<char id="62" x="180" y="449" width="33" height="36" xoffset="0" yoffset="48" xadvance="37" /><!-- > -->'+
    '<char id="63" x="382" y="374" width="33" height="51" xoffset="0" yoffset="38" xadvance="37" /><!-- ? -->'+
    '<char id="64" x="0" y="0" width="65" height="63" xoffset="0" yoffset="39" xadvance="69" /><!-- @ -->'+
    '<char id="65" x="124" y="371" width="42" height="50" xoffset="0" yoffset="39" xadvance="46" /><!-- A -->'+
    '<char id="66" x="390" y="0" width="33" height="50" xoffset="0" yoffset="39" xadvance="37" /><!-- B -->'+
    '<char id="67" x="66" y="435" width="44" height="50" xoffset="0" yoffset="39" xadvance="48" /><!-- C -->'+
    '<char id="68" x="132" y="205" width="40" height="50" xoffset="0" yoffset="39" xadvance="44" /><!-- D -->'+
    '<char id="69" x="231" y="449" width="38" height="50" xoffset="0" yoffset="39" xadvance="42" /><!-- E -->'+
    '<char id="70" x="241" y="0" width="38" height="50" xoffset="0" yoffset="39" xadvance="42" /><!-- F -->'+
    '<char id="71" x="66" y="371" width="44" height="50" xoffset="0" yoffset="39" xadvance="48" /><!-- G -->'+
    '<char id="72" x="188" y="129" width="38" height="50" xoffset="0" yoffset="39" xadvance="42" /><!-- H -->'+
    '<char id="73" x="548" y="377" width="10" height="50" xoffset="0" yoffset="39" xadvance="14" /><!-- I -->'+
    '<char id="74" x="335" y="384" width="33" height="50" xoffset="0" yoffset="39" xadvance="37" /><!-- J -->'+
    '<char id="75" x="290" y="256" width="35" height="50" xoffset="0" yoffset="39" xadvance="39" /><!-- K -->'+
    '<char id="76" x="290" y="192" width="35" height="50" xoffset="0" yoffset="39" xadvance="39" /><!-- L -->'+
    '<char id="77" x="0" y="333" width="52" height="50" xoffset="0" yoffset="39" xadvance="56" /><!-- M -->'+
    '<char id="78" x="132" y="141" width="42" height="50" xoffset="0" yoffset="39" xadvance="46" /><!-- N -->'+
    '<char id="79" x="66" y="256" width="52" height="50" xoffset="0" yoffset="39" xadvance="56" /><!-- O -->'+
    '<char id="80" x="433" y="129" width="32" height="50" xoffset="0" yoffset="39" xadvance="36" /><!-- P -->'+
    '<char id="81" x="66" y="141" width="52" height="50" xoffset="0" yoffset="39" xadvance="56" /><!-- Q -->'+
    '<char id="82" x="292" y="115" width="35" height="50" xoffset="0" yoffset="39" xadvance="39" /><!-- R -->'+
    '<char id="83" x="433" y="193" width="31" height="50" xoffset="0" yoffset="39" xadvance="35" /><!-- S -->'+
    '<char id="84" x="132" y="269" width="40" height="50" xoffset="0" yoffset="39" xadvance="44" /><!-- T -->'+
    '<char id="85" x="232" y="332" width="38" height="50" xoffset="0" yoffset="39" xadvance="42" /><!-- U -->'+
    '<char id="86" x="126" y="77" width="42" height="50" xoffset="0" yoffset="39" xadvance="46" /><!-- V -->'+
    '<char id="87" x="0" y="77" width="56" height="50" xoffset="0" yoffset="39" xadvance="60" /><!-- W -->'+
    '<char id="88" x="124" y="435" width="42" height="50" xoffset="0" yoffset="39" xadvance="46" /><!-- X -->'+
    '<char id="89" x="240" y="128" width="38" height="50" xoffset="0" yoffset="39" xadvance="42" /><!-- Y -->'+
    '<char id="90" x="123" y="499" width="42" height="50" xoffset="0" yoffset="39" xadvance="46" /><!-- Z -->'+
    '<char id="91" x="479" y="177" width="20" height="65" xoffset="0" yoffset="38" xadvance="24" /><!-- [ -->'+
    '<char id="92" x="474" y="492" width="29" height="55" xoffset="0" yoffset="39" xadvance="33" /><!--  -->'+
    '<char id="93" x="513" y="177" width="20" height="65" xoffset="0" yoffset="38" xadvance="24" /><!-- ] -->'+
    '<char id="94" x="388" y="129" width="29" height="22" xoffset="0" yoffset="39" xadvance="33" /><!-- ^ -->'+
    '<char id="95" x="0" y="552" width="38" height="9" xoffset="0" yoffset="84" xadvance="42" /><!-- _ -->'+
    '<char id="96" x="513" y="353" width="17" height="15" xoffset="0" yoffset="39" xadvance="21" /><!-- ` -->'+
    '<char id="97" x="232" y="396" width="38" height="37" xoffset="0" yoffset="52" xadvance="42" /><!-- a -->'+
    '<char id="98" x="238" y="193" width="38" height="50" xoffset="0" yoffset="39" xadvance="42" /><!-- b -->'+
    '<char id="99" x="341" y="115" width="33" height="37" xoffset="0" yoffset="52" xadvance="37" /><!-- c -->'+
    '<char id="100" x="186" y="205" width="38" height="50" xoffset="0" yoffset="39" xadvance="42" /><!-- d -->'+
    '<char id="101" x="231" y="513" width="38" height="37" xoffset="0" yoffset="52" xadvance="42" /><!-- e -->'+
    '<char id="102" x="475" y="257" width="26" height="51" xoffset="0" yoffset="38" xadvance="30" /><!-- f -->'+
    '<char id="103" x="182" y="64" width="38" height="51" xoffset="0" yoffset="52" xadvance="42" /><!-- g -->'+
    '<char id="104" x="293" y="0" width="36" height="50" xoffset="0" yoffset="39" xadvance="40" /><!-- h -->'+
    '<char id="105" x="546" y="460" width="11" height="47" xoffset="0" yoffset="42" xadvance="15" /><!-- i -->'+
    '<char id="106" x="479" y="102" width="22" height="61" xoffset="0" yoffset="42" xadvance="26" /><!-- j -->'+
    '<char id="107" x="427" y="439" width="33" height="50" xoffset="0" yoffset="39" xadvance="37" /><!-- k -->'+
    '<char id="108" x="517" y="460" width="15" height="50" xoffset="0" yoffset="39" xadvance="19" /><!-- l -->'+
    '<char id="109" x="66" y="205" width="52" height="37" xoffset="0" yoffset="52" xadvance="56" /><!-- m -->'+
    '<char id="110" x="286" y="64" width="36" height="37" xoffset="0" yoffset="52" xadvance="40" /><!-- n -->'+
    '<char id="111" x="180" y="398" width="38" height="37" xoffset="0" yoffset="52" xadvance="42" /><!-- o -->'+
    '<char id="112" x="180" y="333" width="38" height="51" xoffset="0" yoffset="52" xadvance="42" /><!-- p -->'+
    '<char id="113" x="179" y="499" width="38" height="51" xoffset="0" yoffset="52" xadvance="42" /><!-- q -->'+
    '<char id="114" x="435" y="64" width="30" height="37" xoffset="0" yoffset="52" xadvance="34" /><!-- r -->'+
    '<char id="115" x="429" y="296" width="32" height="37" xoffset="0" yoffset="52" xadvance="36" /><!-- s -->'+
    '<char id="116" x="437" y="0" width="24" height="50" xoffset="0" yoffset="39" xadvance="28" /><!-- t -->'+
    '<char id="117" x="284" y="386" width="36" height="37" xoffset="0" yoffset="52" xadvance="40" /><!-- u -->'+
    '<char id="118" x="283" y="512" width="36" height="37" xoffset="0" yoffset="52" xadvance="40" /><!-- v -->'+
    '<char id="119" x="66" y="320" width="47" height="37" xoffset="0" yoffset="52" xadvance="51" /><!-- w -->'+
    '<char id="120" x="336" y="64" width="33" height="37" xoffset="0" yoffset="52" xadvance="37" /><!-- x -->'+
    '<char id="121" x="382" y="309" width="33" height="51" xoffset="0" yoffset="52" xadvance="37" /><!-- y -->'+
    '<char id="122" x="333" y="512" width="33" height="37" xoffset="0" yoffset="52" xadvance="37" /><!-- z -->'+
    '<char id="123" x="475" y="322" width="24" height="65" xoffset="0" yoffset="38" xadvance="28" /><!-- { -->'+
    '<char id="124" x="547" y="137" width="10" height="64" xoffset="0" yoffset="39" xadvance="14" /><!-- | -->'+
    '<char id="125" x="479" y="23" width="24" height="65" xoffset="0" yoffset="38" xadvance="28" /><!-- } -->'+
    '<char id="126" x="127" y="333" width="29" height="13" xoffset="0" yoffset="58" xadvance="33" /><!-- ~ -->'+
    '<char id="199" x="79" y="0" width="44" height="63" xoffset="0" yoffset="39" xadvance="48" /><!-- Ç -->'+
    '<char id="213" x="0" y="475" width="52" height="63" xoffset="0" yoffset="26" xadvance="56" /><!-- Õ -->'+
    '<char id="211" x="0" y="397" width="52" height="64" xoffset="0" yoffset="25" xadvance="56" /><!-- Ó -->'+
    '<char id="231" x="334" y="320" width="34" height="50" xoffset="0" yoffset="52" xadvance="38" /><!-- ç -->'+
    '<char id="237" x="515" y="256" width="17" height="50" xoffset="0" yoffset="39" xadvance="21" /><!-- í -->'+
    '<char id="227" x="186" y="269" width="38" height="49" xoffset="0" yoffset="40" xadvance="42" /><!-- ã -->'+
    '<char id="243" x="189" y="0" width="38" height="50" xoffset="0" yoffset="39" xadvance="42" /><!-- ó -->'+
    '<char id="234" x="234" y="64" width="38" height="50" xoffset="0" yoffset="39" xadvance="42" /><!-- ê -->'+
    '<char id="233" x="238" y="257" width="38" height="50" xoffset="0" yoffset="39" xadvance="42" /><!-- é -->'+
    '<char id="32" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="23" /><!--   -->'+
    '<char id="9" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="184" /><!-- 	 -->'+
'</chars>'+



'<kernings count="0">'+
    '</kernings>'+
    '</font>';
LQ.BitmapFontLoader = function() {

    var xmlDoc;
    if (window.DOMParser)
    {
        var parser=new DOMParser();
        xmlDoc=parser.parseFromString(LQ.FontString ,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(LQ.FontString );
    }


            var responseXML = xmlDoc;
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

            var textureUrl = this.baseUrl + responseXML.getElementsByTagName('page')[0].getAttribute('file');
            this.texture = GodStep.textures['LiquidFont'].baseTexture;

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
                    yOffset: parseInt(letters[i].getAttribute('yoffset'), 10),
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
};
extend(LQ.BitmapFontLoader, PIXI.BitmapFontLoader);