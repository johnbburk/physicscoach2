reverseString = (str) =>{
    if (str=="")
    {
        return "";
    }
    else return reverseString(str.substr(1))+str.charAt(0);
}

alphaSort((a,b)=>{
    const aSplit = a.displayName.split(" ")
    const bSplit = b.displayName.split(" ")

    if (aSplit.reverse[0] > b.split.reverse[0])
        return 1;
    if(aSplit.reverse[0] < b.split.reverse[0])
        return -1;

    //how to check to see if there is only one element in the split array? 
    //sort on first name
    if (aSplit.reverse[1] > b.split.reverse[1])
        return 1;
    if(aSplit.reverse[1] < b.split.reverse[1])
        return -1;
    else return 0