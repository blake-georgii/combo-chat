import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CommentForm = () => {

    const handleInputChange = (event) => {
        const { text, value } = event.target;
        setCommentFormData({ ...commentFormData, [text]: value });
      };

      const handleFormSubmit = async (event) => {
          event.preventDefault();
      };

      return (
          <>
          <Form onSubmit={handleFormSubmit}>
              <Form.Group>
                  <Form.Label htmlFor='text'>Comment</Form.Label>
                  <Form.Control 
                    textarea 
                    name='text'
                    placeholder='State your challenge'
                    onChange={handleInputChange}
                    value={commentFormData.text}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>You cannot fight like this! (Your comment must not be blank</Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    disabled={!commentFormData.text}
                    type='submit'
                    variant='success'>
                    Fight!
                </Button>
            </Form>
        </>
    );
};

export default CommentForm;



// function CommentForm() {
//     const [errorMessage, setErrorMessage] = useState('');
//     const [formState, setFormState] = useState({ user: '',  text: '', createdAt: '' })
//     const { user, text, createdAt } = formState;

//     function handleSubmit(e) {
//         e.preventDefault();
//         console.log(formState);
//     }

//     return (
//         <section>
//             <h1>Comment</h1>
//             <form id="comment-form" onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="text">Comment:</label>
//                     <textarea name="text" defaultValue={text} rows="5" />
//                 </div>
//                 {errorMessage && (
//                     <div>
//                         <p className="error-text">{errorMessage}</p>
//                     </div>
//                 )}
//                 <button type="submit">FIGHT!</button>
//             </form>
//         </section>
//     );
// }

// export default Comments;