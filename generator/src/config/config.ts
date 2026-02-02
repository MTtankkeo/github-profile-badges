import { Badge } from "./badge";
import { Theme } from "./theme";
import fs from "fs";

export class Config {
    constructor(
        themes: Theme[],
        badges: Badge[],
    ) {
        this.themes = themes;
        this.badges = badges;
    }

    static readMeTemplatePath: string = "../assets/templates/README.md";

    themes: Theme[];
    badges: Badge[];

    static load(): Config {
        const file = fs.readFileSync("./config.json").toString();
        const json = JSON.parse(file);
        return this.fromJson(json);
    }

    static fromJson(json: any): Config {
        const themes = json["themes"].map(Theme.fromJson);
        const badges = json["badges"].map(Badge.fromJson);
        return new Config(themes, badges);
    }

    generateReadMe() {
        const template = fs.readFileSync(Config.readMeTemplatePath).toString();
        const badgesSvgs = this.badges.map(badge => {
            return `
                <a href="https://github.com/MTtankkeo/github-profile-badges/tree/main/gen/document/${badge.id}.md">
                    <img alt="${badge.id}" src="https://github.com/MTtankkeo/github-profile-badges/raw/refs/heads/main/gen/circle/${badge.id}.svg">
                </a>
            `
            .replaceAll("\t", "")
            .replaceAll("\n", "")
            .replaceAll("    ", "")
            .trim();
        }).join(" ");

        const result = template
            .replaceAll("{BADGES}", badgesSvgs)

        fs.writeFileSync("../README.md", result);
    }
}
