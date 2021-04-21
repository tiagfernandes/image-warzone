const Jimp = require("jimp");
const moment = require("moment");

const imageSolo = __dirname + "/images/Solo.png";
const imageDuo = __dirname + "/images/Duo.png";
const imageTrio = __dirname + "/images/Trio.png";
const imageQuator = __dirname + "/images/Quatuor.png";

const X_NUMBER_TOP = 480;
const Y_NUMBER_TOP = 292 - 2;
const MAX_WIDTH_NUMBER_TOP = 110;
const MAX_HEIGHT_NUMBER_TOP = 51;

const Y_FIRST_LINE_SOLO = 568 + 2;

const Y_FIRST_LINE_DUO = 545 + 5;
const Y_SECOND_LINE_DUO = 643 + 5;

const Y_FIRST_LINE_TRIO = 515 + 5;
const Y_SECOND_LINE_TRIO = 613 + 5;
const Y_THIRD_LINE_TRIO = 710 + 5;

const Y_FIRST_LINE_QUATUOR = 498 + 2;
const Y_SECOND_LINE_QUATUOR = 596 + 2;
const Y_THIRD_LINE_QUATUOR = 693 + 2;
const Y_FOURTH_LINE_QUATUOR = 791 + 2;

const X_NAME = 222;
const X_KDR = 654;
const X_KILLS = 806;
const X_DEATHS = 962;
const X_HS = 1114;
const X_DAMMAGE_DEALT = 1268;
const X_DAMMAGE_TAKEN = 1424;
const X_REVIVER = 1574;

const X_DATE = 1537;
const Y_DATE = 130;
const MAX_WIDTH_DATE = 285;
const MAX_HEIGHT_DATE = 42;

const X_MODE = 856;
const Y_MODE = 144;
const MAX_WIDTH_MODE = 202;
const MAX_HEIGHT_MODE = 48;

const MAX_WIDTH_NAME = 423;
const MAX_WIDTH_STATS = 131;
const MAX_HEIGHT_LINE = 71;

function unixTime(unixtime) {
    return moment(unixtime * 1000).format("D/MM/YY hh:mm:ss")
    var d = new Date(unixtime * 1000);
    return d.toLocaleString("en-GB");
}

