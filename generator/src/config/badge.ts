import fs from "fs";
import { Offset } from "./offset";

export class Badge {
    constructor(
        id: string,
        color: string,
        displayName: string,
        anchorShift: Offset,
    ) {
        this.id = id;
        this.color = color;
        this.displayName = displayName;
        this.anchorShift = anchorShift;
    }

    id: string;
    color: string;
    displayName: string;
    anchorShift: Offset;

    get svg(): string {
        return fs.readFileSync(`../assets/svgs/${this.id}.svg`).toString();
    }

    static fromJson(json: any) {
        return new Badge(
            json["id"],
            json["color"],
            json["displayName"],
            Offset.fromJson(json["anchorShift"] || {}),
        );
    }
}
