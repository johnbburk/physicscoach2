import firebase from "../config/constants";
const db = firebase.firestore();

export async function mapIDsToSortedObjects(listOfIDs) {
  let studentObjects = listOfIDs.map(async requestID => {
    return db
      .collection("users")
      .doc(requestID)
      .get();
  });

  studentObjects = await Promise.all(studentObjects);
  studentObjects = studentObjects.map(request => {
    return {
      ...request.data(),
      id: request.id,
      selected: false
    };
  });

  studentObjects.sort((a, b) => compareTwoNames(a.displayName, b.displayName));

  return studentObjects;
}

export function compareTwoNames(a, b) {
  const aReverse = a
    .split(" ")
    .reverse()
    .join();
  const bReverse = b
    .split(" ")
    .reverse()
    .join();
  if (aReverse > bReverse) return 1;
  if (aReverse < bReverse) return -1;
  return 0;
}

//write a function to extract list of students
//take a list of student ids and return a list of student objects