const generateImageMatch = (data) => {
    let loadedImage;
    let image = null;
    switch (data.players.length) {
        case 1:
            image = imageSolo;
            break;
        case 2:
            image = imageDuo;
            break;
        case 3:
            image = imageTrio;
            break;
        case 4:
            image = imageQuator;
            break;
    }

    return Jimp.read(image)
        .then(async function (img) {
            loadedImage = img;

            const HELVETICA_NEUE_95_BLACK = await Jimp.loadFont(
                __dirname + "/fonts/HELVETICA_NEUE_95_BLACK.fnt"
            );

            const HELVETICA_NEUE_95_BRONZE = await Jimp.loadFont(
                __dirname + "/fonts/HELVETICA_NEUE_95_BRONZE.fnt"
            );

            const HELVETICA_NEUE_95_SILVER = await Jimp.loadFont(
                __dirname + "/fonts/HELVETICA_NEUE_95_SILVER.fnt"
            );

            const HELVETICA_NEUE_95_GOLD = await Jimp.loadFont(
                __dirname + "/fonts/HELVETICA_NEUE_95_GOLD.fnt"
            );

            const HELVETICA_NEUE_53_EXTENDED = await Jimp.loadFont(
                __dirname + "/fonts/HELVETICA_NEUE_53_EXTENDED.fnt"
            );

            const HELVETICA_NEUE_LT_STD_83_HEAVY_EXTENDED = await Jimp.loadFont(
                __dirname + "/fonts/HELVETICA_NEUE_LT_STD_83_HEAVY_EXTENDED.fnt"
            );

            const HELVETICA_NEUE_53_EXTENDED_DATE = await Jimp.loadFont(
                __dirname + "/fonts/HELVETICA_NEUE_53_EXTENDED_DATE.fnt"
            );

            const HELVETICA_NEUE_53_EXTENDED_MODE = await Jimp.loadFont(
                __dirname + "/fonts/HELVETICA_NEUE_53_EXTENDED_MODE.fnt"
            );

            const frontTop = (top) => {
                switch (top) {
                    case 1:
                        return HELVETICA_NEUE_95_GOLD;
                    case 2:
                        return HELVETICA_NEUE_95_SILVER;
                    case 3:
                        return HELVETICA_NEUE_95_BRONZE;
                    default:
                        return HELVETICA_NEUE_95_BLACK;
                }
            };

            loadedImage
                //NUMBER TOP
                .print(
                    frontTop(data.top),
                    X_NUMBER_TOP,
                    Y_NUMBER_TOP,
                    {
                        text: data.top.toString(),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_NUMBER_TOP,
                    MAX_HEIGHT_NUMBER_TOP
                )
                //MATCH ENDED
                .print(
                    HELVETICA_NEUE_53_EXTENDED_DATE,
                    X_DATE,
                    Y_DATE,
                    {
                        text: unixTime(data.matchEnded),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_DATE,
                    MAX_HEIGHT_DATE
                )
                //MODE GAME
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_MODE,
                    Y_MODE,
                    {
                        text: data.mode,
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_MODE,
                    MAX_HEIGHT_MODE
                );

            data.players.forEach((player, index) => {
                let y = Y_FIRST_LINE_SOLO;

                switch (data.players.length) {
                    case 1:
                        y = Y_FIRST_LINE_SOLO;
                        break;
                    case 2:
                        y =
                            index === 0
                                ? Y_FIRST_LINE_DUO
                                : index === 1
                                ? Y_SECOND_LINE_DUO
                                : Y_FIRST_LINE_DUO;
                        break;
                    case 3:
                        y =
                            index === 0
                                ? Y_FIRST_LINE_TRIO
                                : index === 1
                                ? Y_SECOND_LINE_TRIO
                                : index === 2
                                ? Y_THIRD_LINE_TRIO
                                : Y_FIRST_LINE_TRIO;
                        break;
                    case 4:
                        y =
                            index === 0
                                ? Y_FIRST_LINE_QUATUOR
                                : index === 1
                                ? Y_SECOND_LINE_QUATUOR
                                : index === 2
                                ? Y_THIRD_LINE_QUATUOR
                                : index === 3
                                ? Y_FOURTH_LINE_QUATUOR
                                : Y_FIRST_LINE_QUATUOR;
                        break;
                }

                loadedImage
                    //Name
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_NAME,
                        y,
                        {
                            text: player.playerName.toUpperCase(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_NAME,
                        MAX_HEIGHT_LINE
                    )
                    //KDR
                    .print(
                        HELVETICA_NEUE_LT_STD_83_HEAVY_EXTENDED,
                        X_KDR,
                        y,
                        {
                            text: player.kdr.toFixed(2).toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_STATS,
                        MAX_HEIGHT_LINE
                    )
                    //KILLS
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_KILLS,
                        y,
                        {
                            text: player.kills.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_STATS,
                        MAX_HEIGHT_LINE
                    )
                    //DEATHS
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_DEATHS,
                        y,
                        {
                            text: player.deaths.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_STATS,
                        MAX_HEIGHT_LINE
                    )
                    //HS
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_HS,
                        y,
                        {
                            text: player.headshots.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_STATS,
                        MAX_HEIGHT_LINE
                    )
                    //DAMAGE DEALT
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_DAMMAGE_DEALT,
                        y,
                        {
                            text: player.damageDealt.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_STATS,
                        MAX_HEIGHT_LINE
                    )
                    //DAMAGE TAKEN
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_DAMMAGE_TAKEN,
                        y,
                        {
                            text: player.damageTaken.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_STATS,
                        MAX_HEIGHT_LINE
                    )
                    //REVIVER
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_REVIVER,
                        y,
                        {
                            text: player.reviver.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_STATS,
                        MAX_HEIGHT_LINE
                    );
            });
            return;
        })
        .then(async () => {
            return await loadedImage.getBufferAsync(Jimp.MIME_PNG);
        })
        .catch(function (err) {
            console.error(err);
        });
};

module.exports = generateImageMatch;
