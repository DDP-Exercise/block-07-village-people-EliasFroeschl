"use strict";

import Building from "./class.building.js";
import NobleBuilding from "./class.nobleBuilding.js";
import Citizen from "./class.citizen.js";
import NobleCitizen from "./class.nobleCitizen.js";

/**
 * Create a Village class. Each village should have
 * - a name
 * - an array of its buildings
 * - an array of its citizens
 *
 * You can see in main.js what methods a village should provide.
 * implement them.
 */

export default class Village{
    constructor(name){
        this.name = name;
        this.buildings = [];
        this.citizens = [];
    }

    addBuilding(name, capacity, noble = false){
        this.buildings.push(noble ? new NobleBuilding(name, capacity) : new Building(name, capacity));
    }

    addCitizen(name, noble = false){
        let citizen = noble ? new NobleCitizen(name) : new Citizen(name);
        this.citizens.push(citizen);
        this.shelterCitizen(citizen);
    }

    shelterCitizen(citizen){
        for(const building of this.buildings){
            if(building.addResident(citizen))
                return true;
        }

        return false;
    }

    shelterTheWorthy(){
        for(const building of this.buildings){
            for(const resident of building.residents){
                resident.home = null;
            }

            building.residents = [];
        }

        this.citizens.sort(function(a, b){
            return a.rank - b.rank;
        });

        for(const citizen of this.citizens){
            this.shelterCitizen(citizen);
        }
    }

    printCitizenDirectory(){
        //For all buildings: List your residents
        for(const building of this.buildings)
            building.listAllResidents();

        this.listAllHomeless();
    }

    listAllHomeless(){
        console.log("%c Homeless people of " + this.name + ":", "background-color: #a00; color:white");

        for(const citizen of this.citizens){
            if(citizen.home == null)
                console.log(String(citizen));
        }
    }
}