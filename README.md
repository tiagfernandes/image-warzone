# Libary to generate image for warzone

## Fonction `generateImageMatchgenerateImageMatch()`

```js
const { generatImageMatch } = require("image-warzone");

generateImageMatch(data);
```

## Data to send, JSON Object

```json
{
    "top": 1,
    "mode": "duo",
    "matchEnded": 1618339017,
    "players": [
        {
            "playerName": "playerName",
            "kdr": 10.0,
            "kills": 10,
            "deaths": 5,
            "headshots": 2,
            "damageDealt": 1200,
            "damageTaken": 2000,
            "reviver": 0
        }
    ]
}
```

| Value       |   Type    |
| ----------- | :-------: |
| top         |  integer  |
| mode        |  string   |
| matchEnded  | timestamp |
| players     |   array   |
| playerName  |  string   |
| kdr         |  integer  |
| kills       |  integer  |
| deaths      |  integer  |
| headshots   |  integer  |
| damageDealt |  integer  |
| damageTaken |  integer  |
| reviver     |  integer  |
