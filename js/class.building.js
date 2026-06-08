"use strict";
/**
 * Create a Building class. Each Building should have
 * - a name
 * - a capacity
 * - an array of its residents
 *
 * Each Building should provide methods to
 * - addResident(citizen)
 *      - If there is still space in the building, add the citizen as resident.
 *        also mark this building as the citizens home.
 *      - If there is no space, check if someone has to makeSpaceFor(citizen) (= is there
 *        a resident in this building with a lower rank?)
 * - removeResident(citizen)
 *      - Kick a resident out of the building. Also delete the citizens home (null).
 *      - Attention: When you kick a resident, make sure there is no lower ranked
 *        resident remaining in the building.
 * - listAllResidents() for the Citizen Directory.
 */

export default class Building{
    constructor(name, capacity){
        this.name = name;
        this.capacity = capacity;
        this.residents = [];
    }

    addResident(citizen){
        if(this.residents.length < this.capacity){
            this.residents.push(citizen);
            citizen.home = this;
            return true;
        } else
            return this.makeSpaceFor(citizen);
    }

    removeResident(citizen){
        let index = this.residents.indexOf(citizen);

        if(index !== -1){
            this.residents.splice(index, 1);
            citizen.home = null;
        }
    }

    findLowestResident(){
        if(this.residents.length){
            let lowestResident = this.residents[0];

            for(const resident of this.residents){
                if(resident.rank > lowestResident.rank)
                    lowestResident = resident;
            }

            return lowestResident;
        }

        return null;
    }

    makeSpaceFor(citizen){
        let lowest = this.findLowestResident();

        if(lowest !== null && citizen.rank < lowest.rank){
            this.removeResident(lowest);
            this.addResident(citizen);
            return true;
        }

        return false;
    }

    listAllResidents(){
        console.log("%cResidents of " + this.name + " (" + this.residents.length + "/" + this.capacity + "):", "background-color: #FFEF00; color: black");

        for(const resident of this.residents){
            console.log(String(resident));
        }
    }
}
