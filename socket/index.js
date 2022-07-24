const io = require("socket.io")(process.env.PORT || 8900, {
    cors:{ //which URL is allowed to connect to this sockets server
        // origin: "https://nusconnectm2.herokuapp.com", 
        origin: "http://localhost:3000", 
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && //ensure user does not already exist
        users.push({userId, socketId});
};

// delete user by filtering users array
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    //look through array and find first user that has given userId
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    // connect user
    console.log("user connected")
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        //console.log(users);
        io.emit("getUsers", users) 
    });

    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        console.log(`users array: ${JSON.stringify(users)}`)
        const user = getUser(receiverId);
        if (user){
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text,
            });
        }
    });

    // disconnect user
    socket.on("disconnect", () =>{
        console.log("user disconnected")
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});