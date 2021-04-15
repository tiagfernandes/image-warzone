const Jimp = require("jimp");

const imageSolo = "./images/Solo.png";
const imageDuo = "./images/Duo.png";
const imageTrio = "./images/Trio.png";
const imageQuator = "./images/Quatuor.png";

let loadedImage;

const X_NUMBER_TOP = 480;
const Y_NUMBER_TOP = 292;
const MAX_WIDTH_NUMBER_TOP = 110;
const MAX_HEIGHT_NUMBER_TOP = 51;

const Y_FIRST_LINE_SOLO = 568;

const Y_FIRST_LINE_DUO = 545;
const Y_SECOND_LINE_DUO = 643;

const Y_FIRST_LINE_TRIO = 515;
const Y_SECOND_LINE_TRIO = 613;
const Y_THIRD_LINE_TRIO = 710;

const Y_FIRST_LINE_QUATUOR = 498;
const Y_SECOND_LINE_QUATUOR = 596;
const Y_THIRD_LINE_QUATUOR = 693;
const Y_FOURTH_LINE_QUATUOR = 791;

const X_NAME = 222;
const X_KDR = 654;
const X_KILLS = 806;
const X_DEATHS = 962;
const X_HS = 1114;
const X_DAMMAGE_DEALT = 1268;
const X_DAMMAGE_TAKEN = 1424;
const X_REVIVER = 1574;

const MAX_WIDTH_NAME = 423;
const MAX_WIDTH_STATS = 131;
const MAX_HEIGHT_LINE = 71;

function unixTime(unixtime) {
    var d = new Date(unixtime * 1000);
    return d.toLocaleString("en-GB");
}

const generateImageMatch = (data) => {
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
        .then(async function (image) {
            loadedImage = image;

            const HELVETICA_NEUE_95_BLACK = await Jimp.loadFont(
                "./fonts/HELVETICA_NEUE_95_BLACK.fnt"
            );

            const HELVETICA_NEUE_95_BRONZE = await Jimp.loadFont(
                "./fonts/HELVETICA_NEUE_95_BRONZE.fnt"
            );

            const HELVETICA_NEUE_95_SILVER = await Jimp.loadFont(
                "./fonts/HELVETICA_NEUE_95_SILVER.fnt"
            );

            const HELVETICA_NEUE_95_GOLD = await Jimp.loadFont(
                "./fonts/HELVETICA_NEUE_95_GOLD.fnt"
            );

            const HELVETICA_NEUE_53_EXTENDED = await Jimp.loadFont(
                "./fonts/HELVETICA_NEUE_53_EXTENDED.fnt"
            );

            const HELVETICA_NEUE_LT_STD_83_HEAVY_EXTENDED = await Jimp.loadFont(
                "./fonts/HELVETICA_NEUE_LT_STD_83_HEAVY_EXTENDED.fnt"
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
                    HELVETICA_NEUE_53_EXTENDED,
                    1400,
                    105,
                    unixTime(data.matchEnded)
                );
                console.log(unixTime(data.matchEnded));

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
                    //FIRST
                    //Name
                    .print(
                        HELVETICA_NEUE_53_EXTENDED,
                        X_NAME,
                        y,
                        {
                            text: player.playerName,
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
            // loadedImage.write(`./images/Quatuor${Math.random()}.png`);
        })
        .then(async () => {
            return await loadedImage.getBufferAsync(Jimp.MIME_PNG);
        })
        .catch(function (err) {
            console.error(err);
        });
};

module.exports = generateImageMatch;