const Jimp = require("jimp");
const moment = require("moment");

const imageSolo = __dirname + "/images/Solo.png";
const imageDuo = __dirname + "/images/Duo.png";
const imageTrio = __dirname + "/images/Trio.png";
const imageQuator = __dirname + "/images/Quatuor.png";
const imageStats = __dirname + "/images/Stats.png";

const X_NUMBER_TOP = 420;
const Y_NUMBER_TOP = 272;
const MAX_WIDTH_NUMBER_TOP = 219;
const MAX_HEIGHT_NUMBER_TOP = 92;

const Y_FIRST_LINE_SOLO = 570;

const Y_FIRST_LINE_DUO = 550;
const Y_SECOND_LINE_DUO = 648;

const Y_FIRST_LINE_TRIO = 520;
const Y_SECOND_LINE_TRIO = 618;
const Y_THIRD_LINE_TRIO = 715;

const Y_FIRST_LINE_QUATUOR = 500;
const Y_SECOND_LINE_QUATUOR = 598;
const Y_THIRD_LINE_QUATUOR = 695;
const Y_FOURTH_LINE_QUATUOR = 793;

const X_NAME = 222;
const X_KDR = 654;
const X_KILLS = 806;
const X_DEATHS = 962;
const X_HS = 1114;
const X_DAMMAGE_DEALT = 1268;
const X_DAMMAGE_TAKEN = 1424;
const X_REVIVER = 1574;

const X_DATE = 1530;
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

const X_STATS_PSEUDO = 858;
const Y_STATS_PSEUDO = 150;
const MAX_WIDTH_STATS_PSEUDO = 202;
const MAX_HEIGHT_STATS_PSEUDO = 48;

const X_STATS_TIMEPLAYED = 890;
const MAX_WIDTH_STATS_TIMEPLAYED = 380;
const X_STATS_GAMESPLAYED = 1295;
const X_STATS_WINPERCENTAGE = 1505;

const Y_STATS_CAREER = 415;

const X_STATS_TOTALWINS = 915;
const X_STATS_TOP5 = 1075;
const X_STATS_TOP10 = 1273;
const X_STATS_TOP25 = 1475;

const Y_STATS_WINS = 640;

const X_STATS_KILLS = 883;
const X_STATS_DEATHS = 1078;
const X_STATS_KDR = 1262;
const X_STATS_KILLPERGAME = 1490;

const Y_STATS_PERFORMANCE = 860;

const MAX_HEIGHT_STATS = 35;
const MAX_WIDTH_STATS_BIS = 140;


function secondsToDhm(seconds) {
    seconds = Number(seconds);
    
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins") : "";
    
    return dDisplay + hDisplay + mDisplay;
}

function unixTime(unixtime) {
    return moment(unixtime * 1000).format("D/MM/YY HH:mm:ss")
}

const generateImageMatch = (data) => {
    let loadedImage;
    let image = null;

    let players = data.players.sort((a,b) => (a.kdr > b.kdr) ? -1 : ((b.kdr > a.kdr) ? 1 : 0))
    switch (players.length) {
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
                        text: data.top ? data.top.toString() : 0,
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

            players.forEach((player, index) => {
                let y = Y_FIRST_LINE_SOLO;

                switch (players.length) {
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
}

const generateImageStats = (data) => {
    let loadedImage;
    let image = imageStats;

    return Jimp.read(image)
        .then(async function (img) {
            loadedImage = img;

            const HELVETICA_NEUE_LT_COM_76_BOLD_ITALIC_V2_STATS = await Jimp.loadFont(
                __dirname + "/fonts/HELVETICA_NEUE_LT_COM_76_BOLD_ITALIC_V2_STATS.fnt"
            );

            const HELVETICA_NEUE_53_EXTENDED_MODE = await Jimp.loadFont(
                __dirname + "/fonts/HELVETICA_NEUE_53_EXTENDED_MODE.fnt"
            );

            loadedImage
                //PSEUDO
                .print(
                    HELVETICA_NEUE_LT_COM_76_BOLD_ITALIC_V2_STATS,
                    X_STATS_PSEUDO,
                    Y_STATS_PSEUDO,
                    {
                        text: data.pseudo,
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_PSEUDO,
                    MAX_HEIGHT_STATS_PSEUDO
                )
                //TIMEPLAYED
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_TIMEPLAYED,
                    Y_STATS_CAREER,
                    {
                        text: secondsToDhm(data.timePlayed),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_TIMEPLAYED,
                    MAX_HEIGHT_STATS
                )
                //GAMEPLAYED
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_GAMESPLAYED,
                    Y_STATS_CAREER,
                    {
                        text: data.gamesPlayed.toString(),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_BIS,
                    MAX_HEIGHT_STATS
                )
                //WINPERCENTAGE
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_WINPERCENTAGE,
                    Y_STATS_CAREER,
                    {
                        text: (data.wins / data.gamesPlayed * 100).toFixed(2) + '%',
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_BIS,
                    MAX_HEIGHT_STATS
                )
                //TOTALWINS
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_TOTALWINS,
                    Y_STATS_WINS,
                    {
                        text: data.wins.toString(),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_BIS,
                    MAX_HEIGHT_STATS
                )
                //TOP5
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_TOP5,
                    Y_STATS_WINS,
                    {
                        text: data.topFive.toString(),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_BIS,
                    MAX_HEIGHT_STATS
                )
                //TOP10
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_TOP10,
                    Y_STATS_WINS,
                    {
                        text: data.topTen.toString(),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_BIS,
                    MAX_HEIGHT_STATS
                )
                //TOP25
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_TOP25,
                    Y_STATS_WINS,
                    {
                        text: data.topTwentyFive.toString(),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_BIS,
                    MAX_HEIGHT_STATS
                )
                //KILLS
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_KILLS,
                    Y_STATS_PERFORMANCE,
                    {
                        text: data.kills.toString(),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_BIS,
                    MAX_HEIGHT_STATS
                )
                //DEATHS
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_DEATHS,
                    Y_STATS_PERFORMANCE,
                    {
                        text: data.deaths.toString(),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_BIS,
                    MAX_HEIGHT_STATS
                )
                //KDR
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_KDR,
                    Y_STATS_PERFORMANCE,
                    {
                        text: data.kdRatio.toFixed(2),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_BIS,
                    MAX_HEIGHT_STATS
                )
                //KILLPERGAME
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_KILLPERGAME,
                    Y_STATS_PERFORMANCE,
                    {
                        text: (data.kills / data.gamesPlayed).toFixed(0),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_BIS,
                    MAX_HEIGHT_STATS
                );
            return;
        })
        .then(async () => {
            return await loadedImage.getBufferAsync(Jimp.MIME_PNG);
        })
        .catch(function (err) {
            console.error(err);
        });
}

module.exports = {
    generateImageStats,
    generateImageMatch
};
