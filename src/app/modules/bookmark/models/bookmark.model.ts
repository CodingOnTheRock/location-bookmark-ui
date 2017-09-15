export class Bookmark {
    constructor(
        public id: String,
        public name: String,
        public description: String,
        public lat: Number,
        public lng: Number,
        public created: Date,
        public updated: Date
    ) {}
}
