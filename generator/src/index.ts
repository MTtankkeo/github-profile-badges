import { Config } from "./config/config";
import { CircleBadgeGenerator } from "./generators/circle_badge_generator";
import { SquareBadgeGenerator } from "./generators/square_badge_generator";
import { RoundedBadgeGenerator } from "./generators/rounded_badge_generator";
import { BadgeDocumentGenerator } from "./generators/badge_document_generator";

const config = Config.load();

const generators = [
    new CircleBadgeGenerator(),
    new SquareBadgeGenerator(),
    new RoundedBadgeGenerator(),
    new BadgeDocumentGenerator(),
]

for (const generator of generators) {
    generator.perform(config);
}

config.generateReadMe();
