// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvME6Edkt8nAcVI4zoXhITzkRNCykrl8w",
  authDomain: "gym-management-system-39b58.firebaseapp.com",
  projectId: "gym-management-system-39b58",
  storageBucket: "gym-management-system-39b58.appspot.com",
  messagingSenderId: "565603059525",
  appId: "1:565603059525:web:ceda173b1a7509514d602c",
  measurementId: "G-97RZB80HPL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Add Member Functionality
document.getElementById('addMemberForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('memberName').value;
    const email = document.getElementById('memberEmail').value;
    addMember(name, email);
    document.getElementById('addMemberForm').reset();
});

function addMember(name, email) {
    const newMemberRef = database.ref('members/').push();
    newMemberRef.set({
        name: name,
        email: email
    });
}

// Search Records Functionality
document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('searchQuery').value.toLowerCase();
    searchRecords(query);
});

function searchRecords(query) {
    const resultsList = document.getElementById('searchResults');
    resultsList.innerHTML = '';
    database.ref('members/').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const member = childSnapshot.val();
            if (member.name.toLowerCase().includes(query) || member.email.toLowerCase().includes(query)) {
                const li = document.createElement('li');
                li.textContent = `${member.name} - ${member.email}`;
                resultsList.appendChild(li);
            }
        });
    });
}
