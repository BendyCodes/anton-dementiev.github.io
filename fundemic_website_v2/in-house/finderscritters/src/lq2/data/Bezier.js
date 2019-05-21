    GodStep.Bezier = function(start, control, end, isSegment) {
        this.start = start || new PIXI.Point();
        this.control = control || new PIXI.Point();
        this.end = end || new PIXI.Point();
        this.isSegment = Boolean(isSegment);
    };

    GodStep.Bezier.PRECISION = 1e-10;

    pro = GodStep.Bezier.prototype = Object.create(Object.prototype);
    pro.startToControlVector = function() {
        return new PIXI.Point(this.control.x - this.start.x, this.control.y - this.start.y);
    };
    pro.diagonalVector = function() {
        return new PIXI.Point(this.start.x - 2 * this.control.x + this.end.x, this.start.y - 2 * this.control.y + this.end.y);
    };
    pro.getLength = function() {
        return this.getSegmentLength(1);
    };
    pro.getSegmentLength = function(time) {
        var startToControlVector = this.startToControlVector();
        var diagonalVector = this.diagonalVector();

        var startToControlLenght = GodStep.Point.getLength(startToControlVector);
        var startToControlLenghtPower2 = startToControlLenght * startToControlLenght;
        var controlToStartMultiplyMainDiagonal = 2 * (startToControlVector.x * diagonalVector.x + startToControlVector.y * diagonalVector.y);
        var diagonalLenght = GodStep.Point.getLength(diagonalVector);
        var diagonalLenghtPower2 = diagonalLenght * diagonalLenght;

        var integralValueInTime;
        var integralValueInZero;

        if (diagonalLenght == 0) {
            integralValueInTime = 2 * diagonalLenght * time;
            integralValueInZero = 0;
        } else {
            var integralFrequentPart1 = Math.sqrt(diagonalLenghtPower2 * time * time + controlToStartMultiplyMainDiagonal * time + startToControlLenghtPower2);
            var integralFrequentPart2 = (controlToStartMultiplyMainDiagonal + 2 * diagonalLenghtPower2 * time) / diagonalLenght + 2 * integralFrequentPart1;
            var integralFrequentPart3 = controlToStartMultiplyMainDiagonal / diagonalLenght + 2 * startToControlLenght;
            var integralFrequentPart4 = (startToControlLenghtPower2 - 0.25 * controlToStartMultiplyMainDiagonal * controlToStartMultiplyMainDiagonal / diagonalLenghtPower2);

            integralValueInTime = 0.5 * (2 * diagonalLenghtPower2 * time + controlToStartMultiplyMainDiagonal) * integralFrequentPart1 / diagonalLenghtPower2;
            if (Math.abs(integralFrequentPart2) >= GodStep.Bezier.PRECISION) {
                integralValueInTime += Math.log(integralFrequentPart2) / diagonalLenght * integralFrequentPart4;
            }

            integralValueInZero = 0.5 * (controlToStartMultiplyMainDiagonal) * startToControlLenght / diagonalLenghtPower2;
            if (Math.abs(integralFrequentPart3) >= GodStep.Bezier.PRECISION) {
                integralValueInZero += Math.log(integralFrequentPart3) / diagonalLenght * integralFrequentPart4;
            }
        }

        return integralValueInTime - integralValueInZero;
    };
    pro.getPoint = function(time, point) {
        if (isNaN(time)) {
            return null;
        }
        point = point || new PIXI.Point();
        var  invertedTime = 1 - time;
        var timePower2 = time * time;
        var invertedTimePower2  = invertedTime * invertedTime;

        point.x = invertedTimePower2 * this.start.x + 2 * time * invertedTime * this.control.x + timePower2 * this.end.x;
        point.y = invertedTimePower2 * this.start.y + 2 * time * invertedTime * this.control.y + timePower2 * this.end.y;
        return point;
    };