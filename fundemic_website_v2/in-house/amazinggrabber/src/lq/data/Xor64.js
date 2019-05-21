    GodStep.Xor64 = function () {
    };
    extend(GodStep.Xor64, Object);

    GodStep.Xor64.xor = function(str, key) {
        var result = '';

        for (var i = 0; i < str.length; i++) {
            if (i > (key.length - 1)) {
                key += key;
            }
            result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i));
        }

        return result;
    };
    GodStep.Xor64.encode = function(str, pwd) {
        return GodStep.Base64.encode(GodStep.Xor64.xor(str, pwd));
    };

    GodStep.Xor64.decode = function(str, pwd) {
        return GodStep.Xor64.xor(GodStep.Base64.decode(str), pwd);
    };

