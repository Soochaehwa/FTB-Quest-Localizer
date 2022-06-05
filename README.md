# FTB Quest Localizer 
In most modpacks, the FTB quest string is hard coded in the .snbt file, so localization is cumbersome. This application allows you to extract quest strings into a json file for ease of localization and you can easily create a rough translation through Google Translate.

**Note: Works only with Minecraft 1.15+ modpacks**

## Installation

    git clone https://github.com/Soochaehwa/FTB-Quest-Localizer
    cd FTB-Quest-Localizer
    npm install
    
## Usage
The root directory must have a ftbquests directory to extract.

    npm run start
Answer the questions in the prompt

Translatable language codes can be found [here](https://github.com/Soochaehwa/FTB-Quest-Localizer/blob/master/langs.js).

## Screenshots
![712](https://user-images.githubusercontent.com/43947445/172006912-c17c7d7e-3563-4d8e-83cf-c47a1ff9c39d.png)

String replaced by translation key

![713](https://user-images.githubusercontent.com/43947445/172006914-83914fc2-7e90-4f84-b69e-33e49c235bdd.png)

Extracted string file and machine translated file
