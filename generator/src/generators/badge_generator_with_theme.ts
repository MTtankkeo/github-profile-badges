import { Badge } from "../config/badge";
import { BadgeGenerator } from "./badge_generator";
import { Config } from "../config/config";
import { Theme } from "../config/theme";

export abstract class BadgeGeneratorWithTheme extends BadgeGenerator {
    generateFile(
        template: string,
        config: Config,
        badge: Badge,
    ): void {
        for (const theme of config.themes) {
            this.generateFileByTheme(template, theme, badge);
        }
    }

    abstract generateFileByTheme(
        template: string,
        theme: Theme,
        badge: Badge,
    ): string;
}
