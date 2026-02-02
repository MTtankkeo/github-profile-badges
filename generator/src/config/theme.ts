
export class Theme {
    constructor(
        id: string,
        background: string,
        foreground: string,
        border: string,
    ) {
        this.id = id;
        this.background = background;
        this.foreground = foreground;
        this.border = border;
    }

    id: string;
    background: string;
    foreground: string;
    border: string;

    static fromJson(json: any) {
        return new Theme(
            json["id"],
            json["background"],
            json["foreground"],
            json["border"],
        );
    }
}
