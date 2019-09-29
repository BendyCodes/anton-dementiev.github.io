module src {
    export class Constants {

        public static CANDY_ANIMATION_BASE_DELAY: number = 100;
        public static CANDY_ANIMATION_BASE_DURATION: number = 200;
        public static CANDY_FALLDOWN1CELL_BASE_DURATION: number = 175;

        public static KIND_MATCH_ELEMENTS: string = 'element_matcher_';
        public static KIND_GOLD: string = 'element_gold_';
        public static KIND_COIN: string = 'element_coin_';
        public static KIND_CLEAN_COLUMN: string = 'element_cleanColumn_';
        public static KIND_CLEAN_ROW: string = 'element_cleanRow_';
        public static KIND_CLEAN_COLUMN_AND_ROW: string = 'element_cleanColumnAndRow_';

        //can change difficulty level
        public static MATCHING_ELEMENTS:Array<string> = ["element_matcher_0_","element_matcher_1_","element_matcher_2_","element_matcher_3_","element_matcher_4_","element_matcher_5_", "element_matcher_6_"];
        public static SIMILARITY_LEVEL_PROBABILITY:number = 0.03;
        public static TOTAL_BUILDING_SIMILARITY_LEVEL_PROBABILITY:number = 0.06;

        public static LEVELS_DATA:Object[] = [
            null,
            {
                "-objects": [0,1,2,3,4],
                "-time": "300",
                "line": [
                    "	1	1	1	1	1	1	",
                    "	1	1	1	1	1	1	",
                    "	1	1	1	1	1	1	",
                    "	1	1	1	1	1	1	",
                    "	1	1	1	1	1	1	",
                    "	1	1	1	1	1	1	"
                ]
            }
        ];
    }
}