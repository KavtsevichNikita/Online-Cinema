const schemeSvg = document.querySelector('.scheme-svg');
const totalPriceTag = document.querySelector('.price-total')
let cost = 20;
let totalPrice = 0;
schemeSvg.addEventListener('click',(event) => {
  if (!event.target.classList.contains('booked')) {
    event.target.classList.toggle('active');
    let totalSeats = schemeSvg.querySelectorAll(".active").length
    totalPrice = totalSeats * cost;
    totalPriceTag.textContent = totalPrice;
  }
})


document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('commentForm');
  const nameInput = document.getElementById('nameInput');
  const commentInput = document.getElementById('commentInput');
  const ratingInput = document.getElementById('ratingInput');
  const commentList = document.getElementById('commentList');

  function createCommentCard(comment) {
    const card = document.createElement('div');
    card.classList.add('comment-card');

    const name = document.createElement('h3');
    name.textContent = comment.name;
    card.appendChild(name);

    const commentText = document.createElement('p');
    commentText.classList.add('comment');
    commentText.textContent = comment.comment;
    card.appendChild(commentText);

    const rating = document.createElement('div');
    rating.classList.add('rating');
    rating.textContent = 'Rating: ';
    for (let i = 0; i < comment.rating / 2; i++) {
      const star = document.createElement('span');
      star.textContent = '★';
      rating.appendChild(star);
    }
    card.appendChild(rating);

    const deleteIcon = document.createElement('button');
    deleteIcon.textContent = 'Delete';
    deleteIcon.classList.add('delete-comment');
    deleteIcon.addEventListener('click', async () => {
      await deleteComment(comment._id);
      card.remove();
    });
    card.appendChild(deleteIcon);

    const editIcon = document.createElement('button');
    editIcon.textContent = 'Edit';
    editIcon.classList.add('edit-comment');
    editIcon.addEventListener('click', () => {
      editComment(comment, card);
    });
    card.appendChild(editIcon);

    return card;
  }

  async function deleteComment(commentId) {
    const response = await fetch(`/comments/${commentId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      console.log("Comment deleted successfully");
    } else {
      console.error('Failed to delete comment');
    }
  }

  async function editComment(comment, card) {
    const newName = prompt("Enter your name:", comment.name);
    const newComment = prompt("Enter your comment:", comment.comment);
    const newRating = prompt("Enter your rating (0-10):", comment.rating);
    if (newName !== null && newComment !== null && newRating !== null) {
      const updatedComment = {
        name: newName,
        comment: newComment,
        rating: parseInt(newRating)
      };
      const response = await fetch(`/comments/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedComment)
      });
      if (response.ok) {
        const updatedData = await response.json();
        const updatedCard = createCommentCard(updatedData);
        commentList.replaceChild(updatedCard, card);
        console.log("Comment updated successfully");
      } else {
        console.error('Failed to update comment');
      }
    }
  }
  const loadComments = async () => {
    const response = await fetch('/comments');
    const comments = await response.json();
    comments.forEach(comment => {
      const card = createCommentCard(comment);
      commentList.appendChild(card);
    });
  };

  loadComments();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = nameInput.value;
    const comment = commentInput.value;
    const rating = parseInt(ratingInput.value);

    if (!name || !comment || isNaN(rating) || rating < 0 || rating > 10) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const response = await fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, comment, rating })
    });

    if (response.ok) {
      const newComment = await response.json();
      const card = createCommentCard(newComment);
      commentList.appendChild(card);
      nameInput.value = '';
      commentInput.value = '';
      ratingInput.value = '';
      console.log("Comment added successfully");
    } else {
      console.error('Failed to add comment');
    }
  });
});