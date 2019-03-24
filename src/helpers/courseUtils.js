import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";


function alphaSort(a,b){
    const aSplit = a.split(" ")
    const bSplit = b.split(" ")

    if (aSplit.reverse[0] > bSplit.reverse[0])
        return 1;
    if(aSplit.reverse[0] < bSplit.reverse[0])
        return -1;

    //how to check to see if there is only one element in the split array? 
    //sort on first name
    if (aSplit.reverse[1] > bSplit.reverse[1])
        return 1;
    if(aSplit.reverse[1] < bSplit.reverse[1])
        return -1;
    return 0;
}