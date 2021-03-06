const Jimp = require("jimp");
const moment = require("moment");
const ta = require("time-ago");

const imageSolo = __dirname + "/images/Solo.png";
const imageDuo = __dirname + "/images/Duo.png";
const imageTrio = __dirname + "/images/Trio.png";
const imageQuator = __dirname + "/images/Quatuor.png";
const imageStats = __dirname + "/images/Stats.png";

//TRACK
const X_TRACK_NUMBER_TOP = 420;
const Y_TRACK_NUMBER_TOP = 272;
const MAX_WIDTH_TRACK_NUMBER_TOP = 219;
const MAX_HEIGHT_TRACK_NUMBER_TOP = 92;

const Y_TRACK_FIRST_LINE_SOLO = 570;

const Y_TRACK_FIRST_LINE_DUO = 550;
const Y_TRACK_SECOND_LINE_DUO = 648;

const Y_TRACK_FIRST_LINE_TRIO = 520;
const Y_TRACK_SECOND_LINE_TRIO = 618;
const Y_TRACK_THIRD_LINE_TRIO = 715;

const Y_TRACK_FIRST_LINE_QUATUOR = 500;
const Y_TRACK_SECOND_LINE_QUATUOR = 598;
const Y_THIRD_LINE_QUATUOR = 695;
const Y_TRACK_FOURTH_LINE_QUATUOR = 793;

const X_TRACK_NAME = 222;
const X_TRACK_KDR = 654;
const X_TRACK_KILLS = 806;
const X_TRACK_DEATHS = 962;
const X_TRACK_HS = 1114;
const X_TRACK_DAMMAGE_DEALT = 1268;
const X_TRACK_DAMMAGE_TAKEN = 1424;
const X_TRACK_REVIVER = 1574;

const X_TRACK_DATE = 1530;
const Y_TRACK_DATE = 130;
const MAX_WIDTH_TRACK_DATE = 285;
const MAX_HEIGHT_TRACK_DATE = 42;

const X_TRACK_MODE = 856;
const Y_TRACK_MODE = 144;
const MAX_WIDTH_TRACK_MODE = 202;
const MAX_HEIGHT_TRACK_MODE = 48;

const MAX_WIDTH_TRACK_NAME = 423;
const MAX_WIDTH_TRACK_STATS = 131;
const MAX_HEIGHT_TRACK_LINE = 71;

//STATS
const MAX_HEIGHT_STATS = 35;
const MAX_WIDTH_STATS = 250;

//PSEUDO
const X_STATS_PSEUDO = 855;
const Y_STATS_PSEUDO = 150;
const MAX_WIDTH_STATS_PSEUDO = 210;
const MAX_HEIGHT_STATS_PSEUDO = 48;

//COMPARETO
const X_STATS_COMPAREDATE = 1365;
const Y_STATS_COMPAREDATE = 110;
const MAX_WIDTH_STATS_COMPAREDATE = 400;
const MAX_HEIGHT_STATS_COMPAREDATE = 48;

//CAREER
const X_STATS_TIMEPLAYED = 935;
const MAX_WIDTH_STATS_TIMEPLAYED = 380;
const X_STATS_GAMESPLAYED = 1311;
const X_STATS_WINPERCENTAGE = 1510;
const X_STATS_WINPERCENTAGE_PICTO = 1480;
const Y_STATS_WINPERCENTAGE_PICTO = 415;

const Y_STATS_CAREER = 415;

//WINS
const X_STATS_TOTALWINS = 936;
const X_STATS_TOTALWINS_PICTO = 905;
const Y_STATS_TOTALWINS_PICTO = 640;
const X_STATS_TOP5 = 1120;
const X_STATS_TOP10 = 1310;
const X_STATS_TOP25 = 1511;

const Y_STATS_WINS = 640;

//PERFORMANCE
const X_STATS_KILLS = 932;
const X_STATS_DEATHS = 1115;
const X_STATS_KDR = 1307;
const X_STATS_KDR_PICTO = 1275;
const Y_STATS_KDR_PICTO = 860;
const X_STATS_KILLPERGAME = 1510;
const X_STATS_KILLPERGAME_PICTO = 1480;
const Y_STATS_KILLPERGAME_PICTO = 860;

const Y_STATS_PERFORMANCE = 860;

