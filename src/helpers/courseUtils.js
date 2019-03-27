
/**
 * "Jason Xia"
 * ["Jason", "Xia"]
 * ["Xia", "Jason"]
 * Xia Jason
 */

export function sortByLastName(a, b){
    const aReverse = a.split(" ").reverse().join();
    const bReverse = b.split(" ").reverse().join();
    if (aReverse > bReverse)
        return 1;
    if (aReverse < bReverse)
        return -1;
    return 0;
}

//write a function to extract list of students