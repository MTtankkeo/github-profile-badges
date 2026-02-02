import { BadgeGenerator } from "./badge_generator";
import { Config } from "../config/config";
import { Badge } from "../config/badge";

export class BadgeDocumentGenerator extends BadgeGenerator {
    templateName: string = "document";
    templatePath: string = "../assets/templates/document.md";

    generateFile(
        template: string,
        config: Config,
        badge: Badge,
    ): void {
        const result = template
            .replaceAll("{ID}", badge.id)
            .replaceAll("{CIRCLE_PATH}", `gen/circle/${badge.id}.svg`)
            .replaceAll("{SQUARE_LIGHT_PATH}", `gen/square/light/${badge.id}.svg`)
            .replaceAll("{SQUARE_DARK_PATH}", `gen/square/dark/${badge.id}.svg`)
            .replaceAll("{ROUNDED_LIGHT_PATH}", `gen/rounded/light/${badge.id}.svg`)
            .replaceAll("{ROUNDED_DARK_PATH}", `gen/rounded/dark/${badge.id}.svg`);

        this.output(`${badge.id}.md`, result);
    }
}