function secondsToHrs(seconds) {
    seconds = Number(seconds);

    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);

    var hoursDisplay = hours > 0 ? hours + (hours == 1 ? " hour, " : " hours, ") : "";
    var minutesDisplay = minutes > 0 ? minutes + (minutes == 1 ? " min, " : " mins") : "";

    return hoursDisplay + minutesDisplay;
}

function unixTime(unixtime) {
    return moment(unixtime * 1000).format("D/MM/YY HH:mm:ss");
}

const generateImageMatch = (data) => {
    let loadedImage;
    let image = null;

    let players = data.players.sort((a, b) =>
        a.kdr > b.kdr ? -1 : b.kdr > a.kdr ? 1 : 0
    );
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
                    X_TRACK_NUMBER_TOP,
                    Y_TRACK_NUMBER_TOP,
                    {
                        text: data.top ? data.top.toString() : 0,
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_TRACK_NUMBER_TOP,
                    MAX_HEIGHT_TRACK_NUMBER_TOP
                )
                //MATCH ENDED
                .print(
                    HELVETICA_NEUE_53_EXTENDED_DATE,
                    X_TRACK_DATE,
                    Y_TRACK_DATE,
                    {
                        text: unixTime(data.matchEnded),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_TRACK_DATE,
                    MAX_HEIGHT_TRACK_DATE
                )
                //MODE GAME
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_TRACK_MODE,
                    Y_TRACK_MODE,
                    {
                        text: data.mode,
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_TRACK_MODE,
                    MAX_HEIGHT_TRACK_MODE
                );

            players.forEach((player, index) => {
                let y = Y_TRACK_FIRST_LINE_SOLO;

                switch (players.length) {
                    case 1:
                        y = Y_TRACK_FIRST_LINE_SOLO;
                        break;
                    case 2:
                        y =
                            index === 0
                                ? Y_TRACK_FIRST_LINE_DUO
                                : index === 1
                                ? Y_TRACK_SECOND_LINE_DUO
                                : Y_TRACK_FIRST_LINE_DUO;
                        break;
                    case 3:
                        y =
                            index === 0
                                ? Y_TRACK_FIRST_LINE_TRIO
                                : index === 1
                                ? Y_TRACK_SECOND_LINE_TRIO
                                : index === 2
                                ? Y_TRACK_THIRD_LINE_TRIO
                                : Y_TRACK_FIRST_LINE_TRIO;
                        break;
                    case 4:
                        y =
                            index === 0
                                ? Y_TRACK_FIRST_LINE_QUATUOR
                                : index === 1
                                ? Y_TRACK_SECOND_LINE_QUATUOR
                                : index === 2
                                ? Y_THIRD_LINE_QUATUOR
                                : index === 3
                                ? Y_TRACK_FOURTH_LINE_QUATUOR
                                : Y_TRACK_FIRST_LINE_QUATUOR;
                        break;
                }

                loadedImage
                    //Name
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_TRACK_NAME,
                        y,
                        {
                            text: player.playerName.toUpperCase(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_TRACK_NAME,
                        MAX_HEIGHT_TRACK_LINE
                    )
                    //KDR
                    .print(
                        HELVETICA_NEUE_LT_STD_83_HEAVY_EXTENDED,
                        X_TRACK_KDR,
                        y,
                        {
                            text: player.kdr.toFixed(2).toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_TRACK_STATS,
                        MAX_HEIGHT_TRACK_LINE
                    )
                    //KILLS
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_TRACK_KILLS,
                        y,
                        {
                            text: player.kills.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_TRACK_STATS,
                        MAX_HEIGHT_TRACK_LINE
                    )
                    //DEATHS
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_TRACK_DEATHS,
                        y,
                        {
                            text: player.deaths.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_TRACK_STATS,
                        MAX_HEIGHT_TRACK_LINE
                    )
                    //HS
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_TRACK_HS,
                        y,
                        {
                            text: player.headshots.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_TRACK_STATS,
                        MAX_HEIGHT_TRACK_LINE
                    )
                    //DAMAGE DEALT
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_TRACK_DAMMAGE_DEALT,
                        y,
                        {
                            text: player.damageDealt.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_TRACK_STATS,
                        MAX_HEIGHT_TRACK_LINE
                    )
                    //DAMAGE TAKEN
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_TRACK_DAMMAGE_TAKEN,
                        y,
                        {
                            text: player.damageTaken.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_TRACK_STATS,
                        MAX_HEIGHT_TRACK_LINE
                    )
                    //REVIVER
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_TRACK_REVIVER,
                        y,
                        {
                            text: player.reviver.toString(),
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        MAX_WIDTH_TRACK_STATS,
                        MAX_HEIGHT_TRACK_LINE
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

/**
 * @param {any} value1
 * @param {any} value1
 * @param {boolean} isFloatValues
 * @param {boolean} withPourcentage
 */
const getCompareValue = (
    value1,
    value2 = null,
    isFloatValues = false,
    withPourcentage = false
) => {
    const a =
        (isFloatValues ? value1.toFixed(2) : value1.toString()) +
        (withPourcentage ? "%" : "");

    if (value2) {
        const b =
            (isFloatValues
                ? (value1 - value2).toFixed(2)
                : (value1 - value2).toString()) + (withPourcentage ? "%" : "");
        if (value1 < value2) {
            return a + "(" + b + ")";
        } else if (value1 == value2) {
            return a;
        } else if (value1 > value2) {
            return a + "(+" + b + ")";
        }
    }

    return a;
};

const difNewOld = (value1, value2) => {
    if (value1 < value2) {
        return -1;
    } else if (value1 == value2) {
        return 0;
    } else if (value1 > value2) {
        return 1;
    }
};

const generateImageStats = (data) => {
    let loadedImage;
    let image = imageStats;

    return Jimp.read(image)
        .then(async function (img) {
            loadedImage = img;

            const HELVETICA_NEUE_LT_COM_76_BOLD_ITALIC_V2_STATS =
                await Jimp.loadFont(
                    __dirname +
                        "/fonts/HELVETICA_NEUE_LT_COM_76_BOLD_ITALIC_V2_STATS.fnt"
                );

            const HELVETICA_NEUE_53_EXTENDED_MODE = await Jimp.loadFont(
                __dirname + "/fonts/HELVETICA_NEUE_53_EXTENDED_MODE.fnt"
            );

            const STATS_UP = await Jimp.read(__dirname + "/images/Stats_up.png");
            const STATS_DOWN = await Jimp.read(
                __dirname + "/images/Stats_down.png"
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
                );
            if (data.oldStats) {
                //COMPARETO
                loadedImage.print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_COMPAREDATE,
                    Y_STATS_COMPAREDATE,
                    {
                        text:
                            "Compare to : " + ta.ago(data.oldStats.dateInsert),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS_COMPAREDATE,
                    MAX_HEIGHT_STATS_COMPAREDATE
                );
            }
            //TIMEPLAYED
            loadedImage
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_TIMEPLAYED,
                    Y_STATS_CAREER,
                    {
                        text: secondsToHrs(data.newStats.timePlayed),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
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
                        text: getCompareValue(
                            data.newStats.gamesPlayed,
                            data.oldStats ? data.oldStats.gamesPlayed : null
                        ),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS,
                    MAX_HEIGHT_STATS
                );
            //WINPERCENTAGE
            if (data.oldStats) {
                const dif = difNewOld(
                    (data.newStats.wins / data.newStats.gamesPlayed) * 100,
                    (data.oldStats.wins / data.oldStats.gamesPlayed) * 100
                );

                if (dif == -1) {
                    loadedImage.blit(
                        STATS_DOWN,
                        X_STATS_WINPERCENTAGE_PICTO,
                        Y_STATS_WINPERCENTAGE_PICTO
                    );
                } else if (dif == 1) {
                    loadedImage.blit(
                        STATS_UP,
                        X_STATS_WINPERCENTAGE_PICTO,
                        Y_STATS_WINPERCENTAGE_PICTO
                    );
                }
            }
            loadedImage.print(
                HELVETICA_NEUE_53_EXTENDED_MODE,
                X_STATS_WINPERCENTAGE,
                Y_STATS_CAREER,
                {
                    text: getCompareValue(
                        (data.newStats.wins / data.newStats.gamesPlayed) * 100,
                        data.oldStats
                            ? (data.oldStats.wins / data.oldStats.gamesPlayed) *
                                  100
                            : null,
                        true,
                        true
                    ),
                    alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                },
                MAX_WIDTH_STATS,
                MAX_HEIGHT_STATS
            );

            if (data.oldStats) {
                const dif = difNewOld(data.newStats.wins, data.oldStats.wins);

                if (dif == 1) {
                    loadedImage.blit(
                        STATS_UP,
                        X_STATS_TOTALWINS_PICTO,
                        Y_STATS_TOTALWINS_PICTO
                    );
                }
            }
            //TOTALWINS
            loadedImage
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_TOTALWINS,
                    Y_STATS_WINS,
                    {
                        text: getCompareValue(
                            data.newStats.wins,
                            data.oldStats ? data.oldStats.wins : null
                        ),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS,
                    MAX_HEIGHT_STATS
                )
                //TOP5
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_TOP5,
                    Y_STATS_WINS,
                    {
                        text: getCompareValue(
                            data.newStats.topFive,
                            data.oldStats ? data.oldStats.topFive : null
                        ),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS,
                    MAX_HEIGHT_STATS
                )
                //TOP10
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_TOP10,
                    Y_STATS_WINS,
                    {
                        text: getCompareValue(
                            data.newStats.topTen,
                            data.oldStats ? data.oldStats.topTen : null
                        ),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS,
                    MAX_HEIGHT_STATS
                )
                //TOP25
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_TOP25,
                    Y_STATS_WINS,
                    {
                        text: getCompareValue(
                            data.newStats.topTwentyFive,
                            data.oldStats ? data.oldStats.topTwentyFive : null
                        ),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS,
                    MAX_HEIGHT_STATS
                )
                //KILLS
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_KILLS,
                    Y_STATS_PERFORMANCE,
                    {
                        text: getCompareValue(
                            data.newStats.kills,
                            data.oldStats ? data.oldStats.kills : null
                        ),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS,
                    MAX_HEIGHT_STATS
                )
                //DEATHS
                .print(
                    HELVETICA_NEUE_53_EXTENDED_MODE,
                    X_STATS_DEATHS,
                    Y_STATS_PERFORMANCE,
                    {
                        text: getCompareValue(
                            data.newStats.deaths,
                            data.oldStats ? data.oldStats.deaths : null
                        ),
                        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    MAX_WIDTH_STATS,
                    MAX_HEIGHT_STATS
                );
            //KDR
            if (data.oldStats) {
                const dif = difNewOld(
                    data.newStats.kdRatio,
                    data.oldStats.kdRatio
                );

                if (dif == -1) {
                    loadedImage.blit(
                        STATS_DOWN,
                        X_STATS_KDR_PICTO,
                        Y_STATS_KDR_PICTO
                    );
                } else if (dif == 1) {
                    loadedImage.blit(
                        STATS_UP,
                        X_STATS_KDR_PICTO,
                        Y_STATS_KDR_PICTO
                    );
                }
            }
            loadedImage.print(
                HELVETICA_NEUE_53_EXTENDED_MODE,
                X_STATS_KDR,
                Y_STATS_PERFORMANCE,
                {
                    text: getCompareValue(
                        data.newStats.kdRatio,
                        data.oldStats ? data.oldStats.kdRatio : null,
                        true
                    ),
                    alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                },
                MAX_WIDTH_STATS,
                MAX_HEIGHT_STATS
            );
            //KILLPERGAME
            if (data.oldStats) {
                const dif = difNewOld(
                    data.newStats.kills / data.newStats.gamesPlayed,
                    data.oldStats.kills / data.oldStats.gamesPlayed
                );

                if (dif == -1) {
                    loadedImage.blit(
                        STATS_DOWN,
                        X_STATS_KILLPERGAME_PICTO,
                        Y_STATS_KILLPERGAME_PICTO
                    );
                } else if (dif == 1) {
                    loadedImage.blit(
                        STATS_UP,
                        X_STATS_KILLPERGAME_PICTO,
                        Y_STATS_KILLPERGAME_PICTO
                    );
                }
            }
            loadedImage.print(
                HELVETICA_NEUE_53_EXTENDED_MODE,
                X_STATS_KILLPERGAME,
                Y_STATS_PERFORMANCE,
                {
                    text: getCompareValue(
                        data.newStats.kills / data.newStats.gamesPlayed,
                        data.oldStats
                            ? data.oldStats.kills / data.oldStats.gamesPlayed
                            : null,
                        true
                    ),
                    alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                },
                MAX_WIDTH_STATS,
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
};

module.exports = {
    generateImageStats,
    generateImageMatch,
};
