"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Participant {
    constructor(first_name, last_name, tag) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.tag = tag;
    }
    getFirstName() {
        return this.first_name;
    }
    getLastName() {
        return this.last_name;
    }
    getTag() {
        return this.tag;
    }
}
exports.default = Participant;
