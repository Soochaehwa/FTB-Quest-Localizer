
## Description
In most modpacks, the FTB quest string is hard coded in the .snbt file, so localization is cumbersome. This application allows you to extract quest strings into a json file for ease of localization and you can easily create a rough translation through Google Translate.

## Installation

    git clone https://github.com/Soochaehwa/FTB-Quest-Localizer
    cd FTB-Quest-Localizer
    npm install
    
## Usage
The root directory must have a ftbquests directory to extract.

    npm run start
Answer the questions in the prompt

Translatable language codes can be found [here](https://github.com/Soochaehwa/FTB-Quest-Localizer/blob/master/langs.js).
