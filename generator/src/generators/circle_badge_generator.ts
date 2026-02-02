import { BadgeGenerator } from "./badge_generator";
import { Config } from "../config/config";
import { Badge } from "../config/badge";
import * as svgson from "svgson";

export class CircleBadgeGenerator extends BadgeGenerator {
    templateName: string = "circle";
    templatePath: string = "../assets/templates/circle.svg";

    generateFile(
        template: string,
        config: Config,
        badge: Badge,
    ): void {
        const badgeSvg = svgson.parseSync(badge.svg);
        const badgeSize = this.ensuredSizeOf(badgeSvg, 18, 18, 30, 30);
        const viewBoxSize = 40;
        const shiftX = badgeSize.width * badge.anchorShift.x;
        const shiftY = badgeSize.height * badge.anchorShift.y;
        badgeSvg.attributes.x = ((viewBoxSize / 2 - badgeSize.width / 2) + shiftX).toString();
        badgeSvg.attributes.y = ((viewBoxSize / 2 - badgeSize.height / 2) + shiftY).toString();
        badgeSvg.attributes.width = badgeSize.width.toString();
        badgeSvg.attributes.height = badgeSize.height.toString();

        const result = template
            .replace("{SVG}", svgson.stringify(badgeSvg))
            .replace("{COLOR}", badge.color);

        this.output(`${badge.id}.svg`, result);
    }
}
