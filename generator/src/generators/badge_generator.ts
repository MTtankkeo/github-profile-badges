import { Badge } from "../config/badge";
import { Config } from "../config/config";
import * as svgson from "svgson";
import path from "path";
import fs from "fs";

export abstract class BadgeGenerator {
    static outputDir: string = "../gen/";

    abstract templateName: string;
    abstract templatePath: string;
    abstract generateFile(
        template: string,
        config: Config,
        badge: Badge,
    ): void;

    ensuredSizeOf(
        svgNode: svgson.INode,
        minWidth: number = 0,
        minHeight: number = 0,
        maxWidth: number = 1e10,
        maxHeight: number = 1e10,
    ): {
        width: number,
        height: number,
    } {
        const viewBox = svgNode.attributes.viewBox;
        const [x, y, w, h] = viewBox.split(" ").map(Number);

        const minScale = Math.max(minWidth / w, minHeight / h, 0);
        const maxScale = Math.min(maxWidth / w, maxHeight / h);
        const scale = Math.min(minScale, maxScale);

        return {
            width: w * scale,
            height: h * scale,
        };
    }

    output(
        pathStr: string,
        content: string,
    ) {
        const outputPath = `${BadgeGenerator.outputDir}/${this.templateName}/${pathStr}`;
        const outputDir = path.dirname(outputPath);

        fs.mkdirSync(outputDir, {recursive: true});
        fs.writeFileSync(outputPath, content);
    }

    perform(config: Config) {
        const template = fs.readFileSync(this.templatePath).toString();

        for (const badge of config.badges) {
            this.generateFile(template, config, badge);
        }
    }
}
