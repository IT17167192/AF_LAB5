
const getUserById = (id) => {
    return fetch(`http://localhost:3000/users/${id}`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

const getAllUsers = () => {
    return fetch('http://localhost:3000/users', {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//add user api call
const addUser = (user) => {
    return fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(err => {
        console.log(err)
    });
};

//update user api call
const updateUser = (id, user) => {
    return fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//delete user by id
const deleteUser= (id) => {
    return fetch(`http://localhost:3000/users/${id}`, {
        method: "delete",
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};