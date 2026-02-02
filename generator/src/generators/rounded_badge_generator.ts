import { SquareBadgeGenerator } from "./square_badge_generator";

export class RoundedBadgeGenerator extends SquareBadgeGenerator {
    templateName: string = "rounded";
    templatePath: string = "../assets/templates/rounded.svg";
}
