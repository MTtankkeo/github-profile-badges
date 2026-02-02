
export class Offset {
    constructor(
        x: number,
        y: number,
    ) {
        this.x = x;
        this.y = y;
    }

    x: number;
    y: number;

    static fromJson(json: any) {
        return new Offset(
            json["x"] || 0.0,
            json["y"] || 0.0,
        );
    }
}
