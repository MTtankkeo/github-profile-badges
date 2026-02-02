import { BadgeGeneratorWithTheme } from "./badge_generator_with_theme";
import { Badge } from "../config/badge";
import { Theme } from "../config/theme";
import * as svgson from "svgson";
import TextToSVG from "text-to-svg";

export class SquareBadgeGenerator extends BadgeGeneratorWithTheme {
    templateName: string = "square";
    templatePath: string = "../assets/templates/square.svg";

    generateFileByTheme(
        template: string,
        theme: Theme,
        badge: Badge,
    ): string {
        const badgeSvg = svgson.parseSync(badge.svg);
        const badgeSize = this.ensuredSizeOf(badgeSvg, 0, 16, 32);
        badgeSvg.attributes.x = "11";
        badgeSvg.attributes.y = (25 / 2 - badgeSize.height / 2).toString();
        badgeSvg.attributes.width = badgeSize.width.toString();
        badgeSvg.attributes.height = badgeSize.height.toString();

        const fontGenerator = TextToSVG.loadSync("../assets/font/jetbrains_mono_bold.ttf");
        const fontGenerated = fontGenerator.getSVG(badge.displayName, {
            x: 0,
            y: 15,
            anchor: "left",
            fontSize: 15,
            attributes: {fill: theme.foreground}
        });

        const fontSvg = svgson.parseSync(fontGenerated);
        fontSvg.attributes.x = (16 + badgeSize.width).toString();
        fontSvg.attributes.y = "2.5";
        const fontWidth = Number.parseFloat(fontSvg.attributes.width);
        const width = 25 + badgeSize.width + fontWidth;

        const result = template
            .replaceAll("{OUTER_WIDTH}", (width + 1).toString())
            .replaceAll("{INNER_WIDTH}", width.toString())
            .replace("{SVG}", svgson.stringify(badgeSvg))
            .replace("{TEXT}", svgson.stringify(fontSvg))
            .replace("{BACKGROUND}", theme.background)
            .replace("{BORDER}", theme.border);

        const output = `${theme.id}/${badge.id}.svg`;
        this.output(output, result);

        return output;
    }
}
