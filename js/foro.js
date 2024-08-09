let users = [];
let loggedInUser = null;
let topics = [];

function registerUser() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const profilePic = document.getElementById('register-profile-pic').files[0];

    if (username && password) {
        const user = { username, password, profilePic, likedTopics: [], dislikedTopics: [] };
        users.push(user);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        document.getElementById('register-username').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('register-profile-pic').value = '';
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function loginUser() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        loggedInUser = user;
        alert('Inicio de sesión exitoso.');
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('forum-section').style.display = 'block';
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

function postTopic() {
    if (!loggedInUser) {
        alert('Debes iniciar sesión para publicar un tema.');
        return;
    }

    const title = document.getElementById('new-topic-title').value;
    const content = document.getElementById('new-topic-content').value;

    if (title && content) {
        const topic = {
            title,
            content,
            author: loggedInUser.username,
            profilePic: loggedInUser.profilePic,
            likes: 0,
            dislikes: 0,
            likedBy: [],
            dislikedBy: [],
            comments: []
        };
        topics.push(topic);
        document.getElementById('new-topic-title').value = '';
        document.getElementById('new-topic-content').value = '';
        displayTopics();
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function displayTopics() {
    const topicsList = document.getElementById('topics-list');
    topicsList.innerHTML = '';

    topics.forEach((topic, index) => {
        const topicElement = document.createElement('div');
        topicElement.classList.add('topic');
        topicElement.innerHTML = `
            ${topic.profilePic ? `<img src="${URL.createObjectURL(topic.profilePic)}" alt="Foto de perfil" class="profile-pic">` : ''}
            <div>
                <h3>${topic.title}</h3>
                <p>${topic.content}</p>
                <p><strong>Autor:</strong> ${topic.author}</p>
                <div class="likes-comments">
                    <div>
                        <button onclick="likeTopic(${index})">👍 ${topic.likes}</button>
                        <button onclick="dislikeTopic(${index})">👎 ${topic.dislikes}</button>
                    </div>
                    <button onclick="toggleComments(${index})">Comentarios (${topic.comments.length})</button>
                </div>
            </div>
            <div class="comments" id="comments-${index}" style="display: none;">
                <div class="new-comment">
                    <input type="text" id="comment-content-${index}" placeholder="Escribe un comentario">
                    <button onclick="postComment(${index})">Comentar</button>
                </div>
                <div id="comments-list-${index}">
                    <!-- Comentarios se agregarán aquí -->
                </div>
            </div>
        `;
        topicsList.appendChild(topicElement);
        displayComments(index);
    });
}

function likeTopic(index) {
    if (!loggedInUser) {
        alert('Debes iniciar sesión para dar like.');
        return;
    }

    const topic = topics[index];

    if (topic.likedBy.includes(loggedInUser.username)) {
        topic.likes--;
        topic.likedBy = topic.likedBy.filter(user => user !== loggedInUser.username);
    } else {
        if (topic.dislikedBy.includes(loggedInUser.username)) {
            topic.dislikes--;
            topic.dislikedBy = topic.dislikedBy.filter(user => user !== loggedInUser.username);
        }
        topic.likes++;
        topic.likedBy.push(loggedInUser.username);
    }

    displayTopics();
}

function dislikeTopic(index) {
    if (!loggedInUser) {
        alert('Debes iniciar sesión para dar dislike.');
        return;
    }

    const topic = topics[index];

    if (topic.dislikedBy.includes(loggedInUser.username)) {
        topic.dislikes--;
        topic.dislikedBy = topic.dislikedBy.filter(user => user !== loggedInUser.username);
    } else {
        if (topic.likedBy.includes(loggedInUser.username)) {
            topic.likes--;
            topic.likedBy = topic.likedBy.filter(user => user !== loggedInUser.username);
        }
        topic.dislikes++;
        topic.dislikedBy.push(loggedInUser.username);
    }

    displayTopics();
}

function toggleComments(index) {
    const commentsSection = document.getElementById(`comments-${index}`);
    commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
}

function postComment(index) {
    const content = document.getElementById(`comment-content-${index}`).value;
    if (content) {
        const comment = {
            author: loggedInUser.username,
            content,
            profilePic: loggedInUser.profilePic
        };
        topics[index].comments.push(comment);
        document.getElementById(`comment-content-${index}`).value = '';
        displayComments(index);
    } else {
        alert('Por favor, escribe un comentario.');
    }
}

function displayComments(index) {
    const commentsList = document.getElementById(`comments-list-${index}`);
    commentsList.innerHTML = '';

    topics[index].comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            ${comment.profilePic ? `<img src="${URL.createObjectURL(comment.profilePic)}" alt="Foto de perfil" class="profile-pic">` : ''}
            <div>
                <p class="author">${comment.author}</p>
                <p class="content">${comment.content}</p>
            </div>
        `;
        commentsList.appendChild(commentElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('forum-section').style.display = 'none';
});
